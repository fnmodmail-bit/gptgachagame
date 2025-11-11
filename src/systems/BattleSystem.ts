import { HeroInstance, computeEffectiveStats } from '../models/Hero';
import { Element } from '../models/Attributes';

export interface BattleLogEntry {
  round: number;
  actor: string;
  action: string;
  damage: number;
  target: string;
  remainingHp: number;
}

export interface BattleResult {
  winner: 'party' | 'enemy' | 'draw';
  rounds: number;
  log: BattleLogEntry[];
}

export interface EnemyUnit {
  id: string;
  name: string;
  element: Element;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    critRate: number;
    critDamage: number;
    resistance: number;
  };
}

export function simulateBattle(
  party: HeroInstance[],
  enemies: EnemyUnit[],
  rng: () => number = Math.random,
  maxRounds = 20,
): BattleResult {
  const log: BattleLogEntry[] = [];
  let round = 1;
  const enemyState = enemies.map((enemy) => ({ ...enemy }));
  const partyState = party.map((hero) => ({ hero, hp: computeEffectiveStats(hero).hp }));

  while (round <= maxRounds && partyState.some((ally) => ally.hp > 0) && enemyState.some((enemy) => enemy.stats.hp > 0)) {
    const actionOrder = determineActionOrder(partyState, enemyState);
    for (const entry of actionOrder) {
      if (!partyState.some((ally) => ally.hp > 0) || !enemyState.some((enemy) => enemy.stats.hp > 0)) {
        break;
      }
      if (entry.type === 'party') {
        const actor = partyState[entry.index];
        if (actor.hp <= 0) continue;
        const target = pickTarget(enemyState, rng);
        if (!target) continue;
        const damage = computeDamage(actor.hero, target, rng);
        target.stats.hp = Math.max(0, target.stats.hp - damage);
        log.push({
          round,
          actor: actor.hero.definition.name,
          action: 'Attack',
          damage,
          target: target.name,
          remainingHp: target.stats.hp,
        });
      } else {
        const actor = enemyState[entry.index];
        if (actor.stats.hp <= 0) continue;
        const target = pickHeroTarget(partyState, rng);
        if (!target) continue;
        const damage = computeEnemyDamage(actor, target.hero, rng);
        target.hp = Math.max(0, target.hp - damage);
        log.push({
          round,
          actor: actor.name,
          action: 'Attack',
          damage,
          target: target.hero.definition.name,
          remainingHp: target.hp,
        });
      }
    }
    round += 1;
  }

  const partyAlive = partyState.some((ally) => ally.hp > 0);
  const enemyAlive = enemyState.some((enemy) => enemy.stats.hp > 0);
  let winner: 'party' | 'enemy' | 'draw' = 'draw';
  if (partyAlive && !enemyAlive) {
    winner = 'party';
  } else if (!partyAlive && enemyAlive) {
    winner = 'enemy';
  }

  return { winner, rounds: round - 1, log };
}

function determineActionOrder(
  party: { hero: HeroInstance; hp: number }[],
  enemies: EnemyUnit[],
): { type: 'party' | 'enemy'; index: number; speed: number }[] {
  const order: { type: 'party' | 'enemy'; index: number; speed: number }[] = [];
  party.forEach((ally, index) => {
    const stats = computeEffectiveStats(ally.hero);
    order.push({ type: 'party', index, speed: stats.speed });
  });
  enemies.forEach((enemy, index) => {
    order.push({ type: 'enemy', index, speed: enemy.stats.speed });
  });
  return order.sort((a, b) => b.speed - a.speed);
}

function pickTarget(enemies: EnemyUnit[], rng: () => number) {
  const alive = enemies.filter((enemy) => enemy.stats.hp > 0);
  if (alive.length === 0) return undefined;
  const index = Math.floor(rng() * alive.length);
  return alive[index];
}

function pickHeroTarget(party: { hero: HeroInstance; hp: number }[], rng: () => number) {
  const alive = party.filter((ally) => ally.hp > 0);
  if (alive.length === 0) return undefined;
  const index = Math.floor(rng() * alive.length);
  return alive[index];
}

function computeDamage(hero: HeroInstance, target: EnemyUnit, rng: () => number): number {
  const stats = computeEffectiveStats(hero);
  const base = Math.max(0, stats.attack - target.stats.defense * 0.35);
  const crit = rng() < stats.critRate;
  const multiplier = crit ? stats.critDamage : 1;
  return Math.round(base * multiplier * elementModifier(hero.definition.element, target.element));
}

function computeEnemyDamage(enemy: EnemyUnit, hero: HeroInstance, rng: () => number): number {
  const heroStats = computeEffectiveStats(hero);
  const base = Math.max(0, enemy.stats.attack - heroStats.defense * 0.4);
  const crit = rng() < enemy.stats.critRate;
  const multiplier = crit ? enemy.stats.critDamage : 1;
  return Math.round(base * multiplier * elementModifier(enemy.element, hero.definition.element));
}

function elementModifier(attacker: Element, defender: Element): number {
  const advantages: Record<Element, Element[]> = {
    Fire: ['Earth'],
    Water: ['Fire'],
    Earth: ['Shadow'],
    Light: ['Shadow'],
    Shadow: ['Light'],
    Arcane: ['Fire', 'Water', 'Earth', 'Light', 'Shadow'],
  };
  if (advantages[attacker]?.includes(defender)) {
    return 1.25;
  }
  if (advantages[defender]?.includes(attacker)) {
    return 0.8;
  }
  return 1;
}
