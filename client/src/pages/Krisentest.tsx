import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertTriangle, AlertCircle, XCircle, ArrowRight, ArrowLeft, Phone } from "lucide-react";
import { Link } from "wouter";

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    points: number;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "Wie ist Ihre aktuelle Liquiditätssituation?",
    options: [
      { text: "Ausreichend für 6+ Monate", points: 1 },
      { text: "Ausreichend für 3-6 Monate", points: 2 },
      { text: "Ausreichend für 1-3 Monate", points: 3 },
      { text: "Kritisch (unter 1 Monat)", points: 4 },
    ],
  },
  {
    id: 2,
    question: "Haben Sie offene Verbindlichkeiten beim Finanzamt oder Sozialversicherung?",
    options: [
      { text: "Nein, alles bezahlt", points: 1 },
      { text: "Ja, aber Ratenzahlung vereinbart", points: 2 },
      { text: "Ja, Mahnungen erhalten", points: 3 },
      { text: "Ja, Vollstreckung angedroht", points: 4 },
    ],
  },
  {
    id: 3,
    question: "Können Sie alle laufenden Rechnungen fristgerecht bezahlen?",
    options: [
      { text: "Ja, problemlos", points: 1 },
      { text: "Meistens, gelegentlich knapp", points: 2 },
      { text: "Oft verspätet", points: 3 },
      { text: "Regelmäßig Zahlungsverzug", points: 4 },
    ],
  },
  {
    id: 4,
    question: "Wie würden Sie Ihre operative Firmenstruktur bewerten?",
    options: [
      { text: "Gut organisiert, klare Prozesse", points: 1 },
      { text: "Funktioniert, aber Optimierungsbedarf", points: 2 },
      { text: "Unübersichtlich, viele manuelle Prozesse", points: 3 },
      { text: "Chaotisch, keine klaren Strukturen", points: 4 },
    ],
  },
  {
    id: 5,
    question: "Haben Sie professionelle Berater (Steuerberater, Anwalt) eingebunden?",
    options: [
      { text: "Ja, regelmäßiger Austausch", points: 1 },
      { text: "Ja, aber nur bei Bedarf", points: 2 },
      { text: "Nein, zu teuer", points: 3 },
      { text: "Nein, weiß nicht wen ich fragen soll", points: 4 },
    ],
  },
];

interface Result {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  recommendation: string;
}

const getResult = (score: number): Result => {
  if (score <= 8) {
    return {
      title: "Stabil",
      description: "Ihr Unternehmen ist gut aufgestellt",
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      recommendation:
        "Ihr Unternehmen zeigt solide Strukturen und eine gute Liquiditätslage. Eine präventive Optimierung kann helfen, diese Position weiter zu stärken und Wachstumschancen zu nutzen.",
    };
  } else if (score <= 13) {
    return {
      title: "Aufmerksamkeit erforderlich",
      description: "Es gibt Warnsignale",
      icon: AlertTriangle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
      recommendation:
        "Wir haben einige Warnsignale identifiziert, die auf mittelfristige Risiken hindeuten. Eine professionelle Analyse würde Ihnen konkrete Handlungsempfehlungen geben, um Probleme frühzeitig zu beheben.",
    };
  } else if (score <= 17) {
    return {
      title: "Handlungsbedarf",
      description: "Mehrere Risikofaktoren erkannt",
      icon: AlertCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
      recommendation:
        "Ihr Unternehmen zeigt mehrere typische Krisensymptome. Eine strukturierte Sanierungsberatung ist dringend empfohlen, um die Situation zu stabilisieren und Handlungsoptionen zu entwickeln.",
    };
  } else {
    return {
      title: "Akuter Handlungsbedarf",
      description: "Typische Insolvenzmerkmale vorhanden",
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950/20",
      recommendation:
        "Die Analyse zeigt deutliche Insolvenzmerkmale. Wir empfehlen eine sofortige Beratung, um alle verfügbaren Optionen zu prüfen und rechtliche sowie finanzielle Konsequenzen zu vermeiden.",
    };
  }
};

export default function Krisentest() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const totalScore = Object.values(answers).reduce((sum, points) => sum + points, 0);
  const result = getResult(totalScore);

  const handleAnswer = (points: number) => {
    setAnswers({ ...answers, [currentQuestion.id]: points });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = answers[currentQuestion.id] !== undefined;

  if (showResult) {
    const ResultIcon = result.icon;

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/">
              <img src="/logo.png" alt="Non Dom Group" className="h-10" />
            </Link>
            <Link href="/">
              <Button variant="ghost">Zurück zur Startseite</Button>
            </Link>
          </div>
        </header>

        {/* Result Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-4xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <CheckCircle2 className="h-4 w-4" />
                Test abgeschlossen
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Ihre Auswertung</h1>
              <p className="text-lg text-muted-foreground">
                Basierend auf Ihren Angaben haben wir folgende Einschätzung:
              </p>
            </div>

            <Card className={`border-2 ${result.bgColor} mb-8`}>
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className={`w-20 h-20 rounded-full ${result.bgColor} flex items-center justify-center`}>
                    <ResultIcon className={`h-10 w-10 ${result.color}`} />
                  </div>
                </div>
                <CardTitle className={`text-3xl ${result.color}`}>{result.title}</CardTitle>
                <CardDescription className="text-lg">{result.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white dark:bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold mb-3">Ihre Punktzahl</h3>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-primary">{totalScore}</div>
                    <div className="text-sm text-muted-foreground">von 20 Punkten</div>
                  </div>
                  <Progress value={(totalScore / 20) * 100} className="mt-4" />
                </div>

                <div className="bg-white dark:bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold mb-3">Unsere Empfehlung</h3>
                  <p className="text-muted-foreground leading-relaxed">{result.recommendation}</p>
                </div>

                <div className="pt-4 space-y-4">
                  <a href="#kontakt">
                    <Button size="lg" className="w-full">
                      Kostenlose Erstberatung anfordern
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                  <Link href="/shop">
                    <Button size="lg" variant="outline" className="w-full">
                      Problemanalyse buchen (€ 499)
                    </Button>
                  </Link>
                </div>

                <div className="pt-4 border-t">
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => {
                      setCurrentStep(0);
                      setAnswers({});
                      setShowResult(false);
                    }}
                  >
                    Test wiederholen
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <p className="text-xs text-center text-muted-foreground max-w-2xl mx-auto">
              Dieser Test dient lediglich als erste Einschätzung und ersetzt keine professionelle Beratung.
              Die Auswertung basiert auf Ihren Angaben und stellt keine rechtsverbindliche Auskunft dar.
            </p>
          </div>
        </section>

        {/* Contact Section from Home */}
        <section id="kontakt" className="py-20 lg:py-32 bg-muted/30">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Starten Sie Ihre <span className="text-primary">Anfrage</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Füllen Sie das Formular aus und wir melden uns innerhalb von 48 Stunden für ein erstes Gespräch bei Ihnen.
              </p>
            </div>

            <Card className="shadow-xl border-2">
              <CardHeader>
                <CardTitle>Kontaktformular</CardTitle>
                <CardDescription>
                  Gerne beraten wir Sie persönlich zu Ihrer Situation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-6">
                    Kontaktieren Sie uns direkt über unser Hauptformular oder telefonisch
                  </p>
                  <div className="space-y-4">
                    <Link href="/#kontakt">
                      <Button size="lg" className="w-full sm:w-auto">
                        Zum Kontaktformular
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <img src="/logo.png" alt="Non Dom Group" className="h-10" />
          </Link>
          <Link href="/">
            <Button variant="ghost">Abbrechen</Button>
          </Link>
        </div>
      </header>

      {/* Quiz Section */}
      <section className="py-16 lg:py-24">
        <div className="container max-w-3xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <CheckCircle2 className="h-4 w-4" />
              3-Minuten Krisentest
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Wie krisenfest ist Ihr <span className="text-primary">Unternehmen</span>?
            </h1>
            <p className="text-lg text-muted-foreground">
              Frage {currentStep + 1} von {questions.length}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="shadow-xl border-2">
            <CardHeader>
              <CardTitle className="text-2xl">{currentQuestion.question}</CardTitle>
              <CardDescription>Wählen Sie die Antwort, die am besten auf Ihre Situation zutrifft</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                value={answers[currentQuestion.id]?.toString()}
                onValueChange={(value) => handleAnswer(parseInt(value))}
              >
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <div
                      key={index}
                      className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-primary/50 ${
                        answers[currentQuestion.id] === option.points
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                      onClick={() => handleAnswer(option.points)}
                    >
                      <RadioGroupItem value={option.points.toString()} id={`option-${index}`} />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex-1 cursor-pointer leading-relaxed"
                      >
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              {/* Navigation */}
              <div className="flex gap-4 pt-4">
                {currentStep > 0 && (
                  <Button variant="outline" onClick={handleBack} className="flex-1">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Zurück
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className={`flex-1 ${currentStep === 0 ? "w-full" : ""}`}
                >
                  {currentStep === questions.length - 1 ? "Auswertung anzeigen" : "Weiter"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Help Text */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Ihre Angaben werden vertraulich behandelt und dienen nur zur Erstellung Ihrer persönlichen Auswertung.
          </p>
        </div>
      </section>
    </div>
  );
}
