export const tags = {
  social: {
    name: "Social",
    fill: "#C9CAC7",
    text: "accents0",
  },
  crane: {
    name: "Crane",
    fill: "blue800",
  },
  heritage: {
    name: "Heritage",
    fill: "#A49588",
  },
  phoenix: {
    name: "Phoenix",
    fill: "#ff8d00",
  },
  dragon: {
    name: "Dragon",
    fill: "#057436",
  },
  chained: {
    name: "Chained",
    fill: "#574633",
  },
  combat: {
    name: "Combat",
    fill: "#54564e",
  },
  lion: {
    name: "Lion",
    fill: "#947E5F",
  },
  scorpion: {
    name: "Scorpion",
    fill: "red400",
  },
  stance: {
    name: "Stance",
    fill: "#5F5C61",
  },
  kitsune: {
    name: "Kitsune",
    fill: "#de5d79",
  },
  training: {
    name: "Training",
    fill: "#3a4754",
  },
  kata: {
    name: "Kata",
    fill: "gray600",
    text: "accents0",
  },
  passive: {
    name: "Passive",
    fill: "success",
  },
  ninjutsu: {
    name: "Ninjutsu",
    fill: "purple400",
  },
  invocation: {
    name: "Invocation",
    fill: "red500",
  },
  buff: {
    name: "Buff",
    fill: "green500",
  },
  debuff: {
    name: "Debuff",
    fill: "gray300",
  },
  shuji: {
    name: "Shūji",
    fill: "blue500",
  },
  kiho: {
    name: "Kihō",
    fill: "yellow400",
  },
  maho: {
    name: "Mahō",
    fill: "gray100",
  },
};

export const features = {
  perfectDiplomacy: {
    title: "Perfect Diplomacy",
    description: `
            You know how to tell the truth without suffering social harm.
            Spend 1 Power to reroll all 1s on a Soul roll, as long as you don't lie outright.
            Keep rerolling until none of the dice show a 1.
        `,
    invoke: -1,
    tags: ["heritage", "crane", "shuji", "social"],
  },
  piousReputation: {
    title: "Pious Reputation",
    description: `
        Let others argue with rhetorics and falsehoods; you inspire with the words of the kami.
        Spend 1 Power to roll [Mind + Soul], instead of Soul, when you attempt to persuade, inspire or threaten.
      `,
    invoke: -1,
    tags: ["heritage", "phoenix", "shuji", "social"],
  },
  clearSpirit: {
    title: "Clear Spirit",
    description: `
        You are a master of the art of self-control.
        Spend 2 Power to reroll all 1s and 3s on any roll.
        You may re-use this feature at a cost of 1 Power on the same roll.
    `,
    invoke: -2,
    tags: ["heritage", "dragon", "kiho", "chained"],
  },
  repayKarma: {
    title: "Repay Karma",
    description: `
        Accumulating spiritual debt is easy, but it can become a burden.
        Use this feature when attempting a roll with actual consequences. You fail the roll with a 1, automatically.
        Regain 1 Power.
    `,
    invoke: 1,
    tags: ["heritage", "dragon", "kiho"],
  },
  masterStrategist: {
    title: "Master Strategist",
    description: `
        Raised in the clan of Generals and Warlords, you know how to mitigate risk.
        Spend 3 Power to shake off a single attack's damage.
    `,
    invoke: -3,
    tags: ["heritage", "lion", "kata", "combat"],
  },
  courtSecrets: {
    title: "Secrets of Court",
    description: `
        You know how to get the upper hand when dealing with people you've dealt with before.
        When you roll a 4 on an attempt to manipulate or attack a person, you may activate this feature.
        You gain 2 Power. When you stop interacting with that target, you lose 2 Power.
    `,
    invoke: [2, -2],
    tags: ["heritage", "scorpion", "ninjutsu", "stance"],
  },
  shapeshift: {
    title: "Shape-Shifting",
    description: `
            The Kitsune can change their shape at will.
            Their original shape is that of a fox with up to nine tails, and they may assume any human shape they wish.
            Spend 1 Power to change into a human shape when in fox form, and regain 1 Power when going back to fox formm.
            When in fox form, you may communicate freely with humans. When disguised as a specific human, double all Soul rolls to decieve others that you are that person.
        `,
    invoke: [-1, 1],
    tags: ["heritage", "kitsune", "invocation", "social", "stance"],
  },
  armourOfHonour: {
    title: "Armour of Honour",
    description: `
        You are above the petty blows of scoundrels.
        You automatically reduce any amount of damage you take by 1.
        In addition, you may spend 1 Power to reduce it by 1 more (once per attack).
    `,
    invoke: -1,
    tags: ["training", "kata", "combat", "passive"],
  },
  ancestralBlade: {
    title: "Ancestral Blade",
    description: `
        You wield the blessed katana that served your family for generations.
        You may spend 1 Power to attack with [Body + Body].
        If you do, and the roll botches, set your current Power to 0.
    `,
    invoke: -1,
    tags: ["training", "kata", "combat"],
  },
  shadowArts: {
    title: "Shadow Arts",
    description: `
        You are a master of the shadows.
        When attempting to hide from sight, pick a lock, or attempt to steal something, roll with [Body + Mind].
    `,
    tags: ["training", "ninjutsu", "passive"],
  },
  backstab: {
    title: "Backstab",
    description: `
        When striking from the shadows, you leave no witnesses.
        When striking an opponent unaware of your presence, you may spend 1 Power to double any damage you deal that target.
        You may trigger this feature up to [Mind] times per successful attack (extra usages don't double again, but instead add the base damage again).
        For example: if you roll a 4 on such an attack, you may spend 1 Power to deal 4 damage, or 2 Power to deal 6 damage, and so forth.
    `,
    invoke: -1,
    tags: ["training", "ninjutsu", "combat", "chained"],
  },
  kamiStrike: {
    title: "Kami Strike",
    description: `
        You are able to channel the fury of the kami into blasts of elemental power.
        You may attack opponents with your Mind, instead of as a Body roll.
        You may spend 1 Power to attack with [Mind + Soul], instead.
        If you do, you count all 4s and 3s as seperate attacks against the same target.
        Damage inflicted on yourself by 3s or 1s by such attacks is inflicted on your Power, instead of your Health.
    `,
    invoke: -1,
    tags: ["training", "invocation", "combat", "passive"],
  },
  kamisGift: {
    title: "Kami's Gift",
    description: `
        You may bring the kami's light into your allies and yourself.
        Spend 1 Power, and choose a target (which may be yourself).
        Roll [Mind + Soul]. The target gains Health equal to the number of 4s rolled.
    `,
    invoke: -1,
    tags: ["training", "invocation", "buff"],
  },
  callShikigami: {
    title: "Call Shikigami",
    description: `
        You are able to call upon the spirits of the kami to aid you.
        You may spend 2 Power to call [Mind] spirits to your side.
        You may use these spirits to attack, or to augment the attacks of your allies.
        Each spirit has only 1D4 to attack, which it may contribute to an ally's attack.
        You may not use this feature again while the spirits are active. You may dismiss them at any time, and regain 1 Power.
    `,
    invoke: [-2, 1],
    tags: ["training", "invocation", "combat", "buff", "stance"],
  },
  bindSpirits: {
    title: "Bind the Spirits",
    description: `
        Brandishing mystical talismans, you may bind and control dark spirits.
        You may spend 1 Power when facing a spirit (ghosts, Oni, demons, etc.).
        Roll [Mind + Soul] to attempt to bind the spirit.
        On a roll of 1, the spirit may attempt to bind you as a reaction.
        On a roll of 3, you may choose to succeed, but you must reduce your Power to 0.
        On a roll of 4, the spirit is bound to you.
        A bound spirit may not take any actions against your wishes, and you may force it to take any action you wish at a cost of 1 Power.
    `,
    invoke: -1,
    tags: ["training", "invocation", "social"],
  },
  courtierCharm: {
    title: "Courtier's Charm",
    description: `
        You know how to weasel away from a bad social situation.
        When you fail to influence a person with a Soul roll, you may spend 1 Power to ensure that target doesn't notice the attempt.
        After using this feature, you may not use it again on the same target until you succeed in affecting them with a Soul roll.
    `,
    invoke: -1,
    tags: ["training", "shuji", "social"],
  },
  coldPeace: {
    title: "Cold Peace",
    description: `
        The greatest diplomats know how to avoid the wrath of the court.
        Spend 3 Power to attempt to calm a group. Roll [Mind + Soul].
        If the number of 4s rolled is equal to or greater than the group's Might, the group is calmed and will not attacked, unless physically provoked.
    `,
    invoke: -3,
    tags: ["training", "shuji", "combat"],
  },
  martialArts: {
    title: "Martial Arts",
    description: `
        You are able to strike with the force of your spirit.
        You may attack opponents with your Soul, instead of as a Body roll.
        You may spend 1 Power to attack with [Body + Soul].
        If you do, you count all 4s and 3s as seperate attacks against the same target.
    `,
    invoke: -1,
    tags: ["training", "kiho", "combat", "passive"],
  },
  kiBoundStance: {
    title: "Ki-Bound Stance",
    description: `
        You focus inward, and become a force of pure energy.
        Spend 3 Power to enter this mode.
        While in this mode, you may attack with [Soul + Soul] or [Body + Soul], whichever is higher.
        In addition, you may spend 1 Power to attack with [Body + Soul + Soul] while in this mode.
        You may not use this feature again while in this mode. You may exit this mode at any time, and regain 1 Power.
    `,
    invoke: [-3, 1],
    tags: ["training", "kiho", "combat", "stance"],
  },
  hex: {
    title: "Hex",
    description: `
      Spend 1 Health to attempt to hex an opponent.
      Roll [Mind + Soul]. Every 4 you roll takes awaiy a single D4 from your target's next roll.
      However, if you don't roll any 4s, but did roll a 1, take 1 damage instead.
    `,
    invoke: -1,
    uses: "health",
    tags: ["maho", "combat", "debuff"],
  },
};

export const heritages = {
  crane: {
    title: "House of the Crane",
    description: "Courtiers and duelists",
    soul: 1,
    mind: 1,
    features: ["perfectDiplomacy"],
  },
  phoenix: {
    title: "House of the Phoenix",
    description: "Mystics and priests",
    mind: 1,
    power: 1,
    features: ["piousReputation"],
  },
  dragon: {
    title: "House of the Dragon",
    description: "Enigmatic warrior monks",
    body: 1,
    power: 1,
    features: ["clearSpirit", "repayKarma"],
  },
  lion: {
    title: "House of the Lion",
    description: "Honorable warriors",
    body: 1,
    health: 1,
    features: ["masterStrategist"],
  },
  scorpion: {
    title: "House of the Scorpion",
    description: "Underhanded ninjas",
    body: 1,
    soul: 1,
    features: ["courtSecrets"],
  },
  kitsune: {
    title: "Kitsune",
    description: "Shapeshifter illusionists",
    soul: 1,
    power: 1,
    features: ["shapeshift"],
  },
};

export const trainings = {
  samurai: {
    title: "Samurai",
    description: "A warrior of the bushidu",
    body: 1,
    features: ["armourOfHonour", "ancestralBlade"],
  },
  shinobi: {
    title: "Shinobi",
    description: "A shadowy assassin",
    body: 1,
    features: ["shadowArts", "backstab"],
  },
  shugenja: {
    title: "Shugenja",
    description: "A mystic of the kami",
    mind: 1,
    features: ["kamiStrike", "kamisGift"],
  },
  onmyoji: {
    title: "Onmyoji",
    description: "A summoner of spirits",
    mind: 1,
    features: ["callShikigami", "bindSpirits"],
  },
  courtier: {
    title: "Courtier",
    description: "A master of communications",
    soul: 1,
    features: ["courtierCharm", "coldPeace"],
  },
  ascetic: {
    title: "Ascetic",
    description: "A warrior monk",
    soul: 1,
    features: ["martialArts", "kiBoundStance"],
  },
};

export const npcLevels = {
  minor: {
    title: "Minor NPC",
    description: "An extra (bandit, minion)",
    might: 0,
    capacity: 0,
    menace: 0,
  },
  major: {
    title: "Major NPC",
    description: "A minor challenge (bandit leader)",
    might: 1,
    capacity: 2,
    menace: 0,
  },
  elite: {
    title: "Elite NPC",
    description: "A mini-boss (Oni warrior)",
    might: 2,
    capacity: 3,
    menace: 1,
  },
  master: {
    title: "Master NPC",
    description: "A true boss (Elder Mahō Warlock)",
    might: 3,
    capacity: 5,
    menace: 2,
  },
};

export const npcTraits = {
  strong: {
    title: "Strong",
    might: 1,
  },
  witty: {
    title: "Witty",
    might: 1,
  },
  agile: {
    title: "Agile",
    menace: 1,
  },
  sturdy: {
    title: "Sturdy",
    capacity: 1,
  },
  cunning: {
    title: "Cunning",
    capacity: 1,
  },
  warlock: {
    title: "Warlock",
    features: ["hex"],
  },
};
