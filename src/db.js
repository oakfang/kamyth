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
        `,
      },
    ],
  },
  phoenix: {
    title: "Phoenix Clan",
    description: "Mystics and priests",
    mind: 1,
    power: 1,
  },
  dragon: {
    title: "Dragon Clan",
    description: "Enigmatic warrior monks",
    body: 1,
    power: 1,
  },
  lion: {
    title: "Lion Clan",
    description: "Honorable warriors",
    body: 1,
    health: 1,
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
      },
      {
        title: "Ancestral Blade",
        description: `
            You wield the blessed katana that served your family for generations.
            You may spend 1 Power to add a D4 to any attack roll, before it's made.
            If you do, and the roll botches, set your current Power to 0.
        `,
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
