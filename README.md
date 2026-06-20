# Dungeons Hub

Static D&D starter hub for dungeons.michealburford.com.

The public site is HTML, CSS, and vanilla JavaScript. It has no database, custom backend, user accounts, OAuth requirement, CMS service, or build step.

Repository: https://github.com/elderMicheal/dungeons-hub

## Admin Lite

Open:

```text
https://dungeons.michealburford.com/admin/
```

Admin Lite is a browser-only editor for public content files. It:

- loads JSON from `content/`,
- renders editable form fields,
- saves drafts in this browser with `localStorage`,
- downloads updated JSON files,
- never logs in,
- never talks to a backend,
- never publishes directly to GitHub.

This is intentional. A static site can read public files, but it cannot safely write back to the repository without OAuth, a backend, or a CMS service.

## Publish Edited Content

1. Open `/admin/`.
2. Choose a content file.
3. Edit the form fields.
4. Click `Save Draft Here` if you are still working.
5. Click `Download JSON` when ready.
6. Replace the matching file under `content/`.
7. Commit and push the repo.
8. GitHub Pages redeploys the public site.

## Editable Content

Public content lives in `content/`:

- `content/site-settings.json`
- `content/table-at-a-glance.json`
- `content/how-we-play.json`
- `content/character-creation.json`
- `content/tone-and-boundaries.json`
- `content/tools-and-links.json`
- `content/campaign-status.json`
- `content/help-and-glossary.json`
- `content/house-rules/index.json`
- `content/house-rules/rule-of-cool.json`
- `content/house-rules/roleplay-first.json`
- `content/sessions/index.json`
- `content/change-log/index.json`

The public site loads these files with `fetch()`. If content fails to load, the site keeps navigation visible and shows a friendly unavailable message.

## Update Links

Use Admin Lite:

```text
Tools and Links
```

Leave unknown links blank. The public UI shows `Link not added yet` instead of rendering dead `#` links.

## House Rules

Use Admin Lite:

```text
House Rules Index
House Rule: Rule of Cool
House Rule: Roleplay First
```

Mark old rules `Retired` instead of deleting them. The public Rules page shows active/revised rules by default and preserves the log data.

## Deploy

The current lightweight path is GitHub Pages:

```text
Push changes to main.
GitHub Pages publishes the static site.
```

No build command is required.

Netlify or Cloudflare Pages can also host the same files as a static site, but Admin Lite still cannot publish without adding an auth/write service.

## Custom Domain

The `CNAME` file contains:

```text
dungeons.michealburford.com
```

DNS for the `dungeons` subdomain must point to the selected static host.

## Local Preview

Run a static server from the repo root:

```powershell
python -m http.server 8017
```

Open:

```text
http://localhost:8017/#home
http://localhost:8017/admin/
```

## Routes

- `#home`
- `#start`
- `#tools`
- `#roles`
- `#rules`
- `#characters`
- `#campaign`
- `#sessions`
- `#help`
- `#admin`
- `#join`

## Public Content Security

Anything in this static site can be viewed by visitors.

Do not commit:

- secret DM notes,
- hidden monster notes,
- spoilers,
- private player information,
- API keys,
- tokens,
- passwords,
- GitHub credentials.

Version 1 has no DM-only secret fields.
