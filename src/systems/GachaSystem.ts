import { HeroDefinition } from '../models/Hero';
import { WeightedEntry, weightedRandom } from '../utils/random';

export interface GachaBannerConfig {
  id: string;
  name: string;
  featuredHeroes: string[];
  pityThreshold: number;
  baseRates: Record<string, number>; // rarity => percentage as decimal
  boostedRarity?: string;
}

export interface GachaResult {
  hero: HeroDefinition;
  rarity: string;
  pityCounter: number;
  isFeatured: boolean;
}

export interface GachaState {
  pityCounter: number;
}

export class GachaSystem {
  constructor(private heroes: HeroDefinition[], private banner: GachaBannerConfig) {}

  public pull(state: GachaState, rng: () => number = Math.random): GachaResult {
    const rarity = this.rollRarity(state, rng);
    const pool = this.getHeroPoolByRarity(rarity);
    if (pool.length === 0) {
      throw new Error(`No heroes available for rarity ${rarity}`);
    }
    const entries: WeightedEntry<HeroDefinition>[] = pool.map((hero) => ({ item: hero, weight: this.getWeight(hero) }));
    const hero = weightedRandom(entries, rng);
    const isFeatured = this.banner.featuredHeroes.includes(hero.id);
    const pityCounter = rarity === this.getHighestRarity() ? 0 : state.pityCounter + 1;
    return { hero, rarity, pityCounter, isFeatured };
  }

  private rollRarity(state: GachaState, rng: () => number): string {
    const pityReady = state.pityCounter + 1 >= this.banner.pityThreshold;
    if (pityReady) {
      return this.getHighestRarity();
    }
    const rarityEntries: WeightedEntry<string>[] = Object.entries(this.banner.baseRates)
      .filter(([rarity]) => this.getHeroPoolByRarity(rarity).length > 0)
      .map(([rarity, rate]) => ({
        item: rarity,
        weight: this.applyBoost(rarity, rate),
      }));
    if (rarityEntries.length === 0) {
      throw new Error('Banner has no available rarities.');
    }
    return weightedRandom(rarityEntries, rng);
  }

  private getHeroPoolByRarity(rarity: string): HeroDefinition[] {
    return this.heroes.filter((hero) => hero.rarity === rarity);
  }

  private getWeight(hero: HeroDefinition): number {
    return this.banner.featuredHeroes.includes(hero.id) ? 2 : 1;
  }

  private getHighestRarity(): string {
    return Object.keys(this.banner.baseRates)
      .filter((rarity) => this.getHeroPoolByRarity(rarity).length > 0)
      .sort((a, b) => this.banner.baseRates[a] - this.banner.baseRates[b])
      .pop()!;
  }

  private applyBoost(rarity: string, rate: number): number {
    if (rarity === this.banner.boostedRarity) {
      return rate * 1.5;
    }
    return rate;
  }
}

export function createDefaultBanner(heroes: HeroDefinition[]): GachaBannerConfig {
  return {
    id: 'default',
    name: 'Eternal Legends',
    featuredHeroes: ['hero_aurora', 'hero_kael'],
    pityThreshold: 90,
    baseRates: {
      C: 0.52,
      B: 0.32,
      A: 0.11,
      S: 0.04,
      SS: 0.01,
    },
    boostedRarity: 'SS',
  };
}
