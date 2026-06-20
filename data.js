const SITE_DATA = {
  siteStatus: {
    campaignActive: false,
    campaignName: "",
    message: "No active campaign yet. We are setting up the table, tools, and beginner guide first."
  },

  campaign: {
    name: "Campaign Name",
    tagline: "A lightweight D&D starter hub for game night links, table rules, future recaps, characters, and beginner help.",
    partyLevel: "TBD",
    currentQuest: "TBD - the DM will add the current objective.",
    nextSession: {
      date: "TBD",
      time: "TBD",
      location: "Discord voice and Owlbear map",
      status: "Scheduling"
    },
    links: {
      discordInvite: "https://discord.com/download",
      discordVoice: "https://discord.com/app",
      discordSchedule: "https://discord.com/app",
      discordRecaps: "https://discord.com/app",
      dndBeyondCampaign: "https://www.dndbeyond.com/",
      dndBeyondBuilder: "https://www.dndbeyond.com/My-Characters",
      dndBeyondRules: "https://www.dndbeyond.com/sources/dnd/basic-rules-2014/step-by-step-characters",
      owlbearRoom: "https://www.owlbear.rodeo/",
      roll20Game: "https://roll20.net/",
      githubRepo: "https://github.com/elderMicheal/dungeons-hub",
      githubPages: "https://dungeons.michealburford.com",
      michealHome: "https://www.michealburford.com",
      githubEditData: "https://github.com/elderMicheal/dungeons-hub/edit/main/data.js",
      githubEditReadme: "https://github.com/elderMicheal/dungeons-hub/edit/main/README.md",
      githubEditCname: "https://github.com/elderMicheal/dungeons-hub/edit/main/CNAME"
    }
  },

  quickLinks: [
    {
      label: "Start Here",
      description: "Begin the guide.",
      route: "start",
      variant: "primary",
      icon: "book"
    },
    {
      label: "Join Discord",
      description: "Open Discord. Invite later.",
      linkKey: "discordInvite",
      variant: "secondary",
      icon: "discord"
    },
    {
      label: "D&D Beyond",
      description: "Make your D&D account.",
      linkKey: "dndBeyondCampaign",
      icon: "beyond"
    },
    {
      label: "Tools Guide",
      description: "Learn the tools.",
      route: "tools",
      icon: "tools"
    },
    {
      label: "Help / Glossary",
      description: "Terms and quick answers.",
      route: "help",
      icon: "book"
    },
    {
      label: "Rules",
      description: "Read the table expectations.",
      route: "rules",
      variant: "quiet",
      icon: "book"
    },
    {
      label: "Roles",
      description: "Learn what the DM and players do.",
      route: "roles",
      variant: "quiet",
      icon: "wizard"
    }
  ],

  starterHome: {
    hero: {
      title: "Dungeons Hub",
      subtitle: "A beginner-friendly D&D launchpad for Micheal and the crew.",
      intro: "New to D&D? Start here. Learn the tools, table roles, basic rules, and how to join without knowing everything first."
    },
    whatThisIs: "This is the home base for getting our D&D group organized. It explains how to join, how the tools work, what the basic terms mean, and what to do if you have never played before.",
    whatYouNeed: [
      "A Discord account for voice and group chat.",
      "A D&D Beyond account for character sheets.",
      "A willingness to ask questions.",
      "No previous D&D experience required."
    ],
    optionalNeed: "Owlbear Rodeo or Roll20 may be used later for maps once a campaign starts.",
    quickStart: [
      "Join Discord so you can hear the group and ask questions.",
      "Create a D&D Beyond account for character sheets.",
      "Read Start Here if you have never played.",
      "Use Help / Glossary when a word sounds made up."
    ],
    noCampaign: {
      title: "No active campaign yet.",
      text: "We are setting up the table, tools, and beginner guide first. Once a campaign starts, this page will add party info, session recaps, maps, and campaign notes."
    },
    quickHelp: [
      {
        title: "I've never played D&D",
        text: "Short, friendly guide to getting comfortable at the table.",
        route: "start",
        icon: "book"
      },
      {
        title: "What is a DM?",
        text: "The role of the Dungeon Master, explained plainly.",
        route: "roles",
        icon: "wizard"
      },
      {
        title: "What do I do on my turn?",
        text: "Combat, skills, choices, and asking the DM what to roll.",
        route: "help",
        icon: "tools"
      },
      {
        title: "What is a character sheet?",
        text: "Abilities, hit points, attacks, spells, and equipment.",
        route: "help",
        icon: "beyond"
      },
      {
        title: "What tools do we use?",
        text: "Discord, D&D Beyond, and future map tools.",
        route: "tools",
        icon: "tools"
      },
      {
        title: "What do all these terms mean?",
        text: "Open the glossary for quick definitions.",
        route: "help",
        icon: "book"
      }
    ],
    toolsPreview: [
      {
        title: "Discord",
        text: "Voice chat, group chat, scheduling, questions, and announcements. A private invite can replace this public link later.",
        linkKey: "discordInvite",
        icon: "discord"
      },
      {
        title: "D&D Beyond",
        text: "Character sheets, character builder, and basic rules lookup.",
        linkKey: "dndBeyondCampaign",
        icon: "beyond"
      },
      {
        title: "Owlbear / Roll20",
        text: "Map tools we may use later once a campaign starts.",
        route: "tools",
        icon: "map"
      }
    ],
    comingLater: [
      "Campaign notes",
      "Party roster",
      "Session recaps",
      "Maps",
      "House rules",
      "Loot tracker"
    ],
    footerNote: "Dungeons Hub is Micheal's table. Built for friends, made for adventure."
  },

  futureLinks: [
    {
      label: "Campaign",
      description: "Coming later",
      route: "campaign",
      icon: "map"
    },
    {
      label: "Characters",
      description: "Coming later",
      route: "characters",
      icon: "wizard"
    },
    {
      label: "Sessions",
      description: "Coming later",
      route: "sessions",
      icon: "book"
    },
    {
      label: "Maps",
      description: "Coming later",
      route: "tools",
      icon: "map"
    },
    {
      label: "DM Admin",
      description: "Static edit links",
      route: "admin",
      icon: "tools"
    }
  ],

  ourTable: {
    title: "How We Play Here",
    compact: "2014 Rules • Level 1 • Main + Companion • Rule of Cool • Roleplay First • Stay With the Party",
    intro: "This is the table-specific source of truth for Micheal's D&D group. Outside guides can help explain the game, but this page says how this table actually plays.",
    atGlance: [
      "2014 D&D 5e",
      "Start at Level 1",
      "Make a Main Character + a Companion Character",
      "Roleplay First",
      "Rule of Cool",
      "Stay With the Party"
    ],
    sections: [
      {
        title: "The Rule of Cool",
        text: [
          "Creative ideas are encouraged. Describe what your character wants to do and why it would be interesting.",
          "The DM may allow it, ask for a roll, add a cost, or introduce a consequence. Rule of Cool means a clever, dramatic, or funny idea gets a fair chance, not an automatic success."
        ],
        bullets: [
          "Fit the scene.",
          "Keep other players involved.",
          "Do not erase all danger.",
          "Do not make another character irrelevant.",
          "Create a memorable result whether it succeeds or fails."
        ]
      },
      {
        title: "Roleplay First, Then Roll",
        text: [
          "This is a roleplaying game, not just a dice-rolling game. Start by saying what your character is trying to do in plain language.",
          "The DM decides whether the action simply works, needs a dice roll, or has a consequence. Do not worry about knowing every rule before speaking up."
        ],
        bullets: [
          "I want to talk the guard into letting us through.",
          "I want to sneak around the back of the building.",
          "I want to jump from the balcony onto the chandelier.",
          "I want to find out whether this merchant is lying."
        ]
      },
      {
        title: "Character Rules for This Table",
        text: [
          "All main characters and companion characters begin at Level 1. This is the beginning of their actual adventuring career, even if they had a life before the campaign.",
          "This table uses 2014 D&D 5e rules, not the 2024 revision. There are no automatic bans inside the approved 2014 material, but unusual or scene-warping options should be discussed with the DM before finalizing."
        ],
        bullets: [
          "Use the 2014 Core Rules and approved 2014/Legacy material.",
          "Exclude 2024 options in D&D Beyond source settings.",
          "Set the character level to 1.",
          "Ask before finalizing unusual subclasses, gear, or build ideas."
        ]
      },
      {
        title: "Recommended First Characters",
        text: [
          "For a first character, the DM recommends familiar fantasy ancestries because they are easy to picture, easy to roleplay, and well supported by the rules.",
          "You are not required to choose one of these. Use halfling in the character builder and on this site."
        ],
        bullets: [
          "Human",
          "Elf",
          "Dwarf",
          "Halfling"
        ]
      },
      {
        title: "Build Two Characters",
        text: [
          "Each player should create a Main Character and a Companion Character. You control only one active player character at a time.",
          "The companion may step in if the main character dies, leaves the story, gets separated, or the DM decides the companion better fits the current situation."
        ],
        bullets: [
          "Both characters start at Level 1.",
          "Both characters should cooperate with the party.",
          "A companion is not an extra combat turn.",
          "Both characters should have a reason to know or support the group."
        ]
      },
      {
        title: "Do Not Split the Party",
        text: [
          "The party should generally stay together. Splitting up makes the game slower, separates players from the action, and can leave a character facing danger without support.",
          "A temporary split can happen when the story requires it, but it should be discussed rather than treated as the default plan."
        ],
        bullets: []
      },
      {
        title: "Your Characters Must Belong Together",
        text: [
          "Your characters should know the other characters before the adventure begins. They can be friends, trusted allies, relatives, fellow travelers, oath-bound companions, or members of the same group.",
          "A character can be grumpy, suspicious, chaotic, sarcastic, secretive, or morally complicated. They should not be designed to sabotage, abandon, steal from, or constantly work against the party."
        ],
        bullets: [
          "Your character should have a reason to want the party to succeed."
        ]
      },
      {
        title: "Ability Scores: Decide Together",
        text: [
          "Do not treat ability scores as finalized until the group discusses them. The table may use a more story-focused method than standard point buy or random rolling.",
          "Bring a character idea to the group discussion, including what the character is naturally good at, what they are bad at, and what kind of adventurer they are trying to become."
        ],
        bullets: []
      },
      {
        title: "Gear Can Become Story",
        text: [
          "Starting gear is not only a list of numbers and weapons. If you have a good story for a notable item, bring it to the DM.",
          "Interesting gear may come with consequences. A powerful item might create debts, enemies, favors, rumors, or future story hooks."
        ],
        bullets: [
          "A family sword with a history.",
          "A battered shield from an old military unit.",
          "A holy symbol from a vanished temple.",
          "A strange wand recovered from a mentor.",
          "A +1 longsword with a believable origin."
        ]
      },
      {
        title: "Rules Corrections Are Welcome",
        text: [
          "The DM may make a mistake or forget a rule. If you notice something, say so respectfully and promptly.",
          "The DM may make a quick ruling to keep play moving, then check the rule afterward. Recurring decisions should be added to the House Rule Log."
        ],
        bullets: [
          "Quick rules check: I think that works this way. Want to look at it?"
        ]
      },
      {
        title: "Tone, Boundaries, and Off-Limits Content",
        text: [
          "The tone may shift between serious, funny, dramatic, ridiculous, tense, or chaotic depending on the moment and the group.",
          "If there is a type of content you do not want in the game, say so during Session Zero, before a session, in Discord, privately with the DM, or during play if something becomes uncomfortable. You do not need to defend or debate a boundary."
        ],
        bullets: []
      }
    ],
    dndBeyondPreflight: {
      title: "Character-Creation Preflight",
      intro: "Do this before opening D&D Beyond so you do not build the wrong kind of sheet.",
      steps: [
        "Read How We Play Here.",
        "Plan a Main Character and a Companion Character.",
        "Use 2014 D&D 5e rules and exclude 2024 options.",
        "Set both characters to Level 1.",
        "Choose a character concept before choosing rules options.",
        "Choose race, class, background, traits, and gear from approved 2014 material.",
        "Pause at ability scores until the group and DM decide the method.",
        "Connect both characters to the party.",
        "Bring unusual gear, unusual class options, or special story ideas to the DM.",
        "Ask questions before finalizing."
      ]
    },
    nextSteps: [
      "Read the beginner character guide.",
      "Choose a concept for your Main Character.",
      "Choose a concept for your Companion Character.",
      "Use the 2014 source settings in D&D Beyond.",
      "Stop before finalizing ability scores if the group has not decided the method yet.",
      "Give both characters a reason to know and support the party.",
      "Bring unusual gear, unusual class options, or special story ideas to the DM.",
      "Ask questions early."
    ],
    houseRuleLog: [
      {
        name: "House Rule Log",
        changes: "This log is the final reference for table-specific rule changes.",
        why: "House rules should not live only in Discord messages or memory.",
        dateAdded: "2026-06-19",
        status: "Active",
        example: "When the DM makes a recurring ruling, it gets recorded here with the reason and an example."
      },
      {
        name: "Six-Player Streamlining",
        changes: "Specific streamlining rules will be added after the DM names them.",
        why: "The DM has said some rulings were created, and more may emerge, to keep a six-person group moving.",
        dateAdded: "TBD",
        status: "Proposed",
        example: "A future combat pacing rule, turn timing guideline, or simplified procedure can be logged here once approved."
      }
    ],
    learnMore: [
      {
        type: "Official 2014 rules",
        label: "D&D Beyond Basic Rules (2014): Step-By-Step Characters",
        url: "https://www.dndbeyond.com/sources/dnd/basic-rules-2014/step-by-step-characters",
        description: "Official 2014 character creation reference. This table uses 2014 D&D 5e and starts at Level 1."
      },
      {
        type: "Builder interface",
        label: "D&D Beyond: Content Categories",
        url: "https://dndbeyond-support.wizards.com/hc/en-us/articles/7747201820948-Enabling-Content-Categories-for-your-Character-Sheet",
        description: "Use this to understand source toggles. For this table, exclude 2024 options and use approved 2014 material."
      },
      {
        type: "Session Zero",
        label: "Sly Flourish: Running Session Zeros",
        url: "https://slyflourish.com/running_session_zeros.html",
        description: "Helpful community guidance for expectations, boundaries, character integration, and house rules."
      },
      {
        type: "Tool guide",
        label: "Roll20: How to Create a Character",
        url: "https://help.roll20.net/hc/en-us/articles/360046574454-How-to-Create-a-Character",
        description: "Interface help if the table later uses Roll20. It does not replace this table's D&D Beyond and 2014 rules instructions."
      }
    ]
  },

  start: {
    intro: [
      "Dungeons & Dragons is a tabletop roleplaying game. That means a group of people talks through an adventure together, each player controls a fictional character, and rules plus dice help decide what happens when the outcome is uncertain.",
      "If you have never played any roleplaying game before, think of it as cooperative make-believe with structure. You are not trying to beat the other players. You are working with them to solve problems, survive trouble, and create memorable scenes.",
      "You do not need to memorize the rules before showing up. The most important skill is simple: say what your character is trying to do. The DM will help translate that into the rules when rules are needed."
    ],
    bigIdea: {
      title: "The whole game in one sentence",
      text: "The DM describes a situation, the players say what their characters do, dice are rolled when the result is uncertain, and the group reacts to what happens next."
    },
    coreLoop: [
      "Listen to what the DM says is happening.",
      "Picture where your character is and what they care about.",
      "Say what your character tries to do in plain language.",
      "If the result is obvious, the DM may just say what happens.",
      "If the result is uncertain or risky, the DM asks for a roll.",
      "Roll the die, usually a d20, and add the number your sheet tells you.",
      "The DM explains the result, then the story moves forward."
    ],
    characterCreation: {
      note: "Character creation is part rules, part imagination, and part table agreement. For this table, read How We Play Here first: 2014 D&D 5e, Level 1, Main Character plus Companion Character, roleplay first, and ability scores paused until the group decides the method.",
      fundamentalGuidelines: [
        "This table uses 2014 D&D 5e. Exclude 2024 options in D&D Beyond and use approved 2014 material.",
        "All main characters and companion characters start at Level 1.",
        "Build a Main Character and a Companion Character, but expect to control only one active character at a time.",
        "Nothing is categorically banned inside approved 2014 material, but unusual choices should be discussed before finalizing.",
        "Make a character who wants to cooperate with the party. A loner can be fun, but they still need a reason to play with the group.",
        "Connect both characters to the other characters before the adventure begins.",
        "Do not finalize ability scores until the group and DM decide the method.",
        "Bring notable gear stories, unusual class options, and special ideas to the DM.",
        "Build someone competent enough to contribute. They do not need to be optimized, but they should be able to help the group.",
        "Keep the backstory short at first. One paragraph and a few clear motivations are usually better than five pages."
      ],
      dmQuestions: [
        "Which 2014 books or D&D Beyond source categories are approved?",
        "Should I use 2014 Core Rules only, or are 2014 Expanded/Legacy options allowed too?",
        "How are ability scores generated for this table?",
        "Do we use starting equipment, starting gold, DM-given gear, or story-pitched gear?",
        "What unusual class, subclass, gear, or character idea should I ask about before finalizing?",
        "How should my Main Character know the party?",
        "How should my Companion Character know the party?",
        "What tone or boundaries should I know before writing backstory?",
        "Are there active house rules in the House Rule Log that affect my build?"
      ],
      creationSteps: [
        {
          title: "1. Read How We Play Here",
          text: "This table uses 2014 D&D 5e, starts at Level 1, asks each player to build a Main Character and a Companion Character, and expects roleplay first."
        },
        {
          title: "2. Build a Main Character and a Companion",
          text: "Your Main Character is your primary adventurer. Your Companion Character is a backup or story fit the DM can bring in when needed. You control only one active character at a time."
        },
        {
          title: "3. Use 2014 rules and exclude 2024 options",
          text: "In D&D Beyond, use the source/content filters to avoid 2024 options and build from approved 2014 material. Ask before finalizing if the source settings are unclear."
        },
        {
          title: "4. Choose a character concept",
          text: "Pick a plain idea before touching too many rules. Examples: careful archer, kind healer, curious wizard, loud sword fighter, sneaky investigator, cursed magic user, protective bodyguard."
        },
        {
          title: "5. Choose race, class, background, traits, and gear",
          text: "These are the main building blocks. Race describes ancestry, class is your adventuring profession, background is your life before adventure, traits/features are special rules, and gear is what you carry."
        },
        {
          title: "6. Pause at ability scores until the group decision",
          text: "Ability scores are Strength, Dexterity, Constitution, Intelligence, Wisdom, and Charisma. Do not treat them as final until the DM and group decide the method."
        },
        {
          title: "7. Connect both characters to the party",
          text: "Each character should know, trust, owe, support, or share a cause with the party. Do not design a character whose main behavior is sabotaging or abandoning the group."
        },
        {
          title: "8. Finalize with the DM",
          text: "Send the sheet to the DM before Session Zero or game night. The DM can catch source mismatches, missing choices, unclear ability scores, and story ideas that need approval."
        }
      ],
      characterParts: [
        {
          name: "Concept",
          text: "The short idea that makes the character easy to understand. Concept comes before optimization."
        },
        {
          name: "Class / Profession",
          text: "The main adventuring role and rule package: fighter, rogue, cleric, wizard, bard, ranger, and so on."
        },
        {
          name: "Species / Race / Ancestry",
          text: "The kind of people your character belongs to. The exact word depends on rules version and game system."
        },
        {
          name: "Background",
          text: "What shaped your character before adventuring. This connects story to skills, tools, gear, and sometimes ability scores or feats."
        },
        {
          name: "Ability Scores",
          text: "The six core numbers that describe physical, mental, and social strengths."
        },
        {
          name: "Proficiencies",
          text: "Training bonuses for skills, saves, weapons, armor, tools, and other capabilities."
        },
        {
          name: "Features",
          text: "Special rules from class, species, background, feats, spells, or other choices."
        },
        {
          name: "Equipment",
          text: "Weapons, armor, adventuring gear, tools, supplies, money, and special items."
        },
        {
          name: "Personality",
          text: "How the character behaves: habits, goals, fears, beliefs, bonds, flaws, and what makes them fun to play."
        }
      ],
      abilityScores: [
        {
          name: "Strength",
          text: "Physical power. Useful for heavy weapons, athletics, lifting, pushing, grappling, and wearing some armor."
        },
        {
          name: "Dexterity",
          text: "Agility and reflexes. Useful for stealth, initiative, ranged attacks, finesse weapons, armor class, and avoiding danger."
        },
        {
          name: "Constitution",
          text: "Toughness and stamina. Useful for hit points, resisting poison, holding concentration, and surviving punishment."
        },
        {
          name: "Intelligence",
          text: "Reasoning and study. Useful for knowledge skills, investigation, and wizard magic."
        },
        {
          name: "Wisdom",
          text: "Awareness and judgment. Useful for perception, insight, survival, and classes like cleric, druid, monk, and ranger."
        },
        {
          name: "Charisma",
          text: "Presence and force of personality. Useful for persuasion, deception, intimidation, performance, and classes like bard, sorcerer, paladin, and warlock."
        }
      ],
      classes: [
        {
          name: "Barbarian",
          text: "Durable front-line warrior built around rage, toughness, and big physical hits."
        },
        {
          name: "Bard",
          text: "Flexible magic-and-skill character who supports allies, handles social scenes, and solves problems creatively."
        },
        {
          name: "Cleric",
          text: "Divine spellcaster who can heal, protect, fight, and bring strong utility depending on domain or subclass."
        },
        {
          name: "Druid",
          text: "Nature-based spellcaster with strong control, support, survival tools, and often shapeshifting."
        },
        {
          name: "Fighter",
          text: "Weapon expert and one of the easiest first classes. Good for learning attacks, armor, and tactical positioning."
        },
        {
          name: "Monk",
          text: "Fast martial artist using movement, discipline, unarmed strikes, and precise defensive tools."
        },
        {
          name: "Paladin",
          text: "Armored warrior with divine magic, protection, burst damage, and a strong oath or code."
        },
        {
          name: "Ranger",
          text: "Explorer and skirmisher with weapons, tracking, survival tools, and some nature magic."
        },
        {
          name: "Rogue",
          text: "Skill expert who uses stealth, precision, mobility, and clever positioning."
        },
        {
          name: "Sorcerer",
          text: "Innate spellcaster whose magic comes from bloodline, fate, strange power, or supernatural origin."
        },
        {
          name: "Warlock",
          text: "Pact-based magic user with fewer spell slots, strong repeatable tricks, and unusual powers."
        },
        {
          name: "Wizard",
          text: "Studied spellcaster with a spellbook, broad utility, and many options to learn over time."
        }
      ],
      species: [
        {
          name: "Human",
          text: "Flexible and familiar. Often a good beginner pick because the concept is easy to picture."
        },
        {
          name: "Elf",
          text: "Graceful, long-lived, and often tied to keen senses, magic, agility, or old traditions."
        },
        {
          name: "Dwarf",
          text: "Sturdy and resilient. Often tied to endurance, craft, stone, armor, and strong communities."
        },
        {
          name: "Halfling",
          text: "Small, brave, lucky, and often good for nimble or quietly heroic characters."
        },
        {
          name: "Dragonborn",
          text: "Draconic people often associated with breath weapons, elemental themes, and bold presence."
        },
        {
          name: "Gnome",
          text: "Small, clever, curious, and often tied to invention, illusion, or strange knowledge."
        },
        {
          name: "Tiefling",
          text: "People with infernal or other supernatural heritage. Good for outsider, dramatic, or magic-flavored concepts."
        },
        {
          name: "Orc / Half-Orc",
          text: "Often strong, intense, and physically capable. Availability and exact rules depend on the source and DM."
        },
        {
          name: "Other options",
          text: "Many books add more choices. Do not assume they are available until the DM approves them."
        }
      ],
      backgrounds: [
        {
          name: "What it means",
          text: "Background answers: what did this person do before adventure? It gives the character a normal-life anchor."
        },
        {
          name: "Mechanical impact",
          text: "Depending on rules version, it can grant skills, tools, languages, equipment, ability score increases, or an origin feat."
        },
        {
          name: "Story impact",
          text: "It tells the DM what kinds of people, places, habits, or obligations might matter to your character."
        },
        {
          name: "Beginner advice",
          text: "Pick a background that explains your skills and gives the DM an easy hook. Soldier, sage, criminal, acolyte, entertainer, artisan, guard, and farmer are all easy to understand."
        }
      ],
      traits: [
        {
          name: "Mechanical traits",
          text: "Rules text that changes what your character can do: darkvision, extra movement, spellcasting, weapon training, a class feature, or a feat."
        },
        {
          name: "Personality traits",
          text: "Small behaviors that make the character feel alive: polite, suspicious, reckless, curious, formal, protective, awkward, charming."
        },
        {
          name: "Ideals",
          text: "Values the character believes in: freedom, honor, knowledge, family, faith, survival, justice, glory, peace."
        },
        {
          name: "Bonds",
          text: "People, places, promises, objects, or duties the character cares about."
        },
        {
          name: "Flaws",
          text: "Problems that create drama without ruining the table: pride, guilt, impatience, fear, greed, naivety, stubbornness."
        },
        {
          name: "Feats",
          text: "Special perks that grant new abilities. In newer rules, backgrounds may grant an origin feat. The DM decides what feat options are allowed."
        }
      ],
      dndBeyondSteps: [
        "Create or sign in to a D&D Beyond account.",
        "Open My Characters or the character builder.",
        "Use the DM's campaign link once Micheal adds one. Until then, build a test character privately.",
        "Open source/content preferences and exclude 2024 options.",
        "Use approved 2014 Core Rules, 2014 Expanded Rules, or Legacy material as the DM allows.",
        "Set the character level to 1.",
        "Choose class, species, background, and ability scores.",
        "Pause before finalizing ability scores if the group has not decided the method.",
        "Select skills, proficiencies, equipment, and spells if your class uses magic.",
        "Open the final character sheet and check AC, HP, attacks, saving throws, skills, equipment, and spell list.",
        "Send the character sheet link to the DM for approval before session zero or game night."
      ],
      beginnerBuildAdvice: [
        "For the first character, simple is good. Fighter, rogue, cleric, and wizard are classic anchors, but any class can work if you are willing to ask questions.",
        "Do not chase a powerful internet build before you understand the table. A character that fits the group is better than a spreadsheet monster.",
        "Put your highest score in the ability your class actually uses most.",
        "Pick two or three things your character is good at. You do not need to be good at everything.",
        "If you want magic but feel nervous, choose a smaller spell list or ask someone to help you pick reliable spells.",
        "If you want the easiest combat turn, choose a weapon-focused character and learn movement, attack rolls, damage, and reactions first.",
        "If you want social scenes, choose skills and personality that make you comfortable talking in character or describing what you say.",
        "A good beginner backstory answers: Where did I come from? What do I want? Why am I with the party?"
      ],
      references: [
        {
          type: "Official 2014 rules",
          label: "D&D Beyond Basic Rules (2014): Step-By-Step Characters",
          url: "https://www.dndbeyond.com/sources/dnd/basic-rules-2014/step-by-step-characters",
          description: "Official 2014 character creation reference. This table uses 2014 D&D 5e and starts at Level 1."
        },
        {
          type: "Builder interface",
          label: "D&D Beyond: Content Categories",
          url: "https://dndbeyond-support.wizards.com/hc/en-us/articles/7747201820948-Enabling-Content-Categories-for-your-Character-Sheet",
          description: "Use this to understand source toggles. For this table, exclude 2024 options and use approved 2014 material."
        },
        {
          type: "Official tool",
          label: "D&D Beyond Character Builder",
          url: "https://www.dndbeyond.com/My-Characters",
          description: "Build and manage a digital sheet after you complete the table preflight."
        },
        {
          type: "Tool guide",
          label: "Roll20: How to Create a Character",
          url: "https://help.roll20.net/hc/en-us/articles/360046574454-How-to-Create-a-Character",
          description: "Interface help if the table later uses Roll20. It does not replace this table's D&D Beyond and 2014 rules instructions."
        },
        {
          type: "Session Zero",
          label: "Sly Flourish: Running Session Zeros",
          url: "https://slyflourish.com/running_session_zeros.html",
          description: "Practical advice for aligning expectations, tying characters together, and setting boundaries before a campaign."
        }
      ],
      summaryNote: "Exact traits, ability bonuses, names, and source availability vary between 2014 rules, 2024 rules, table house rules, and purchased books. Treat these tables as orientation, then confirm with the DM.",
      raceSummaries: [
        {
          name: "Human",
          summary: "Versatile, familiar, and easy to picture.",
          beginnerUse: "Good for nearly any class or first character concept."
        },
        {
          name: "Dwarf",
          summary: "Sturdy, tough, and often tied to craft, stone, armor, and endurance.",
          beginnerUse: "Great for fighters, clerics, paladins, and other durable builds."
        },
        {
          name: "Elf",
          summary: "Graceful, long-lived, perceptive, and often tied to magic, archery, or old traditions.",
          beginnerUse: "Good for rogues, rangers, wizards, druids, and nimble characters."
        },
        {
          name: "Halfling",
          summary: "Small, brave, nimble, and often lucky or quietly heroic.",
          beginnerUse: "Good for rogues, bards, rangers, and sneaky or cheerful characters."
        },
        {
          name: "Dragonborn",
          summary: "Draconic people with a bold presence and elemental flavor.",
          beginnerUse: "Good for paladins, fighters, barbarians, sorcerers, and dramatic concepts."
        },
        {
          name: "Gnome",
          summary: "Small, clever, curious, and often tied to invention, illusion, or strange knowledge.",
          beginnerUse: "Good for wizards, artificer-style concepts if allowed, and curious problem-solvers."
        },
        {
          name: "Tiefling",
          summary: "Charismatic outsiders with supernatural or infernal flavor.",
          beginnerUse: "Good for bards, warlocks, sorcerers, and characters with a dramatic edge."
        },
        {
          name: "Orc / Half-Orc",
          summary: "Strong, intense, and physically capable, depending on the rules source.",
          beginnerUse: "Good for barbarians, fighters, paladins, and hard-hitting warriors."
        }
      ],
      classSummaries: [
        {
          name: "Barbarian",
          role: "Front-line brawler",
          beginnerNote: "High hit points, rage, and big melee hits. Straightforward in combat."
        },
        {
          name: "Bard",
          role: "Support and social expert",
          beginnerNote: "Magic, skills, inspiration, and social flexibility. Lots of choices."
        },
        {
          name: "Cleric",
          role: "Divine support caster",
          beginnerNote: "Healing, protection, armor, and strong spells. Good if you like helping the party."
        },
        {
          name: "Druid",
          role: "Nature caster",
          beginnerNote: "Nature magic, control, support, and shapeshifting. Powerful but more complex."
        },
        {
          name: "Fighter",
          role: "Weapon and armor expert",
          beginnerNote: "One of the easiest first classes. Learn attacks, armor, positioning, and tactics."
        },
        {
          name: "Monk",
          role: "Fast martial artist",
          beginnerNote: "Mobile, precise, and resource-based. Best if you like movement and quick decisions."
        },
        {
          name: "Paladin",
          role: "Holy warrior",
          beginnerNote: "Armor, melee damage, support magic, and big smites. Strong but has several systems."
        },
        {
          name: "Ranger",
          role: "Scout and skirmisher",
          beginnerNote: "Weapons, exploration, survival, and some nature magic."
        },
        {
          name: "Rogue",
          role: "Stealth and skill expert",
          beginnerNote: "Great skills, mobility, and Sneak Attack. Strong choice for careful players."
        },
        {
          name: "Sorcerer",
          role: "Innate spellcaster",
          beginnerNote: "Charisma magic with fewer spells known. Easier than wizard in some ways, but spell choices matter."
        },
        {
          name: "Warlock",
          role: "Pact spellcaster",
          beginnerNote: "Strange powers, reliable magical attacks, and fewer spell slots that refresh quickly."
        },
        {
          name: "Wizard",
          role: "Studied spellcaster",
          beginnerNote: "Huge spell options and utility. Rewarding, but reading your spells matters."
        }
      ],
      keyConcepts: [
        {
          term: "Ability Scores",
          definition: "The six core stats: Strength, Dexterity, Constitution, Intelligence, Wisdom, and Charisma."
        },
        {
          term: "Ability Check",
          definition: "A d20 roll to see if an action works when the result is uncertain."
        },
        {
          term: "Skill",
          definition: "A trained area connected to an ability score, such as Stealth, Perception, Persuasion, or History."
        },
        {
          term: "Saving Throw",
          definition: "A roll to resist danger, such as poison, a spell, a trap, or a sudden blast."
        },
        {
          term: "Armor Class (AC)",
          definition: "The number an attacker usually needs to meet or beat to hit you."
        },
        {
          term: "Hit Points (HP)",
          definition: "How much harm your character can take before dropping to 0 hit points."
        },
        {
          term: "Proficiency Bonus",
          definition: "A bonus added when your character is trained with a skill, save, weapon, tool, or other feature."
        },
        {
          term: "Advantage",
          definition: "Roll two d20s and use the higher result."
        },
        {
          term: "Disadvantage",
          definition: "Roll two d20s and use the lower result."
        },
        {
          term: "Darkvision",
          definition: "A trait that helps some characters see in darkness, within limits set by the rules."
        }
      ],
      exampleCharacters: [
        {
          name: "Bruenor Stonehelm",
          race: "Dwarf",
          className: "Fighter",
          level: 1,
          stats: { STR: 17, DEX: 10, CON: 16, INT: 8, WIS: 13, CHA: 12 },
          hp: 13,
          ac: 18,
          role: "Frontline warrior",
          description: "Tough shield-and-axe fighter who stands in front and protects the party."
        },
        {
          name: "Elara Dawnlight",
          race: "Human",
          className: "Cleric",
          level: 1,
          stats: { STR: 11, DEX: 11, CON: 15, INT: 9, WIS: 16, CHA: 14 },
          hp: 10,
          ac: 18,
          role: "Healer and support",
          description: "Armored divine caster who can heal allies, protect the group, and still fight."
        },
        {
          name: "Tamsin Underbough",
          race: "Halfling",
          className: "Rogue",
          level: 1,
          stats: { STR: 8, DEX: 17, CON: 13, INT: 10, WIS: 13, CHA: 14 },
          hp: 9,
          ac: 15,
          role: "Scout and skirmisher",
          description: "Sneaky, quick, and useful for traps, locks, scouting, and precision damage."
        },
        {
          name: "Rhogar Flameheart",
          race: "Dragonborn",
          className: "Barbarian",
          level: 1,
          stats: { STR: 16, DEX: 13, CON: 14, INT: 8, WIS: 12, CHA: 10 },
          hp: 14,
          ac: 14,
          role: "Melee damage",
          description: "Hard-hitting front-line bruiser who uses rage and draconic flavor."
        }
      ],
      sessionZeroChecklist: [
        {
          topic: "Campaign premise",
          text: "What kind of story are we playing, and what should characters care about?"
        },
        {
          topic: "Tone and boundaries",
          text: "Agree on serious, silly, scary, heroic, or gritty tone, plus any topics to avoid."
        },
        {
          topic: "Allowed content",
          text: "Confirm rules version, source books, homebrew, species, classes, feats, spells, and starting level."
        },
        {
          topic: "House rules",
          text: "Clarify any local changes before players make choices that depend on them."
        },
        {
          topic: "Party integration",
          text: "Decide whether characters know each other, why they cooperate, and what ties them together."
        },
        {
          topic: "Tools and logistics",
          text: "Confirm Discord, D&D Beyond, map tool, schedule, session length, microphone setup, and recap location."
        },
        {
          topic: "First test scene",
          text: "Optionally run a small scene or encounter so everyone can test sheets, rolls, and table flow."
        }
      ]
    },
    lessons: [
      {
        title: "1. What is a roleplaying game?",
        summary: "A roleplaying game is a conversation where everyone controls part of a shared imaginary situation.",
        points: [
          "The DM controls the world: places, weather, danger, enemies, helpful people, and consequences.",
          "Each player controls one main character: what they say, what they try, and how they react.",
          "The rules give the table a fair way to handle risk, limits, combat, magic, and character abilities.",
          "The dice add uncertainty. They do not replace common sense or player choices."
        ],
        example: "DM: The old door is swollen shut. Player: I put my shoulder into it and try to force it open. DM: Roll a Strength check."
      },
      {
        title: "2. What do I actually do as a player?",
        summary: "You make choices for your character. You do not need to speak in a fancy voice or know the perfect rule.",
        points: [
          "Ask questions about what your character can see, hear, or remember.",
          "Tell the DM what your character tries to do.",
          "Work with the party instead of treating the table like a solo game.",
          "Use your character sheet when the DM asks for a roll, attack, spell, skill, or saving throw.",
          "If you are stuck, say what you want, not what rule you think applies."
        ],
        example: "Instead of saying, 'Can I use Investigation?', you can say, 'I check the desk for hidden notes.' The DM will tell you whether to roll Investigation."
      },
      {
        title: "3. What does the DM do?",
        summary: "The Dungeon Master runs the situation so the players have something to respond to.",
        points: [
          "The DM describes scenes, obstacles, creatures, and other people in the world.",
          "The DM asks for rolls when an action has risk or uncertainty.",
          "The DM plays enemies and non-player characters, often called NPCs.",
          "The DM makes rulings when the rules are unclear or when speed matters.",
          "The DM is not the enemy. The DM creates challenge, but the goal is a good game."
        ],
        example: "The DM might say, 'The bridge is cracked and swaying. You can cross slowly, look for another way, or try something else.'"
      },
      {
        title: "4. What is my character?",
        summary: "Your character is your piece of the story: a person in the fantasy world with abilities, limits, gear, and opinions.",
        points: [
          "A character has a name, class, level, ancestry or species, equipment, and special features.",
          "The class is the character's main adventuring style, such as fighter, rogue, cleric, wizard, bard, or ranger.",
          "The sheet tracks numbers so you do not have to remember everything.",
          "You can describe personality in simple terms: brave, nervous, curious, loud, careful, kind, greedy, protective.",
          "You are allowed to make imperfect choices. Good stories often come from messy decisions."
        ],
        example: "A fighter might stand in front and protect others. A rogue might scout ahead. A cleric might heal and support. These are habits, not strict jobs."
      },
      {
        title: "5. How do dice work?",
        summary: "Dice decide uncertain outcomes. The most common die is the d20, a twenty-sided die.",
        points: [
          "When the DM asks for a d20 roll, roll the d20 and add the bonus from your sheet.",
          "Higher is usually better.",
          "The DM compares your total to a target number called a DC, or to an enemy's Armor Class for attacks.",
          "Advantage means roll two d20s and use the higher result.",
          "Disadvantage means roll two d20s and use the lower result.",
          "Other dice, like d4, d6, d8, d10, and d12, are often used for damage or healing."
        ],
        example: "If you roll 14 and your sheet says +3, your total is 17."
      },
      {
        title: "6. When do I roll?",
        summary: "Do not roll first and ask later. Describe the action, then wait for the DM to ask for a roll if one is needed.",
        points: [
          "If something is easy and there is no pressure, the DM may say it works without a roll.",
          "If something is impossible, a high roll may not make it happen.",
          "If something is risky, contested, hidden, rushed, or dramatic, the DM may ask for a roll.",
          "The DM chooses the type of roll because the situation determines the rule.",
          "A failed roll is not always a dead end. It may mean delay, cost, danger, noise, or a partial result."
        ],
        example: "Opening an unlocked door usually needs no roll. Picking a locked door while guards are nearby probably does."
      },
      {
        title: "7. What is a character sheet?",
        summary: "The character sheet is the control panel for your character.",
        points: [
          "Armor Class, or AC, shows how hard you are to hit.",
          "Hit points, or HP, show how much damage you can take before going down.",
          "Skills are things your character may be trained to do, like Stealth, Persuasion, or Perception.",
          "Attacks show what weapons or powers you can use in combat.",
          "Spells are magical options, if your character has them.",
          "Features are special abilities from your class, ancestry or species, background, or other choices."
        ],
        example: "If the DM asks for Perception, look for Perception on your sheet and roll a d20 plus that number."
      },
      {
        title: "8. How does a normal scene work?",
        summary: "Most of the game is not combat. It is exploring, asking questions, making plans, and trying things.",
        points: [
          "Ask what your character notices if you are unsure what matters.",
          "Talk to NPCs like they are people, not vending machines for quests.",
          "Tell the group your plan before doing something risky.",
          "Share the spotlight. If someone has not talked in a while, leave room for them.",
          "You can always ask, 'What are my options here?'"
        ],
        example: "A village scene might involve asking locals questions, checking a ruined house, buying supplies, and deciding where to travel next."
      },
      {
        title: "9. How does combat work?",
        summary: "Combat is turn-based so everyone gets a fair chance to act.",
        points: [
          "The DM says combat starts.",
          "Everyone rolls initiative to set turn order.",
          "On your turn, you can usually move and take one main action.",
          "Some characters also have a bonus action.",
          "Some situations let you use a reaction outside your turn.",
          "Common actions include Attack, Cast a Spell, Dash, Disengage, Dodge, Help, Hide, Ready, Search, and Use an Object.",
          "When your turn comes up, say what you want to accomplish. The table can help with the exact buttons or numbers."
        ],
        example: "Player: I move behind the fallen cart and shoot the nearest skeleton with my bow. DM: Great, roll an attack."
      },
      {
        title: "10. How do I avoid feeling lost?",
        summary: "Feeling lost at first is normal. You are learning a game, a character sheet, and a group style all at once.",
        points: [
          "Ask short questions as soon as you are confused.",
          "Say your goal in plain language: 'I want to protect them,' 'I want to escape,' or 'I want to find the clue.'",
          "Use Help / Glossary when a word sounds unfamiliar.",
          "Let the DM know if too much is happening too fast.",
          "Take simple notes: names, places, promises, clues, and things the party still needs to do."
        ],
        example: "Good beginner question: 'What can I do on my turn that would help right now?'"
      }
    ],
    commonPhrases: [
      {
        situation: "You do not know what to do",
        phrase: "What do I see, and what seems urgent?"
      },
      {
        situation: "You want to try something",
        phrase: "I want to try to..."
      },
      {
        situation: "You do not know which skill applies",
        phrase: "Which roll should I make for that?"
      },
      {
        situation: "Combat reaches your turn",
        phrase: "I want to move here and attack/cast/help/hide."
      },
      {
        situation: "A rule is confusing",
        phrase: "Can someone walk me through that once?"
      },
      {
        situation: "You need a quick option",
        phrase: "What is the simple useful thing I can do?"
      }
    ],
    tableMindset: [
      "D&D is cooperative. Help the party and let other people have moments.",
      "You can make jokes, but do not drown out the scene.",
      "Do not move another player's token or edit another player's character sheet.",
      "Player-versus-player conflict needs consent and DM approval.",
      "Respect boundaries. If something at the table is uncomfortable, say so or message the DM.",
      "The goal is not perfect play. The goal is a fun shared night."
    ],
    checklist: [
      "Join Discord.",
      "Create a D&D Beyond account.",
      "Read the Start Here guide.",
      "Look through the Help / Glossary page.",
      "Test your microphone.",
      "Read the table rules.",
      "Wait for Micheal to add the campaign link when the campaign starts."
    ]
  },

  tools: [
    {
      name: "D&D Beyond",
      linkKey: "dndBeyondCampaign",
      buttonLabel: "Open D&D Beyond",
      what: "A website for character sheets, character building, rules lookup, leveling, spells, features, and equipment.",
      playersUse: "Players use it to open their sheet, create or level a character, check attacks and spells, and look up basic rules.",
      dmUse: "The DM uses it to keep the campaign roster organized and help players check rules or character options."
    },
    {
      name: "Discord",
      linkKey: "discordInvite",
      buttonLabel: "Open Discord",
      what: "The group voice and text space for game night, scheduling, announcements, recaps, and side questions.",
      playersUse: "Players use it for voice chat, session scheduling, between-session questions, and table community.",
      dmUse: "The DM uses it to run voice chat, post reminders, share recaps, and keep table communication in one place."
    },
    {
      name: "Owlbear Rodeo",
      linkKey: "owlbearRoom",
      buttonLabel: "Open Owlbear Rodeo",
      what: "A lightweight virtual tabletop, or VTT, for maps, tokens, movement, positioning, fog, and visual combat reference.",
      playersUse: "Players use it to see the scene, move their token when allowed, and understand where characters and enemies are.",
      dmUse: "The DM uses it to prepare maps, control hidden areas, place enemies, and show important locations."
    },
    {
      name: "Roll20",
      linkKey: "roll20Game",
      buttonLabel: "Open Roll20",
      what: "An optional heavier virtual tabletop. Use it only if the campaign chooses Roll20 instead of Owlbear Rodeo.",
      playersUse: "Players can ignore Roll20 unless the DM says this campaign is using it.",
      dmUse: "The DM may use it for maps, tokens, sheets, or built-in tabletop tools if Owlbear is not enough."
    }
  ],

  party: [
    {
      player: "Player One",
      character: "Character One",
      className: "Fighter",
      level: 3,
      ancestry: "Human",
      role: "Frontline",
      ac: 17,
      hp: "28 / 28",
      passivePerception: 12,
      sheetUrl: "#",
      description: "Replace this with the DM-approved character summary."
    },
    {
      player: "Player Two",
      character: "Character Two",
      className: "Rogue",
      level: 3,
      ancestry: "Halfling",
      role: "Scout",
      ac: 15,
      hp: "21 / 21",
      passivePerception: 14,
      sheetUrl: "#",
      description: "Replace this with the DM-approved character summary."
    },
    {
      player: "Player Three",
      character: "Character Three",
      className: "Cleric",
      level: 3,
      ancestry: "Dwarf",
      role: "Support",
      ac: 18,
      hp: "25 / 25",
      passivePerception: 13,
      sheetUrl: "#",
      description: "Replace this with the DM-approved character summary."
    },
    {
      player: "Player Four",
      character: "Character Four",
      className: "Wizard",
      level: 3,
      ancestry: "Elf",
      role: "Controller",
      ac: 12,
      hp: "18 / 18",
      passivePerception: 11,
      sheetUrl: "#",
      description: "Replace this with the DM-approved character summary."
    }
  ],

  roles: {
    people: [
      {
        name: "Dungeon Master / DM",
        text: "The DM describes the world, plays the people and monsters in it, applies the rules, and keeps the game moving."
      },
      {
        name: "Player",
        text: "A player controls one main character and decides what that character tries to do."
      },
      {
        name: "Party",
        text: "The party is the group of player characters. D&D works best when the party cooperates."
      },
      {
        name: "Rules Helper",
        text: "A player who helps look up rules when asked. The DM still makes the final call during play."
      },
      {
        name: "Note-Taker",
        text: "A player who writes down names, clues, loot, and unanswered questions so the group remembers them later."
      },
      {
        name: "Scheduler",
        text: "A player who helps confirm dates, times, and who can attend the next session."
      }
    ],
    characters: [
      {
        name: "Frontline",
        text: "Usually stands near danger, protects allies, and takes hits."
      },
      {
        name: "Damage",
        text: "Focuses on hurting enemies quickly."
      },
      {
        name: "Support",
        text: "Helps allies with healing, protection, bonuses, or problem solving."
      },
      {
        name: "Controller",
        text: "Changes the battlefield with spells, obstacles, conditions, or movement control."
      },
      {
        name: "Scout",
        text: "Looks ahead, notices danger, handles stealth, and checks for traps."
      },
      {
        name: "Face",
        text: "Does a lot of talking with important non-player characters, also called NPCs."
      },
      {
        name: "Utility",
        text: "Solves unusual problems with flexible skills, tools, magic, or creative thinking."
      }
    ],
    note: "D&D does not require rigid MMO-style roles. These labels are just shortcuts for understanding how a character often helps the party."
  },

  rules: {
    official: [
      "This table uses 2014 D&D 5e and starts at Level 1.",
      "Official rules come from Wizards of the Coast books and official rules sources, but this table's source settings must stay on approved 2014 material.",
      "Use D&D Beyond Basic Rules (2014) when you need the official character creation reference.",
      "The table does not need to stop for every rule lookup. If the answer is slow to find, the DM may make a temporary ruling and check later."
    ],
    dmRulings: [
      "The DM applies and interprets rules during play.",
      "A DM ruling is the table decision for the moment so the game can keep moving.",
      "Rules questions are welcome, but argue less during the scene and revisit complicated calls after the session.",
      "Recurring rulings should be recorded in the House Rule Log."
    ],
    houseRules: [
      {
        title: "House Rule Log",
        text: "The House Rule Log below is the final reference for table-specific rule changes. If a recurring ruling is not logged, ask the DM before treating it as permanent."
      },
      {
        title: "Six-Player Streamlining",
        text: "The DM has said some rulings were created, and more may emerge, to keep a six-person group moving. Specific streamlining rules will be added once the DM names them."
      }
    ],
    tableRules: [
      "Be on time or tell the group as early as possible if you will be late.",
      "Roleplay first, then roll. Say what your character tries to do; the DM will call for rolls when they matter.",
      "Creative ideas are welcome, but Rule of Cool still needs scene fit, shared spotlight, danger, and consequences.",
      "Stay with the party unless the group and DM agree a temporary split makes sense.",
      "Make characters who have a reason to know, support, and cooperate with the party.",
      "Do not talk over people during important scenes.",
      "Do not move other players' tokens unless they ask you to.",
      "Do not edit other players' character sheets.",
      "Player-versus-player actions require consent from the affected player and DM approval.",
      "Do not spoil hidden map areas or read DM-only material.",
      "Respect boundaries. If a scene is uncomfortable, say so and the table will adjust without requiring debate."
    ],
    toolRules: [
      "Mute when background noise is bad.",
      "Use the correct Discord channel for scheduling, recaps, and side questions.",
      "Do not move hidden tokens or reveal covered map areas.",
      "Keep character links updated when your sheet changes.",
      "If a tool breaks, tell the DM and use the fallback link or a simple verbal description."
    ]
  },

  campaignDetails: {
    premise: "TBD - the DM will add the campaign premise.",
    currentLocation: "TBD - the DM will add the current location.",
    currentQuest: "TBD - the DM will add the current quest.",
    tone: "TBD - the DM will add the campaign tone.",
    knownNpcs: [
      "TBD - add known NPCs here."
    ],
    knownEnemies: [
      "TBD - add known enemies here."
    ],
    openQuestions: [
      "TBD - add open questions here."
    ],
    partyInventory: [
      "TBD - add shared party inventory here."
    ]
  },

  sessions: [
    {
      number: 1,
      date: "TBD",
      title: "Session One",
      attended: ["Player One", "Player Two", "Player Three", "Player Four"],
      summary: [
        "TBD - the DM will add the major events from this session.",
        "TBD - add important choices, discoveries, or consequences here."
      ],
      loot: [
        "TBD - add loot here."
      ],
      npcs: [
        "TBD - add NPCs met here."
      ],
      questions: [
        "TBD - add unresolved questions here."
      ],
      nextObjective: "TBD - the DM will add the next objective."
    }
  ],

  admin: {
    intro: "This is a static DM editing page. It does not provide private access or in-browser file saving. Use the GitHub links to edit files, commit changes, and let the static host redeploy.",
    files: [
      {
        label: "Campaign Data",
        path: "data.js",
        description: "Edit links, party cards, sessions, rules, campaign notes, help links, and admin links.",
        linkKey: "githubEditData"
      },
      {
        label: "README",
        path: "README.md",
        description: "Edit maintenance, deployment, and handoff instructions.",
        linkKey: "githubEditReadme"
      },
      {
        label: "Custom Domain",
        path: "CNAME",
        description: "Edit the custom domain file if the site moves to a different domain.",
        linkKey: "githubEditCname"
      },
      {
        label: "Page Shell",
        path: "index.html",
        description: "Edit only if navigation or script/style file references need to change.",
        linkKey: "githubRepo"
      },
      {
        label: "Styles",
        path: "styles.css",
        description: "Edit layout, colors, spacing, and responsive behavior.",
        linkKey: "githubRepo"
      },
      {
        label: "App Logic",
        path: "app.js",
        description: "Edit routing, rendering, dice roller, initiative tracker, and admin page rendering.",
        linkKey: "githubRepo"
      }
    ],
    workflow: [
      "Open the GitHub repository.",
      "Edit data.js for normal campaign updates.",
      "Commit changes to the main branch.",
      "Wait for GitHub Pages or the selected static host to redeploy.",
      "Open the live site and check Home, Tools, Sessions, Help, and DM Admin."
    ]
  },

  joinSteps: [
    {
      title: "Join Discord",
      text: "Discord is where the group uses voice chat, scheduling, reminders, and between-session questions. Use the public Discord link for setup until Micheal adds a private group invite.",
      linkKey: "discordInvite",
      buttonLabel: "Open Discord"
    },
    {
      title: "Create a D&D Beyond account",
      text: "D&D Beyond is where most players keep their character sheet and look up rules.",
      linkKey: "dndBeyondCampaign",
      buttonLabel: "Open D&D Beyond"
    },
    {
      title: "Wait for the campaign link",
      text: "There is no active campaign yet. Once one exists, Micheal can replace this with the D&D Beyond campaign invite.",
      linkKey: "dndBeyondCampaign",
      buttonLabel: "Open D&D Beyond"
    },
    {
      title: "Make or claim a character later",
      text: "Once the table decides what to play, create or choose a character with DM approval.",
      linkKey: "dndBeyondCampaign",
      buttonLabel: "Open Character Builder"
    },
    {
      title: "Open your character sheet",
      text: "Your sheet lists your hit points, armor class, attacks, spells, skills, and equipment.",
      linkKey: "dndBeyondCampaign",
      buttonLabel: "Open D&D Beyond"
    },
    {
      title: "Map tools come later",
      text: "Owlbear Rodeo or Roll20 may be used once a campaign starts. For now, just know these are map tools.",
      linkKey: "owlbearRoom",
      buttonLabel: "Open Owlbear"
    },
    {
      title: "Read house rules",
      text: "House rules are local table changes. Read them before your first session.",
      route: "rules",
      buttonLabel: "Read Rules"
    },
    {
      title: "Attend session zero or an intro chat",
      text: "Session zero is where the group sets expectations, talks about character ideas, and answers setup questions.",
      linkKey: "discordSchedule",
      buttonLabel: "Open Discord"
    }
  ],

  helpLinks: [
    {
      label: "D&D Beyond Help",
      url: "https://dndbeyond-support.wizards.com/hc/en-us",
      description: "Character sheets, rules lookup, account help, and campaign tools."
    },
    {
      label: "Discord Support",
      url: "https://support.discord.com/hc/en-us",
      description: "Voice, text channels, account setup, and server basics."
    },
    {
      label: "Owlbear Rodeo Docs",
      url: "https://docs.owlbear.rodeo/",
      description: "Map rooms, tokens, scenes, and player basics."
    },
    {
      label: "Roll20 Help",
      url: "https://help.roll20.net/hc/en-us",
      description: "Virtual tabletop, character sheets, maps, dice, and game setup."
    }
  ],

  help: {
    tutorialSteps: [
      "The DM describes the situation.",
      "Players say what their characters try to do.",
      "The DM decides whether the action simply works or requires a roll.",
      "When a roll is needed, the player rolls a die, usually a d20.",
      "The character sheet adds the needed bonuses.",
      "The DM explains what happens.",
      "The story continues."
    ],
    tutorialNote: "You do not need to know every rule before playing. Start by describing what your character is trying to do. The DM will tell you what to roll when a roll is needed.",
    faq: [
      {
        question: "What is Dungeons & Dragons?",
        answer: "Dungeons & Dragons is a group storytelling game with rules. Players control characters, the DM describes the world, and dice help decide uncertain moments."
      },
      {
        question: "What is a Dungeon Master?",
        answer: "The Dungeon Master, or DM, runs the game. The DM describes places, plays monsters and other people, applies rules, and explains what happens."
      },
      {
        question: "What is a player?",
        answer: "A player controls one main character. The player says what that character tries to do and uses the character sheet when rolls or rules are needed."
      },
      {
        question: "What is a party?",
        answer: "The party is the group of player characters. Most D&D games assume the party works together."
      },
      {
        question: "What is a character sheet?",
        answer: "A character sheet is the record of your character. It lists your abilities, hit points, armor, skills, attacks, spells, equipment, and special features."
      },
      {
        question: "What is D&D Beyond?",
        answer: "D&D Beyond is a website for digital character sheets, character creation, campaign management, and rules lookup."
      },
      {
        question: "What is Discord used for?",
        answer: "Discord is used for voice chat, text chat, scheduling, announcements, recaps, and quick questions between sessions."
      },
      {
        question: "What is Owlbear Rodeo?",
        answer: "Owlbear Rodeo is a simple virtual tabletop for maps and tokens. It helps everyone see where characters, enemies, and important places are."
      },
      {
        question: "What is Roll20?",
        answer: "Roll20 is a larger virtual tabletop with maps, tokens, character sheet tools, and dice. This group only uses it if the DM says so."
      },
      {
        question: "What do I need before my first session?",
        answer: "Join Discord, create a D&D Beyond account, test your microphone, read the table rules, and ask questions. The campaign link and map will come later."
      },
      {
        question: "What do I do on my turn?",
        answer: "Say what your character wants to do. In combat, you usually can move and take one main action, and some characters also have a bonus action."
      },
      {
        question: "What is initiative?",
        answer: "Initiative decides turn order during combat. Everyone involved rolls, and higher results usually act earlier."
      },
      {
        question: "What is Armor Class?",
        answer: "Armor Class, or AC, is the number an attack usually needs to meet or beat to hit you."
      },
      {
        question: "What are hit points?",
        answer: "Hit points, or HP, show how much damage a character can take before going down."
      },
      {
        question: "What happens if my character reaches 0 hit points?",
        answer: "Your character usually falls unconscious and may need death saving throws. The DM will walk you through the exact steps."
      },
      {
        question: "What is a skill check?",
        answer: "A skill check is a roll to see whether your character succeeds at a trained or risky task, such as sneaking, climbing, noticing a clue, or persuading someone."
      },
      {
        question: "What is a saving throw?",
        answer: "A saving throw is a defensive roll to resist danger, such as poison, a trap, a spell, or being knocked down."
      },
      {
        question: "What is an attack roll?",
        answer: "An attack roll is a roll to see whether an attack hits. If it meets or beats the target's Armor Class, it usually hits."
      },
      {
        question: "What is damage?",
        answer: "Damage lowers hit points. Different weapons, spells, and hazards use different dice for damage."
      },
      {
        question: "What is advantage?",
        answer: "Advantage means you roll two d20s and use the higher result. It represents a helpful situation."
      },
      {
        question: "What is disadvantage?",
        answer: "Disadvantage means you roll two d20s and use the lower result. It represents a difficult situation."
      },
      {
        question: "What is a spell slot?",
        answer: "A spell slot is a limited resource many spellcasters spend to cast leveled spells. Your character sheet tracks how many you have."
      },
      {
        question: "What is an NPC?",
        answer: "An NPC is a non-player character. The DM plays NPCs, such as villagers, villains, merchants, guards, and monsters that can talk."
      },
      {
        question: "What is a house rule?",
        answer: "A house rule is a local table change or clarification. It applies to this group even if another table plays differently."
      },
      {
        question: "Who decides the rules?",
        answer: "Official rules provide the base. The DM applies them during play, and this table's house rules explain local changes."
      },
      {
        question: "What should I do if I am confused?",
        answer: "Ask the DM or another player. The best first step is to describe what your character wants to try."
      }
    ],
    glossary: [
      {
        term: "Ability Check",
        definition: "A roll to see whether a character succeeds at a task using one of the six abilities."
      },
      {
        term: "Armor Class / AC",
        definition: "A number that shows how hard a character or creature is to hit. If an attack roll equals or beats the target's AC, the attack usually hits."
      },
      {
        term: "Attack Roll",
        definition: "A roll to see whether an attack hits a target."
      },
      {
        term: "Bonus Action",
        definition: "A smaller extra action some characters can take when a feature, spell, or rule says they can."
      },
      {
        term: "Campaign",
        definition: "The ongoing story made from connected sessions, characters, places, and choices."
      },
      {
        term: "Character",
        definition: "The fictional person a player controls in the game."
      },
      {
        term: "Character Class",
        definition: "A character's main adventuring type, such as fighter, rogue, cleric, or wizard."
      },
      {
        term: "Character Sheet",
        definition: "The record of a character's numbers, abilities, equipment, spells, and notes."
      },
      {
        term: "Combat Round",
        definition: "One pass through the turn order during combat, where each participant gets a turn."
      },
      {
        term: "d4, d6, d8, d10, d12, d20",
        definition: "Common dice named by how many sides they have. A d20 is the twenty-sided die used for many important rolls."
      },
      {
        term: "Damage",
        definition: "A loss of hit points caused by attacks, spells, hazards, or other dangers."
      },
      {
        term: "Difficulty Class / DC",
        definition: "The target number for a check or saving throw. Meeting or beating it usually succeeds."
      },
      {
        term: "Disadvantage",
        definition: "Rolling two d20s and using the lower result."
      },
      {
        term: "Dungeon Master / DM",
        definition: "The person who runs the world, plays NPCs and monsters, applies rules, and keeps the game moving."
      },
      {
        term: "Encounter",
        definition: "A focused scene or challenge, such as a fight, negotiation, trap, chase, or puzzle."
      },
      {
        term: "Hit Points / HP",
        definition: "A number showing how much damage a character or creature can take before going down."
      },
      {
        term: "House Rule",
        definition: "A local table rule that changes, clarifies, or adds to the official rules."
      },
      {
        term: "Initiative",
        definition: "The order in which characters and enemies take turns during combat."
      },
      {
        term: "Long Rest",
        definition: "A major rest, usually overnight, that restores many resources."
      },
      {
        term: "Map",
        definition: "A visual reference for locations, terrain, distances, tokens, and movement."
      },
      {
        term: "Movement",
        definition: "How far a character can usually move on their turn."
      },
      {
        term: "NPC",
        definition: "A non-player character controlled by the DM."
      },
      {
        term: "Party",
        definition: "The group of player characters working together."
      },
      {
        term: "Player",
        definition: "A real person who controls a character and makes choices for that character."
      },
      {
        term: "Proficiency",
        definition: "Training that lets a character add a bonus to certain rolls."
      },
      {
        term: "Reaction",
        definition: "A special response that can happen outside your turn when a rule allows it."
      },
      {
        term: "Roleplaying",
        definition: "Making choices, speaking, and acting as your character in the story."
      },
      {
        term: "Saving Throw",
        definition: "A defensive roll to resist danger or reduce its effect."
      },
      {
        term: "Session",
        definition: "One meeting of the group to play the campaign."
      },
      {
        term: "Session Zero",
        definition: "A setup meeting for characters, expectations, safety, schedule, and campaign tone."
      },
      {
        term: "Short Rest",
        definition: "A brief rest that lets some characters recover certain resources."
      },
      {
        term: "Skill",
        definition: "A trained area on the character sheet, such as Stealth, Perception, Arcana, or Persuasion."
      },
      {
        term: "Spell Slot",
        definition: "A limited resource many spellcasters spend to cast leveled spells."
      },
      {
        term: "Token",
        definition: "A marker on a virtual map showing a character, monster, object, or location."
      },
      {
        term: "Turn",
        definition: "A character's chance to act in initiative order."
      },
      {
        term: "Virtual Tabletop / VTT",
        definition: "A digital tool for maps, tokens, dice, and online tabletop play."
      }
    ],
    combatFlow: [
      "The DM says combat has started.",
      "Everyone rolls initiative.",
      "Characters and enemies take turns from highest initiative to lowest.",
      "On your turn, you usually can move and take one main action.",
      "Some characters also have a bonus action.",
      "Some situations allow a reaction outside your turn.",
      "The DM tracks enemies and consequences.",
      "Combat ends when the situation is resolved."
    ],
    combatActions: [
      {
        name: "Attack",
        description: "Use a weapon or attack ability against a target."
      },
      {
        name: "Cast a Spell",
        description: "Use a spell your character knows or has prepared."
      },
      {
        name: "Dash",
        description: "Move farther than usual on your turn."
      },
      {
        name: "Disengage",
        description: "Move away carefully so nearby enemies usually cannot make opportunity attacks."
      },
      {
        name: "Dodge",
        description: "Focus on defense and make yourself harder to hit until your next turn."
      },
      {
        name: "Help",
        description: "Assist another character with a task or attack when the scene allows it."
      },
      {
        name: "Hide",
        description: "Try to avoid being seen or noticed."
      },
      {
        name: "Ready",
        description: "Prepare an action that will happen later if a specific trigger occurs."
      },
      {
        name: "Search",
        description: "Look carefully for something hidden, unclear, or important."
      },
      {
        name: "Use an Object",
        description: "Interact with an item, device, door, lever, potion, or other object."
      }
    ],
    characterSheetGuide: [
      {
        label: "Name",
        description: "The character you are playing."
      },
      {
        label: "Class",
        description: "The character's main adventuring role, such as fighter, rogue, cleric, or wizard."
      },
      {
        label: "Level",
        description: "A rough measure of character power and experience."
      },
      {
        label: "Armor Class",
        description: "How hard you are to hit."
      },
      {
        label: "Hit Points",
        description: "How much damage you can take before going down."
      },
      {
        label: "Speed",
        description: "How far you can usually move on your turn."
      },
      {
        label: "Abilities",
        description: "The six core traits: Strength, Dexterity, Constitution, Intelligence, Wisdom, and Charisma."
      },
      {
        label: "Skills",
        description: "Things your character may be trained to do."
      },
      {
        label: "Saving Throws",
        description: "Defensive rolls used to resist danger."
      },
      {
        label: "Attacks",
        description: "Weapons or powers you can use to harm enemies."
      },
      {
        label: "Spells",
        description: "Magical abilities, if your character has them."
      },
      {
        label: "Equipment",
        description: "Items your character carries."
      },
      {
        label: "Features",
        description: "Special abilities from class, ancestry/species, background, or other choices."
      }
    ],
    whereToGo: [
      {
        need: "I need my character sheet",
        destination: "Go to D&D Beyond."
      },
      {
        need: "I need the map",
        destination: "Maps come later. Owlbear Rodeo or Roll20 will be linked when a campaign starts."
      },
      {
        need: "I need voice chat",
        destination: "Join Discord."
      },
      {
        need: "I need to know what happened last time",
        destination: "Go to Sessions once the campaign has started."
      },
      {
        need: "I need the local table rules",
        destination: "Go to Rules."
      },
      {
        need: "I need basic definitions",
        destination: "Go to Help."
      },
      {
        need: "I need official rules",
        destination: "Use D&D Beyond or the official D&D free/basic rules source."
      },
      {
        need: "I am confused during play",
        destination: "Ask the DM. Describe what your character wants to try."
      }
    ]
  }
};
