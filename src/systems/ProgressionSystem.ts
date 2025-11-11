import { HeroInstance, getStatMultiplier } from '../models/Hero';

export interface AccountState {
  level: number;
  experience: number;
  resources: Record<string, number>;
}

export class ProgressionSystem {
  constructor(private levelCap = 80) {}

  gainAccountExperience(state: AccountState, amount: number): void {
    state.experience += amount;
    while (state.experience >= this.experienceForLevel(state.level + 1) && state.level < this.levelCap) {
      state.level += 1;
    }
  }

  upgradeHero(hero: HeroInstance, materials: Record<string, number>): HeroInstance {
    const required = this.ascensionCost(hero.level);
    for (const [material, amount] of Object.entries(required)) {
      if ((materials[material] ?? 0) < amount) {
        throw new Error(`Missing ascension material: ${material}`);
      }
      materials[material] -= amount;
    }
    hero.level = Math.min(hero.level + 5, this.levelCap);
    return hero;
  }

  experienceForLevel(level: number): number {
    return Math.floor(50 * level * Math.pow(1.08, level));
  }

  ascensionCost(level: number): Record<string, number> {
    if (level < 20) return { growth_essence: 5 };
    if (level < 40) return { growth_essence: 12, radiant_core: 1 };
    if (level < 60) return { growth_essence: 20, radiant_core: 2, sunsteel: 4 };
    return { growth_essence: 30, radiant_core: 4, sunsteel: 6 };
  }

  heroPower(hero: HeroInstance): number {
    const multiplier = getStatMultiplier(hero.definition, hero.level);
    return hero.definition.baseStats.attack * multiplier + hero.gearScore * 15 + hero.level * 12;
  }
}
