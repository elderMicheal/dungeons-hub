const DATA = SITE_DATA;

const ROUTES = {
  home: renderHome,
  start: renderStart,
  tools: renderTools,
  roles: renderRoles,
  rules: renderRules,
  characters: renderCharacters,
  campaign: renderCampaign,
  sessions: renderSessions,
  help: renderHelp,
  admin: renderAdmin,
  join: renderJoin
};

const app = document.getElementById("app");
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const siteFooter = document.getElementById("siteFooter");

let rollHistory = [];

const ASSETS = {
  back: "assets/dungeons-asset-back.png",
  beyond: "assets/dungeons-asset-beyond.png",
  book: "assets/dungeons-asset-book.png",
  discord: "assets/dungeons-asset-discord.png",
  home: "assets/dungeons-asset-home.png",
  map: "assets/dungeons-asset-map.png",
  tools: "assets/dungeons-asset-tools.png",
  wizard: "assets/dungeons-asset-wizard.png"
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isRealLink(url) {
  return typeof url === "string" && url.trim() !== "" && url.trim() !== "#";
}

function campaignLink(key) {
  return DATA.campaign.links[key] || "#";
}

function assetUrl(key) {
  return ASSETS[key] || key || "";
}

function assetIcon(key, className = "asset-icon") {
  const src = assetUrl(key);
  if (!src) {
    return "";
  }

  return `<span class="${className}" aria-hidden="true"><img src="${escapeHtml(src)}" alt="" loading="lazy"></span>`;
}

function linkButton(label, url, className = "button") {
  const safeLabel = escapeHtml(label);
  if (!isRealLink(url)) {
    return `<span class="${className} button-disabled" aria-disabled="true"><span>${safeLabel}</span><small>Link not added yet</small></span>`;
  }

  return `<a class="${className}" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${safeLabel}</a>`;
}

function routeButton(label, route, className = "button") {
  return `<a class="${className}" href="#${escapeHtml(route)}">${escapeHtml(label)}</a>`;
}

function responsiveFooterLink(label, shortLabel, url) {
  if (!isRealLink(url)) {
    return `<span class="footer-link button-disabled" aria-disabled="true"><span>${escapeHtml(shortLabel)}</span><small>Link not added yet</small></span>`;
  }

  return `
    <a class="footer-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(label)}">
      <span class="footer-label-wide">${escapeHtml(label)}</span>
      <span class="footer-label-short">${escapeHtml(shortLabel)}</span>
    </a>
  `;
}

function renderSiteFooter() {
  if (!siteFooter) {
    return;
  }

  siteFooter.innerHTML = `
    <div class="footer-copy">
      <strong>Dungeons Hub</strong>
      <span>Micheal's D&D starter launchpad.</span>
    </div>
    <nav class="footer-links" aria-label="Footer links">
      ${linkButton("Repo", campaignLink("githubRepo"), "footer-link")}
      ${routeButton("Admin", "admin", "footer-link")}
      ${responsiveFooterLink("www.michealburford.com", "Micheal", campaignLink("michealHome"))}
    </nav>
  `;
}

function pageHeader(title, text) {
  return `
    <section class="page-hero">
      <p class="eyebrow">Dungeons Hub</p>
      <h1>${escapeHtml(title)}</h1>
      ${text ? `<p>${escapeHtml(text)}</p>` : ""}
    </section>
  `;
}

function renderStartHero() {
  return `
    <section class="page-hero start-page-hero">
      <div class="start-hero-copy">
        <p class="eyebrow">Start here, brave fool</p>
        <h1>Start Here</h1>
        <p>A step-by-step beginner guide for people coming in completely blind to D&D or tabletop RPGs.</p>
        <div class="start-hero-chips" aria-label="What this guide covers">
          <span>${assetIcon("book", "mini-icon")} What D&D is</span>
          <span>${assetIcon("wizard", "mini-icon")} How characters work</span>
          <span>${assetIcon("tools", "mini-icon")} What to click first</span>
        </div>
      </div>
      <img class="start-hero-wizard" src="${escapeHtml(ASSETS.wizard)}" alt="" aria-hidden="true" loading="eager">
    </section>
  `;
}

function stat(label, value) {
  return `
    <span class="stat">
      <small>${escapeHtml(label)}</small>
      <strong>${escapeHtml(value)}</strong>
    </span>
  `;
}

function listItems(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function latestSession() {
  return DATA.sessions[DATA.sessions.length - 1];
}

function renderRoute() {
  const route = (window.location.hash || "#home").replace(/^#\/?/, "") || "home";
  const normalized = ROUTES[route] ? route : "home";

  if (route !== normalized) {
    window.location.hash = normalized;
    return;
  }

  app.innerHTML = ROUTES[normalized]();
  document.querySelectorAll("[data-route-link]").forEach((link) => {
    const isActive = link.dataset.routeLink === normalized;
    link.classList.toggle("is-active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
  siteNav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  app.focus({ preventScroll: true });

  if (normalized === "help") {
    setupGlossarySearch();
  }
}

function renderHome() {
  if (DATA.siteStatus && DATA.siteStatus.campaignActive) {
    return renderCampaignDashboardHome();
  }

  return renderStarterHome();
}

function renderStarterHome() {
  const home = DATA.starterHome;
  const primaryLinks = DATA.quickLinks.slice(0, 5);

  return `
    <section class="starter-hero">
      <div class="hero-copy">
        <p class="eyebrow">Gather the party</p>
        <h1>${escapeHtml(home.hero.title)}</h1>
        <h2>${escapeHtml(home.hero.subtitle)}</h2>
        <p>${escapeHtml(home.hero.intro)}</p>
      </div>
      <img class="hero-wizard" src="${escapeHtml(ASSETS.wizard)}" alt="" aria-hidden="true" loading="eager">
      <div class="hero-actions" aria-label="First actions">
        ${primaryLinks.map(renderQuickLinkCard).join("")}
      </div>
    </section>

    <section class="starter-grid">
      <article class="panel intro-card">
        ${assetIcon("home", "panel-art")}
        <p class="eyebrow">What this is</p>
        <h2>Your D&D clubhouse</h2>
        <p>${escapeHtml(home.whatThisIs)}</p>
      </article>

      <article class="panel parchment-card">
        ${assetIcon("book", "panel-art")}
        <p class="eyebrow">Before your first session</p>
        <h2>What you need</h2>
        <ol class="check-list">
          ${home.whatYouNeed.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ol>
        <p>${escapeHtml(home.optionalNeed)}</p>
      </article>

      <article class="panel parchment-card">
        ${assetIcon("book", "panel-art")}
        <p class="eyebrow">Start here, brave fool</p>
        <h2>New player quick start</h2>
        <ol class="check-list">
          ${home.quickStart.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ol>
        ${routeButton("Open Start Here", "start", "button button-small")}
      </article>

      <article class="panel no-campaign-card">
        ${assetIcon("map", "panel-art")}
        <p class="eyebrow">Not started yet</p>
        <h2>${escapeHtml(home.noCampaign.title)}</h2>
        <p>${escapeHtml(home.noCampaign.text)}</p>
        <div class="future-mini-grid">
          ${DATA.futureLinks.slice(0, 4).map((item) => `
            <a href="#${escapeHtml(item.route)}" class="future-mini-link">
              ${assetIcon(item.icon, "mini-icon")}
              <strong>${escapeHtml(item.label)}</strong>
              <span>${escapeHtml(item.description)}</span>
            </a>
          `).join("")}
        </div>
      </article>

      <article class="panel wide-panel">
        <p class="eyebrow">New to D&D?</p>
        <h2>Quick help</h2>
        <div class="help-tile-grid">
          ${home.quickHelp.map((item) => `
            <a class="help-tile" href="#${escapeHtml(item.route)}">
              ${assetIcon(item.icon, "mini-icon")}
              <strong>${escapeHtml(item.title)}</strong>
              <span>${escapeHtml(item.text)}</span>
            </a>
          `).join("")}
        </div>
      </article>

      <article class="panel wide-panel tools-preview-card">
        <p class="eyebrow">Tools of the trade</p>
        <h2>What we will use</h2>
        <div class="tool-preview-grid">
          ${home.toolsPreview.map((tool) => `
            <article>
              ${assetIcon(tool.icon, "mini-icon")}
              <h3>${escapeHtml(tool.title)}</h3>
              <p>${escapeHtml(tool.text)}</p>
              ${tool.route ? routeButton("Learn More", tool.route, "button button-small button-secondary") : linkButton("Open", campaignLink(tool.linkKey), "button button-small button-secondary")}
            </article>
          `).join("")}
        </div>
      </article>

      <article class="panel coming-later-card">
        ${assetIcon("map", "panel-art")}
        <p class="eyebrow">Coming later</p>
        <h2>Campaign tools unlock when we begin adventuring</h2>
        <ul class="coming-list">
          ${home.comingLater.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </article>

      <article class="panel source-card">
        ${assetIcon("tools", "panel-art")}
        <p class="eyebrow">For Micheal / DM</p>
        <h2>Edit the hub</h2>
        <p>Static admin links live here without making the visitor navigation feel like a control panel.</p>
        <div class="button-stack">
          ${routeButton("DM Admin", "admin", "button button-small button-secondary")}
          ${linkButton("GitHub Repo", campaignLink("githubRepo"), "button button-small button-secondary")}
        </div>
      </article>
    </section>
  `;
}

function renderCampaignDashboardHome() {
  const campaign = DATA.campaign;
  const next = campaign.nextSession;
  const recap = latestSession();
  const mapUrl = campaignLink("owlbearRoom");
  const iframeSrc = isRealLink(mapUrl) ? mapUrl : "about:blank";

  return `
    <section class="dashboard-hero">
      <div>
        <p class="eyebrow">Next game</p>
        <h1>${escapeHtml(campaign.name)}</h1>
        <p>${escapeHtml(campaign.tagline)}</p>
      </div>
      <div class="session-chip" aria-label="Next session">
        <strong>${escapeHtml(next.date)}</strong>
        <span>${escapeHtml(next.time)} - ${escapeHtml(next.status)}</span>
      </div>
    </section>

    <section class="quick-actions" aria-label="Game night links">
      ${linkButton("Join Voice", campaignLink("discordVoice"))}
      ${linkButton("D&D Beyond Campaign", campaignLink("dndBeyondCampaign"))}
      ${linkButton("Join Discord", campaignLink("discordInvite"), "button button-secondary")}
      ${linkButton("GitHub Repo", campaignLink("githubRepo"), "button button-secondary")}
      ${routeButton("Need Help?", "help", "button button-secondary")}
    </section>

    <section class="quick-link-grid" aria-label="Quick tool links">
      ${DATA.quickLinks.map(renderQuickLinkCard).join("")}
    </section>

    <section class="dashboard-grid">
      <article class="panel map-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Map</p>
            <h2>Game Map</h2>
          </div>
          ${linkButton("Open Map in New Tab", mapUrl, "button button-small")}
        </div>
        <div class="map-frame">
          <iframe src="${escapeHtml(iframeSrc)}" title="Game Map" allow="fullscreen"></iframe>
          ${isRealLink(mapUrl) ? "" : `<div class="map-placeholder"><strong>Map link not added yet</strong><span>Add the Owlbear room URL in data.js.</span></div>`}
        </div>
        <p class="help-text">If the panel does not load, open it directly.</p>
      </article>

      <aside class="panel party-panel">
        <p class="eyebrow">Party</p>
        <h2>Level ${escapeHtml(campaign.partyLevel)} Party</h2>
        <div class="quick-card-list">
          ${DATA.party.map(renderCompactCharacterCard).join("")}
        </div>
      </aside>

      <article class="panel">
        <p class="eyebrow">Next Session</p>
        <h2>${escapeHtml(next.location)}</h2>
        <div class="stat-grid">
          ${stat("Date", next.date)}
          ${stat("Time", next.time)}
          ${stat("Status", next.status)}
        </div>
      </article>

      <article class="panel">
        <p class="eyebrow">Current Quest</p>
        <h2>What matters now</h2>
        <p>${escapeHtml(campaign.currentQuest)}</p>
      </article>

      <article class="panel">
        <p class="eyebrow">Latest Recap</p>
        <h2>Session ${escapeHtml(recap.number)}: ${escapeHtml(recap.title)}</h2>
        <ul class="clean-list">${listItems(recap.summary.slice(0, 3))}</ul>
        ${routeButton("Read Sessions", "sessions", "button button-small")}
      </article>

      <article class="panel help-card">
        <p class="eyebrow">Need Help?</p>
        <h2>Start here if you are new</h2>
        <div class="button-stack">
          ${routeButton("Help", "help", "button button-small")}
          ${routeButton("Start Here", "start", "button button-small button-secondary")}
          ${routeButton("Tools", "tools", "button button-small button-secondary")}
          ${routeButton("Rules", "rules", "button button-small button-secondary")}
        </div>
      </article>

      <article class="panel">
        <p class="eyebrow">DM</p>
        <h2>Editing and source</h2>
        <p>Use DM Admin for static edit links, file ownership notes, and the GitHub repository link.</p>
        <div class="button-stack">
          ${routeButton("Open DM Admin", "admin", "button button-small")}
          ${linkButton("GitHub Repo", campaignLink("githubRepo"), "button button-small button-secondary")}
        </div>
      </article>

      ${renderDiceRoller()}
      ${renderInitiativeTracker()}

      <article class="panel">
        <p class="eyebrow">Quick Rules</p>
        <h2>Table basics</h2>
        <ul class="clean-list">
          ${listItems(DATA.rules.tableRules.slice(0, 4))}
        </ul>
        ${routeButton("Open Rules", "rules", "button button-small")}
      </article>
    </section>
  `;
}

function renderQuickLinkCard(item) {
  const variant = item.variant ? ` quick-link-${escapeHtml(item.variant)}` : "";
  const attention = item.route === "start" ? " quick-link-attention" : "";
  const href = item.route ? `#${escapeHtml(item.route)}` : escapeHtml(campaignLink(item.linkKey));
  const isExternal = !item.route;

  if (!item.route && !isRealLink(campaignLink(item.linkKey))) {
    return `
      <article class="quick-link-card quick-link-disabled${variant}${attention}" aria-disabled="true">
        ${assetIcon(item.icon)}
        <div>
          <strong>${escapeHtml(item.label)}</strong>
          <span class="quick-link-description">${escapeHtml(item.description)}</span>
        </div>
        <span class="quick-card-action">Link not added yet</span>
      </article>
    `;
  }

  return `
    <a class="quick-link-card${variant}${attention}" href="${href}"${isExternal ? ' target="_blank" rel="noopener noreferrer"' : ""}>
      ${assetIcon(item.icon)}
      <div>
        <strong>${escapeHtml(item.label)}</strong>
        <span class="quick-link-description">${escapeHtml(item.description)}</span>
      </div>
      <span class="quick-card-action">Open</span>
    </a>
  `;
}

function renderCompactCharacterCard(character) {
  return `
    <article class="quick-character">
      <div>
        <strong>${escapeHtml(character.character)}</strong>
        <span>${escapeHtml(character.player)}</span>
      </div>
      <span>${escapeHtml(character.className)} ${escapeHtml(character.level)}</span>
      <span>${escapeHtml(character.role)}</span>
    </article>
  `;
}

function renderCharacterCard(character) {
  return `
    <article class="character-card">
      <div class="card-topline">
        <p class="eyebrow">${escapeHtml(character.player)}</p>
        <span>${escapeHtml(character.role)}</span>
      </div>
      <h2>${escapeHtml(character.character)}</h2>
      <p>${escapeHtml(character.description)}</p>
      <div class="stat-grid">
        ${stat("Class", `${character.className} ${character.level}`)}
        ${stat("Species", character.ancestry)}
        ${stat("AC", character.ac)}
        ${stat("HP", character.hp)}
        ${stat("Passive", character.passivePerception)}
      </div>
      ${linkButton("Open D&D Beyond Sheet", character.sheetUrl, "button button-small")}
    </article>
  `;
}

function renderStartLesson(lesson) {
  return `
    <article class="panel start-lesson">
      <h2>${escapeHtml(lesson.title)}</h2>
      <p>${escapeHtml(lesson.summary)}</p>
      <ul class="clean-list">
        ${(lesson.points || []).map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
      </ul>
      ${lesson.example ? `<div class="example-box"><strong>Example</strong><p>${escapeHtml(lesson.example)}</p></div>` : ""}
    </article>
  `;
}

function renderPhraseCard(item) {
  return `
    <article class="phrase-card">
      <strong>${escapeHtml(item.situation)}</strong>
      <p>${escapeHtml(item.phrase)}</p>
    </article>
  `;
}

function renderGuideCard(item) {
  return `
    <article class="definition-card">
      <h3>${escapeHtml(item.name || item.title || item.label)}</h3>
      <p>${escapeHtml(item.text || item.description)}</p>
    </article>
  `;
}

function renderReferenceCard(item) {
  return `
    <article class="reference-card">
      <p class="eyebrow">${escapeHtml(item.type)}</p>
      <h3>${escapeHtml(item.label)}</h3>
      <p>${escapeHtml(item.description)}</p>
      ${linkButton("Open Reference", item.url, "button button-small button-secondary")}
    </article>
  `;
}

function renderTableStrip() {
  return `
    <section class="table-strip" aria-label="How we play here">
      <div>
        <p class="eyebrow">How We Play Here</p>
        <strong>${escapeHtml(DATA.ourTable.compact)}</strong>
      </div>
      ${routeButton("Read Table Rules", "rules", "button button-small button-secondary")}
    </section>
  `;
}

function renderOurTableSection(section) {
  return `
    <article class="definition-card table-rule-card">
      <h3>${escapeHtml(section.title)}</h3>
      ${(section.text || []).map((item) => `<p>${escapeHtml(item)}</p>`).join("")}
      ${(section.bullets || []).length ? `<ul class="clean-list">${listItems(section.bullets)}</ul>` : ""}
    </article>
  `;
}

function renderOurTableSummary() {
  return `
    <article id="our-table" class="panel wide-panel our-table-panel">
      ${assetIcon("home", "panel-art")}
      <p class="eyebrow">Table-specific source of truth</p>
      <h2>${escapeHtml(DATA.ourTable.title)}</h2>
      <p>${escapeHtml(DATA.ourTable.intro)}</p>
      <div class="table-tag-list" aria-label="Table at a glance">
        ${DATA.ourTable.atGlance.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
      </div>
    </article>
  `;
}

function renderDndBeyondPreflight() {
  const preflight = DATA.ourTable.dndBeyondPreflight;

  return `
    <article id="dnd-beyond-preflight" class="panel table-preflight-card wide-panel" tabindex="-1">
      ${assetIcon("beyond", "panel-art")}
      <p class="eyebrow">Before D&D Beyond</p>
      <h2>${escapeHtml(preflight.title)}</h2>
      <p>${escapeHtml(preflight.intro)}</p>
      <ol class="step-list big-steps">
        ${preflight.steps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ol>
      <div class="button-row">
        ${linkButton("Open D&D Beyond Builder", campaignLink("dndBeyondBuilder"), "button button-small")}
        ${routeButton("Read Table Rules", "rules", "button button-small button-secondary")}
      </div>
    </article>
  `;
}

function renderHouseRuleLog(entries) {
  return `
    <div class="table-scroll">
      <table class="guide-table house-rule-log">
        <thead>
          <tr>
            <th scope="col">Rule name</th>
            <th scope="col">What it changes</th>
            <th scope="col">Why</th>
            <th scope="col">Date added</th>
            <th scope="col">Status</th>
            <th scope="col">Example</th>
          </tr>
        </thead>
        <tbody>
          ${entries.map((entry) => `
            <tr>
              <th scope="row">${escapeHtml(entry.name)}</th>
              <td>${escapeHtml(entry.changes)}</td>
              <td>${escapeHtml(entry.why)}</td>
              <td>${escapeHtml(entry.dateAdded)}</td>
              <td><span class="status-pill">${escapeHtml(entry.status)}</span></td>
              <td>${escapeHtml(entry.example)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderCreationTimeline(steps) {
  return `
    <ol class="creation-timeline" aria-label="Character creation timeline">
      ${steps.map((step, index) => `
        <li>
          <span class="timeline-badge">${index + 1}</span>
          <div>
            <h3>${escapeHtml(step.title.replace(/^\d+\.\s*/, ""))}</h3>
            <p>${escapeHtml(step.text)}</p>
          </div>
        </li>
      `).join("")}
    </ol>
  `;
}

function renderRaceTable(rows) {
  return `
    <div class="table-scroll">
      <table class="guide-table">
        <thead>
          <tr>
            <th scope="col">Race / Species</th>
            <th scope="col">Plain-English Summary</th>
            <th scope="col">Good For</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => `
            <tr>
              <th scope="row">${escapeHtml(row.name)}</th>
              <td>${escapeHtml(row.summary)}</td>
              <td>${escapeHtml(row.beginnerUse)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderClassTable(rows) {
  return `
    <div class="table-scroll">
      <table class="guide-table">
        <thead>
          <tr>
            <th scope="col">Class</th>
            <th scope="col">Role</th>
            <th scope="col">Beginner Note</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => `
            <tr>
              <th scope="row">${escapeHtml(row.name)}</th>
              <td>${escapeHtml(row.role)}</td>
              <td>${escapeHtml(row.beginnerNote)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderExampleCharacterTable(rows) {
  const statKeys = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

  return `
    <div class="table-scroll">
      <table class="guide-table character-template-table">
        <thead>
          <tr>
            <th scope="col">Template</th>
            <th scope="col">Race / Class</th>
            ${statKeys.map((key) => `<th scope="col">${key}</th>`).join("")}
            <th scope="col">HP</th>
            <th scope="col">AC</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => `
            <tr>
              <th scope="row">
                ${escapeHtml(row.name)}
                <span>${escapeHtml(row.description)}</span>
              </th>
              <td>${escapeHtml(`${row.race} ${row.className} ${row.level}`)}</td>
              ${statKeys.map((key) => `<td>${escapeHtml(row.stats[key])}</td>`).join("")}
              <td>${escapeHtml(row.hp)}</td>
              <td>${escapeHtml(row.ac)}</td>
              <td>${escapeHtml(row.role)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderStart() {
  const start = DATA.start;
  const creation = start.characterCreation;

  return `
    ${renderStartHero()}
    ${renderTableStrip()}
    <section class="start-guide">
      <article class="panel wide-panel">
        ${assetIcon("book", "panel-art")}
        <p class="eyebrow">Start here, brave fool</p>
        <h2>What this game is</h2>
        ${start.intro.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}
      </article>

      <article class="panel parchment-card wide-panel">
        ${assetIcon("home", "panel-art")}
        <p class="eyebrow">The big idea</p>
        <h2>${escapeHtml(start.bigIdea.title)}</h2>
        <p>${escapeHtml(start.bigIdea.text)}</p>
      </article>

      <article class="panel wide-panel">
        ${assetIcon("tools", "panel-art")}
        <h2>The basic play loop</h2>
        <ol class="step-list big-steps">
          ${start.coreLoop.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ol>
      </article>

      <article class="panel parchment-card wide-panel">
        ${assetIcon("wizard", "panel-art")}
        <p class="eyebrow">Character creation</p>
        <h2>How a character is created</h2>
        <p>${escapeHtml(creation.note)}</p>
        <div class="button-row">
          ${routeButton("Read How We Play Here", "rules", "button button-small")}
          <button class="button button-small button-secondary" type="button" data-scroll-target="dnd-beyond-preflight">D&D Beyond Preflight</button>
          <button class="button button-small button-secondary" type="button" data-scroll-target="premade-characters">Use This Premade</button>
        </div>
      </article>

      <article class="panel wide-panel">
        <h2>Fundamental rules before you build</h2>
        <ul class="clean-list two-column-list">
          ${creation.fundamentalGuidelines.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </article>

      <article class="panel wide-panel">
        <h2>Ask the DM first</h2>
        <p>These questions prevent wasted work and help the whole party fit the same game.</p>
        <ul class="clean-list two-column-list">
          ${creation.dmQuestions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </article>

      <article class="panel wide-panel">
        <h2>Character creation step by step</h2>
        ${renderCreationTimeline(creation.creationSteps)}
      </article>

      <article class="panel wide-panel">
        <h2>The pieces of a character</h2>
        <p>A finished character is a stack of choices. Some are rules choices, some are roleplaying choices, and all of them should be easy for the DM to approve.</p>
        <div class="definition-grid">
          ${creation.characterParts.map(renderGuideCard).join("")}
        </div>
      </article>

      <article class="panel wide-panel">
        <h2>Common races and species at a glance</h2>
        <p>${escapeHtml(creation.summaryNote)}</p>
        ${renderRaceTable(creation.raceSummaries)}
      </article>

      <article class="panel wide-panel">
        <h2>Common classes at a glance</h2>
        <p>Class is the biggest mechanical choice. It controls your main tools, combat rhythm, and level-up path.</p>
        ${renderClassTable(creation.classSummaries)}
      </article>

      <article class="panel wide-panel">
        <h2>Key traits and concepts</h2>
        <p>These terms show up constantly while building and playing a character.</p>
        <dl class="definition-grid">
          ${creation.keyConcepts.map((item) => `
            <div class="definition-card">
              <dt>${escapeHtml(item.term)}</dt>
              <dd>${escapeHtml(item.definition)}</dd>
            </div>
          `).join("")}
        </dl>
      </article>

      <article class="panel wide-panel">
        <h2>Ability scores in plain language</h2>
        <p>Ability scores are the six core stats. Most rolls connect back to one of these.</p>
        <div class="definition-grid">
          ${creation.abilityScores.map(renderGuideCard).join("")}
        </div>
      </article>

      <article class="panel wide-panel">
        <h2>Classes / professions</h2>
        <p>Your class is your main rule package and adventuring profession. It affects how you fight, solve problems, survive danger, and grow when you level up.</p>
        <div class="definition-grid">
          ${creation.classes.map(renderGuideCard).join("")}
        </div>
      </article>

      <article class="panel wide-panel">
        <h2>Species, race, and ancestry</h2>
        <p>Different sources use different terms. Older D&D material often says race, newer D&D material often says species, and other RPGs may say ancestry. The DM decides which options fit the table.</p>
        <div class="definition-grid">
          ${creation.species.map(renderGuideCard).join("")}
        </div>
      </article>

      <article class="panel">
        <h2>Backgrounds</h2>
        <div class="quick-card-list">
          ${creation.backgrounds.map(renderGuideCard).join("")}
        </div>
      </article>

      <article class="panel">
        <h2>Traits, features, flaws, and feats</h2>
        <div class="quick-card-list">
          ${creation.traits.map(renderGuideCard).join("")}
        </div>
      </article>

      ${renderDndBeyondPreflight()}

      <article class="panel parchment-card">
        <h2>Build it in D&D Beyond</h2>
        <ol class="step-list">
          ${creation.dndBeyondSteps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ol>
        ${linkButton("Open D&D Beyond Character Builder", campaignLink("dndBeyondBuilder"), "button button-small")}
      </article>

      <article class="panel">
        <h2>Beginner build advice</h2>
        <ul class="clean-list">
          ${creation.beginnerBuildAdvice.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </article>

      <article id="premade-characters" class="panel wide-panel" tabindex="-1">
        <h2>Premade example characters</h2>
        <p>Use these as examples, not locked-in lore. The DM can approve one, adjust numbers, or turn one into a D&D Beyond sheet.</p>
        ${renderExampleCharacterTable(creation.exampleCharacters)}
      </article>

      <article class="panel wide-panel">
        <h2>Before We Begin: Session Zero</h2>
        <p>Session Zero is the setup conversation before a campaign starts. It keeps expectations, tone, tools, and character rules clear.</p>
        <div class="quick-card-list">
          ${creation.sessionZeroChecklist.map((item) => `
            <article class="definition-card">
              <h3>${escapeHtml(item.topic)}</h3>
              <p>${escapeHtml(item.text)}</p>
            </article>
          `).join("")}
        </div>
      </article>

      <article class="panel wide-panel">
        <h2>Helpful links</h2>
        <p>Use these when you want more detail. Official rules settle rule questions. Community guides are helpful, but the DM still decides what applies at this table.</p>
        <div class="reference-grid">
          ${creation.references.map(renderReferenceCard).join("")}
        </div>
      </article>

      <section class="lesson-grid" aria-label="Beginner lessons">
        ${start.lessons.map(renderStartLesson).join("")}
      </section>

      <article class="panel">
        <h2>Useful phrases when you are new</h2>
        <p>These are normal things to say at the table. You are not slowing the game down by asking clear questions.</p>
        <div class="phrase-grid">
          ${start.commonPhrases.map(renderPhraseCard).join("")}
        </div>
      </article>

      <article class="panel">
        <h2>Table mindset</h2>
        <ul class="clean-list">
          ${start.tableMindset.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </article>

      <article class="panel parchment-card">
        <h2>Before your first session</h2>
        <ol class="step-list">
          ${start.checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ol>
      </article>

      <article class="panel">
        <h2>Next places to click</h2>
        <p>Use these when you are done with the beginner walkthrough.</p>
        <div class="button-row">
          ${routeButton("Open Help / Glossary", "help", "button button-small")}
          ${routeButton("Tools Guide", "tools", "button button-small button-secondary")}
          ${routeButton("Table Rules", "rules", "button button-small button-secondary")}
        </div>
      </article>

      <article class="panel">
        <h2>Your first move</h2>
        <p>When you are unsure what to do, say what your character wants. Examples: "I look for tracks," "I ask the guard what happened," or "I stand between the monster and the wizard."</p>
        ${routeButton("Open Help", "help", "button button-small")}
      </article>
    </section>
  `;
}

function renderTools() {
  return `
    ${pageHeader("Tools", "How this group uses D&D Beyond, Discord, Owlbear Rodeo, and optional Roll20.")}
    <section class="card-grid">
      ${DATA.tools.map((tool) => `
        <article class="panel tool-card">
          <p class="eyebrow">Tool</p>
          <h2>${escapeHtml(tool.name)}</h2>
          <dl class="info-list">
            <dt>What it is</dt>
            <dd>${escapeHtml(tool.what)}</dd>
            <dt>What players use it for</dt>
            <dd>${escapeHtml(tool.playersUse)}</dd>
            <dt>What the DM uses it for</dt>
            <dd>${escapeHtml(tool.dmUse)}</dd>
          </dl>
          ${linkButton(tool.buttonLabel, campaignLink(tool.linkKey), "button button-small")}
        </article>
      `).join("")}
    </section>
  `;
}

function renderRoles() {
  return `
    ${pageHeader("Roles", "People roles and character roles, without assuming rigid MMO-style jobs.")}
    <section class="content-grid">
      <article class="panel wide-panel">
        <h2>People at the table</h2>
        <div class="definition-grid">
          ${DATA.roles.people.map(renderDefinition).join("")}
        </div>
      </article>
      <article class="panel wide-panel">
        <h2>Character roles</h2>
        <p>${escapeHtml(DATA.roles.note)}</p>
        <div class="definition-grid">
          ${DATA.roles.characters.map(renderDefinition).join("")}
        </div>
      </article>
    </section>
  `;
}

function renderRules() {
  return `
    ${pageHeader("Rules", "Who makes which rules, what the table expects, and how tools should be used.")}
    <section class="content-grid">
      ${renderOurTableSummary()}
      <article class="panel wide-panel">
        <h2>Table Rules in Detail</h2>
        <div class="definition-grid">
          ${DATA.ourTable.sections.map(renderOurTableSection).join("")}
        </div>
      </article>
      <article class="panel parchment-card wide-panel">
        ${assetIcon("beyond", "panel-art")}
        <p class="eyebrow">Character creation rules</p>
        <h2>What to Do Next</h2>
        <ol class="step-list">
          ${DATA.ourTable.nextSteps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ol>
      </article>
      <article class="panel">
        <h2>Official Rules</h2>
        <ul class="clean-list">${listItems(DATA.rules.official)}</ul>
        ${linkButton("Open Rules Reference", campaignLink("dndBeyondRules"), "button button-small")}
      </article>
      <article class="panel">
        <h2>DM Rulings</h2>
        <ul class="clean-list">${listItems(DATA.rules.dmRulings)}</ul>
      </article>
      <article class="panel wide-panel">
        <h2>House Rules</h2>
        <div class="definition-grid">
          ${DATA.rules.houseRules.map((rule) => renderDefinition({ name: rule.title, text: rule.text })).join("")}
        </div>
      </article>
      <article class="panel wide-panel">
        <h2>House Rule Log</h2>
        <p>The House Rule Log is the final reference for local rule changes. Proposed items are not active until the DM says so.</p>
        ${renderHouseRuleLog(DATA.ourTable.houseRuleLog)}
      </article>
      <article class="panel">
        <h2>Table Rules</h2>
        <ul class="clean-list">${listItems(DATA.rules.tableRules)}</ul>
      </article>
      <article class="panel">
        <h2>Tool Rules</h2>
        <ul class="clean-list">${listItems(DATA.rules.toolRules)}</ul>
      </article>
      <article class="panel wide-panel">
        <h2>Learn More</h2>
        <p>Outside guides can help explain tools and concepts, but they do not override this table's rules.</p>
        <div class="reference-grid">
          ${DATA.ourTable.learnMore.map(renderReferenceCard).join("")}
        </div>
      </article>
    </section>
  `;
}

function renderCharacters() {
  if (!DATA.siteStatus.campaignActive) {
    return renderComingLaterPage(
      "Characters Coming Later",
      "There is no active party yet. Once the campaign starts, this page will show player characters, D&D Beyond sheet links, roles, AC, HP, and short summaries.",
      ["Party roster", "Character sheet links", "Player names", "Class and role summaries"]
    );
  }

  return `
    ${pageHeader("Characters", "Party roster cards edited from data.js.")}
    <section class="character-grid">
      ${DATA.party.map(renderCharacterCard).join("")}
    </section>
  `;
}

function renderCampaign() {
  if (!DATA.siteStatus.campaignActive) {
    return renderComingLaterPage(
      "Campaign Area - Not Started Yet",
      "No campaign has started yet. We are setting up the table, tools, and starter guide first. Campaign notes, maps, quests, NPCs, and open questions will live here later.",
      DATA.starterHome.comingLater
    );
  }

  const campaign = DATA.campaignDetails;
  return `
    ${pageHeader(DATA.campaign.name, DATA.campaign.tagline)}
    <section class="content-grid">
      <article class="panel wide-panel">
        <h2>Campaign Premise</h2>
        <p>${escapeHtml(campaign.premise)}</p>
      </article>
      <article class="panel">
        <h2>Current Location</h2>
        <p>${escapeHtml(campaign.currentLocation)}</p>
      </article>
      <article class="panel">
        <h2>Current Quest</h2>
        <p>${escapeHtml(campaign.currentQuest)}</p>
      </article>
      <article class="panel">
        <h2>Known NPCs</h2>
        <ul class="clean-list">${listItems(campaign.knownNpcs)}</ul>
      </article>
      <article class="panel">
        <h2>Known Enemies</h2>
        <ul class="clean-list">${listItems(campaign.knownEnemies)}</ul>
      </article>
      <article class="panel">
        <h2>Open Questions</h2>
        <ul class="clean-list">${listItems(campaign.openQuestions)}</ul>
      </article>
      <article class="panel">
        <h2>Party Inventory</h2>
        <ul class="clean-list">${listItems(campaign.partyInventory)}</ul>
      </article>
      <article class="panel wide-panel">
        <h2>Tone of Campaign</h2>
        <p>${escapeHtml(campaign.tone)}</p>
      </article>
    </section>
  `;
}

function renderSessions() {
  if (!DATA.siteStatus.campaignActive) {
    return renderComingLaterPage(
      "Session Recaps Coming Later",
      "There are no sessions to recap yet. Once the campaign starts, this page will track what happened, who attended, loot, NPCs, clues, and the next objective.",
      ["Session archive", "Major events", "Loot and clues", "Next objective"]
    );
  }

  return `
    ${pageHeader("Sessions", "Recaps, loot, clues, and next objectives.")}
    <section class="session-list">
      ${DATA.sessions.map((session) => `
        <article class="panel session-card">
          <div class="card-topline">
            <p class="eyebrow">Session ${escapeHtml(session.number)}</p>
            <span>${escapeHtml(session.date)}</span>
          </div>
          <h2>${escapeHtml(session.title)}</h2>
          <dl class="info-list">
            <dt>Attended</dt>
            <dd>${escapeHtml(session.attended.join(", "))}</dd>
            <dt>Major events</dt>
            <dd><ul class="clean-list">${listItems(session.summary)}</ul></dd>
            <dt>NPCs met</dt>
            <dd>${session.npcs.length ? escapeHtml(session.npcs.join(", ")) : "None recorded yet."}</dd>
            <dt>Loot gained</dt>
            <dd>${session.loot.length ? `<ul class="clean-list">${listItems(session.loot)}</ul>` : "None recorded yet."}</dd>
            <dt>Clues and unresolved questions</dt>
            <dd>${session.questions.length ? `<ul class="clean-list">${listItems(session.questions)}</ul>` : "None recorded yet."}</dd>
            <dt>Next objective</dt>
            <dd>${escapeHtml(session.nextObjective)}</dd>
          </dl>
        </article>
      `).join("")}
    </section>
  `;
}

function renderComingLaterPage(title, text, items) {
  return `
    ${pageHeader(title, text)}
    <section class="content-grid">
      <article class="panel parchment-card wide-panel">
        <p class="eyebrow">No campaign yet</p>
        <h2>The tavern is still being built</h2>
        <p>${escapeHtml(DATA.siteStatus.message)}</p>
        <ul class="coming-list">
          ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
        <div class="button-stack">
          ${routeButton("Start Here", "start", "button button-small")}
          ${routeButton("Tools Guide", "tools", "button button-small button-secondary")}
          ${routeButton("Help / Glossary", "help", "button button-small button-secondary")}
        </div>
      </article>
    </section>
  `;
}

function renderJoin() {
  return `
    ${pageHeader("Join the Game", "A step-by-step onboarding path for new players.")}
    <section class="timeline">
      ${DATA.joinSteps.map((step, index) => `
        <article class="panel timeline-item">
          <span class="step-number">${index + 1}</span>
          <div>
            <h2>${escapeHtml(step.title)}</h2>
            <p>${escapeHtml(step.text)}</p>
            ${step.route ? routeButton(step.buttonLabel, step.route, "button button-small") : linkButton(step.buttonLabel, campaignLink(step.linkKey), "button button-small")}
          </div>
        </article>
      `).join("")}
    </section>
  `;
}

function renderAdmin() {
  const admin = DATA.admin;
  return `
    ${pageHeader("DM Admin", "Static editing links and source files for the Dungeons Hub.")}
    <section class="content-grid">
      <article class="panel wide-panel">
        <p class="eyebrow">Static site note</p>
        <h2>Editing happens in GitHub</h2>
        <p>${escapeHtml(admin.intro)}</p>
        <div class="button-stack">
          ${linkButton("Open GitHub Repo", campaignLink("githubRepo"))}
          ${linkButton("Open Live Site", campaignLink("githubPages"), "button button-secondary")}
        </div>
      </article>

      <article class="panel">
        <h2>Normal Update Workflow</h2>
        <ol class="step-list">
          ${admin.workflow.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
        </ol>
      </article>

      <article class="panel">
        <h2>Most Common Edits</h2>
        <ul class="clean-list">
          <li>Update external links in <code>data.js</code>.</li>
          <li>Add or edit party characters in <code>SITE_DATA.party</code>.</li>
          <li>Add recaps in <code>SITE_DATA.sessions</code>.</li>
          <li>Edit table rules and house rules in <code>SITE_DATA.rules</code>.</li>
          <li>Edit beginner help in <code>SITE_DATA.help</code>.</li>
        </ul>
      </article>

      <article class="panel wide-panel">
        <h2>Important Files</h2>
        <div class="admin-file-grid">
          ${admin.files.map((file) => `
            <article class="admin-file-card">
              <p class="eyebrow">${escapeHtml(file.path)}</p>
              <h3>${escapeHtml(file.label)}</h3>
              <p>${escapeHtml(file.description)}</p>
              ${linkButton("Edit / View", campaignLink(file.linkKey), "button button-small")}
            </article>
          `).join("")}
        </div>
      </article>
    </section>
  `;
}

function renderHelp() {
  const help = DATA.help;
  return `
    ${pageHeader("Help", "A quick reference for new players during setup and game night.")}
    <section class="content-grid">
      <article class="panel wide-panel">
        <p class="eyebrow">Quick Start Tutorial</p>
        <h2>How Game Night Works</h2>
        <p>${escapeHtml(help.tutorialNote)}</p>
        <ol class="tutorial-list">
          ${help.tutorialSteps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
        </ol>
      </article>

      <article class="panel wide-panel">
        <h2>Common Questions</h2>
        <div class="faq-list">
          ${help.faq.map((item) => `
            <details>
              <summary>${escapeHtml(item.question)}</summary>
              <p>${escapeHtml(item.answer)}</p>
            </details>
          `).join("")}
        </div>
      </article>

      <article class="panel wide-panel">
        <h2>Glossary</h2>
        <label class="search-label" for="glossarySearch">Search glossary</label>
        <input id="glossarySearch" class="search-input" type="search" placeholder="Search terms like AC, initiative, NPC">
        <dl id="glossaryList" class="glossary-grid">
          ${help.glossary.map((item) => `
            <div class="definition-card" data-glossary-item>
              <dt>${escapeHtml(item.term)}</dt>
              <dd>${escapeHtml(item.definition)}</dd>
            </div>
          `).join("")}
        </dl>
      </article>

      <article class="panel">
        <h2>Combat in Simple Terms</h2>
        <ol class="step-list">
          ${help.combatFlow.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
        </ol>
      </article>

      <article class="panel">
        <h2>Common Combat Actions</h2>
        <dl class="info-list compact">
          ${help.combatActions.map((item) => `<dt>${escapeHtml(item.name)}</dt><dd>${escapeHtml(item.description)}</dd>`).join("")}
        </dl>
      </article>

      <article class="panel wide-panel">
        <h2>Reading Your Character Sheet</h2>
        <dl class="definition-grid">
          ${help.characterSheetGuide.map((item) => `
            <div class="definition-card">
              <dt>${escapeHtml(item.label)}</dt>
              <dd>${escapeHtml(item.description)}</dd>
            </div>
          `).join("")}
        </dl>
      </article>

      <article class="panel">
        <h2>Where Do I Find the Answer?</h2>
        <dl class="info-list">
          ${help.whereToGo.map((item) => `<dt>${escapeHtml(item.need)}</dt><dd>${escapeHtml(item.destination)}</dd>`).join("")}
        </dl>
      </article>

      <article class="panel">
        <h2>Tool Help Links</h2>
        <div class="button-stack">
          ${DATA.helpLinks.map((item) => `
            <div class="tool-link-row">
              <p><strong>${escapeHtml(item.label)}</strong><span>${escapeHtml(item.description)}</span></p>
              ${linkButton("Open", item.url, "button button-small")}
            </div>
          `).join("")}
        </div>
      </article>
    </section>
  `;
}

function renderDefinition(item) {
  return `
    <article class="definition-card">
      <h3>${escapeHtml(item.name)}</h3>
      <p>${escapeHtml(item.text)}</p>
    </article>
  `;
}

function renderDiceRoller() {
  const dice = [4, 6, 8, 10, 12, 20];
  return `
    <article class="panel dice-panel">
      <p class="eyebrow">Dice Roller</p>
      <h2>Roll when the DM asks</h2>
      <div class="dice-buttons" aria-label="Dice buttons">
        ${dice.map((sides) => `<button class="button button-small" type="button" data-roll="${sides}">d${sides}</button>`).join("")}
        <button class="button button-small button-secondary" type="button" data-roll="advantage">Advantage</button>
        <button class="button button-small button-secondary" type="button" data-roll="disadvantage">Disadvantage</button>
      </div>
      <div class="dice-results" aria-live="polite">
        ${renderRollHistory()}
      </div>
    </article>
  `;
}

function renderRollHistory() {
  if (!rollHistory.length) {
    return `<p class="muted">No rolls yet.</p>`;
  }

  return rollHistory.map((roll) => `
    <p>
      <strong>${escapeHtml(roll.label)}:</strong>
      <span>${escapeHtml(roll.result)}</span>
      <small>${escapeHtml(roll.detail)}</small>
    </p>
  `).join("");
}

function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function handleRoll(type) {
  let entry;
  if (type === "advantage" || type === "disadvantage") {
    const first = rollDie(20);
    const second = rollDie(20);
    const result = type === "advantage" ? Math.max(first, second) : Math.min(first, second);
    entry = {
      label: type === "advantage" ? "Advantage" : "Disadvantage",
      result,
      detail: `d20 rolls: ${first} and ${second}`
    };
  } else {
    const sides = Number(type);
    entry = {
      label: `d${sides}`,
      result: rollDie(sides),
      detail: "Single die roll"
    };
  }

  rollHistory = [entry, ...rollHistory].slice(0, 5);
  const results = document.querySelector(".dice-results");
  if (results) {
    results.innerHTML = renderRollHistory();
  }
}

function initiativeEntries() {
  try {
    return JSON.parse(localStorage.getItem("dungeonsInitiative") || "[]");
  } catch (error) {
    return [];
  }
}

function saveInitiative(entries) {
  try {
    localStorage.setItem("dungeonsInitiative", JSON.stringify(entries));
  } catch (error) {
    // Some privacy modes block localStorage. The tracker still works until reload.
  }
}

function renderInitiativeTracker() {
  const entries = initiativeEntries();
  return `
    <article class="panel initiative-panel">
      <p class="eyebrow">Initiative Tracker</p>
      <h2>Combat turn order</h2>
      <form id="initiativeForm" class="initiative-form">
        <label>
          <span>Name</span>
          <input name="name" type="text" autocomplete="off" required placeholder="Mira">
        </label>
        <label>
          <span>Initiative</span>
          <input name="initiative" type="number" required placeholder="14">
        </label>
        <button class="button button-small" type="submit">Add Combatant</button>
      </form>
      <div class="initiative-actions">
        <button class="button button-small button-secondary" type="button" data-initiative-action="sort">Sort Descending</button>
        <button class="button button-small button-danger" type="button" data-initiative-action="clear">Clear List</button>
      </div>
      <ol id="initiativeList" class="initiative-list">
        ${renderInitiativeList(entries)}
      </ol>
    </article>
  `;
}

function renderInitiativeList(entries) {
  if (!entries.length) {
    return `<li class="empty-row">No combatants yet.</li>`;
  }

  return entries.map((entry, index) => `
    <li>
      <span><strong>${escapeHtml(entry.name)}</strong><small>Initiative ${escapeHtml(entry.initiative)}</small></span>
      <button class="plain-button" type="button" data-remove-initiative="${index}" aria-label="Remove ${escapeHtml(entry.name)}">Remove</button>
    </li>
  `).join("");
}

function refreshInitiativeList() {
  const list = document.getElementById("initiativeList");
  if (list) {
    list.innerHTML = renderInitiativeList(initiativeEntries());
  }
}

function setupGlossarySearch() {
  const input = document.getElementById("glossarySearch");
  if (!input) {
    return;
  }

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    document.querySelectorAll("[data-glossary-item]").forEach((item) => {
      const text = item.textContent.toLowerCase();
      item.hidden = query.length > 0 && !text.includes(query);
    });
  });
}

document.addEventListener("click", (event) => {
  const scrollButton = event.target.closest("[data-scroll-target]");
  if (scrollButton) {
    const target = document.getElementById(scrollButton.dataset.scrollTarget);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      target.focus?.({ preventScroll: true });
    }
    return;
  }

  const rollButton = event.target.closest("[data-roll]");
  if (rollButton) {
    handleRoll(rollButton.dataset.roll);
    return;
  }

  const initiativeAction = event.target.closest("[data-initiative-action]");
  if (initiativeAction) {
    const action = initiativeAction.dataset.initiativeAction;
    if (action === "sort") {
      const entries = initiativeEntries().sort((a, b) => Number(b.initiative) - Number(a.initiative));
      saveInitiative(entries);
      refreshInitiativeList();
    }
    if (action === "clear") {
      saveInitiative([]);
      refreshInitiativeList();
    }
    return;
  }

  const removeButton = event.target.closest("[data-remove-initiative]");
  if (removeButton) {
    const index = Number(removeButton.dataset.removeInitiative);
    const entries = initiativeEntries();
    entries.splice(index, 1);
    saveInitiative(entries);
    refreshInitiativeList();
  }
});

document.addEventListener("submit", (event) => {
  if (event.target.id !== "initiativeForm") {
    return;
  }

  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const name = String(formData.get("name") || "").trim();
  const initiative = Number(formData.get("initiative"));

  if (!name || Number.isNaN(initiative)) {
    return;
  }

  const entries = initiativeEntries();
  entries.push({ name, initiative });
  saveInitiative(entries);
  form.reset();
  form.elements.name.focus();
  refreshInitiativeList();
});

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

window.addEventListener("hashchange", renderRoute);
window.addEventListener("DOMContentLoaded", () => {
  renderSiteFooter();
  renderRoute();
});
