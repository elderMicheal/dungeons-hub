# Dungeons Hub

Static campaign hub for dungeons.michealburford.com.

This is a lightweight HTML, CSS, and vanilla JavaScript site. It has no backend, build step, database, login system, or API integrations.

Repository: https://github.com/elderMicheal/dungeons-hub

## Edit Campaign Data

Update `data.js`.

Most campaign-facing content lives in the `SITE_DATA` object:

- `SITE_DATA.campaign`
- `SITE_DATA.party`
- `SITE_DATA.sessions`
- `SITE_DATA.rules`
- `SITE_DATA.campaignDetails`
- `SITE_DATA.help`

## Update Links

Edit `SITE_DATA.campaign.links`.

Unknown links should stay as `"#"`. The UI will show `Link not added yet` instead of sending users to a dead link.

Important link keys include:

- `discordInvite`
- `discordVoice`
- `discordSchedule`
- `discordRecaps`
- `dndBeyondCampaign`
- `dndBeyondRules`
- `owlbearRoom`
- `roll20Game`
- `githubRepo`
- `githubPages`
- `githubEditData`
- `githubEditReadme`
- `githubEditCname`

## Add Character

Add a new object to `SITE_DATA.party`.

Each character supports:

- `player`
- `character`
- `className`
- `level`
- `ancestry`
- `role`
- `ac`
- `hp`
- `passivePerception`
- `sheetUrl`
- `description`

## Add Session Recap

Add a new object to `SITE_DATA.sessions`.

Each recap supports:

- `number`
- `date`
- `title`
- `attended`
- `summary`
- `loot`
- `npcs`
- `questions`
- `nextObjective`

## Deploy

Push changes to the `main` branch. GitHub Pages will publish the site after Pages is enabled for the repository.

Recommended GitHub Pages setup:

1. Create or open the GitHub repository, for example `dungeons-hub`.
2. Push this static site to the `main` branch.
3. In GitHub, open Settings > Pages.
4. Set the source to deploy from the `main` branch and root folder.
5. Save the Pages settings and wait for the deployment to finish.

## Custom Domain

The `CNAME` file contains dungeons.michealburford.com.

DNS must point the `dungeons` subdomain to the static host.

For GitHub Pages, configure the `dungeons` DNS record according to GitHub Pages custom domain guidance, then confirm the custom domain in Settings > Pages.

## Local Preview

Because this is a static site, you can open `index.html` directly in a browser. For the closest GitHub Pages behavior, serve the folder with any simple static server.

Example:

```powershell
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/#home
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

## DM Admin Page

The `#admin` route is a static editing guide for the DM. It links to the GitHub repository and the most important files.

Because this is a static site with no login or backend, the admin page does not securely edit files in the browser. Normal updates should happen through GitHub commits.

## Notes

Anything committed to this static site can be viewed by anyone. Do not commit private Discord invites, personal contact information, or secrets unless that is acceptable for the group.
