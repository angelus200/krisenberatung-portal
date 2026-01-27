# Partner-Logos einrichten

## Aktueller Status

Das Partner-Logo-System ist implementiert und funktionsfähig. Es gibt 3 Kategorien:
- **Presse** (Focus, Forbes)
- **Mitgliedschaften** (Swiss Startup Association, BAND Business Angels)
- **Auszeichnungen** (diind - Unternehmen der Zukunft)

## Problem: Platzhalter-URLs

Einige Logos verwenden temporäre URLs:
```typescript
{
  name: "diind - Unternehmen der Zukunft",
  imageUrl: "https://placehold.co/200x200/fbbf24/713f12?text=diind+Siegel",  // ❌ Platzhalter
}
```

## Lösung: Echte Logo-URLs verwenden

### Option 1: Logos auf S3 hochladen (empfohlen)

1. **Logos sammeln:**
   - Focus Logo (offiziell von Focus Media Group)
   - Forbes Logo (offiziell von Forbes)
   - Swiss Startup Association Logo
   - BAND Business Angels Logo
   - diind Urkunde/Siegel

2. **Zu S3 hochladen:**
   - Verwende den Admin-Bereich oder direkt S3
   - Ordner: `public/partner-logos/`
   - Format: PNG oder SVG (transparent)
   - Optimale Größe: 200x80px (Breite variabel, Höhe 80px)

3. **S3-URLs erhalten:**
   ```
   https://[bucket].s3.amazonaws.com/public/partner-logos/focus-logo.png
   https://[bucket].s3.amazonaws.com/public/partner-logos/forbes-logo.png
   etc.
   ```

4. **Seed-Script aktualisieren:**
   ```bash
   # Datei bearbeiten:
   nano scripts/seed-partner-logos.ts

   # URLs durch echte S3-URLs ersetzen
   ```

5. **Seed ausführen:**
   ```bash
   npx tsx scripts/seed-partner-logos.ts
   ```

### Option 2: Über Admin-Bereich (/admin/logos)

1. Zum Admin-Bereich navigieren: https://www.unternehmensoptimierung.app/admin/logos
2. Für jedes Logo:
   - "Bearbeiten" klicken
   - Neue Image URL eintragen
   - "Speichern"

### Option 3: Direkt in der Datenbank

```sql
UPDATE partner_logos
SET imageUrl = 'https://deine-s3-url.com/focus-logo.png'
WHERE name = 'FOCUS';

UPDATE partner_logos
SET imageUrl = 'https://deine-s3-url.com/forbes-logo.png'
WHERE name = 'Forbes';

-- etc.
```

## Checkliste

- [ ] Focus Logo hochgeladen und URL aktualisiert
- [ ] Forbes Logo hochgeladen und URL aktualisiert
- [ ] Swiss Startup Association Logo hochgeladen und URL aktualisiert
- [ ] BAND Business Angels Logo hochgeladen und URL aktualisiert
- [ ] diind Urkunde hochgeladen und URL aktualisiert
- [ ] Startseite überprüft - Logos werden korrekt angezeigt
- [ ] Mobile Ansicht getestet

## Lizenzhinweis

⚠️ **Wichtig:** Stelle sicher, dass du die Rechte hast, die Logos zu verwenden:
- Presse-Logos: Meist OK für "As seen in" Sections
- Mitgliedschafts-Logos: Normalerweise erlaubt für Mitglieder
- Auszeichnungs-Siegel: Prüfe die Nutzungsbedingungen

## Live-Test

Nach der Aktualisierung:
1. Startseite aufrufen: https://www.unternehmensoptimierung.app/
2. Trust-Badges-Section überprüfen
3. Alle Logos sollten korrekt geladen werden (keine Platzhalter)
4. Klick-Test: Links zu externen Seiten funktionieren

## Technische Details

**Datenbank-Tabelle:** `partner_logos`
**Schema:**
```typescript
{
  id: number;
  name: string;
  category: 'presse' | 'mitgliedschaft' | 'auszeichnung';
  imageUrl: string;
  linkUrl: string;
  sortOrder: number;
  isActive: boolean;
}
```

**Seed-Script:** `scripts/seed-partner-logos.ts`
**Migration:** `drizzle/0016_partner_logos.sql`
**Router:** `server/routers.ts` (partnerLogos-Router)
**Admin-Seite:** `client/src/pages/AdminLogos.tsx`
