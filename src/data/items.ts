import { ItemDefinition } from '../models/Item';

export const ITEM_DEFINITIONS: ItemDefinition[] = [
  {
    id: 'blade_sunrise',
    name: 'Sunrise Claymore',
    slot: 'Weapon',
    rarity: 'Legendary',
    attackBonus: 95,
    defenseBonus: 20,
    hpBonus: 120,
    speedBonus: 6,
    effect: 'Increases Light damage by 20% and grants barrier on critical hit.',
    recipe: {
      cost: 150000,
      materials: {
        sunsteel: 12,
        radiant_core: 4,
        ancient_ember: 6,
      },
    },
  },
  {
    id: 'armor_tideguard',
    name: 'Tideguard Raiment',
    slot: 'Armor',
    rarity: 'Epic',
    attackBonus: 20,
    defenseBonus: 80,
    hpBonus: 240,
    speedBonus: 0,
    effect: 'Reduces water damage taken by 15% and heals 2% HP per turn.',
    recipe: {
      cost: 110000,
      materials: {
        tideweave: 10,
        moonpearl: 5,
        coral_fragment: 20,
      },
    },
  },
  {
    id: 'accessory_fenix',
    name: 'Fenix Sigil',
    slot: 'Accessory',
    rarity: 'Mythic',
    attackBonus: 60,
    defenseBonus: 35,
    hpBonus: 100,
    speedBonus: 12,
    effect: 'Upon falling below 30% HP, gain revive with 40% HP once per battle.',
  },
];
