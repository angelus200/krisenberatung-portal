import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import {
  ArrowLeft,
  Search,
  BookOpen,
  ChevronRight,
  Info
} from "lucide-react";
import DashboardLayout from '@/components/DashboardLayout';

interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
  relatedTerms?: string[];
}

const glossaryTerms: GlossaryTerm[] = [
  // B
  {
    term: "BWA",
    definition: "Betriebswirtschaftliche Auswertung - monatliche Übersicht über die wirtschaftliche Lage eines Unternehmens mit Einnahmen, Ausgaben und Gewinn/Verlust.",
    category: "Finanzen",
    relatedTerms: ["Liquidität"]
  },
  // E
  {
    term: "Eigenverwaltung",
    definition: "Der Schuldner verwaltet die Insolvenzmasse selbst unter Aufsicht eines Sachwalters. Dies ermöglicht mehr Gestaltungsspielraum bei der Sanierung.",
    category: "Insolvenzrecht",
    relatedTerms: ["Schutzschirmverfahren", "Insolvenz"]
  },
  // G
  {
    term: "Gläubiger",
    definition: "Person oder Unternehmen, dem Geld oder andere Leistungen geschuldet werden. Gläubiger haben Anspruch auf Befriedigung ihrer Forderungen.",
    category: "Insolvenzrecht",
    relatedTerms: ["Schuldner", "Vergleich"]
  },
  // I
  {
    term: "Insolvenz",
    definition: "Zahlungsunfähigkeit oder Überschuldung eines Unternehmens. Führt zur Eröffnung eines Insolvenzverfahrens durch das Amtsgericht.",
    category: "Insolvenzrecht",
    relatedTerms: ["Insolvenzantrag", "Zahlungsunfähigkeit", "Überschuldung"]
  },
  {
    term: "Insolvenzantrag",
    definition: "Antrag beim Amtsgericht zur Eröffnung eines Insolvenzverfahrens. Kann vom Schuldner selbst oder von Gläubigern gestellt werden.",
    category: "Insolvenzrecht",
    relatedTerms: ["Insolvenz", "Eigenverwaltung"]
  },
  // L
  {
    term: "Liquidität",
    definition: "Fähigkeit eines Unternehmens, seinen Zahlungsverpflichtungen fristgerecht nachzukommen. Mangelnde Liquidität führt zur Zahlungsunfähigkeit.",
    category: "Finanzen",
    relatedTerms: ["Zahlungsunfähigkeit", "BWA"]
  },
  // M
  {
    term: "Mahnbescheid",
    definition: "Gerichtliches Mahnverfahren zur Durchsetzung von Geldforderungen. Wird vom Mahngericht auf Antrag des Gläubigers erlassen.",
    category: "Vollstreckung",
    relatedTerms: ["Vollstreckungsbescheid", "Gläubiger"]
  },
  {
    term: "Mahnungen",
    definition: "Außergerichtliche Zahlungsaufforderungen des Gläubigers an den Schuldner. Oft Vorstufe zum gerichtlichen Mahnverfahren.",
    category: "Vollstreckung",
    relatedTerms: ["Mahnbescheid", "Vollstreckungsbescheid"]
  },
  // R
  {
    term: "Ratenzahlung",
    definition: "Tilgung einer Schuld in vereinbarten Teilbeträgen über einen festgelegten Zeitraum. Erleichtert die Rückzahlung größerer Beträge.",
    category: "Sanierung",
    relatedTerms: ["Stundung", "Vergleich"]
  },
  {
    term: "Restschuldbefreiung",
    definition: "Befreiung von verbleibenden Schulden nach Abschluss eines Insolvenzverfahrens. Ermöglicht einen wirtschaftlichen Neustart.",
    category: "Insolvenzrecht",
    relatedTerms: ["Insolvenz", "Schuldner"]
  },
  {
    term: "Restrukturierung",
    definition: "Umfassende Umstrukturierung von Schulden, Geschäftsprozessen und Unternehmensstrukturen zur Wiederherstellung der Wirtschaftlichkeit.",
    category: "Sanierung",
    relatedTerms: ["Sanierung", "Vergleich"]
  },
  // S
  {
    term: "Sanierung",
    definition: "Gesamtheit aller Maßnahmen zur Wiederherstellung der Zahlungsfähigkeit und wirtschaftlichen Leistungsfähigkeit eines Unternehmens.",
    category: "Sanierung",
    relatedTerms: ["Restrukturierung", "Insolvenz"]
  },
  {
    term: "Schuldner",
    definition: "Person oder Unternehmen, das Geld oder andere Leistungen schuldet. Trägt die Verpflichtung zur Erfüllung gegenüber dem Gläubiger.",
    category: "Insolvenzrecht",
    relatedTerms: ["Gläubiger", "Insolvenz"]
  },
  {
    term: "Schutzschirmverfahren",
    definition: "Vorbereitende Sanierung in Eigenverwaltung unter gerichtlichem Schutz. Verhindert Vollstreckungsmaßnahmen während der Sanierungsphase.",
    category: "Insolvenzrecht",
    relatedTerms: ["Eigenverwaltung", "Sanierung"]
  },
  {
    term: "Stundung",
    definition: "Aufschub der Zahlungspflicht auf einen späteren Zeitpunkt durch Vereinbarung mit dem Gläubiger. Ermöglicht kurzfristige Liquiditätsentlastung.",
    category: "Sanierung",
    relatedTerms: ["Ratenzahlung", "Vergleich"]
  },
  // Ü
  {
    term: "Überschuldung",
    definition: "Die Schulden eines Unternehmens übersteigen das vorhandene Vermögen. Neben Zahlungsunfähigkeit ein Insolvenzgrund.",
    category: "Insolvenzrecht",
    relatedTerms: ["Insolvenz", "Zahlungsunfähigkeit"]
  },
  // V
  {
    term: "Vergleich",
    definition: "Einigung zwischen Schuldner und Gläubigern auf einen reduzierten Zahlungsbetrag oder geänderte Zahlungsmodalitäten zur Vermeidung der Insolvenz.",
    category: "Sanierung",
    relatedTerms: ["Gläubiger", "Schuldner", "Ratenzahlung"]
  },
  {
    term: "Vollstreckungsbescheid",
    definition: "Amtlicher Titel zur Zwangsvollstreckung nach erfolglosem Widerspruch gegen einen Mahnbescheid. Ermöglicht Vollstreckungsmaßnahmen.",
    category: "Vollstreckung",
    relatedTerms: ["Mahnbescheid", "Gläubiger"]
  },
  // Z
  {
    term: "Zahlungsunfähigkeit",
    definition: "Unfähigkeit, fällige Zahlungsverpflichtungen zu erfüllen. Führt zusammen mit Überschuldung zur Insolvenzantragspflicht.",
    category: "Insolvenzrecht",
    relatedTerms: ["Insolvenz", "Überschuldung", "Liquidität"]
  }
];

// Alle verfügbaren Buchstaben
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Kategorien für Filter
const categories = [...new Set(glossaryTerms.map(t => t.category))].sort();

export default function Glossary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  // Filter Begriffe
  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter(term => {
      // Suchfilter
      const matchesSearch = !searchQuery ||
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase());

      // Buchstabenfilter
      const matchesLetter = !selectedLetter ||
        term.term[0].toUpperCase() === selectedLetter;

      // Kategoriefilter
      const matchesCategory = !selectedCategory ||
        term.category === selectedCategory;

      return matchesSearch && matchesLetter && matchesCategory;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [searchQuery, selectedLetter, selectedCategory]);

  // Gruppiere nach Anfangsbuchstaben
  const groupedTerms = useMemo(() => {
    const grouped: Record<string, GlossaryTerm[]> = {};

    filteredTerms.forEach(term => {
      const letter = term.term[0].toUpperCase();
      if (!grouped[letter]) {
        grouped[letter] = [];
      }
      grouped[letter].push(term);
    });

    return grouped;
  }, [filteredTerms]);

  // Buchstaben die verfügbar sind
  const availableLetters = useMemo(() => {
    return alphabet.filter(letter =>
      glossaryTerms.some(term => term.term[0].toUpperCase() === letter)
    );
  }, []);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="border-b">
        <div className="container py-8">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Glossar Krisenberatung</h1>
              <p className="text-muted-foreground">
                Wichtige Begriffe aus Insolvenzrecht, Sanierung und Vollstreckung verständlich erklärt
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8">
        {/* Suchleiste */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Begriff suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            {/* Buchstaben-Filter */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Nach Buchstabe filtern</label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedLetter === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLetter(null)}
                >
                  Alle
                </Button>
                {availableLetters.map(letter => (
                  <Button
                    key={letter}
                    variant={selectedLetter === letter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLetter(letter)}
                  >
                    {letter}
                  </Button>
                ))}
              </div>
            </div>

            {/* Kategorie-Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Nach Kategorie filtern</label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  Alle Kategorien
                </Button>
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ergebnisanzahl */}
        <div className="mb-4 text-sm text-muted-foreground">
          {filteredTerms.length} {filteredTerms.length === 1 ? 'Begriff' : 'Begriffe'} gefunden
          {selectedLetter && ` mit "${selectedLetter}"`}
          {selectedCategory && ` in "${selectedCategory}"`}
        </div>

        {/* Begriffsliste */}
        {filteredTerms.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Keine Begriffe gefunden</h3>
              <p className="text-muted-foreground">
                Versuchen Sie einen anderen Suchbegriff oder setzen Sie die Filter zurück.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedTerms).map(([letter, terms]) => (
              <div key={letter}>
                {/* Buchstaben-Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-lg">
                    {letter}
                  </div>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                {/* Begriffe */}
                <div className="space-y-3">
                  {terms.map(term => (
                    <Card
                      key={term.term}
                      className={`transition-all cursor-pointer hover:shadow-md ${
                        expandedTerm === term.term ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setExpandedTerm(expandedTerm === term.term ? null : term.term)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{term.term}</h3>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                {term.category}
                              </span>
                            </div>
                            <p className={`text-muted-foreground ${
                              expandedTerm === term.term ? '' : 'line-clamp-2'
                            }`}>
                              {term.definition}
                            </p>

                            {/* Verwandte Begriffe */}
                            {expandedTerm === term.term && term.relatedTerms && term.relatedTerms.length > 0 && (
                              <div className="mt-3 pt-3 border-t">
                                <span className="text-sm text-muted-foreground">Verwandte Begriffe: </span>
                                {term.relatedTerms.map((related, idx) => (
                                  <button
                                    key={related}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSearchQuery(related);
                                      setSelectedLetter(null);
                                      setSelectedCategory(null);
                                    }}
                                    className="text-sm text-primary hover:underline"
                                  >
                                    {related}{idx < term.relatedTerms!.length - 1 ? ', ' : ''}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform ${
                            expandedTerm === term.term ? 'rotate-90' : ''
                          }`} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <Card className="mt-8 bg-gradient-to-r from-primary to-primary/80 text-white">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">Fragen zur Krisenberatung?</h3>
            <p className="text-white/90 mb-4">
              Unsere Experten helfen Ihnen gerne bei allen Fragen zu Insolvenz, Sanierung und Restrukturierung.
            </p>
            <Link href="/#kontakt">
              <Button variant="secondary" className="w-full sm:w-auto">
                Kostenlose Erstberatung anfordern
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
