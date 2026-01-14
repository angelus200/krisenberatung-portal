# Krisenberatung Portal - Branding Update TODO Liste

Vollständige Übersicht aller Stellen, die noch vom ImmoRefi Portal stammen und angepasst werden müssen.

Erstellt: 2026-01-14

---

## 🔴 KRITISCH - Sofort ändern

### 1. E-Mail Templates (server/emailService.ts)
**Status:** ❌ Enthält noch ImmoRefi-Referenzen

**Zeile 122:** Portal URL
```typescript
// ALT:
<a href="https://portal.immoportal.app/admin/orders">
// NEU:
<a href="https://krisenberatung-portal-url/admin/orders">
```

**Zeile 126:** Produktbeschreibung
```typescript
// ALT: "Ihr Partner für Immobilien-Refinanzierung"
// NEU: "Ihr Partner für Krisenberatung"
```

**Zeile 130:** Produktbeschreibung
```typescript
// ALT: "Mit Ihrem Zugang haben Sie nun Zugriff auf alle Funktionen unseres Portals für eine professionelle Immobilien-Refinanzierung."
// NEU: "Mit Ihrem Zugang haben Sie nun Zugriff auf alle Funktionen unseres Portals für professionelle Krisenberatung."
```

**Zeile 134:** Dashboard URL
```typescript
// ALT: https://portal.immoportal.app/dashboard
// NEU: https://krisenberatung-portal-url/dashboard
```

**Zeile 150:** Portal URL
```typescript
// ALT: https://portal.immoportal.app
// NEU: https://krisenberatung-portal-url
```

---

### 2. Server Routers (server/routers.ts)
**Status:** ❌ Enthält noch "Immobilienportfolio"

**Zeile ~180:** Onboarding Step 3 Kommentar
```typescript
// ALT: // Step 3: Immobilienportfolio
// NEU: // Step 3: Unternehmensdaten
```

**Zeile ~850:** Download-Notiz
```typescript
// ALT: "Das Handbuch für Immobilienprojektentwickler wurde heruntergeladen."
// NEU: "Das Handbuch Finanzamt-Probleme wurde heruntergeladen."
```

---

### 3. Home Page (client/src/pages/Home.tsx)
**Status:** ⚠️ Mehrere Stellen

**Zeile ~120:** Statistik-Text
```typescript
// ALT: "im Immo Private Debt Markt"
// NEU: "im Krisenberatungs-Markt" oder entfernen
```

**Zeile ~140:** Video-Beschreibung
```typescript
// ALT: "In diesem Video erklären wir, wie wir Immobilienunternehmen beim Zugang zum Kapitalmarkt unterstützen."
// NEU: "In diesem Video erklären wir, wie wir Unternehmen in Krisensituationen professionell beraten."
```

**Zeile ~160:** Text über Refinanzierung
```typescript
// ALT: "Die Refinanzierungs- und Kapitalstrukturierung von Bauträgern ist stets individuell."
// NEU: "Die Krisensituation jedes Unternehmens ist individuell und erfordert maßgeschneiderte Lösungen."
```

**Zeile ~200:** PDF-Link
```typescript
// ALT: onClick={() => window.open('/handbuch-immobilienprojektentwickler.pdf', '_blank')}
// NEU: onClick={() => window.open('/downloads/handbuch-finanzamtprobleme.pdf', '_blank')}
```

**Zeile ~250:** Eligibility Check
```typescript
// ALT: "Finden Sie in nur 3 Minuten heraus, ob Ihre Immobilienprojekte für eine professionelle"
// NEU: "Finden Sie in nur 3 Minuten heraus, ob Ihr Unternehmen für professionelle Krisenberatung"
```

**Zeile ~300:** Footer/Tagline
```typescript
// ALT: "Ihr Partner für Kapitalmarktzugang und strukturierte Immobilieninvestments."
// NEU: "Ihr Partner für professionelle Krisenberatung und Unternehmenssanierung."
```

---

### 4. Shop Page (client/src/pages/Shop.tsx)
**Status:** ⚠️ Badge-Text

**Zeile 163:** Badge
```typescript
// ALT: "Wissen & Beratung für Immobilienprofis"
// NEU: "Wissen & Beratung für Unternehmer in der Krise"
```

---

### 5. Admin Handbuch (client/src/pages/AdminHandbuch.tsx)
**Status:** ❌ KOMPLETT neu schreiben

**Zeile 1:** Titel
```typescript
// ALT: "ImmoRefi Portal - Benutzerhandbuch"
// NEU: "Krisenberatung Portal - Benutzerhandbuch"
```

**Zeile ~50:** Login URL
```typescript
// ALT: portal.immoportal.app
// NEU: [neue URL]
```

**Zeile ~100-150:** Immobiliendaten Abschnitt
```typescript
// ALT: "Immobiliendaten", "Immobilientyp", "Immobilienunterlagen"
// NEU: Entfernen und durch Krisendaten ersetzen
```

**Zeile ~200:** Pfad
```typescript
// ALT: cd ~/Downloads/immorefi-portal
// NEU: cd ~/Downloads/krisenberatung-portal
```

**Zeile ~250:** E-Mail Konfiguration
```typescript
// ALT: no-reply@immorefi.com, mail.immorefi.com
// NEU: [neue E-Mail-Adressen]
```

**Zeile ~280:** Webhook URL
```typescript
// ALT: https://portal.immorefi.app/api/webhooks/gohighlevel
// NEU: [neue URL]
```

**Zeile ~300:** App URL
```typescript
// ALT: VITE_APP_URL=https://portal.immorefi.app
// NEU: [neue URL]
```

**Zeile ~350:** Login URL
```typescript
// ALT: portal.immorefi.app
// NEU: [neue URL]
```

**Zeile ~400:** API Docs
```typescript
// ALT: https://portal.immorefi.app/api/docs
// NEU: [neue URL]
```

---

## 🟡 WICHTIG - Bald ändern

### 6. Finance Calculator (client/src/components/FinanceCalculator.tsx)
**Status:** ⚠️ Private Debt Referenzen

**Zeile ~50:** Finanzierungslücke Text
```typescript
// ALT: "Diese Lücke kann durch Private Debt, CLN oder alternative Finanzierungsstrukturen geschlossen werden."
// NEU: "Diese Lücke erfordert eine strukturierte Sanierungsstrategie."
```

**Zeile ~80:** Diversifizierung Text
```typescript
// ALT: "Eine Diversifizierung der Finanzierungsquellen durch Private Debt oder Kapitalmarktinstrumente kann das Risiko reduzieren."
// NEU: "Eine strukturierte Sanierung und Restrukturierung kann die finanzielle Situation stabilisieren."
```

---

### 7. ROE Calculator (client/src/pages/tools/ROECalculator.tsx)
**Status:** ⚠️ Immobilien-Referenzen

**Zeile ~20, ~50, ~80:** Labels und Kommentare
```typescript
// ALT: "Immobiliendaten"
// NEU: "Unternehmensdaten" oder entfernen
```

---

### 8. CRM Pipeline (client/src/pages/crm/Pipeline.tsx)
**Status:** ⚠️ Beispieltext

**Zeile ~100:** Placeholder
```typescript
// ALT: "z.B. Immobilienfinanzierung Projekt XY"
// NEU: "z.B. Krisenberatung Unternehmen XY"
```

---

### 9. Admin Calendar (client/src/pages/admin/MyCalendar.tsx)
**Status:** ⚠️ Beispieltext

**Zeile ~150:** Placeholder
```typescript
// ALT: "z.B. 30 Minuten Erstgespräch zur Immobilien-Refinanzierung"
// NEU: "z.B. 30 Minuten Erstgespräch zur Krisenberatung"
```

---

### 10. Onboarding Data (client/src/pages/admin/OnboardingData.tsx)
**Status:** ⚠️ Immobilien-Kategorien

**Zeile ~40-50:** Kategorien
```typescript
// ALT: wohnen: "Wohnimmobilien", buero: "Büroimmobilien"
// NEU: Entfernen oder durch Branchen ersetzen
```

**Zeile ~120:** Section Titel
```typescript
// ALT: "Immobilienportfolio"
// NEU: "Unternehmensportfolio" oder entfernen
```

---

### 11. Onboarding Form (client/src/pages/Onboarding.tsx)
**Status:** ⚠️ Kapitalbedarf-Feld

**Zeile 41, 308-311:** Kapitalbedarf
```typescript
// ALT: "Kapitalbedarf"
// NEU: "Finanzierungsbedarf" oder "Verbindlichkeiten"
```

**Zeile ~200:** Branche Option
```typescript
// ALT: <SelectItem value="immobilien">Immobilien</SelectItem>
// NEU: Entfernen oder beibehalten als Option
```

---

### 12. About Page (client/src/pages/About.tsx)
**Status:** ⚠️ Investment-Beispiele

**Zeile ~80:** Items
```typescript
// ALT: "Anleihen & Immobilien", "Startups via SAFE Agreements", "Franchise-Modelle"
// NEU: Krisenberatungs-relevante Beispiele
```

**Zeile ~150:** Target Audience
```typescript
// ALT: "Immobilieninvestoren & Makler", "Projektentwickler"
// NEU: "Unternehmer in Krisen", "Geschäftsführer"
```

---

## 🟢 OPTIONAL - Nach Zeit

### 13. Test Files
**Status:** ℹ️ Test-Daten

- **server/invoice.test.ts (Zeile ~30):** `productName: "Handbuch für Immobilienprojektentwickler"` → Update
- **server/onboarding.test.ts (Zeile ~20):** `firmenname: 'Schmidt Immobilien'` → Update

---

### 14. Logo Files (client/public/)
**Status:** ℹ️ Prüfen ob relevant

Vorhandene Dateien:
- `NonDomGroupLogo25012025.png` ✅ (Non-Dom Group ist korrekt)
- `logo.svg` - Prüfen ob generisch oder spezifisch
- `nondom-logo.svg` - Wird referenziert in:
  - Team.tsx (Zeile 26, 452)
  - Shop.tsx (Zeile 145)
  - About.tsx (Zeile 25, 369)
  - Press.tsx (Zeile 64, 289)

**Aktion:** Kein Änderungsbedarf - Non-Dom Group Logo ist korrekt für das Mutterunternehmen

---

### 15. Favicon & Meta Tags (client/index.html)
**Status:** ✅ Bereits aktualisiert

**Zeile 9:** Title
```html
<!-- ✅ KORREKT -->
<title>Krisenberatung Portal - Unternehmensoptimierung</title>
```

**Fehlend:** Meta Description, OG Tags
```html
<!-- TODO: Hinzufügen -->
<meta name="description" content="Professionelle Krisenberatung für Unternehmen in Steuerkrise und Sanierung">
<meta property="og:title" content="Krisenberatung Portal">
<meta property="og:description" content="Ihr Partner für Unternehmenskrisen und Sanierung">
```

---

## 📊 Zusammenfassung

### Nach Priorität:
- **🔴 KRITISCH (5 Dateien):** emailService.ts, routers.ts, Home.tsx, Shop.tsx, AdminHandbuch.tsx
- **🟡 WICHTIG (8 Dateien):** FinanceCalculator.tsx, ROECalculator.tsx, Pipeline.tsx, MyCalendar.tsx, OnboardingData.tsx, Onboarding.tsx, About.tsx
- **🟢 OPTIONAL (3 Bereiche):** Test Files, Meta Tags, Logo-Prüfung

### Nach Typ:
- **URLs:** ~15 Stellen (portal.immoportal.app → neue URL)
- **Produktbeschreibungen:** ~8 Stellen (Immobilien/Private Debt → Krisenberatung)
- **Formular-Labels:** ~5 Stellen (Immobiliendaten → Unternehmensdaten)
- **Beispieltexte:** ~4 Stellen (Placeholder-Updates)

### Geschätzter Aufwand:
- **Phase 1 (Kritisch):** 2-3 Stunden
- **Phase 2 (Wichtig):** 2-3 Stunden
- **Phase 3 (Optional):** 1 Stunde

**Total:** ~6 Stunden für vollständigen Rebrand

---

## 🎯 Empfohlene Reihenfolge

1. ✅ **server/emailService.ts** - Wichtigster Kundenberührungspunkt
2. ✅ **client/src/pages/Home.tsx** - Haupteindruck für Besucher
3. ✅ **server/routers.ts** - Backend-Logik
4. ✅ **client/src/pages/AdminHandbuch.tsx** - Admin-Dokumentation
5. ⏳ **client/src/pages/Shop.tsx** - Verkaufsseite
6. ⏳ **Alle anderen Dateien** - Nach Bedarf

---

## 📝 Notizen

- **Domain noch unklar:** Viele URLs verweisen auf `portal.immoportal.app` - neue Domain muss festgelegt werden
- **Non-Dom Group:** Logo und Branding von Non-Dom Group kann bleiben (Mutterunternehmen)
- **Analytics IDs:** GTM-M4NPSD44 und G-VHCM7BKJ05 - prüfen ob diese IDs korrekt sind oder aktualisiert werden müssen
- **Meta Pixel:** FB Pixel ID 1031860691746550 - prüfen ob korrekt

---

**Erstellt mit Claude Code am 2026-01-14**
