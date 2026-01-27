# Krisenberatungsportal - Ausführlicher Selbsttest

**URL:** https://www.unternehmensoptimierung.app/
**Datum:** _______________
**Tester:** _______________

---

## TEIL 1: ÖFFENTLICHE SEITEN (ohne Login)

### 1.1 Startseite / Landing Page
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt vollständig | Keine Ladeanimation hängt | | |
| Hero-Bereich sichtbar | Überschrift, Untertitel, CTA-Button | | |
| Trust-Badges angezeigt | Logos/Partner sichtbar | | |
| Prozess-Schritte sichtbar | 3-4 Schritte erklärt | | |
| FAQ-Bereich funktioniert | Aufklappen/Zuklappen | | |
| Video lädt (falls vorhanden) | Player funktioniert | | |
| CTA-Buttons klickbar | Führen zu korrekten Seiten | | |
| Mobile Ansicht testen | Responsive, keine Überlappungen | | |

### 1.2 Navigation & Footer
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Hauptmenü sichtbar | Alle Links vorhanden | | |
| Logo klickbar → Startseite | Navigation funktioniert | | |
| "Anmelden" Button | Führt zu /sign-in | | |
| "Registrieren" Button | Führt zu /sign-up | | |
| Footer-Links funktionieren | Impressum, Datenschutz, AGB | | |
| Social Media Links | Facebook, LinkedIn öffnen korrekt | | |
| Google Maps Widget | Zeigt korrekten Standort | | |

### 1.3 Impressum (/impressum)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Inhalt sichtbar | | |
| Firmendaten korrekt | Marketplace24-7 GmbH, Freienbach SZ | | |
| Handelsregister-Nr. | CH-130.4.033.363-2 | | |
| Kontaktdaten vorhanden | E-Mail, Telefon | | |

### 1.4 Datenschutz (/datenschutz)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Inhalt sichtbar | | |
| Alle Abschnitte vorhanden | Cookies, Tracking, Rechte | | |
| Links funktionieren | Interne/externe Links | | |

### 1.5 AGB (/agb)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Inhalt sichtbar | | |
| Vollständige AGB | Alle relevanten Klauseln | | |

### 1.6 Über uns (/about)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Inhalt sichtbar | | |
| Firmeninfos korrekt | NON DOM Group, Angelus Group | | |
| Bilder laden | Keine broken images | | |

### 1.7 Team (/team)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Inhalt sichtbar | | |
| Team-Mitglieder angezeigt | Namen, Positionen, Bilder | | |
| Bilder laden korrekt | Keine Platzhalter | | |

### 1.8 Presse (/press)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Inhalt sichtbar | | |
| Presseartikel angezeigt | Forbes, Focus, etc. | | |
| Links zu Artikeln funktionieren | Öffnen externe Seiten | | |
| Zertifikate sichtbar | "Unternehmen der Zukunft" | | |

### 1.9 Shop (/shop)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Produkte sichtbar | | |
| Analyse-Paket angezeigt | Preis: €2.990 | | |
| Handbuch angezeigt | Preis: €29,90 | | |
| "Kaufen" Button klickbar | Führt zu Checkout/Login | | |
| Produktbeschreibungen | Vollständig, lesbar | | |

### 1.10 Cookie-Banner
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Banner erscheint | Beim ersten Besuch | | |
| "Akzeptieren" funktioniert | Banner verschwindet, Cookies gesetzt | | |
| "Ablehnen" funktioniert | Nur notwendige Cookies | | |
| Einstellungen anpassbar | Tracking einzeln wählbar | | |
| Nach Refresh nicht erneut | Cookie-Präferenz gespeichert | | |

---

## TEIL 2: REGISTRIERUNG & LOGIN

### 2.1 Registrierung (/sign-up)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Clerk-Formular sichtbar | | |
| E-Mail eingeben | Feld akzeptiert Input | | |
| Passwort eingeben | Feld akzeptiert Input, Stärke-Anzeige | | |
| "Registrieren" klicken | Verifizierungscode wird gesendet | | |
| **NUR 1 E-Mail erhalten** | Nicht doppelt! | | |
| E-Mail nicht im Spam | Hauptpostfach | | |
| Code eingeben | Feld akzeptiert 6 Ziffern | | |
| **Keine Fehlermeldung** | Weiterleitung zum Dashboard | | |
| Social Login (Google) | Falls konfiguriert, funktioniert | | |

### 2.2 Login (/sign-in)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Clerk-Formular sichtbar | | |
| E-Mail eingeben | Feld akzeptiert Input | | |
| Passwort eingeben | Feld akzeptiert Input | | |
| "Anmelden" klicken | Weiterleitung zum Dashboard | | |
| Falsches Passwort | Fehlermeldung erscheint | | |
| "Passwort vergessen" Link | Führt zu Reset-Flow | | |
| Social Login (Google) | Falls konfiguriert, funktioniert | | |

### 2.3 Logout
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Logout-Button finden | Im Menü/Profil sichtbar | | |
| Logout klicken | Zurück zur Startseite | | |
| Dashboard nicht mehr erreichbar | Redirect zu /sign-in | | |

---

## TEIL 3: ONBOARDING (nach Registrierung)

### 3.1 Welcome-Modal
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Modal erscheint | Nach erstem Login | | |
| 4 Features erklärt | Termine, Bestellungen, Dokumente, Kontakt | | |
| **"Später" klicken** | Modal schließt, Weiterleitung zu /dashboard | | |
| **"Los geht's" klicken** | Modal schließt, Weiterleitung zu /onboarding | | |
| Modal erscheint nicht erneut | Bei erneutem Login | | |

### 3.2 Onboarding-Fragebogen (/onboarding)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | 4 Schritte angezeigt | | |
| Progress-Bar sichtbar | Zeigt aktuellen Schritt | | |

**Schritt 1: Unternehmensdaten**
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Firmenname eingeben | Pflichtfeld validiert | | |
| Rechtsform wählen | Dropdown funktioniert | | |
| Branche wählen | Dropdown funktioniert | | |
| Mitarbeiterzahl wählen | Dropdown funktioniert | | |
| "Weiter" nur aktiv wenn ausgefüllt | Button disabled bis valide | | |
| "Weiter" klicken | Zu Schritt 2 | | |

**Schritt 2: Art der Krise**
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Krisenarten angezeigt | Checkboxen sichtbar | | |
| Mehrfachauswahl möglich | Mehrere Checkboxen wählbar | | |
| Min. 1 Auswahl erforderlich | "Weiter" erst dann aktiv | | |
| "Zurück" funktioniert | Zu Schritt 1, Daten erhalten | | |
| "Weiter" klicken | Zu Schritt 3 | | |

**Schritt 3: Finanzielle Situation**
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Steuerschulden-Dropdown | Alle Optionen wählbar | | |
| Offene Fristen Dropdown | Alle Optionen wählbar | | |
| Liquiditätslage Dropdown | Alle Optionen wählbar | | |
| "Zurück" funktioniert | Zu Schritt 2, Daten erhalten | | |
| "Weiter" klicken | Zu Schritt 4 | | |

**Schritt 4: Kontakt**
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Ansprechpartner eingeben | Pflichtfeld | | |
| Position eingeben | Optional | | |
| Telefon eingeben | Pflichtfeld, Format-Validierung? | | |
| Erreichbarkeit wählen | Dropdown funktioniert | | |
| Vertraulichkeits-Hinweis | Box sichtbar | | |
| "Zurück" funktioniert | Zu Schritt 3, Daten erhalten | | |
| **"Abschließen" klicken** | **NUR 1x durchlaufen, dann Dashboard** | | |
| **NICHT zurück zu Schritt 1** | Bug war: 2x durchlaufen | | |
| Erfolgs-Toast erscheint | "Onboarding abgeschlossen" | | |

---

## TEIL 4: DASHBOARD & KUNDENPORTAL

### 4.1 Dashboard (/dashboard)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Übersicht sichtbar | | |
| Begrüßung mit Namen | "Willkommen, [Name]" | | |
| Statistik-Karten | Aufgaben, Dokumente, etc. | | |
| Letzte Aktivitäten | Timeline sichtbar | | |
| Quick-Actions | Buttons funktionieren | | |
| Navigation funktioniert | Seitenleiste klickbar | | |

### 4.2 Aufgaben (/tasks)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Aufgaben-Liste sichtbar | | |
| Aufgaben angezeigt | Falls vorhanden | | |
| Filter funktioniert | Offen/Erledigt | | |
| Aufgabe als erledigt markieren | Status ändert sich | | |
| Aufgabe anklicken | Details sichtbar | | |

### 4.3 Dokumente (/documents)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Dokument-Liste sichtbar | | |
| Upload-Button sichtbar | "Dokument hochladen" | | |
| Datei auswählen | Datei-Dialog öffnet | | |
| Upload durchführen | Progress-Anzeige | | |
| Upload erfolgreich | Dokument in Liste | | |
| Dokument herunterladen | Download startet | | |
| Dokument löschen | Aus Liste entfernt | | |
| Große Datei (>5MB) | Fehlermeldung oder Erfolg? | | |

### 4.4 Verträge (/contracts)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Vertrags-Liste sichtbar | | |
| Vertrag anklicken | PDF-Ansicht öffnet | | |
| Vertrag akzeptieren | Button funktioniert | | |
| Unterschrift (falls vorhanden) | Signatur-Feld funktioniert | | |
| Akzeptierter Vertrag markiert | Status sichtbar | | |

### 4.5 Bestellungen (/orders)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Bestellungs-Liste sichtbar | | |
| Bestellung anklicken | Details sichtbar | | |
| Status angezeigt | Bezahlt/Offen/Storniert | | |
| Rechnung verknüpft | Link zur Rechnung | | |

### 4.6 Rechnungen (/invoices)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Rechnungs-Liste sichtbar | | |
| Rechnung anklicken | PDF öffnet/Download | | |
| Rechnungsdetails korrekt | Betrag, Datum, Firma | | |
| Bankdaten korrekt | RELIO AG, IBAN | | |

### 4.7 Einstellungen (/settings)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Einstellungen sichtbar | | |
| Profil bearbeiten | Name, E-Mail änderbar? | | |
| Passwort ändern | Funktioniert | | |
| Benachrichtigungen | Toggle funktioniert | | |
| Speichern | Änderungen übernommen | | |

---

## TEIL 5: TOOLS & RECHNER

### 5.1 Zins-/Tilgungsrechner (/tools/interest-calculator)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Rechner sichtbar | | |
| Darlehenssumme eingeben | Feld akzeptiert Zahlen | | |
| Zinssatz eingeben | Feld akzeptiert Dezimalzahlen | | |
| Laufzeit eingeben | Feld akzeptiert Jahre/Monate | | |
| Berechnen klicken | Ergebnis wird angezeigt | | |
| Ergebnis plausibel | Monatsrate, Gesamtzins | | |
| Tilgungsplan angezeigt | Tabelle/Grafik | | |

### 5.2 Refinanzierungsvergleich (/tools/refinance-calculator)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Rechner sichtbar | | |
| Aktuelle Konditionen eingeben | Felder funktionieren | | |
| Neue Konditionen eingeben | Felder funktionieren | | |
| Vergleichen klicken | Ersparnis berechnet | | |
| Ergebnis plausibel | Positiv/Negativ korrekt | | |

### 5.3 Eigenkapitalrendite (/tools/roe-calculator)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Rechner sichtbar | | |
| Eigenkapital eingeben | Feld funktioniert | | |
| Gewinn eingeben | Feld funktioniert | | |
| Berechnen | ROE wird angezeigt (%) | | |

### 5.4 Glossar (/tools/glossary)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | A-Z Liste sichtbar | | |
| Buchstaben-Navigation | Sprung zu Abschnitt | | |
| Suchfeld funktioniert | Filtert Begriffe | | |
| Begriff anklicken | Definition erscheint | | |
| Alle Begriffe haben Definition | Keine leeren Einträge | | |

---

## TEIL 6: TERMIN-BUCHUNG

### 6.1 Buchungsseite (/booking)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Calendly-Widget sichtbar | | |
| Kalender angezeigt | Verfügbare Termine | | |
| Termin auswählen | Slot wird markiert | | |
| Formulardaten eingeben | Name, E-Mail, etc. | | |
| Termin bestätigen | Erfolgsmeldung | | |
| Bestätigungs-E-Mail erhalten | Im Postfach | | |

---

## TEIL 7: SHOP & CHECKOUT

### 7.1 Produkt kaufen (als eingeloggter User)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Shop aufrufen | Produkte sichtbar | | |
| "Kaufen" bei Analyse-Paket | Stripe Checkout öffnet | | |
| Stripe-Formular | Kartendaten eingeben | | |
| Testkarte verwenden | 4242 4242 4242 4242 | | |
| Zahlung erfolgreich | Weiterleitung zu /shop/success | | |
| Erfolgsseite korrekt | "Danke für Ihre Bestellung" | | |
| Bestellung in /orders | Neue Bestellung sichtbar | | |
| Rechnung generiert | In /invoices sichtbar | | |
| Bestätigungs-E-Mail | Im Postfach | | |

### 7.2 Shop ohne Login
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| "Kaufen" klicken | Redirect zu Login/Registrierung? | | |
| Nach Login zurück zum Shop | Warenkorb erhalten? | | |

---

## TEIL 8: ADMIN-BEREICH (nur für Admins)

### 8.1 Zugang prüfen
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Als normaler User | Admin-Menü NICHT sichtbar | | |
| Als Admin einloggen | Admin-Menü sichtbar | | |
| Direkter URL-Zugriff als User | Redirect oder 403 | | |

### 8.2 Benutzerverwaltung (/admin/users)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | User-Liste sichtbar | | |
| Suche funktioniert | Filtert User | | |
| User-Details anzeigen | Klick öffnet Details | | |
| Rolle ändern | Dropdown funktioniert | | |
| User deaktivieren | Status ändert sich | | |

### 8.3 Audit-Log (/admin/audit)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Log-Einträge sichtbar | | |
| Filter nach Datum | Funktioniert | | |
| Filter nach Aktion | Funktioniert | | |
| Filter nach User | Funktioniert | | |
| Details anzeigen | Vollständige Info | | |

### 8.4 Onboarding-Daten (/admin/onboarding)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Liste der Einträge | | |
| Eintrag anklicken | Alle 4 Schritte sichtbar | | |
| Dokumente sichtbar | Uploads einsehbar | | |
| Export-Funktion | Falls vorhanden | | |

### 8.5 Vertragsvorlagen (/admin/contracts)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Vorlagen-Liste | | |
| Vorlage erstellen | Formular funktioniert | | |
| Vorlage bearbeiten | Änderungen speicherbar | | |
| Vorlage löschen | Aus Liste entfernt | | |
| Vorlage einem User zuweisen | Funktioniert | | |

### 8.6 Buchungen (/admin/bookings)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Buchungs-Liste | | |
| Kalendar-Ansicht | Falls vorhanden | | |
| Buchung stornieren | Status ändert sich | | |

### 8.7 Rechnungen erstellen (/admin/invoices)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Formular sichtbar | | |
| Kunde auswählen | Dropdown funktioniert | | |
| Positionen hinzufügen | Zeilen hinzufügbar | | |
| Beträge eingeben | Felder funktionieren | | |
| MwSt-Berechnung | Automatisch korrekt | | |
| Rechnung erstellen | PDF wird generiert | | |
| E-Mail-Versand | Option vorhanden, funktioniert | | |

### 8.8 Logo-Verwaltung (/admin/logos)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Logo-Felder sichtbar | | |
| URL eingeben | Feld akzeptiert URL | | |
| Speichern | Änderungen übernommen | | |
| Logos auf Startseite aktualisiert | Trust-Badges korrekt | | |

---

## TEIL 9: CRM (für Staff/Admin)

### 9.1 Leads (/crm/leads)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Lead-Liste sichtbar | | |
| Neuen Lead anlegen | Formular funktioniert | | |
| Lead bearbeiten | Änderungen speicherbar | | |
| Lead löschen | Aus Liste entfernt | | |
| Lead zu Kontakt konvertieren | Funktioniert | | |
| GoHighLevel-Sync | Lead in GHL erstellt? | | |

### 9.2 Kontakte (/crm/contacts)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Kontakt-Liste sichtbar | | |
| Suche funktioniert | Filtert Kontakte | | |
| Kontakt-Details | Vollständige Info | | |
| Aktivitäten/Timeline | Sichtbar | | |
| Notizen hinzufügen | Funktioniert | | |

### 9.3 Deals/Pipeline (/crm/deals)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Seite lädt | Pipeline-Ansicht (Kanban) | | |
| Deal erstellen | Formular funktioniert | | |
| Deal verschieben (Drag&Drop) | Stage ändert sich | | |
| Deal-Details | Wert, Status, Kontakt | | |
| Deal abschließen | Won/Lost markieren | | |

---

## TEIL 10: MOBILE & CROSS-BROWSER

### 10.1 Mobile (Smartphone)
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Startseite | Responsive, lesbar | | |
| Navigation | Burger-Menü funktioniert | | |
| Registrierung | Formular bedienbar | | |
| Dashboard | Übersicht lesbar | | |
| Tabellen | Horizontal scrollbar | | |
| Buttons | Groß genug zum Tippen | | |

### 10.2 Tablet
| Test | Erwartet | ✅/❌ | Fehler/Anmerkung |
|------|----------|-------|------------------|
| Alle Seiten | Korrekte Darstellung | | |
| Touch-Interaktion | Funktioniert | | |

### 10.3 Browser-Kompatibilität
| Browser | Getestet | ✅/❌ | Fehler/Anmerkung |
|---------|----------|-------|------------------|
| Chrome (neueste) | | | |
| Firefox (neueste) | | | |
| Safari (neueste) | | | |
| Edge (neueste) | | | |

---

## TEIL 11: PERFORMANCE & FEHLER

### 11.1 Ladezeiten
| Seite | Zeit (<3s gut) | ✅/❌ | Anmerkung |
|-------|----------------|-------|-----------|
| Startseite | ___ s | | |
| Dashboard | ___ s | | |
| Shop | ___ s | | |

### 11.2 Konsolen-Fehler (F12 → Console)
| Seite | Fehler gefunden | Details |
|-------|-----------------|---------|
| Startseite | | |
| Dashboard | | |
| Onboarding | | |
| Shop | | |
| Admin | | |

### 11.3 Netzwerk-Fehler (F12 → Network)
| Seite | 4xx/5xx Fehler | URL/Details |
|-------|----------------|-------------|
| | | |
| | | |

---

## ZUSAMMENFASSUNG

### Kritische Bugs (Blocker)
| # | Beschreibung | Seite |
|---|--------------|-------|
| 1 | | |
| 2 | | |
| 3 | | |

### Schwere Bugs (Major)
| # | Beschreibung | Seite |
|---|--------------|-------|
| 1 | | |
| 2 | | |
| 3 | | |

### Kleinere Bugs (Minor)
| # | Beschreibung | Seite |
|---|--------------|-------|
| 1 | | |
| 2 | | |
| 3 | | |

### Verbesserungsvorschläge
| # | Beschreibung | Seite |
|---|--------------|-------|
| 1 | | |
| 2 | | |
| 3 | | |

---

## Bekannte Bugs (bereits behoben)

### ✅ Behoben am 19.01.2026 (Commit e1bf681)
1. **Registrierung → Onboarding Doppel-Durchlauf**
   - Problem: Nach Registrierung wurde Onboarding 2x durchlaufen
   - Lösung: `isSubmitting` State hinzugefügt, afterSignUpUrl korrigiert

2. **Welcome-Modal Navigation**
   - Problem: Buttons führten nicht weiter
   - Lösung: Navigation nach Button-Klick hinzugefügt

---

**Gesamtergebnis:**
- Getestete Bereiche: ___ / 11
- Bestandene Tests: ___ %
- Kritische Bugs: ___
- Empfehlung: ☐ Release-ready ☐ Nachbesserung nötig ☐ Nicht releasen

**Unterschrift Tester:** _______________
**Datum:** _______________
