export const heritages = {
  crane: {
    title: "Crane Clan",
    description: "Courtiers and duelists",
    soul: 1,
    mind: 1,
    features: [
      {
        title: "Perfect Diplomacy",
        description: `
            You know how to tell the truth without suffering social harm.
            Spend 1 Power to reroll all 1s on a Soul roll, as long as you don't lie outright.
            Keep rerolling until none of the dice show a 1.
        `,
        invoke: -1,
      },
    ],
  },
  phoenix: {
    title: "Phoenix Clan",
    description: "Mystics and priests",
    mind: 1,
    power: 1,
    features: [
      {
        title: "Pious Reputation",
        description: `
            Let others argue with rhetorics and falsehoods; you inspire with the words of the kami.
            Spend 1 Power to roll [Mind + Soul], instead of Soul, when you attempt to persuade, inspire or threaten.
          `,
        invoke: -1,
      },
    ],
  },
  dragon: {
    title: "Dragon Clan",
    description: "Enigmatic warrior monks",
    body: 1,
    power: 1,
    features: [
      {
        title: "Clear Spirit",
        description: `
            You are a master of the art of self-control.
            Spend 2 Power to reroll all 1s and 3s on any roll.
            You may re-use this feature at a cost of 1 Power on the same roll.
        `,
        invoke: -2,
      },
      {
        title: "Repay Karma",
        description: `
            Accumulating spiritual debt is easy, but it can become a burden.
            Use this feature when attempting a roll with actual consequences. You fail the roll with a 1, automatically.
            Regain 1 Power.
        `,
        invoke: 1,
      },
    ],
  },
  lion: {
    title: "Lion Clan",
    description: "Honorable warriors",
    body: 1,
    health: 1,
    features: [
      {
        title: "Master Strategist",
        description: `
            Raised in the clan of Generals and Warlords, you know how to mitigate risk.
            Spend 2 Power to shake off a single attack's damage.
        `,
        invoke: -2,
      },
    ],
  },
  scorpion: {
    title: "Scorpion Clan",
    description: "Underhanded ninjas",
    body: 1,
    soul: 1,
    features: [
      {
        title: "Secrets of Court",
        description: `
            You know how to get the upper hand when dealing with people you've dealt with before.
            When you roll a 4 on an attempt to manipulate or attack a person, you may activate this feature.
            You gain 2 Power. When you stop interacting with that target, you lose 2 Power.
        `,
        invoke: [2, -2],
      },
    ],
  },
  kitsune: {
    title: "Kitsune",
    description: "Shapeshifter illusionists",
    soul: 1,
    power: 1,
    features: [
      {
        title: "Shape-Shifting",
        description: `
                The Kitsune can change their shape at will.
                Their original shape is that of a fox with up to nine tails, and they may assume any human shape they wish.
                Spend 1 Power to change into a human shape when in fox form, and regain 1 Power when going back to fox formm.
                When in fox form, you may communicate freely with humans. When disguised as a specific human, double all Soul rolls to decieve others that you are that person.
            `,
        invoke: [-1, 1],
      },
    ],
  },
};

export const trainings = {
  samurai: {
    title: "Samurai",
    description: "A warrior of the bushidu",
    body: 1,
    features: [
      {
        title: "Armour of Honor",
        description: `
            You are above the petty blows of scoundrels.
            You automatically reduce any amount of damage you take by 1.
            In addition, you may spend 1 Power to reduce it by 1 more (once per attack).
        `,
        invoke: -1,
      },
      {
        title: "Ancestral Blade",
        description: `
            You wield the blessed katana that served your family for generations.
            You may spend 1 Power to attack with [Body + Body].
            If you do, and the roll botches, set your current Power to 0.
        `,
        invoke: -1,
      },
    ],
  },
  shinobi: {
    title: "Shinobi",
    description: "A shadowy assassin",
    body: 1,
    features: [
      {
        title: "Shadow Arts",
        description: `
            You are a master of the shadows.
            When attempting to hide from sight, pick a lock, or attempt to steal something, roll with [Body + Mind].
        `,
      },
      {
        title: "Ninjutsu",
        description: `
            You are a master of the art of ninjutsu.
            When striking an opponent unaware of your presence, you may spend 1 Power to double any damage you deal that target.
            You may trigger this feature up to [Mind] times per successful attack (extra usages don't double again, but instead add the base damage again).
            For example: if you roll a 4 on such an attack, you may spend 1 Power to deal 4 damage, or 2 Power to deal 6 damage, and so forth.
        `,
        invoke: -1,
      },
    ],
  },
  shugenja: {
    title: "Shugenja",
    description: "A mystic of the kami",
    mind: 1,
    features: [
      {
        title: "Kami Strike",
        description: `
            You are able to channel the fury of the kami into blasts of elemental power.
            You may attack opponents with your Mind, instead of as a Body roll.
            You may spend 1 Power to attack with [Mind + Soul], instead.
            If you do, you count all 4s and 3s as seperate attacks against the same target.
            Damage inflicted on yourself by 3s or 1s by such attacks is inflicted on your Power, instead of your Health.
        `,
        invoke: -1,
      },
      {
        title: "Kami's Gift",
        description: `
            You may bring the kami's light into your allies and yourself.
            Spend 1 Power, and choose a target (which may be yourself).
            Roll [Mind + Soul]. The target gains Health equal to the number of 4s rolled.
        `,
        invoke: -1,
      },
    ],
  },
  onmyoji: {
    title: "Onmyoji",
    description: "A summoner of spirits",
    mind: 1,
    features: [
      {
        title: "Call Shikigami",
        description: `
            You are able to call upon the spirits of the kami to aid you.
            You may spend 2 Power to call [Mind] spirits to your side.
            You may use these spirits to attack, or to augment the attacks of your allies.
            Each spirit has only 1D4 to attack, which it may contribute to an ally's attack.
            You may not use this feature again while the spirits are active. You may dismiss them at any time, and regain 1 Power.
        `,
        invoke: [-2, 1],
      },
      {
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
      },
    ],
  },
  courtier: {
    title: "Courtier",
    description: "A master of communications",
    soul: 1,
    features: [
      {
        title: "Courtier's Charm",
        description: `
            You command the attention of others, and may influence them subtly.
            Spend 1 Power to roll [Mind + Soul] instead of [Soul] when attempting to influence others.
        `,
        invoke: -1,
      },
      {
        title: "Cold Peace",
        description: `
            The greatest diplomats know how to avoid the wrath of the court.
            Spend 3 Power to attempt to calm a group. Roll [Mind + Soul].
            If the number of 4s rolled is equal to or greater than the group's Might, the group is calmed and will not attacked, unless physically provoked.
        `,
        invoke: -3,
      },
    ],
  },
  ascetic: {
    title: "Ascetic",
    description: "A warrior monk",
    soul: 1,
    features: [
      {
        title: "Martial Arts",
        description: `
            You are able to strike with the force of your spirit.
            You may attack opponents with your Soul, instead of as a Body roll.
            You may spend 1 Power to attack with [Body + Soul].
            If you do, you count all 4s and 3s as seperate attacks against the same target.
        `,
        invoke: -1,
      },
      {
        title: "Ki-Bound Stance",
        description: `
            You focus inward, and become a force of pure energy.
            Spend 3 Power to enter this mode.
            While in this mode, you may attack with [Soul + Soul] or [Body + Soul], whichever is higher.
            In addition, you may spend 1 Power to attack with [Body + Soul + Soul] while in this mode.
            You may not use this feature again while in this mode. You may exit this mode at any time, and regain 1 Power.
        `,
        invoke: [-3, 1],
      },
    ],
  },
};
