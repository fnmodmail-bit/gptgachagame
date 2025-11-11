import { Element } from './Attributes';

export interface DungeonDefinition {
  id: string;
  name: string;
  recommendedPower: number;
  region: string;
  description: string;
  encounters: EncounterDefinition[];
  boss: BossDefinition;
  rewards: RewardTableEntry[];
}

export interface EncounterDefinition {
  id: string;
  enemyGroup: string[];
  modifiers: EncounterModifier[];
}

export interface EncounterModifier {
  id: string;
  name: string;
  description: string;
  element?: Element;
  value: number;
}

export interface BossDefinition {
  name: string;
  element: Element;
  signatureSkill: string;
  enrageThreshold: number;
}

export interface RewardTableEntry {
  currency: string;
  amount: number;
  chance: number;
  lootTableId?: string;
}
