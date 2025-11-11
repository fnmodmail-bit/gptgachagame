import { Element, HeroRole, Rarity, ScalingCurve, Skill, StatBlock } from './Attributes';

export interface HeroDefinition {
  id: string;
  name: string;
  title: string;
  rarity: Rarity;
  element: Element;
  role: HeroRole;
  baseStats: StatBlock;
  growthCurve: ScalingCurve[];
  ultimate: Skill;
  skills: Skill[];
  passive: string;
  factions: string[];
}

export interface HeroInstance {
  definition: HeroDefinition;
  level: number;
  ascension: number;
  gearScore: number;
  currentHp: number;
  statusEffects: StatusEffect[];
}

export interface StatusEffect {
  id: string;
  name: string;
  duration: number;
  potency: number;
  type: 'buff' | 'debuff';
  element?: Element;
}

export function createHeroInstance(definition: HeroDefinition, level = 1): HeroInstance {
  const baseHp = definition.baseStats.hp;
  const multiplier = getStatMultiplier(definition, level);
  return {
    definition,
    level,
    ascension: 0,
    gearScore: 0,
    currentHp: baseHp * multiplier,
    statusEffects: [],
  };
}

export function getStatMultiplier(definition: HeroDefinition, level: number): number {
  const curve = definition.growthCurve.find((entry) => entry.level === level);
  if (!curve) {
    const last = definition.growthCurve[definition.growthCurve.length - 1];
    return last.statMultiplier;
  }
  return curve.statMultiplier;
}

export function computeEffectiveStats(hero: HeroInstance): StatBlock {
  const { baseStats } = hero.definition;
  const multiplier = getStatMultiplier(hero.definition, hero.level);
  return {
    hp: baseStats.hp * multiplier + hero.gearScore * 10,
    attack: baseStats.attack * multiplier + hero.gearScore * 2,
    defense: baseStats.defense * multiplier + hero.gearScore,
    speed: baseStats.speed * (1 + hero.gearScore * 0.002),
    critRate: baseStats.critRate,
    critDamage: baseStats.critDamage,
    resistance: baseStats.resistance,
  };
}
