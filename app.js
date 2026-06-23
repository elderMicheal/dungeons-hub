let DATA = null;
let CONTENT_LOAD_FAILED = false;

const CONTENT_FILES = {
  siteSettings: "content/site-settings.json",
  tableAtAGlance: "content/table-at-a-glance.json",
  howWePlay: "content/how-we-play.json",
  characterCreation: "content/character-creation.json",
  toneAndBoundaries: "content/tone-and-boundaries.json",
  toolsAndLinks: "content/tools-and-links.json",
  campaignStatus: "content/campaign-status.json",
  groupSetup: "content/group-setup.json",
  houseRules: "content/house-rules/index.json",
  sessions: "content/sessions/index.json",
  helpAndGlossary: "content/help-and-glossary.json",
  changeLog: "content/change-log/index.json"
};

const ROUTES = {
  home: renderHome,
  start: renderStart,
  "session-minus-one": renderSessionMinusOne,
  "session-zero": renderSessionZero,
  tools: renderTools,
  vtt: renderVtt,
  roles: renderRoles,
  rules: renderRules,
  characters: renderCharacters,
  campaign: renderCampaign,
  sessions: renderSessions,
  "first-adventure": renderFirstAdventure,
  watch: renderWatch,
  help: renderHelp,
  admin: renderAdmin,
  join: renderJoin
};

const app = document.getElementById("app");
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const siteFooter = document.getElementById("siteFooter");
const bookViewport = document.querySelector(".book-viewport");

let rollHistory = [];
let currentRoute = "";
let homeCoverTimer = null;

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

async function fetchJson(path) {
  const response = await fetch(path, { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Could not load ${path}`);
  }

  return response.json();
}

async function loadContent() {
  const entries = await Promise.all(
    Object.entries(CONTENT_FILES).map(async ([key, path]) => [key, await fetchJson(path)])
  );

  return normalizeContent(Object.fromEntries(entries));
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function splitLines(value) {
  return String(value || "")
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function activeItems(items, allowedStatuses = ["Active", "Published"]) {
  return asArray(items).filter((item) => allowedStatuses.includes(item.status || "Active"));
}

function normalizeContent(content) {
  const settings = content.siteSettings || {};
  const table = content.tableAtAGlance || {};
  const how = content.howWePlay || {};
  const creation = content.characterCreation || {};
  const tone = content.toneAndBoundaries || {};
  const tools = content.toolsAndLinks || {};
  const campaignStatus = content.campaignStatus || {};
  const groupSetup = content.groupSetup || {};
  const houseRules = asArray(content.houseRules?.rules);
  const publishedSessions = activeItems(content.sessions?.sessions, ["Published"]);
  const help = content.helpAndGlossary || {};

  const links = {
    discordInvite: tools.discordInviteLink || "",
    discordVoice: tools.discordVoiceLink || "",
    discordSchedule: tools.discordScheduleLink || tools.discordInviteLink || "",
    discordRecaps: tools.discordRecapsLink || tools.discordInviteLink || "",
    dndBeyondCampaign: tools.dndBeyondCampaignLink || "",
    dndBeyondBuilder: tools.dndBeyondCharacterBuilderLink || "",
    dndBeyondRules: tools.officialRulesReferenceLink || "",
    owlbearRoom: tools.owlbearRodeoLink || "",
    roll20Game: tools.roll20Link || "",
    githubRepo: settings.repoUrl || "",
    githubPages: settings.liveSiteUrl || "",
    michealHome: settings.michealHomeUrl || "",
    githubEditData: settings.githubEditDataUrl || "",
    githubEditReadme: settings.githubEditReadmeUrl || "",
    githubEditCname: settings.githubEditCnameUrl || ""
  };

  const howEntries = activeItems(how.entries);
  const tableSections = howEntries.map((entry) => ({
    title: entry.title,
    text: [entry.shortVersion, entry.detailedExplanation].filter(Boolean),
    bullets: entry.example ? [entry.example] : []
  }));

  const activeHouseRules = activeItems(houseRules, ["Active", "Revised"]);
  const learnMore = asArray(creation.guide?.references);

  return {
    contentLoadFailed: false,
    siteStatus: {
      campaignActive: Boolean(campaignStatus.campaignActive || table.campaignActive),
      campaignName: campaignStatus.campaignName || "",
      message: campaignStatus.campaignSummary || "The adventure is still loading. We are in setup mode."
    },
    campaign: {
      name: campaignStatus.campaignName || "Campaign Name",
      tagline: campaignStatus.campaignSummary || "A lightweight D&D starter hub for game night links, table rules, future recaps, characters, and beginner help.",
      partyLevel: campaignStatus.currentPartyLevel || "",
      currentQuest: campaignStatus.currentObjective || "",
      nextSession: {
        date: campaignStatus.nextSessionDate || "",
        time: campaignStatus.nextSessionTime || "",
        location: campaignStatus.nextSessionLocation || "Discord",
        status: campaignStatus.currentStage || "Getting organized"
      },
      links
    },
    quickLinks: asArray(settings.quickLinks),
    starterHome: settings.starterHome || fallbackStarterHome(),
    futureLinks: asArray(settings.futureLinks),
    changeLog: activeItems(content.changeLog?.entries, ["Published"]).map((entry) => ({
      date: entry.date || "",
      title: entry.title || "",
      category: entry.category || "",
      text: entry.whatChanged || "",
      why: entry.whyItChanged || ""
    })),
    setup: {
      phase: groupSetup.setupPhase || {},
      roadmap: asArray(groupSetup.roadmap),
      sessionMinusOne: groupSetup.sessionMinusOne || {},
      sessionZero: groupSetup.sessionZero || {},
      techCheck: groupSetup.techCheck || {},
      vtt: groupSetup.vtt || {},
      mapFaq: asArray(groupSetup.mapFaq),
      firstAdventure: groupSetup.firstAdventure || {},
      learningResources: asArray(groupSetup.learningResources)
    },
    ourTable: {
      title: how.title || "How We Play Here",
      compact: table.shortSummary || "2014 Rules • Level 1 • Main + Companion • Rule of Cool • Roleplay First • Stay With the Party",
      intro: how.intro || "This is the table-specific source of truth.",
      atGlance: [
        table.rulesVersion,
        table.startingLevel ? `Start at Level ${table.startingLevel}` : "",
        table.mainCharacterRequired ? "Main Character required" : "",
        table.companionCharacterRequired ? "Companion Character required" : "",
        table.characterSourceGuidance
      ].filter(Boolean),
      sections: tableSections,
      dndBeyondPreflight: {
        title: "Character-Builder Preflight",
        intro: "Do this before opening any character builder so you do not build the wrong kind of sheet.",
        steps: asArray(creation.characterCreationChecklist)
      },
      nextSteps: asArray(creation.characterCreationChecklist),
      houseRuleLog: houseRules.map((rule) => ({
        name: rule.title,
        changes: rule.shortVersion,
        why: rule.whyTheTableUsesIt,
        dateAdded: rule.dateAdded,
        status: rule.status,
        example: rule.exampleInPlay
      })),
      learnMore
    },
    start: {
      intro: asArray(creation.startIntro),
      bigIdea: creation.bigIdea || { title: "The whole game in one sentence", text: "Describe what your character tries to do; the DM tells you what happens or what to roll." },
      coreLoop: asArray(creation.coreLoop),
      characterCreation: creation.guide || fallbackCharacterCreation(),
      lessons: asArray(creation.lessons),
      commonPhrases: asArray(creation.commonPhrases),
      tableMindset: asArray(creation.tableMindset),
      checklist: asArray(creation.checklist)
    },
    tools: asArray(tools.tools),
    roles: settings.roles || { people: [], characters: [], note: "" },
    rules: {
      official: [
        `${table.rulesVersion || "2014 D&D 5e"} is the rules version for this table.`,
        tools.officialRulesReferenceLink ? "Use the official rules reference link for detailed rules." : "The official rules reference link has not been added yet.",
        "The DM may make a quick ruling to keep the game moving, then check the rule afterward."
      ],
      dmRulings: [
        "The DM applies and interprets rules during play.",
        "Rules corrections are welcome when raised respectfully and promptly.",
        "Recurring rulings should be recorded in the House Rule Log."
      ],
      houseRules: activeHouseRules.map((rule) => ({
        title: rule.title,
        text: `${rule.shortVersion} ${rule.fullExplanation || ""}`.trim()
      })),
      tableRules: [
        ...howEntries.map((entry) => entry.shortVersion).filter(Boolean),
        tone.consentExpectations,
        tone.playerVersusPlayerPolicy,
        tone.interPartyConflictPolicy
      ].filter(Boolean),
      toolRules: [
        "Use the correct Discord channel for scheduling, recaps, and side questions.",
        "Keep character links updated when your sheet changes.",
        "If a tool breaks, tell the DM and use the fallback link or a simple verbal description."
      ]
    },
    campaignDetails: campaignStatus.campaignDetails || {
      premise: campaignStatus.campaignSummary || "",
      currentLocation: campaignStatus.currentLocation || "",
      currentQuest: campaignStatus.currentObjective || "",
      tone: tone.campaignTone || "",
      knownNpcs: [],
      knownEnemies: [],
      openQuestions: [],
      partyInventory: []
    },
    sessions: publishedSessions.map((session) => ({
      number: session.sessionNumber,
      date: session.date,
      title: session.title,
      attended: asArray(session.attendance),
      summary: asArray(session.summary),
      loot: asArray(session.lootGained),
      npcs: asArray(session.npcsMet),
      questions: asArray(session.unresolvedQuestions),
      nextObjective: session.nextObjective || ""
    })),
    party: asArray(settings.party),
    joinSteps: asArray(settings.joinSteps),
    admin: settings.admin || fallbackAdmin(),
    help: {
      tutorialNote: help.tutorialNote || "You do not need to know every rule before playing. Start by describing what your character is trying to do. The DM will tell you what to roll when a roll is needed.",
      tutorialSteps: asArray(help.quickStartTutorial),
      faq: activeItems(help.faq).map((item) => ({
        question: item.question,
        answer: item.shortAnswer || item.answer,
        longerAnswer: item.longerAnswer || ""
      })),
      glossary: activeItems(help.glossary).map((item) => ({
        term: item.term,
        definition: item.plainLanguageDefinition || item.definition,
        example: item.example || ""
      })),
      combatFlow: asArray(help.combatBasics?.flow),
      combatActions: asArray(help.combatBasics?.actions),
      characterSheetGuide: asArray(help.characterSheetGuide),
      whereToGo: asArray(help.whereToFindAnswers)
    },
    helpLinks: asArray(help.externalLearningResources)
  };
}

function fallbackStarterHome() {
  return {
    hero: {
      title: "Dungeons Hub",
      subtitle: "A beginner-friendly D&D launchpad.",
      intro: "This section is temporarily unavailable. Refresh the page or check with the DM."
    },
    whatThisIs: "This section is temporarily unavailable. Refresh the page or check with the DM.",
    whatYouNeed: [],
    optionalNeed: "",
    quickStart: [],
    noCampaign: {
      title: "Content temporarily unavailable",
      text: "Refresh the page or check with the DM."
    },
    quickHelp: [],
    toolsPreview: [],
    comingLater: []
  };
}

function fallbackCharacterCreation() {
  return {
    note: "This section is temporarily unavailable. Refresh the page or check with the DM.",
    fundamentalGuidelines: [],
    dmQuestions: [],
    creationSteps: [],
    characterParts: [],
    raceSummaries: [],
    classSummaries: [],
    keyConcepts: [],
    abilityScores: [],
    classes: [],
    species: [],
    backgrounds: [],
    traits: [],
    dndBeyondSteps: [],
    beginnerBuildAdvice: [],
    exampleCharacters: [],
    sessionZeroChecklist: [],
    references: [],
    summaryNote: ""
  };
}

function fallbackAdmin() {
  return {
    files: [],
    warnings: [
      "This section is temporarily unavailable. Refresh the page or check with the DM."
    ]
  };
}

function unavailableData() {
  return normalizeContent({
    siteSettings: {
      siteTitle: "Dungeons Hub",
      siteSubtitle: "Gather the party",
      footerText: "Dungeons Hub",
      quickLinks: [],
      futureLinks: [],
      joinSteps: [],
      starterHome: fallbackStarterHome()
    },
    tableAtAGlance: {
      shortSummary: "Content temporarily unavailable"
    },
    howWePlay: {
      title: "How We Play Here",
      intro: "This section is temporarily unavailable. Refresh the page or check with the DM.",
      entries: []
    },
    characterCreation: {
      characterCreationChecklist: [],
      guide: fallbackCharacterCreation()
    },
    toneAndBoundaries: {},
    toolsAndLinks: {},
    campaignStatus: {
      campaignActive: false,
      campaignSummary: "This section is temporarily unavailable. Refresh the page or check with the DM."
    },
    groupSetup: {},
    houseRules: { rules: [] },
    sessions: { sessions: [] },
    helpAndGlossary: {},
    changeLog: { entries: [] }
  });
}

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
  return DATA?.campaign?.links?.[key] || "";
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

function spriteIcon(name) {
  return `<svg aria-hidden="true"><use href="#i-${escapeHtml(name)}"></use></svg>`;
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
    <nav class="command-nav" aria-label="Dungeons Hub commands">
      ${footerRouteLink("Home", "home", "home")}
      ${footerRouteLink("Start", "start", "book")}
      ${footerRouteLink("Tools", "tools", "tools")}
      ${footerRouteLink("Rules", "rules", "scales")}
      ${footerRouteLink("Roles", "roles", "mask")}
      ${footerRouteLink("Help", "help", "help")}
      ${footerRouteLink("Join", "join", "users")}
      ${footerCommandLink("Repo", campaignLink("githubRepo"), "code")}
      ${footerRouteLink("Admin", "admin", "shield")}
      ${footerCommandLink("Site", campaignLink("michealHome"), "home")}
    </nav>
  `;
}

function footerRouteLink(label, route, iconName) {
  const href = route === "home" ? "./" : `#${escapeHtml(route)}`;
  return `<a class="command-link" href="${href}" data-route-link="${escapeHtml(route)}" aria-label="${escapeHtml(label)}">${spriteIcon(iconName)}<span>${escapeHtml(label)}</span></a>`;
}

function footerCommandLink(label, url, iconName) {
  if (!isRealLink(url)) {
    return `<span class="command-link command-disabled" aria-disabled="true">${spriteIcon(iconName)}<span>${escapeHtml(label)}</span></span>`;
  }

  return `<a class="command-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(label)}">${spriteIcon(iconName)}<span>${escapeHtml(label)}</span></a>`;
}

function pageHeader(title, text) {
  return `
    <section class="page-hero">
      <p class="eyebrow">Dungeons Hub</p>
      <h1>${escapeHtml(title)}</h1>
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
  return asArray(items).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function latestSession() {
  return DATA.sessions[DATA.sessions.length - 1] || {
    number: "",
    date: "",
    title: "No published session recap yet",
    attended: [],
    summary: ["This section is temporarily unavailable or no recap has been published yet."],
    loot: [],
    npcs: [],
    questions: [],
    nextObjective: ""
  };
}

function renderRoute() {
  if (!DATA) {
    app.innerHTML = `
      <section class="page-shell entering"><section class="panel">
        <p class="eyebrow">Loading</p>
        <h1>Gathering the scrolls...</h1>
        <p>Loading the public table content.</p>
      </section></section>
    `;
    return;
  }

  const route = (window.location.hash || "#home").replace(/^#\/?/, "") || "home";
  const normalized = ROUTES[route] ? route : "home";

  if (route !== normalized) {
    window.location.hash = normalized;
    return;
  }

  clearTimeout(homeCoverTimer);
  const rendered = `<section class="page-shell book-page incoming">${ROUTES[normalized]()}</section>`;
  const existing = app.querySelector(".page-shell");

  resetBookPosition();

  if (existing && currentRoute && currentRoute !== normalized) {
    existing.classList.remove("entering", "incoming");
    existing.classList.add("turning-out");
    app.insertAdjacentHTML("beforeend", rendered);
    const incoming = app.querySelector(".page-shell.incoming");
    window.setTimeout(() => {
      incoming?.classList.add("turning-in");
      incoming?.classList.remove("incoming");
    }, 20);
    window.setTimeout(() => {
      existing.remove();
      incoming?.classList.remove("turning-in");
      incoming?.classList.add("entered");
      afterRouteRender(normalized);
    }, 620);
  } else {
    app.innerHTML = `<section class="page-shell book-page entered">${ROUTES[normalized]()}</section>`;
    afterRouteRender(normalized);
  }

  currentRoute = normalized;
}

function afterRouteRender(normalized) {
  document.querySelectorAll("[data-route-link]").forEach((link) => {
    const isActive = link.dataset.routeLink === normalized;
    link.classList.toggle("is-active", isActive);
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
  siteNav?.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
  app.focus({ preventScroll: true });

  if (normalized === "help") {
    setupGlossarySearch();
  }

  if (normalized === "home") {
    setupHomeCover();
  }
}

function resetBookPosition() {
  window.scrollTo(0, 0);
  app.scrollTop = 0;
  bookViewport?.scrollTo?.(0, 0);
}

function showNavigationToast(label) {
  if (!label) {
    return;
  }

  let toast = document.getElementById("navToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "navToast";
    toast.className = "nav-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }

  toast.textContent = label;
  toast.classList.add("is-visible");
  window.clearTimeout(showNavigationToast.timer);
  showNavigationToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1100);
}

function setupHomeCover() {
  const homeBook = app.querySelector("[data-home-book]");
  if (!homeBook) {
    return;
  }

  const open = () => homeBook.classList.add("is-open");
  const openButton = homeBook.querySelector("[data-open-cover]");
  openButton?.addEventListener("click", open, { once: true });
  homeCoverTimer = window.setTimeout(open, 5000);
}

function renderHome() {
  if (DATA.siteStatus && DATA.siteStatus.campaignActive) {
    return renderCampaignDashboardHome();
  }

  return renderStarterHome();
}

function renderStarterHome() {
  const home = DATA.starterHome;
  const primaryLinks = [
    { label: "Start Here", description: "Begin the guide.", route: "start", icon: "book" },
    { label: "Join Discord", description: "Open Discord.", linkKey: "discordInvite", icon: "discord" },
    { label: "Tools", description: "See the tools.", route: "tools", icon: "tools" },
    { label: "Help", description: "Terms and answers.", route: "help", icon: "book" }
  ];

  return `
    <section class="home-book" data-home-book>
      <section class="book-cover-panel" data-book-cover>
        <div class="cover-brand">DH</div>
        <p class="eyebrow">Apprentice Handbook</p>
        <h1>${escapeHtml(home.hero.title)}</h1>
        <p>${escapeHtml(home.hero.subtitle)}</p>
        <button class="cover-open-button" type="button" data-open-cover>
          ${spriteIcon("book")}
          <span>Open</span>
        </button>
      </section>

      <section class="book-front-panel" data-book-front>
        <section class="front-hero">
          <div>
            <p class="eyebrow">Gather the party</p>
            <h1>${escapeHtml(home.hero.title)}</h1>
            <p>${escapeHtml(home.hero.intro)}</p>
          </div>
          <div class="hero-actions" aria-label="First actions">
            ${primaryLinks.map(renderQuickLinkCard).join("")}
          </div>
        </section>

        <section class="front-grid">
          ${renderLatestUpdates()}
          ${renderSetupRoadmap()}
          <article class="panel parchment-card">
            ${assetIcon("book", "panel-art")}
            <p class="eyebrow">Before your first session</p>
            <h2>What you need</h2>
            <ol class="check-list">
              ${home.whatYouNeed.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ol>
          </article>
          <article class="panel wide-panel">
            <p class="eyebrow">New to D&D?</p>
            <h2>Quick help</h2>
            <div class="help-tile-grid">
              ${home.quickHelp.slice(0, 6).map((item) => `
                <a class="help-tile" href="#${escapeHtml(item.route)}">
                  ${assetIcon(item.icon, "mini-icon")}
                  <strong>${escapeHtml(item.title)}</strong>
                  <span>${escapeHtml(item.text)}</span>
                </a>
              `).join("")}
            </div>
          </article>
        </section>
      </section>
    </section>
  `;
}

function renderStarterHomeLegacy() {
  const home = DATA.starterHome;

  return `
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

      ${renderSetupRoadmap()}

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

function renderLatestUpdates() {
  const updates = latestUpdates();

  return `
    <article class="panel latest-updates-card wide-panel">
      <p class="eyebrow">Latest Updates</p>
      <h2>What changed for the group</h2>
      <div class="update-list">
        ${updates.map((item) => `
          <article class="update-item">
            <time>${escapeHtml(item.date)}</time>
            <div>
              <strong>${escapeHtml(item.title)}</strong>
              <p>${escapeHtml(item.text)}</p>
            </div>
          </article>
        `).join("")}
      </div>
    </article>
  `;
}

function latestUpdates() {
  const contentUpdates = asArray(DATA.changeLog)
    .filter((entry) => !["Admin", "Technical", "Site"].includes(entry.category))
    .map((entry) => ({
      date: entry.date || "Now",
      title: entry.title,
      text: entry.text || entry.why || ""
    }));

  return [
    ...contentUpdates,
    {
      date: "Now",
      title: "Setup roadmap is active",
      text: `${DATA.setup?.phase?.currentPhase || "Planning"}: ${DATA.setup?.phase?.nextGroupTask || "Complete the prep path before the first adventure."}`
    },
    {
      date: "Now",
      title: "VTT comparison added",
      text: "The group can compare Discord, Owlbear, Roll20, D&D Beyond Maps, Foundry, Fantasy Grounds, and Tabletop Simulator before the DM chooses."
    },
    {
      date: "Now",
      title: "First adventure remains provisional",
      text: DATA.setup?.firstAdventure?.status || "Candidate under discussion."
    }
  ].slice(0, 4);
}

function renderSetupRoadmap() {
  const roadmap = DATA.setup?.roadmap || [];

  return `
    <article class="panel no-campaign-card wide-panel">
      ${assetIcon("map", "panel-art")}
      <p class="eyebrow">Setup roadmap</p>
      <h2>The Adventure Is Still Loading</h2>
      <p>We are in setup mode: getting everyone connected, learning the basics, choosing the lightest useful tools, and preparing for a short first adventure.</p>
      <p>No experience required. No one is expected to know the rules yet.</p>
      <p><strong>Current phase:</strong> ${escapeHtml(DATA.setup?.phase?.currentPhase || "Planning")}</p>
      <div class="roadmap-grid">
        ${roadmap.map((step) => `
          <a class="roadmap-card" href="#${escapeHtml(step.route)}">
            <span class="step-number">${escapeHtml(step.number)}</span>
            <strong>${escapeHtml(step.title)}</strong>
            <span>${escapeHtml(step.summary)}</span>
            ${statusPill(step.status)}
          </a>
        `).join("")}
      </div>
    </article>
  `;
}

function statusPill(status) {
  return `<span class="status-pill">${escapeHtml(status || "Not Started")}</span>`;
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
      ${linkButton("Character Sheets", campaignLink("dndBeyondCampaign"))}
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
          ${isRealLink(mapUrl) ? "" : `<div class="map-placeholder"><strong>Map link not added yet</strong><span>Add the Owlbear room URL in Tools & Links.</span></div>`}
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
      ${linkButton("Open Character Sheet", character.sheetUrl, "button button-small")}
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

function renderStartToc() {
  const items = [
    ["start-what-this-game-is", "What this game is"],
    ["start-play-loop", "Basic play loop"],
    ["start-character-creation", "Character creation"],
    ["start-before-build", "Before you build"],
    ["start-ask-dm", "Ask the DM"],
    ["start-creation-steps", "Creation steps"],
    ["start-races", "Races & species"],
    ["start-class-summary", "Classes"],
    ["start-ability-scores", "Ability scores"],
    ["dnd-beyond-preflight", "Builder preflight"],
    ["premade-characters", "Premade examples"],
    ["start-session-zero", "Session Zero"],
    ["start-helpful-links", "Helpful links"]
  ];

  return `
    <aside class="start-toc is-collapsed" aria-label="Start Here table of contents">
      <button class="start-toc-toggle" type="button" data-start-toc-toggle aria-expanded="false">
        <span>Start Here</span>
        <strong>Contents</strong>
      </button>
      <div class="start-toc-panel">
        <p class="eyebrow">Jump to</p>
        <div class="start-toc-links">
          ${items.map(([id, label]) => `
            <button type="button" data-scroll-target="${escapeHtml(id)}">${escapeHtml(label)}</button>
          `).join("")}
        </div>
      </div>
    </aside>
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
      <p class="eyebrow">Before the builder</p>
      <h2>${escapeHtml(preflight.title)}</h2>
      <p>${escapeHtml(preflight.intro)}</p>
      <ol class="step-list big-steps">
        ${preflight.steps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ol>
      <div class="button-row">
        ${linkButton("Open Character Builder", campaignLink("dndBeyondBuilder"), "button button-small")}
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
    ${renderStartToc()}
    <section class="start-guide">
      <article id="start-what-this-game-is" class="panel wide-panel">
        ${assetIcon("book", "panel-art")}
        <p class="eyebrow">Start here, brave fool</p>
        <h2>What this game is</h2>
        ${start.intro.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}
      </article>

      <article id="start-big-idea" class="panel parchment-card wide-panel">
        ${assetIcon("home", "panel-art")}
        <p class="eyebrow">The big idea</p>
        <h2>${escapeHtml(start.bigIdea.title)}</h2>
        <p>${escapeHtml(start.bigIdea.text)}</p>
      </article>

      <article id="start-play-loop" class="panel wide-panel">
        ${assetIcon("tools", "panel-art")}
        <h2>The basic play loop</h2>
        <ol class="step-list big-steps">
          ${start.coreLoop.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ol>
      </article>

      <article id="start-character-creation" class="panel parchment-card wide-panel">
        ${assetIcon("wizard", "panel-art")}
        <p class="eyebrow">Character creation</p>
        <h2>How a character is created</h2>
        <p>${escapeHtml(creation.note)}</p>
        <div class="button-row">
          ${routeButton("Read How We Play Here", "rules", "button button-small")}
          <button class="button button-small button-secondary" type="button" data-scroll-target="dnd-beyond-preflight">Builder Preflight</button>
          <button class="button button-small button-secondary" type="button" data-scroll-target="premade-characters">Use This Premade</button>
        </div>
      </article>

      <article id="start-before-build" class="panel wide-panel">
        <h2>Fundamental rules before you build</h2>
        <ul class="clean-list two-column-list">
          ${creation.fundamentalGuidelines.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </article>

      <article id="start-ask-dm" class="panel wide-panel">
        <h2>Ask the DM first</h2>
        <p>These questions prevent wasted work and help the whole party fit the same game.</p>
        <ul class="clean-list two-column-list">
          ${creation.dmQuestions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </article>

      <article id="start-creation-steps" class="panel wide-panel">
        <h2>Character creation step by step</h2>
        ${renderCreationTimeline(creation.creationSteps)}
      </article>

      <article id="start-character-pieces" class="panel wide-panel">
        <h2>The pieces of a character</h2>
        <p>A finished character is a stack of choices. Some are rules choices, some are roleplaying choices, and all of them should be easy for the DM to approve.</p>
        <div class="definition-grid">
          ${creation.characterParts.map(renderGuideCard).join("")}
        </div>
      </article>

      <article id="start-races" class="panel wide-panel">
        <h2>Common races and species at a glance</h2>
        <p>${escapeHtml(creation.summaryNote)}</p>
        ${renderRaceTable(creation.raceSummaries)}
      </article>

      <article id="start-class-summary" class="panel wide-panel">
        <h2>Common classes at a glance</h2>
        <p>Class is the biggest mechanical choice. It controls your main tools, combat rhythm, and level-up path.</p>
        ${renderClassTable(creation.classSummaries)}
      </article>

      <article id="start-key-traits" class="panel wide-panel">
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

      <article id="start-ability-scores" class="panel wide-panel">
        <h2>Ability scores in plain language</h2>
        <p>Ability scores are the six core stats. Most rolls connect back to one of these.</p>
        <div class="definition-grid">
          ${creation.abilityScores.map(renderGuideCard).join("")}
        </div>
      </article>

      <article id="start-classes" class="panel wide-panel">
        <h2>Classes / professions</h2>
        <p>Your class is your main rule package and adventuring profession. It affects how you fight, solve problems, survive danger, and grow when you level up.</p>
        <div class="definition-grid">
          ${creation.classes.map(renderGuideCard).join("")}
        </div>
      </article>

      <article id="start-ancestry" class="panel wide-panel">
        <h2>Species, race, and ancestry</h2>
        <p>Different sources use different terms. Older D&D material often says race, newer D&D material often says species, and other RPGs may say ancestry. The DM decides which options fit the table.</p>
        <div class="definition-grid">
          ${creation.species.map(renderGuideCard).join("")}
        </div>
      </article>

      <article id="start-backgrounds" class="panel">
        <h2>Backgrounds</h2>
        <div class="quick-card-list">
          ${creation.backgrounds.map(renderGuideCard).join("")}
        </div>
      </article>

      <article id="start-traits" class="panel">
        <h2>Traits, features, flaws, and feats</h2>
        <div class="quick-card-list">
          ${creation.traits.map(renderGuideCard).join("")}
        </div>
      </article>

      ${renderDndBeyondPreflight()}

      <article id="start-dnd-beyond" class="panel parchment-card">
        <h2>Build it in the chosen sheet tool</h2>
        <ol class="step-list">
          ${creation.dndBeyondSteps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ol>
        ${linkButton("Open Character Builder", campaignLink("dndBeyondBuilder"), "button button-small")}
      </article>

      <article id="start-build-advice" class="panel">
        <h2>Beginner build advice</h2>
        <ul class="clean-list">
          ${creation.beginnerBuildAdvice.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </article>

      <article id="premade-characters" class="panel wide-panel" tabindex="-1">
        <h2>Premade example characters</h2>
        <p>Use these as examples, not locked-in lore. The DM can approve one, adjust numbers, or turn one into a finished character sheet.</p>
        ${renderExampleCharacterTable(creation.exampleCharacters)}
      </article>

      <article id="start-session-zero" class="panel wide-panel">
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

      <article id="start-helpful-links" class="panel wide-panel">
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
    ${pageHeader("Tools", "How this group uses Discord, character sheets, and whichever VTT the DM chooses.")}
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

function renderSessionMinusOne() {
  const session = DATA.setup.sessionMinusOne || {};
  const tech = DATA.setup.techCheck || {};

  return `
    ${pageHeader(session.title || "Session −1: Get Connected Before the Adventure", "Practical setup before Session 0.")}
    <section class="content-grid">
      <article class="panel wide-panel">
        <p class="eyebrow">What this is</p>
        <h2>Practical setup first</h2>
        <p>${escapeHtml(session.whatThisIs)}</p>
      </article>
      <article class="panel">
        <h2>Tech Checklist</h2>
        <ul class="check-list">${listItems(session.techChecklist)}</ul>
      </article>
      <article class="panel parchment-card">
        <h2>What You Do Not Need Yet</h2>
        <ul class="clean-list">${listItems(session.notNeededYet)}</ul>
      </article>
      <article class="panel">
        <h2>Bring These Questions</h2>
        <ul class="clean-list">${listItems(session.questions)}</ul>
      </article>
      <article class="panel">
        <h2>Current Tech Decisions</h2>
        <dl class="info-list">
          <dt>Discord required</dt><dd>${yesNo(tech.discordRequired)}</dd>
          <dt>D&D Beyond required</dt><dd>${yesNo(tech.dndBeyondRequired)}</dd>
          <dt>Voice test required</dt><dd>${yesNo(tech.voiceTestRequired)}</dd>
          <dt>VTT selected</dt><dd>${yesNo(tech.vttSelected)}</dd>
          <dt>VTT test required</dt><dd>${yesNo(tech.vttTestRequired)}</dd>
          <dt>Device notes</dt><dd>${escapeHtml(tech.recommendedBrowserDeviceNotes || "")}</dd>
        </dl>
      </article>
      <article class="panel wide-panel">
        <h2>Privacy Note</h2>
        <p>${escapeHtml(session.privacyNote)}</p>
      </article>
    </section>
  `;
}

function renderSessionZero() {
  const session = DATA.setup.sessionZero || {};

  return `
    ${pageHeader(session.title || "Session 0: Build the Party Before the Story Begins", "Characters, tone, rules, boundaries, and expectations.")}
    <section class="content-grid">
      <article class="panel wide-panel">
        <p class="eyebrow">Before the story begins</p>
        <h2>What Session 0 is for</h2>
        <p>${escapeHtml(session.intro)}</p>
      </article>
      <article class="panel wide-panel parchment-card">
        <h2>Important Character Rule</h2>
        <p>${escapeHtml(session.callout)}</p>
      </article>
      <article class="panel wide-panel">
        <h2>Discussion Topics</h2>
        <ul class="clean-list two-column-list">${listItems(session.topics)}</ul>
      </article>
      <article class="panel">
        <h2>Also read</h2>
        <div class="button-row">
          ${routeButton("How We Play Here", "rules", "button button-small")}
          ${routeButton("Character Guide", "start", "button button-small button-secondary")}
          ${routeButton("VTT Decision", "vtt", "button button-small button-secondary")}
        </div>
      </article>
    </section>
  `;
}

function renderVtt() {
  const vtt = DATA.setup.vtt || {};
  const needs = vtt.needs || {};
  const decision = vtt.decision || {};

  return `
    ${pageHeader(vtt.title || "VTT & Game-Night Platform Comparison", vtt.subtitle || "A decision center for the table's map and VTT needs.")}
    <section class="vtt-decision">
      <article class="panel wide-panel vtt-lede">
        <p class="eyebrow">Tools of the Trade</p>
        <h2>Lowest friction wins</h2>
        <p>${escapeHtml(vtt.intro || vtt.philosophy)}</p>
        ${vtt.decisionRule ? `<div class="vtt-callout"><strong>Decision rule:</strong> ${escapeHtml(vtt.decisionRule)}</div>` : ""}
      </article>

      <section class="content-grid">
        <article class="panel">
          <h2>Decision Status</h2>
          <dl class="info-list">
            <dt>Current VTT Decision</dt><dd>${escapeHtml(decision.currentDecision || "Under Discussion")}</dd>
            <dt>Decision Owner</dt><dd>${escapeHtml(decision.decisionOwner || "Dungeon Master")}</dd>
            <dt>Group Role</dt><dd>${escapeHtml(decision.groupRole || "")}</dd>
          </dl>
        </article>
        <article class="panel parchment-card">
          <h2>Map Policy</h2>
          ${renderMapPolicy(vtt.mapPolicy || {})}
        </article>
        <article class="panel wide-panel">
          <p class="eyebrow">Group philosophy</p>
          <h2>The tool serves the game</h2>
          <p>${escapeHtml(vtt.philosophy)}</p>
        </article>
      </section>

      <section class="content-grid">
        <article class="panel">
          <h2>Required</h2>
          <ul class="clean-list">${listItems(needs.required)}</ul>
        </article>
        <article class="panel">
          <h2>Nice to Have</h2>
          <ul class="clean-list">${listItems(needs.niceToHave)}</ul>
        </article>
        <article class="panel">
          <h2>Not Required for the First Adventure</h2>
          <ul class="clean-list">${listItems(needs.notRequiredForFirstAdventure)}</ul>
        </article>
      </section>

      ${renderPlatformDirectory(vtt)}
      ${renderVttComparison(vtt)}

      <section class="content-grid">
        <article class="panel wide-panel">
          <h2>Candidate Tools</h2>
          <div class="card-grid">
            ${asArray(vtt.candidates).map(renderVttCandidate).join("")}
          </div>
        </article>
        <article class="panel wide-panel">
          <h2>How Maps Will Be Used</h2>
          <div class="faq-list">
            ${DATA.setup.mapFaq.map((item) => `
              <details>
                <summary>${escapeHtml(item.question)}</summary>
                <p>${escapeHtml(item.answer)}</p>
              </details>
            `).join("")}
          </div>
        </article>
      </section>

      ${renderVttSummary(vtt)}
    </section>
  `;
}

function renderPlatformDirectory(vtt) {
  const platforms = asArray(vtt.platforms);
  if (!platforms.length) {
    return "";
  }

  return `
    <section class="vtt-section" aria-labelledby="platform-directory-title">
      <div class="section-heading">
        <p class="eyebrow">Alphabetical Directory</p>
        <h2 id="platform-directory-title">Platforms Discussed</h2>
        ${vtt.priceNote ? `<p>${escapeHtml(vtt.priceNote)}</p>` : ""}
      </div>
      <div class="table-scroll vtt-table-scroll" tabindex="0" aria-label="Scrollable software directory">
        <table class="platform-table">
          <thead>
            <tr>
              <th scope="col">Platform</th>
              <th scope="col">Primary Role</th>
              <th scope="col">Cost / Subscription Model</th>
              <th scope="col">Best Use for This Group</th>
              <th scope="col">Product</th>
            </tr>
          </thead>
          <tbody>
            ${platforms.map((platform) => `
              <tr>
                <th scope="row">${escapeHtml(platform.name)}</th>
                <td>${escapeHtml(platform.primaryRole)}</td>
                <td>${escapeHtml(platform.costModel)}</td>
                <td>${escapeHtml(platform.bestUse)}</td>
                <td>${renderTableLink(platform.buttonLabel || "Open", platform.url)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderVttComparison(vtt) {
  const comparison = vtt.comparison || {};
  const columns = asArray(comparison.columns);
  const rows = asArray(comparison.rows);

  if (!columns.length || !rows.length) {
    return "";
  }

  return `
    <section class="vtt-section" aria-labelledby="comparison-title">
      <div class="section-heading">
        <p class="eyebrow">Group-Fit Comparison</p>
        <h2 id="comparison-title">What Actually Matters for This Table</h2>
        <p class="comparison-legend">
          <span class="fit yes" aria-label="Good fit">${fitSymbol("yes")}</span> Good fit
          <span class="fit no" aria-label="Poor fit">${fitSymbol("no")}</span> Poor fit
          <span class="fit caution" aria-label="Depends on setup or testing">${fitSymbol("caution")}</span> Depends on setup or should be tested
          <span class="fit na" aria-label="Not applicable">${fitSymbol("na")}</span> Not applicable
        </p>
      </div>
      <div class="table-scroll vtt-table-scroll comparison-scroll" tabindex="0" aria-label="Scrollable VTT comparison table">
        <table class="comparison-table">
          <thead>
            <tr>
              <th scope="col">Criteria</th>
              ${columns.map((column) => `<th scope="col">${renderColumnHeading(column)}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => `
              <tr${row.isRecommendation ? ` class="recommendation-row"` : ""}>
                <th scope="row">${escapeHtml(row.criterion)}</th>
                ${columns.map((column) => renderFitCell(row, column.key)).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderVttSummary(vtt) {
  if (!vtt.workingRecommendation) {
    return "";
  }

  return `
    <section class="vtt-summary">
      <p class="eyebrow">Working Recommendation</p>
      <h2>Where We Should Start</h2>
      <p>${escapeHtml(vtt.workingRecommendation)}</p>
    </section>
  `;
}

function renderTableLink(label, url) {
  if (!isRealLink(url)) {
    return `<span class="muted">Not added yet</span>`;
  }

  return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
}

function renderColumnHeading(column) {
  const label = escapeHtml(column.label);
  const formattedLabel = label.replaceAll(" ", "<br>");
  if (!isRealLink(column.url)) {
    return formattedLabel;
  }

  return `<a href="${escapeHtml(column.url)}" target="_blank" rel="noopener noreferrer">${formattedLabel}</a>`;
}

function renderFitCell(row, key) {
  const value = row.values?.[key] || "na";
  const note = row.notes?.[key] || "";

  return `
    <td>
      <span class="fit ${escapeHtml(value)}" aria-label="${escapeHtml(fitLabel(value))}">${fitSymbol(value)}</span>
      ${note ? `<small>${escapeHtml(note)}</small>` : ""}
    </td>
  `;
}

function fitSymbol(value) {
  if (value === "yes") {
    return "✓";
  }
  if (value === "no") {
    return "✕";
  }
  if (value === "caution") {
    return "△";
  }
  return "—";
}

function fitLabel(value) {
  if (value === "yes") {
    return "Good fit";
  }
  if (value === "no") {
    return "Poor fit";
  }
  if (value === "caution") {
    return "Depends on setup or should be tested";
  }
  return "Not applicable";
}

function renderFirstAdventure() {
  const adventure = DATA.setup.firstAdventure || {};

  return `
    ${pageHeader(adventure.title || "Our First Adventure", "A provisional learning adventure before a longer campaign.")}
    <section class="content-grid">
      <article class="panel parchment-card wide-panel">
        <p class="eyebrow">Current Status</p>
        <h2>${escapeHtml(adventure.status || "Candidate Under Discussion")}</h2>
        <p>${escapeHtml(adventure.purpose)}</p>
      </article>
      <article class="panel">
        <h2>Adventure Details</h2>
        <dl class="info-list">
          <dt>Adventure title</dt><dd>${escapeHtml(adventure.adventureTitle)}</dd>
          <dt>Expected sessions</dt><dd>${escapeHtml(adventure.expectedNumberOfSessions || "TBD")}</dd>
          <dt>Rules version</dt><dd>${escapeHtml(adventure.rulesVersion)}</dd>
          <dt>Character options</dt><dd>${escapeHtml(adventure.characterOptions)}</dd>
          <dt>Required purchases</dt><dd>${escapeHtml(adventure.requiredPurchases || "TBD")}</dd>
        </dl>
      </article>
      <article class="panel">
        <h2>Setup Flags</h2>
        <dl class="info-list">
          <dt>Premade characters available</dt><dd>${yesNo(adventure.premadeCharactersAvailable)}</dd>
          <dt>World map available</dt><dd>${yesNo(adventure.worldMapAvailable)}</dd>
          <dt>Battle maps likely needed</dt><dd>${yesNo(adventure.battleMapsLikelyNeeded)}</dd>
          <dt>Follow-up campaign possible</dt><dd>${yesNo(adventure.followUpCampaignPossible)}</dd>
        </dl>
      </article>
      <article class="panel wide-panel">
        <h2>Why this approach</h2>
        <p>${escapeHtml(adventure.whyThisWasChosen)}</p>
      </article>
      <article class="panel wide-panel">
        <h2>Notes for New Players</h2>
        <p>${escapeHtml(adventure.notesForNewPlayers)}</p>
      </article>
      <article class="panel wide-panel">
        <h2>Group Notes</h2>
        <p>${escapeHtml(adventure.groupNotes)}</p>
      </article>
    </section>
  `;
}

function renderWatch() {
  return `
    ${pageHeader("Watch a Little D&D", "Optional examples of what D&D can look like.")}
    <section class="content-grid">
      <article class="panel wide-panel">
        <p class="eyebrow">Not homework</p>
        <h2>Watch lightly</h2>
        <p>These are optional examples of what D&D can look like. They are not homework, and our table does not need to play exactly like a polished show, podcast, or professional cast.</p>
      </article>
      <article class="panel wide-panel">
        <h2>Learning Resources</h2>
        <div class="reference-grid">
          ${DATA.setup.learningResources.map(renderLearningResource).join("")}
        </div>
      </article>
    </section>
  `;
}

function yesNo(value) {
  if (value === true) {
    return "Yes";
  }
  if (value === false) {
    return "No";
  }
  return escapeHtml(value || "TBD");
}

function renderMapPolicy(policy) {
  return `
    <dl class="info-list">
      <dt>Use world maps</dt><dd>${escapeHtml(policy.useWorldMaps || "TBD")}</dd>
      <dt>Use battle maps</dt><dd>${escapeHtml(policy.useBattleMaps || "TBD")}</dd>
      <dt>Use floor plans for combat</dt><dd>${escapeHtml(policy.useFloorPlansForCombat || "TBD")}</dd>
      <dt>Use theater of the mind</dt><dd>${escapeHtml(policy.useTheaterOfTheMind || "TBD")}</dd>
      <dt>Use miniatures</dt><dd>${escapeHtml(policy.useMiniatures || "TBD")}</dd>
    </dl>
  `;
}

function renderVttCandidate(candidate) {
  return `
    <article class="panel tool-card">
      <div class="card-topline">
        <p class="eyebrow">Candidate</p>
        ${statusPill(candidate.status)}
      </div>
      <h3>${escapeHtml(candidate.toolName)}</h3>
      <dl class="info-list compact">
        <dt>What it means</dt><dd>${escapeHtml(candidate.whatItIsFor)}</dd>
        <dt>Best for</dt><dd>${escapeHtml(candidate.bestFor || candidate.whyItMayFit)}</dd>
        <dt>Limits</dt><dd>${escapeHtml(candidate.limits || candidate.whyItMayNotFit)}</dd>
        <dt>DM workload</dt><dd>${escapeHtml(candidate.dmWorkloadEstimate || "TBD")}</dd>
        <dt>Player setup</dt><dd>${escapeHtml(candidate.playerSetupDifficulty || "TBD")}</dd>
        <dt>Cost notes</dt><dd>${escapeHtml(candidate.costNotes || "No specific cost note added yet.")}</dd>
      </dl>
      ${linkButton("Open Product", candidate.url, "button button-small button-secondary")}
    </article>
  `;
}

function renderLearningResource(resource) {
  return `
    <article class="reference-card">
      <p class="eyebrow">${escapeHtml(resource.type || "Resource")}</p>
      <h3>${escapeHtml(resource.title)}</h3>
      <p>${escapeHtml(resource.description)}</p>
      <p><strong>${escapeHtml(resource.optionalOrRecommended || "Optional")}</strong> ${escapeHtml(resource.suggestedTimeCommitment || "")}</p>
      <p><strong>Difficulty:</strong> ${escapeHtml(resource.difficulty || "Beginner")}</p>
      ${resource.dmComment ? `<p>${escapeHtml(resource.dmComment)}</p>` : ""}
      ${linkButton("Open", resource.url, "button button-small")}
    </article>
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
      "There is no active party yet. Once the campaign starts, this page will show player characters, sheet links, roles, AC, HP, and short summaries.",
      ["Party roster", "Character sheet links", "Player names", "Class and role summaries"]
    );
  }

  return `
    ${pageHeader("Characters", "Party roster cards loaded from public content files.")}
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
        <p class="eyebrow">Setup mode</p>
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
  return `
    ${pageHeader("DM Admin", "Use the lightweight browser editor for public table information.")}
    <section class="content-grid">
      <article class="panel wide-panel">
        <p class="eyebrow">Admin Lite</p>
        <h2>No login, no backend, no OAuth</h2>
        <p>The public site loads editable JSON content from <code>/content/</code>. The admin page is now a static browser-only editor: it loads those public files, renders forms, saves local drafts in this browser, and exports updated JSON files.</p>
        <p>Because there is no backend or GitHub OAuth, this page cannot publish changes directly. To make edits live, replace the matching file in <code>/content/</code>, commit it, and push the repo.</p>
        <div class="button-stack">
          <a class="button" href="/admin/">Open Admin Lite</a>
          ${linkButton("Open GitHub Repo", campaignLink("githubRepo"), "button button-secondary")}
        </div>
      </article>

      <article class="panel">
        <h2>Editing Workflow</h2>
        <ol class="step-list">
          <li>Open <code>/admin/</code>.</li>
          <li>Choose a content file.</li>
          <li>Edit the form fields.</li>
          <li>Save a local draft if you are still working.</li>
          <li>Download the updated JSON file.</li>
          <li>Replace the matching file under <code>/content/</code>.</li>
          <li>Commit and push the repo so the static host redeploys.</li>
        </ol>
      </article>

      <article class="panel">
        <h2>Public Content Only</h2>
        <ul class="clean-list">
          <li>Do not store secret DM notes.</li>
          <li>Do not store spoilers, monster notes, API keys, passwords, or private player information.</li>
          <li>Anything in <code>/content/</code> is deployed with the public static site.</li>
        </ul>
      </article>

      <article class="panel wide-panel">
        <h2>Editable Sections</h2>
        <p>Admin Lite can edit Site Settings, Group Setup and First Adventure, Table at a Glance, How We Play Here, Character Creation, House Rules, Tone & Boundaries, Tools & Links, Campaign Status, Sessions & Recaps, Help & Glossary, and Change Log files.</p>
      </article>

      <article class="panel wide-panel parchment-card">
        <h2>Why it works this way</h2>
        <p>A static site can read public files, but it cannot safely write to GitHub by itself. Direct publishing requires adding an authentication service, a backend, or a CMS integration. For now, this keeps the site cheap, simple, and low-maintenance.</p>
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
  const routeLink = event.target.closest("a[data-route-link]");
  if (routeLink) {
    if (routeLink.classList.contains("edge-tab")) {
      showNavigationToast(routeLink.getAttribute("aria-label") || routeLink.textContent.trim());
    }

    const route = routeLink.dataset.routeLink;
    if (route && route === currentRoute) {
      resetBookPosition();
      if (route === "home" && window.location.hash) {
        window.history.pushState("", document.title, window.location.pathname);
        renderRoute();
      }
    }
  }

  const tocToggle = event.target.closest("[data-start-toc-toggle]");
  if (tocToggle) {
    const toc = tocToggle.closest(".start-toc");
    const isCollapsed = toc.classList.toggle("is-collapsed");
    tocToggle.setAttribute("aria-expanded", String(!isCollapsed));
    return;
  }

  const scrollButton = event.target.closest("[data-scroll-target]");
  if (scrollButton) {
    const target = document.getElementById(scrollButton.dataset.scrollTarget);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      target.focus?.({ preventScroll: true });
    }
    const toc = scrollButton.closest(".start-toc");
    const toggle = toc?.querySelector("[data-start-toc-toggle]");
    if (toc && toggle) {
      toc.classList.add("is-collapsed");
      toggle.setAttribute("aria-expanded", "false");
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

document.addEventListener("pointerover", (event) => {
  const tab = event.target.closest(".edge-tab");
  if (tab) {
    showNavigationToast(tab.getAttribute("aria-label") || tab.textContent.trim());
  }
});

document.addEventListener("focusin", (event) => {
  const tab = event.target.closest(".edge-tab");
  if (tab) {
    showNavigationToast(tab.getAttribute("aria-label") || tab.textContent.trim());
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

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav?.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

window.addEventListener("hashchange", renderRoute);
window.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

async function initializeApp() {
  app.innerHTML = `
    <section class="panel">
      <p class="eyebrow">Loading</p>
      <h1>Gathering the scrolls...</h1>
      <p>Loading the public table content.</p>
    </section>
  `;

  try {
    DATA = await loadContent();
  } catch (error) {
    CONTENT_LOAD_FAILED = true;
    DATA = unavailableData();
    console.warn("Dungeons Hub content load failed.", error);
  }

  renderSiteFooter();
  renderRoute();
}
