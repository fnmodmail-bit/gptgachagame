export interface WeightedEntry<T> {
  item: T;
  weight: number;
}

export function weightedRandom<T>(entries: WeightedEntry<T>[], rng: () => number = Math.random): T {
  const total = entries.reduce((sum, entry) => sum + entry.weight, 0);
  if (total <= 0) {
    throw new Error('Weighted random received non-positive total weight.');
  }
  const roll = rng() * total;
  let cumulative = 0;
  for (const entry of entries) {
    cumulative += entry.weight;
    if (roll <= cumulative) {
      return entry.item;
    }
  }
  return entries[entries.length - 1].item;
}

export function seededRandom(seed: number): () => number {
  let value = seed % 2147483647;
  if (value <= 0) {
    value += 2147483646;
  }
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}
