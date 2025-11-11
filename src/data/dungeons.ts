import { DungeonDefinition } from '../models/Dungeon';

export const DUNGEON_DEFINITIONS: DungeonDefinition[] = [
  {
    id: 'dungeon_solar_spire',
    name: 'Solar Spire Citadel',
    recommendedPower: 3200,
    region: 'Auric Highlands',
    description: 'A gleaming fortress harnessing ancient sun magic guarded by radiant sentinels.',
    encounters: [
      {
        id: 'solar_vanguard',
        enemyGroup: ['Radiant Lancer', 'Shielded Acolyte'],
        modifiers: [
          {
            id: 'solar_flare',
            name: 'Solar Flare',
            description: 'Light damage increased by 20% for both sides.',
            element: 'Light',
            value: 0.2,
          },
        ],
      },
      {
        id: 'mirror_halls',
        enemyGroup: ['Mirror Knight', 'Aether Wisp', 'Aether Wisp'],
        modifiers: [
          {
            id: 'reflective_barrier',
            name: 'Reflective Barrier',
            description: 'First attack each turn is partially reflected.',
            value: 0.15,
          },
        ],
      },
    ],
    boss: {
      name: 'Seraphim Solaris',
      element: 'Light',
      signatureSkill: 'Crown of Dawns',
      enrageThreshold: 0.3,
    },
    rewards: [
      { currency: 'gold', amount: 12000, chance: 1 },
      { currency: 'radiant_core', amount: 1, chance: 0.3 },
      { currency: 'sunsteel', amount: 3, chance: 0.6 },
    ],
  },
  {
    id: 'dungeon_abyssal_trench',
    name: 'Abyssal Trench',
    recommendedPower: 2600,
    region: 'Midnight Shoals',
    description: 'Submerged ruins patrolled by abyssal horrors. Whispers promise ancient relics.',
    encounters: [
      {
        id: 'tempest_depths',
        enemyGroup: ['Drowned Knight', 'Tempest Siren'],
        modifiers: [
          {
            id: 'rising_tide',
            name: 'Rising Tide',
            description: 'Water heroes gain 10% attack; Fire heroes lose 10% attack.',
            element: 'Water',
            value: 0.1,
          },
        ],
      },
    ],
    boss: {
      name: 'Leviathan Prime',
      element: 'Water',
      signatureSkill: 'Maelstrom Collapse',
      enrageThreshold: 0.4,
    },
    rewards: [
      { currency: 'gold', amount: 9000, chance: 1 },
      { currency: 'abyssal_scale', amount: 2, chance: 0.45 },
      { currency: 'tideweave', amount: 4, chance: 0.5 },
    ],
  },
];
