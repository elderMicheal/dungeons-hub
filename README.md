# Dungeons Hub

Static D&D starter hub for dungeons.michealburford.com.

The public site is HTML, CSS, and vanilla JavaScript. It has no database, custom backend, custom accounts, or build step.

Repository: https://github.com/elderMicheal/dungeons-hub

## Admin Editing

Open:

```text
https://dungeons.michealburford.com/admin/
```

Expected workflow:

1. Micheal or the DM opens `/admin/`.
2. They sign in with GitHub.
3. They edit a form section.
4. They click Publish.
5. Decap CMS commits JSON changes to `main`.
6. Netlify redeploys the static site.
7. The public site updates after deployment.

## Editable Content

Public content lives in `content/`:

- `content/table-at-a-glance.json`
- `content/how-we-play.json`
- `content/character-creation.json`
- `content/tone-and-boundaries.json`
- `content/tools-and-links.json`
- `content/campaign-status.json`
- `content/help-and-glossary.json`
- `content/house-rules/index.json`
- `content/sessions/index.json`
- `content/change-log/index.json`

The public site loads these files with `fetch()`. If content fails to load, the site keeps navigation visible and shows a friendly unavailable message.

## Update Links

Use the Decap CMS section:

```text
Tools & Links
```

Leave unknown links blank. The public UI shows `Link not added yet` instead of rendering dead `#` links.

## House Rules

Use the Decap CMS section:

```text
House Rules
```

Mark old rules `Retired` instead of deleting them. The public Rules page shows active/revised rules by default and preserves the log data.

## Netlify Setup

Use Netlify static deployment:

```text
Private GitHub repository
Netlify site connected to main branch
Publish directory: .
Build command: empty
Custom domain: dungeons.michealburford.com
```

Set up Netlify GitHub OAuth for Decap CMS. Only Micheal Burford and the Dungeon Master should have GitHub write access to the private repository.

## Custom Domain

The `CNAME` file contains:

```text
dungeons.michealburford.com
```

DNS for the `dungeons` subdomain must point to Netlify. Configure the custom domain in Netlify, then update DNS using the records Netlify provides.

## Local Preview

Run a static server from the repo root:

```powershell
python -m http.server 8017
```

Open:

```text
http://localhost:8017/#home
```

The admin page can be previewed at:

```text
http://localhost:8017/admin/
```

GitHub sign-in and publishing require the Netlify-hosted site and OAuth setup.

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
