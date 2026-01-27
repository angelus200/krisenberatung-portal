# Smoke Test - Schnelle Pre-Release-Prüfung

**Dauer:** ~10 Minuten
**Zweck:** Kritische Funktionen vor jedem Release testen
**URL:** https://www.unternehmensoptimierung.app/

---

## ✅ Checkliste (15 kritische Tests)

### 1. Startseite lädt
- [ ] Seite lädt vollständig ohne Fehler
- [ ] Hero-Bereich + CTA-Buttons sichtbar
- [ ] Keine Console-Fehler (F12)

### 2. Navigation funktioniert
- [ ] "Anmelden" → /sign-in
- [ ] "Registrieren" → /sign-up
- [ ] Footer-Links (Impressum, Datenschutz, AGB) erreichbar

### 3. Registrierung (KRITISCH)
- [ ] Neue E-Mail registrieren
- [ ] Verifizierungscode erhalten
- [ ] Code eingeben → Weiterleitung zum Dashboard
- [ ] **NUR 1 E-Mail erhalten** (nicht doppelt!)

### 4. Welcome-Modal (KRITISCH)
- [ ] Modal erscheint nach Registrierung
- [ ] "Später" → Dashboard
- [ ] "Los geht's" → Onboarding

### 5. Onboarding (KRITISCH - Bug-Anfällig)
- [ ] 4 Schritte durchlaufen
- [ ] "Abschließen" klicken
- [ ] **NUR 1x durchlaufen** (Bug war: 2x Durchlauf)
- [ ] Erfolgs-Toast erscheint
- [ ] Weiterleitung zum Dashboard

### 6. Dashboard
- [ ] Dashboard lädt mit Begrüßung
- [ ] Sidebar-Navigation sichtbar
- [ ] Keine 404-Fehler bei Menüpunkten

### 7. Shop (KRITISCH - Umsatzrelevant)
- [ ] Shop-Seite lädt
- [ ] Analyse-Paket zeigt €2.990
- [ ] Handbuch zeigt €29,90
- [ ] "Kaufen" Button funktioniert

### 8. Stripe Checkout (KRITISCH)
- [ ] Checkout öffnet sich
- [ ] Testkarte: 4242 4242 4242 4242
- [ ] Zahlung erfolgreich
- [ ] Weiterleitung zu /shop/success

### 9. Rechnung generiert
- [ ] Bestellung in /orders sichtbar
- [ ] Rechnung in /invoices sichtbar
- [ ] PDF-Download funktioniert
- [ ] Bankdaten korrekt (RELIO AG)

### 10. Dokumente Upload
- [ ] /documents lädt
- [ ] Datei-Upload funktioniert
- [ ] Dokument erscheint in Liste
- [ ] Download funktioniert

### 11. Termin-Buchung
- [ ] /booking lädt Calendly-Widget
- [ ] Kalender zeigt verfügbare Termine

### 12. Admin-Bereich (wenn Admin)
- [ ] /admin/users lädt
- [ ] /admin/onboarding zeigt Einträge
- [ ] /admin/invoices funktioniert

### 13. Logout
- [ ] Logout-Button funktioniert
- [ ] Weiterleitung zur Startseite
- [ ] Dashboard nicht mehr erreichbar (Redirect zu /sign-in)

### 14. Login (bestehender User)
- [ ] Login mit bestehender E-Mail
- [ ] Weiterleitung zum Dashboard
- [ ] Welcome-Modal erscheint NICHT mehr

### 15. Mobile Ansicht
- [ ] Startseite auf Smartphone responsive
- [ ] Navigation (Burger-Menü) funktioniert
- [ ] Dashboard lesbar

---

## 🔴 Bei Fehlern

**Blocker (nicht releasen):**
- Registrierung funktioniert nicht
- Onboarding-Doppel-Durchlauf
- Stripe Checkout broken
- Rechnung wird nicht generiert

**Major (fix vor Release):**
- Welcome-Modal Navigation
- Admin-Bereich nicht erreichbar
- Dokument-Upload fehlschlägt

**Minor (kann nach Release gefixt werden):**
- UI-Fehler
- Mobile-Optimierung
- Kleine Layout-Probleme

---

## 📊 Ergebnis

**Datum:** _______________
**Tester:** _______________
**Bestandene Tests:** ___ / 15
**Status:** ☐ Release-ready ☐ Blocker gefunden ☐ Major Issues

**Notizen:**
```
[Hier Anmerkungen eintragen]
```

---

## 🚀 Nach erfolgreichem Smoke-Test

1. ✅ Git Commit erstellen
2. ✅ Push zu GitHub
3. ✅ Railway deployment prüfen
4. ✅ Live-URL testen
5. ✅ Stakeholder benachrichtigen
