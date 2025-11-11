# GPT Gacha Game

A high-level prototype for a fantasy RPG gacha card game targeting mobile devices. This repository contains simulation-ready TypeScript game-logic modules, design documentation, and data seeds for heroes, items, and dungeons.

## Vision

Combine collectible hero gacha mechanics with strategic dungeon crawling and open-world progression. Players assemble squads of heroes, enhance equipment, and explore a modular overworld map with rotating seasonal content.

## Repository Contents

- `src/` — TypeScript source for core simulation logic (gacha pulls, combat resolution, progression systems, etc.).
- `docs/` — High-level game design and systems documentation.
- `package.json` — NPM project manifest with scripts for building and running the simulation demo.

## Getting Started

```bash
npm install
npm run build
npm start
```

The demo script (`src/demo.ts`) showcases how to perform gacha pulls, set up a dungeon run, and resolve a simplified combat loop using the provided systems.

## Key Systems

- **Gacha System** — Weighted hero summoning pool with banner modifiers and pity logic.
- **Battle System** — Turn-based combat resolution with elemental affinities, skills, and status effects.
- **Inventory & Progression** — Item crafting, gear enhancement, and hero growth curves.
- **World & Dungeons** — Region metadata and dungeon definitions to support campaign structure.

## Next Steps

1. Integrate with a game engine (Unity, Unreal, Godot) or React Native front-end.
2. Persist player state via a backend service (Firebase, Supabase, custom).
3. Expand content databases, monetization hooks, and live-ops events.
4. Implement UI/UX flows for mobile (summon screens, hero management, overworld navigation).

## License

MIT
