import { ItemDefinition, ItemInstance, getItemPower } from '../models/Item';

export interface InventoryState {
  items: ItemInstance[];
  materials: Record<string, number>;
  gold: number;
}

export class InventorySystem {
  constructor(private catalog: ItemDefinition[]) {}

  craft(itemId: string, state: InventoryState): ItemInstance {
    const definition = this.catalog.find((item) => item.id === itemId);
    if (!definition) {
      throw new Error(`Unknown item ${itemId}`);
    }
    if (!definition.recipe) {
      throw new Error(`Item ${itemId} cannot be crafted.`);
    }
    const { cost, materials } = definition.recipe;
    if (state.gold < cost) {
      throw new Error('Insufficient gold.');
    }
    for (const [material, amount] of Object.entries(materials)) {
      if ((state.materials[material] ?? 0) < amount) {
        throw new Error(`Missing material: ${material}`);
      }
    }
    state.gold -= cost;
    for (const [material, amount] of Object.entries(materials)) {
      state.materials[material] -= amount;
    }
    const newItem: ItemInstance = { definition, level: 1, enhancement: 0 };
    state.items.push(newItem);
    return newItem;
  }

  enhance(item: ItemInstance, state: InventoryState): ItemInstance {
    const cost = Math.ceil(getItemPower(item) * 50);
    if (state.gold < cost) {
      throw new Error('Insufficient gold for enhancement.');
    }
    state.gold -= cost;
    item.enhancement += 1;
    return item;
  }

  dismantle(itemId: string, state: InventoryState): void {
    const index = state.items.findIndex((item) => item.definition.id === itemId);
    if (index === -1) {
      throw new Error(`Item ${itemId} not found.`);
    }
    const [item] = state.items.splice(index, 1);
    state.gold += Math.round(getItemPower(item) * 20);
    state.materials['essence_shard'] = (state.materials['essence_shard'] ?? 0) + 5;
  }
}
