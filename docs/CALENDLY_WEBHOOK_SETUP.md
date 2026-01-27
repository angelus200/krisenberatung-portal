# Calendly Webhook Setup

## Übersicht

Das Portal ist bereits vollständig für Calendly-Webhooks konfiguriert. Der Webhook-Endpunkt ist implementiert und wartet nur darauf, in Calendly registriert zu werden.

**Webhook-URL:** `https://www.unternehmensoptimierung.app/api/webhooks/calendly`

## Was macht der Webhook?

Wenn ein Kunde einen Termin über Calendly bucht, passiert Folgendes automatisch:
1. 📩 Calendly sendet eine Benachrichtigung an unseren Webhook
2. 💾 Das System speichert die Buchung in der Datenbank
3. 📧 Der Kunde erhält eine Bestätigungs-E-Mail
4. 👁️ Die Buchung erscheint im Admin-Bereich unter `/admin/bookings`

## Schritt-für-Schritt Anleitung

### Schritt 1: Calendly Dashboard öffnen

1. Gehe zu [Calendly Dashboard](https://calendly.com/app/user/me)
2. Melde dich mit deinem Calendly-Account an

### Schritt 2: Webhook-Einstellungen öffnen

1. Klicke auf dein Profil-Icon (oben rechts)
2. Wähle **"Integrations & Apps"**
3. Wähle **"API & Webhooks"**
4. Klicke auf den Tab **"Webhooks"**

Alternativ: Direkter Link
- **Account-Level Webhooks:** https://calendly.com/integrations/webhooks
- **Organization-Level Webhooks:** https://calendly.com/app/organization/webhooks

### Schritt 3: Neuen Webhook erstellen

1. Klicke auf **"Create Webhook"** oder **"Add webhook subscription"**
2. Gib einen Namen ein: `unternehmensoptimierung.app Portal`
3. Trage die Webhook-URL ein:
   ```
   https://www.unternehmensoptimierung.app/api/webhooks/calendly
   ```
4. Wähle folgende Events aus:
   - ✅ **invitee.created** (wenn jemand einen Termin bucht)
   - ✅ **invitee.cancelled** (optional - wenn jemand einen Termin absagt)
5. Klicke auf **"Create Webhook"**

### Schritt 4: Webhook testen

1. In Calendly: Klicke auf "Test webhook"
2. Wähle Event: **invitee.created**
3. Klicke auf "Send test"
4. Erwartetes Ergebnis: `200 OK` oder `{ "received": true }`

Alternativ: Buche einen echten Test-Termin
1. Öffne deinen Calendly-Link (z.B. https://calendly.com/dein-name)
2. Buche einen Termin mit einer Test-E-Mail
3. Prüfe im Portal unter `/admin/bookings`, ob die Buchung erscheint

### Schritt 5: Überprüfung

Nach erfolgreicher Registrierung solltest du:

✅ **Im Calendly Dashboard sehen:**
- Webhook ist "Active"
- Webhook-URL: `https://www.unternehmensoptimierung.app/api/webhooks/calendly`
- Event subscribed: `invitee.created`

✅ **Im Portal sehen:**
- Test-Buchung in `/admin/bookings`
- E-Mail-Benachrichtigung erhalten (falls aktiviert)

## Technische Details

### Webhook-Endpunkt
**URL:** `https://www.unternehmensoptimierung.app/api/webhooks/calendly`
**Method:** `POST`
**Content-Type:** `application/json`

### Request Format (von Calendly)
```json
{
  "event": "invitee.created",
  "payload": {
    "invitee": {
      "uri": "https://api.calendly.com/scheduled_events/xxx/invitees/yyy",
      "email": "kunde@example.com",
      "name": "Max Mustermann",
      "created_at": "2026-01-27T10:00:00.000000Z"
    },
    "event": {
      "uri": "https://api.calendly.com/scheduled_events/xxx",
      "name": "Beratungsgespräch",
      "start_time": "2026-02-01T14:00:00.000000Z",
      "end_time": "2026-02-01T15:00:00.000000Z"
    }
  }
}
```

### Response Format (vom Portal)
```json
{
  "received": true
}
```

### Fehlerbehandlung

**Customer nicht gefunden:**
```json
{
  "received": true,
  "warning": "Customer not found"
}
```

**Staff Calendar nicht gefunden:**
```json
{
  "received": true,
  "warning": "No matching staff calendar"
}
```

## Fehlerbehebung

### Problem: Webhook liefert 404 Not Found
**Lösung:**
- Stelle sicher, dass die URL korrekt ist (mit `https://` und ohne Slash am Ende)
- Prüfe, ob die Railway-App läuft

### Problem: Webhook liefert "Customer not found"
**Ursache:** Die E-Mail-Adresse des Buchenden ist nicht im System registriert.

**Lösung:**
- Kunde muss sich zuerst im Portal registrieren
- Dann kann er mit der gleichen E-Mail Termine buchen

### Problem: Webhook liefert "No matching staff calendar"
**Ursache:** Kein Staff Calendar mit matching Calendly-URL.

**Lösung:**
1. Gehe zu `/admin/my-calendar`
2. Erstelle einen Staff Calendar
3. Trage deine Calendly-URL ein (z.B. `https://calendly.com/dein-name/30min`)

### Problem: Buchungen erscheinen nicht im Admin-Bereich
**Check:**
1. Railway-Logs prüfen: `railway logs`
2. Suche nach `[Calendly Webhook]` in den Logs
3. Fehlermel dungen beachten

## Datenbank-Tabellen

**bookings**
```sql
- id (INT, Primary Key)
- customerId (INT, Foreign Key → users.id)
- staffCalendarId (INT, Foreign Key → staff_calendars.id)
- calendlyEventId (VARCHAR) -- Calendly Event URI
- calendlyInviteeId (VARCHAR) -- Calendly Invitee URI
- title (VARCHAR) -- "Beratungsgespräch"
- startTime (DATETIME)
- endTime (DATETIME)
- status (ENUM: confirmed, cancelled, completed, no_show)
- createdAt (DATETIME)
```

**staff_calendars**
```sql
- id (INT, Primary Key)
- userId (INT, Foreign Key → users.id)
- displayName (VARCHAR) -- "Thomas Gross"
- calendlyUrl (VARCHAR) -- "https://calendly.com/thomas-gross"
- isActive (BOOLEAN)
```

## Nützliche Links

- [Calendly Webhook Dokumentation](https://developer.calendly.com/api-docs/ZG9jOjM2MzE2MDM4-webhook-overview)
- [Calendly Event Types](https://developer.calendly.com/api-docs/ZG9jOjM2MzE2MDM5-webhook-events)
- [Calendly API Reference](https://developer.calendly.com/api-docs/ZG9jOjE-getting-started)

## Checkliste

- [ ] Calendly Dashboard geöffnet
- [ ] Webhook erstellt mit URL: `https://www.unternehmensoptimierung.app/api/webhooks/calendly`
- [ ] Event `invitee.created` ausgewählt
- [ ] Test-Webhook gesendet (200 OK erhalten)
- [ ] Test-Buchung durchgeführt
- [ ] Buchung erscheint in `/admin/bookings`
- [ ] E-Mail-Benachrichtigung funktioniert (optional)

---

**Status nach Setup:** ✅ Webhook aktiv und funktionsfähig
