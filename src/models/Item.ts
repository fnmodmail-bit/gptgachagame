export type ItemSlot = 'Weapon' | 'Armor' | 'Accessory';
export type ItemRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';

export interface ItemDefinition {
  id: string;
  name: string;
  slot: ItemSlot;
  rarity: ItemRarity;
  attackBonus: number;
  defenseBonus: number;
  hpBonus: number;
  speedBonus: number;
  effect?: string;
  recipe?: CraftingRecipe;
}

export interface CraftingRecipe {
  cost: number;
  materials: Record<string, number>;
}

export interface ItemInstance {
  definition: ItemDefinition;
  level: number;
  enhancement: number;
}

export function getItemPower(item: ItemInstance): number {
  const { definition, level, enhancement } = item;
  const rarityMultiplier: Record<ItemRarity, number> = {
    Common: 1,
    Rare: 1.2,
    Epic: 1.5,
    Legendary: 1.9,
    Mythic: 2.3,
  };
  const stats =
    definition.attackBonus + definition.defenseBonus + definition.hpBonus * 0.2 + definition.speedBonus * 2;
  return stats * rarityMultiplier[definition.rarity] * (1 + level * 0.05 + enhancement * 0.1);
}
