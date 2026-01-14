import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Check, User, Building2, AlertTriangle, Phone } from "lucide-react";
import OnboardingDocumentUpload from "@/components/OnboardingDocumentUpload";
import { trpc } from "@/lib/trpc";

const steps = [
  { id: 1, title: "Unternehmensdaten", icon: Building2 },
  { id: 2, title: "Art der Krise", icon: AlertTriangle },
  { id: 3, title: "Finanzielle Situation", icon: User },
  { id: 4, title: "Kontakt", icon: Phone },
];

export default function Onboarding() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    // Step 1: Unternehmensdaten
    firmenname: "",
    rechtsform: "",
    branche: "",
    mitarbeiterzahl: "",

    // Step 2: Art der Krise
    krisenarten: [] as string[],

    // Step 3: Finanzielle Situation
    steuerschuldenHoehe: "",
    offeneFristen: "",
    liquiditaetslage: "",

    // Step 4: Kontakt
    ansprechpartner: "",
    position: "",
    telefon: "",
    erreichbarkeit: "",

    // Documents
    documents: [] as string[],
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Anmeldung erforderlich</CardTitle>
            <CardDescription>
              Bitte melden Sie sich an, um das Onboarding zu starten.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full"
              onClick={() => window.location.href = "/sign-in"}
            >
              Anmelden
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = (currentStep / steps.length) * 100;

  const completeOnboarding = trpc.user.completeOnboarding.useMutation({
    onSuccess: () => {
      toast.success("Onboarding abgeschlossen! Wir melden uns innerhalb von 2 Werktagen bei Ihnen.");
      setLocation("/dashboard");
    },
    onError: () => {
      toast.error("Fehler beim Speichern");
    },
  });

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      // Submit onboarding with all form data
      completeOnboarding.mutate(formData);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const toggleKrisenart = (art: string) => {
    setFormData(prev => ({
      ...prev,
      krisenarten: prev.krisenarten.includes(art)
        ? prev.krisenarten.filter(k => k !== art)
        : [...prev.krisenarten, art]
    }));
  };

  const isStepComplete = () => {
    if (currentStep === 1) {
      return formData.firmenname && formData.rechtsform && formData.branche;
    }
    if (currentStep === 2) {
      return formData.krisenarten.length > 0;
    }
    if (currentStep === 3) {
      return formData.steuerschuldenHoehe && formData.offeneFristen && formData.liquiditaetslage;
    }
    if (currentStep === 4) {
      return formData.ansprechpartner && formData.telefon && formData.erreichbarkeit;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Willkommen bei Krisenberatung Portal</h1>
          <p className="text-muted-foreground">
            Begleiten Sie uns durch einige wichtige Fragen zu Ihrer Situation
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className={`flex items-center gap-2 ${index === currentStep - 1 ? 'text-primary' : index < currentStep - 1 ? 'text-green-600' : 'text-muted-foreground'}`}>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    index === currentStep - 1
                      ? 'border-primary bg-primary text-primary-foreground'
                      : index < currentStep - 1
                        ? 'border-green-600 bg-green-600 text-white'
                        : 'border-muted-foreground'
                  }`}>
                    {index < currentStep - 1 ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-2 ${index < currentStep - 1 ? 'bg-green-600' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <steps[currentStep - 1].icon className="w-6 h-6" />
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription>
              Schritt {currentStep} von {steps.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Unternehmensdaten */}
            {currentStep === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="firmenname">Firmenname *</Label>
                  <Input
                    id="firmenname"
                    value={formData.firmenname}
                    onChange={(e) => updateFormData("firmenname", e.target.value)}
                    placeholder="z.B. Musterfirma GmbH"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="rechtsform">Rechtsform *</Label>
                    <Select
                      value={formData.rechtsform}
                      onValueChange={(v) => updateFormData("rechtsform", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Auswählen..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gmbh">GmbH</SelectItem>
                        <SelectItem value="ug">UG (haftungsbeschränkt)</SelectItem>
                        <SelectItem value="ag">AG</SelectItem>
                        <SelectItem value="einzelunternehmen">Einzelunternehmen</SelectItem>
                        <SelectItem value="gbr">GbR</SelectItem>
                        <SelectItem value="ohg">OHG</SelectItem>
                        <SelectItem value="kg">KG</SelectItem>
                        <SelectItem value="sonstige">Sonstige</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="branche">Branche *</Label>
                    <Select
                      value={formData.branche}
                      onValueChange={(v) => updateFormData("branche", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Auswählen..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="handel">Handel</SelectItem>
                        <SelectItem value="dienstleistung">Dienstleistung</SelectItem>
                        <SelectItem value="gastgewerbe">Gastgewerbe</SelectItem>
                        <SelectItem value="handwerk">Handwerk</SelectItem>
                        <SelectItem value="produktion">Produktion</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="sonstige">Sonstige</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mitarbeiterzahl">Anzahl Mitarbeiter</Label>
                  <Select
                    value={formData.mitarbeiterzahl}
                    onValueChange={(v) => updateFormData("mitarbeiterzahl", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Auswählen..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-5">1-5</SelectItem>
                      <SelectItem value="6-20">6-20</SelectItem>
                      <SelectItem value="21-50">21-50</SelectItem>
                      <SelectItem value="51-100">51-100</SelectItem>
                      <SelectItem value="über-100">über 100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Step 2: Art der Krise */}
            {currentStep === 2 && (
              <>
                <div className="space-y-4">
                  <Label>Krisenart (Mehrfachauswahl möglich) *</Label>
                  <div className="space-y-3">
                    {[
                      { id: "finanzamt", label: "Finanzamt-Probleme (Steuerschulden, Schätzungen)" },
                      { id: "liquiditaet", label: "Liquiditätskrise" },
                      { id: "insolvenz", label: "Insolvenzgefahr" },
                      { id: "glaeubiger", label: "Gläubigerdruck" },
                      { id: "sozialversicherung", label: "Sozialversicherungsrückstände" },
                    ].map((art) => (
                      <div key={art.id} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                        <Checkbox
                          id={art.id}
                          checked={formData.krisenarten.includes(art.id)}
                          onCheckedChange={() => toggleKrisenart(art.id)}
                        />
                        <Label
                          htmlFor={art.id}
                          className="flex-1 cursor-pointer font-normal leading-relaxed"
                        >
                          {art.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {formData.krisenarten.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      Bitte wählen Sie mindestens eine Krisenart aus.
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Step 3: Finanzielle Situation */}
            {currentStep === 3 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="steuerschuldenHoehe">Geschätzte Höhe der Steuerschulden *</Label>
                  <Select
                    value={formData.steuerschuldenHoehe}
                    onValueChange={(v) => updateFormData("steuerschuldenHoehe", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Auswählen..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unter-10k">unter 10.000€</SelectItem>
                      <SelectItem value="10k-50k">10.000€ - 50.000€</SelectItem>
                      <SelectItem value="50k-100k">50.000€ - 100.000€</SelectItem>
                      <SelectItem value="100k-500k">100.000€ - 500.000€</SelectItem>
                      <SelectItem value="über-500k">über 500.000€</SelectItem>
                      <SelectItem value="unbekannt">Unbekannt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="offeneFristen">Offene Fristen beim Finanzamt *</Label>
                  <Select
                    value={formData.offeneFristen}
                    onValueChange={(v) => updateFormData("offeneFristen", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Auswählen..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="keine">Keine bekannt</SelectItem>
                      <SelectItem value="7-tage">Innerhalb 7 Tage</SelectItem>
                      <SelectItem value="30-tage">Innerhalb 30 Tage</SelectItem>
                      <SelectItem value="90-tage">Innerhalb 90 Tage</SelectItem>
                      <SelectItem value="überschritten">Bereits überschritten</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="liquiditaetslage">Aktuelle Liquiditätslage *</Label>
                  <Select
                    value={formData.liquiditaetslage}
                    onValueChange={(v) => updateFormData("liquiditaetslage", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Auswählen..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stabil">Stabil</SelectItem>
                      <SelectItem value="angespannt">Angespannt</SelectItem>
                      <SelectItem value="kritisch">Kritisch</SelectItem>
                      <SelectItem value="zahlungsunfaehig">Zahlungsunfähig drohend</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Step 4: Kontakt */}
            {currentStep === 4 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="ansprechpartner">Ansprechpartner Name *</Label>
                  <Input
                    id="ansprechpartner"
                    value={formData.ansprechpartner}
                    onChange={(e) => updateFormData("ansprechpartner", e.target.value)}
                    placeholder="z.B. Max Mustermann"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position im Unternehmen</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => updateFormData("position", e.target.value)}
                    placeholder="z.B. Geschäftsführer"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefon">Telefon *</Label>
                  <Input
                    id="telefon"
                    type="tel"
                    value={formData.telefon}
                    onChange={(e) => updateFormData("telefon", e.target.value)}
                    placeholder="+49 123 456789"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="erreichbarkeit">Beste Erreichbarkeit *</Label>
                  <Select
                    value={formData.erreichbarkeit}
                    onValueChange={(v) => updateFormData("erreichbarkeit", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Auswählen..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vormittags">Vormittags (8-12 Uhr)</SelectItem>
                      <SelectItem value="nachmittags">Nachmittags (12-17 Uhr)</SelectItem>
                      <SelectItem value="abends">Abends (17-20 Uhr)</SelectItem>
                      <SelectItem value="flexibel">Flexibel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    <strong>Vertraulichkeit:</strong> Alle Ihre Angaben werden streng vertraulich behandelt und nur für die Krisenberatung verwendet.
                  </p>
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isStepComplete() || completeOnboarding.isPending}
              >
                {currentStep === steps.length ? (
                  completeOnboarding.isPending ? (
                    "Wird gespeichert..."
                  ) : (
                    <>
                      Abschließen
                      <Check className="w-4 h-4 ml-2" />
                    </>
                  )
                ) : (
                  <>
                    Weiter
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
