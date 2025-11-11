# Game Design Overview

## Core Pillars

1. **Collect & Customize** — Players summon heroes via gacha banners, build synergies, and personalize loadouts.
2. **Strategic Combat** — Tactical, turn-based battles with elemental affinities, skill combos, and positional tactics.
3. **Living World** — Seasonal overworld map with dungeons, events, and narrative arcs to explore at the player's pace.

## Audience & Platforms

- Primary: Mobile (iOS & Android), with touchscreen-first interactions.
- Secondary: Tablet and potential desktop companion client.

## Gameplay Loop

1. **Preparation** — Summon heroes, manage roster, craft gear, assign team roles.
2. **Engage** — Select dungeon node, trigger encounters, make tactical decisions.
3. **Reward** — Earn loot, upgrade resources, progress narrative and unlock new content.

## Systems Summary

### Heroes
- Rarity tiers (C, B, A, S, SS) controlling base stats and growth rates.
- Elemental alignments: Fire, Water, Earth, Light, Shadow, Arcane.
- Roles: Vanguard, Support, Artillery, Control, Specialist.
- Passive traits and active skills defined in `src/data/heroes.ts`.

### Items & Gear
- Weapon, Armor, Accessory slots with upgrade tiers.
- Crafting blueprint requirements and upgrade costs defined in `src/data/items.ts`.

### Dungeons & World
- Overworld segmented into regions with world events.
- Dungeons specify recommended power, encounter modifiers, and boss behavior (`src/data/dungeons.ts`).
- Rogue-lite variant for daily runs with mutators.

### Gacha Banners
- Default banner seeded with entire hero pool.
- Limited banners override rates via featured hero groups and pity counters.
- Currency economy: Gems (premium), Sigils (earned), Summon Tickets.

### Progression
- Account level unlocks world regions and systems.
- Hero level caps increase via ascension materials.
- Gear infusion system converts duplicate items into upgrade experience.

## Technical Architecture

- **Language:** TypeScript for core logic and data validation.
- **Runtime:** Node-based simulation for prototyping; adaptable to engine runtime.
- **Data:** JSON-like definitions composed as TypeScript objects for compile-time checks.

## Content Pipeline

1. Designers extend data modules with new heroes, items, or dungeons.
2. Automated validation ensures rarity distribution, stat budgets, and drop tables remain balanced.
3. Build process exports typed JSON for client and server consumption.

## Monetization & Live Ops

- Season passes with battle objectives.
- Rotating limited-time banners and dungeon events.
- Cosmetic skins and housing decorations via in-game shop.
- Analytics hooks for retention metrics and engagement.

## Roadmap

- [ ] Expand hero roster with faction bonuses.
- [ ] Prototype overworld navigation UI flows.
- [ ] Implement co-op raid encounters.
- [ ] Integrate backend persistence and user authentication.

