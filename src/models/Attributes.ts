export type Element = 'Fire' | 'Water' | 'Earth' | 'Light' | 'Shadow' | 'Arcane';
export type HeroRole = 'Vanguard' | 'Support' | 'Artillery' | 'Control' | 'Specialist';
export type Rarity = 'C' | 'B' | 'A' | 'S' | 'SS';

export interface StatBlock {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  critRate: number;
  critDamage: number;
  resistance: number;
}

export interface ScalingCurve {
  level: number;
  statMultiplier: number;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  cooldown: number;
  target: 'enemy' | 'ally' | 'self' | 'team';
  potency: number;
  element?: Element;
  tags?: string[];
}
