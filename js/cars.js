// ── cars.js ──────────────────────────────────────────────────
// Car definitions: 3 cars with distinct stat profiles.

const CARS = [
  {
    id: 0,
    name: 'Falcon',
    tag: 'HIGH SPEED',
    color: '#4f8ef7',      // blue
    bodyColor: '#3a7de0',
    windshieldColor: '#1a3a7a',
    // Stats 1–10
    topSpeed:     9,       // fast top speed
    acceleration: 5,       // slow to get there
    handling:     6,       // average turning
    // Physics derived values (set in physics.js)
  },
  {
    id: 1,
    name: 'Striker',
    tag: 'QUICK START',
    color: '#f87171',      // red
    bodyColor: '#e05555',
    windshieldColor: '#7a1a1a',
    topSpeed:     7,
    acceleration: 9,       // snappy acceleration
    handling:     6,
  },
  {
    id: 2,
    name: 'Phantom',
    tag: 'PRECISION',
    color: '#34d399',      // green
    bodyColor: '#22b37a',
    windshieldColor: '#0a4a2a',
    topSpeed:     7,
    acceleration: 6,
    handling:     9,       // best cornering
  },
  {
    id: 3,
    name: 'Juggernaut',
    tag: 'BRUTE FORCE',
    color: '#fbbf24',      // yellow
    bodyColor: '#333333',
    windshieldColor: '#111111',
    topSpeed:     10,
    acceleration: 4,
    handling:     4,
  },
  {
    id: 4,
    name: 'Nova',
    tag: 'DRIFT KING',
    color: '#e879f9',      // pink
    bodyColor: '#d946ef',
    windshieldColor: '#4a044e',
    topSpeed:     6,
    acceleration: 7,
    handling:     10,
  },
  {
    id: 5,
    name: 'Vortex',
    tag: 'BALANCED',
    color: '#38bdf8',      // light blue
    bodyColor: '#0ea5e9',
    windshieldColor: '#082f49',
    topSpeed:     8,
    acceleration: 8,
    handling:     8,
  },
];
