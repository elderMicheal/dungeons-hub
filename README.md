# Dungeons Hub

Static player-facing D&D library and group ledger for `dungeons.michealburford.com`.

The site is plain HTML, CSS, and vanilla JavaScript. There is no backend, database, login system, build step, CMS service, OAuth flow, or custom API.

Repository: https://github.com/elderMicheal/dungeons-hub

## Site Structure

The root URL opens directly into:

```text
Apprentice Handbook -> Getting Your Bearings
```

The public site is organized into three volumes:

- `Apprentice Handbook` - player-facing D&D reference material.
- `The Party Ledger` - group status, announcements, roster, campaign, and sessions.
- `Table Operations` - public admin structure and future capability register.

These are physical page groups, not hash routes.

## Important Routes

```text
/
/handbook/
/handbook/getting-your-bearings/
/handbook/beginner/
/handbook/intermediate/
/handbook/expert/
/handbook/glossary/
/handbook/characters/
/handbook/tools/
/handbook/how-a-session-works/
/handbook/dice-and-rolls/

/ledger/
/ledger/announcements/
/ledger/status/
/ledger/roster/
/ledger/campaign/
/ledger/sessions/
/ledger/journal/
/ledger/characters/

/operations/
/operations/character-records/
/operations/player-records/
/operations/campaign-admin/
/operations/content-admin/
/operations/site-settings/
/operations/capabilities/
```

## Admin Lite

Open:

```text
https://dungeons.michealburford.com/admin/
```

Admin Lite remains a browser-only editor for public content files. It can save local drafts and download edited JSON files. It cannot publish directly to GitHub without adding authentication and a write service.

## Content Files

Public content and planning data lives under `content/`.

New volume metadata files:

- `content/handbook/index.json`
- `content/ledger/status.json`
- `content/operations/capabilities.json`

Existing public content files are still present for Admin Lite and future migration.

## Deploy

Push changes to `main`. GitHub Pages publishes the static files.

No build command is required.

## Local Preview

Run a static server from the repo root:

```powershell
python -m http.server 8017
```

Open:

```text
http://localhost:8017/
http://localhost:8017/handbook/glossary/
http://localhost:8017/ledger/
http://localhost:8017/operations/
```

## Custom Domain

The `CNAME` file contains:

```text
dungeons.michealburford.com
```

DNS for the `dungeons` subdomain must point to the selected static host.

## Public Content Security

Anything deployed with this static site can be viewed by visitors.

Do not commit:

- private contact information,
- Discord handles,
- passwords,
- API keys,
- account tokens,
- private DM notes,
- hidden encounters,
- unrevealed plot information,
- player information that has not been approved for public display.
