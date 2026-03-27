# Duel Racer: Future Roadmap (Levels 11-20 & Enhancements)

## Feature Backlog & Bug Fixes

> [!IMPORTANT]
> **Priority Fix: Keyboard Input Stability**
> There is a persistent focus-management bug where the keyboard (Arrows/WASD) occasionally stops responding after resuming from a Pause state. This requires a full refactor of the [main.js](file:///d:/racing-game/js/main.js) event listeners to ensure the canvas always retains focus.

### Track Redesign Phase 2
- [ ] **Levels 11-15**: Finalize the remaining "Basic" roster with asymmetric street circuits.
- [ ] **Levels 16-20**: "Grand Prix" Tier. These tracks will introduce:
    - **Variable Track Width**: Sections of the track that narrow to a single-car width "choke point."
    - **Compound Chicanes**: Manual point-based paths with complex S-turn logic.

### Gameplay Enhancements
- [ ] **Car Unlock System**: Tie specific car models to Level completion (e.g., Car 3 requires Level 10 clear).
- [ ] **Dynamic Environment**: Simple particle effects (exhaust smoke and tire skids) on grass collisions.
- [ ] **Mini-Map**: A small transparent overlay in the corner showing car positions.

## Technical Goals
- **Refactor [renderer.js](file:///d:/racing-game/js/renderer.js)**: Optimize the [drawTrack](file:///d:/racing-game/js/renderer.js#26-97) loop to use a pre-rendered offscreen canvas for complex geometries to improve FPS on low-end devices.
- **Enhanced AI Mistake Logic**: Make NPC mistakes more visual (e.g., they should actually drive slightly off-track when they miss a corner).
