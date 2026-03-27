# 🏎️ Duel Racer

![Duel Racer Gameplay](https://img.shields.io/badge/Status-Beta-brightgreen.svg)
![HTML5 Canvas](https://img.shields.io/badge/Engine-HTML5_Canvas-orange.svg)
![Vanilla JS](https://img.shields.io/badge/Language-Vanilla_JS-yellow.svg)

**Duel Racer** is an intensely fast-paced, top-down 1v1 racing game completely built from scratch using pure HTML, CSS, and Vanilla JavaScript. Challenge a brutally adaptive AI driver across 10 radically distinct, mathematically generated track geometries. 

Master the momentum-based drifting physics, razor-thin braking zones, and perfect your racing lines to shave off milliseconds.

🏎️ **[Play Duel Racer Live Here!](#)** *(Link coming soon)*

---

## 🌟 Key Features

* **Custom Physics Engine**: Real-time momentum, 101% solid restitution bounding walls, off-track friction penalties, and drifting mechanics.
* **Intelligent AI Competitor**: The NPC mathematically scales with your speed, dynamically throttles for tight hairpins, makes probabilistic mistakes under pressure, and actively pursues the flawless racing line.
* **Local Persistence**: `localStorage` integration automatically saves your unlocked levels, fastest lap times, and customizable keyboard sensitivities.
* **Controller/Keyboard Support**: Full `WASD` / `Arrow Key` bindings for both racing and navigating the fluid, animated UI menus.

---

## 🚗 The Garage
Choose from 3 distinct vehicle chassis based on your racing style:
1. **Falcon**: The balanced all-rounder. Unlocked natively. *(Speed: 5, Accel: 5, Handling: 5)*
2. **Striker**: Built for technical tracks. Hard torque, weak top speed. *(Speed: 3, Accel: 9, Handling: 8)*
3. **Phantom**: Pure unadulterated velocity. Extremely difficult to steer. *(Speed: 10, Accel: 3, Handling: 2)*

---

## 🏁 The Circuits
Duel Racer currently features exactly **10 highly unique, hand-crafted parametric levels** that scale aggressively in difficulty. The mathematical engine guarantees pixel-perfect smooth corners and brutal physics restrictions.

* **Level 1** - City Road *(Standard Oval)*
* **Level 2** - Suburban Track *(Wide Rectangle)*
* **Level 3** - Night Road *(Sweeping Figure-Eight)*
* **Level 4** - Diamond Circuit *(45-Degree Rigid Square)*
* **Level 5** - Clover Circuit *(3-Leaf Parametric Curve)*
* **Level 6** - Neon Cross *(Massive Hollow 4-Leaf Star)*
* **Level 7** - Twin Void *(Pinched "Peanut" Hourglass)*
* **Level 8** - Binary Orbit *(High-Velocity Pinched Oval)*
* **Level 9** - Velocity Box *(Brutal 60px Hairpins on a long box)*
* **Level 10** - Nebula Star *(Technical 5-Leaf Sweeping Core)*

---

## 🛠️ How to Play Locally

Duel Racer relies entirely on client-side browser technology and does not require a backend node server to compile. 

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/devesh-talreja/racing-game.git
   ```
2. **Run the Game:**
   * **Option A**: Simply double-click `index.html` to open it in your web browser.
   * **Option B**: Run a local testing server in your terminal:
     ```bash
     npx serve .
     ```
     Then navigate to `http://localhost:3000`

---

## 🎮 Controls

* **W / Up Arrow**: Accelerate
* **S / Down Arrow**: Brake / Reverse
* **A / Left Arrow**: Steer Left
* **D / Right Arrow**: Steer Right
* **P / Esc**: Pause / Resume Race
* **Enter**: Select UI Options

---

## 🚀 Future Roadmap

Duel Racer is actively evolving! Planned future updates include:
* **Grand Prix Tier (Levels 11-20)**: Complex, asymmetrical street circuits and brutal choke points.
* **Car Progression Mechanics**: Unlock the *Striker* and *Phantom* naturally by defeating certain NPC bosses.
* **Visual Polish**: Dynamic particle effects (tire smoke, grass dust) and animated crowd elements.
* **Mini-Map HUD**: A transparent 2D overlay to track you and the AI globally.
* **Continuous Engine Fixes**: Ongoing optimizations for Keyboard/UI Focus retention during pause toggling.

---

## 🤝 Contributing

We would absolutely love your help expanding Duel Racer! 

If you have ideas for new tracks, car models, UI enhancements, or run into any engine bugs, your contributions are highly welcome.

1. **Star this Repository** to show your support!
2. **Fork** the project.
3. **Submit an Issue** to suggest features, report bugs, or discuss huge structural changes.
4. **Create a Pull Request** with your code optimizations. 

Whether you're fixing a minor UI typo or writing an entirely new mathematical algorithm for Level 11, feel free to dive into the codebase. 

*(Project initially constructed with AI Collaboration!)*
