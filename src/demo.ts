import { HERO_DEFINITIONS } from './data/heroes';
import { ITEM_DEFINITIONS } from './data/items';
import { createHeroInstance } from './models/Hero';
import { createDefaultBanner, GachaSystem } from './systems/GachaSystem';
import { InventorySystem } from './systems/InventorySystem';
import { ProgressionSystem } from './systems/ProgressionSystem';
import { simulateBattle, EnemyUnit } from './systems/BattleSystem';
import { seededRandom } from './utils/random';

const rng = seededRandom(42);

function runGachaDemo() {
  const banner = createDefaultBanner(HERO_DEFINITIONS);
  const gacha = new GachaSystem(HERO_DEFINITIONS, banner);
  const state = { pityCounter: 0 };
  console.log('--- Summoning Session ---');
  for (let i = 0; i < 10; i++) {
    const result = gacha.pull(state, rng);
    state.pityCounter = result.pityCounter;
    console.log(
      `Pull ${i + 1}: ${result.hero.name} [${result.rarity}]${result.isFeatured ? ' (Featured)' : ''} | Pity: ${state.pityCounter}`,
    );
  }
}

function runInventoryDemo() {
  const inventory = new InventorySystem(ITEM_DEFINITIONS);
  const state = {
    items: [],
    materials: {
      sunsteel: 20,
      radiant_core: 5,
      ancient_ember: 10,
      tideweave: 15,
      moonpearl: 6,
      coral_fragment: 25,
    },
    gold: 200000,
  };
  console.log('\n--- Crafting ---');
  const crafted = inventory.craft('blade_sunrise', state);
  console.log(`Crafted ${crafted.definition.name}`);
  inventory.enhance(crafted, state);
  console.log(`Enhanced ${crafted.definition.name} to +${crafted.enhancement}`);
}

function runProgressionDemo() {
  const hero = createHeroInstance(HERO_DEFINITIONS[0], 20);
  const progression = new ProgressionSystem();
  const materials = { growth_essence: 50, radiant_core: 5, sunsteel: 10 };
  console.log('\n--- Hero Progression ---');
  progression.upgradeHero(hero, materials);
  console.log(`Upgraded ${hero.definition.name} to level ${hero.level}`);
}

function runBattleDemo() {
  const party = [createHeroInstance(HERO_DEFINITIONS[0], 30), createHeroInstance(HERO_DEFINITIONS[1], 28)];
  const enemies: EnemyUnit[] = [
    {
      id: 'shadow_baron',
      name: 'Shadow Baron',
      element: 'Shadow',
      stats: {
        hp: 2200,
        attack: 280,
        defense: 150,
        speed: 90,
        critRate: 0.1,
        critDamage: 1.6,
        resistance: 0.2,
      },
    },
    {
      id: 'shadow_mage',
      name: 'Umbral Magus',
      element: 'Shadow',
      stats: {
        hp: 1500,
        attack: 260,
        defense: 110,
        speed: 102,
        critRate: 0.12,
        critDamage: 1.5,
        resistance: 0.15,
      },
    },
  ];
  console.log('\n--- Battle Simulation ---');
  const result = simulateBattle(party, enemies, rng, 12);
  console.log(`Winner: ${result.winner} in ${result.rounds} rounds`);
  result.log.slice(0, 5).forEach((entry) => {
    console.log(
      `Round ${entry.round}: ${entry.actor} -> ${entry.target} for ${entry.damage} damage (HP left: ${entry.remainingHp})`,
    );
  });
  if (result.log.length > 5) {
    console.log('...');
  }
}

runGachaDemo();
runInventoryDemo();
runProgressionDemo();
runBattleDemo();
