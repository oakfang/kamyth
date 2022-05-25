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
            Spend 2 Power to enter a mode of extreme vigilance.
            You may leave this mode at any time, to shake of a single attack's damage.
        `,
        invoke: [-2, 0],
      },
    ],
  },
  scorpion: {
    title: "Scorpion Clan",
    description: "Sneaky ninjas",
    body: 1,
    soul: 1,
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
            You may spend 1 Power to add a D4 to any attack roll, up to [Body] dice, before it's made.
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
  },
  shugenja: {
    title: "Shugenja",
    description: "A mystic of the kami",
    mind: 1,
  },
  onmyoji: {
    title: "Onmyoji",
    description: "A summoner of spirits",
    mind: 1,
  },
  courtier: {
    title: "Courtier",
    description: "A master of communications",
    soul: 1,
  },
  ascetic: {
    title: "Ascetic",
    description: "A warrior monk",
    soul: 1,
  },
};
