// ── physics.js ────────────────────────────────────────────────
// Car physics: velocity, acceleration, braking, steering.

const Physics = (() => {

  // Derived max speeds (px/s on virtual 800x600 canvas)
  // Stat 1-10 → speed range 120–320 px/s
  function maxSpeed(car) {
    return 120 + (car.topSpeed - 1) * 22;   // 142 – 318 px/s
  }
  // Acceleration px/s²
  function accelRate(car) {
    return 60 + (car.acceleration - 1) * 22;
  }
  // Turn rate rad/s (speed-dependent, faster = harder to turn)
  function turnRate(car) {
    return 1.4 + (car.handling - 1) * 0.12;
  }

  const FRICTION    = 0.94;  // velocity multiplier per frame (natural decel)
  const BRAKE_FORCE = 340;   // px/s²

  function createCarState(x, y, angle) {
    return { x, y, angle, speed: 0, steer: 0, vx: 0, vy: 0 };
  }

  function update(state, car, input, dt, levelSpeedBonus = 0) {
    // Merge user sensitivities dynamically
    const settings = Storage.getSettings ? Storage.getSettings() : { steerSens: 1.0, accelSens: 1.0, brakeSens: 1.0 };
    
    const ms  = maxSpeed(car) * (1 + levelSpeedBonus * 0.04);
    const ar  = accelRate(car) * settings.accelSens;
    const tr  = turnRate(car) * settings.steerSens;
    const brForce = BRAKE_FORCE * settings.brakeSens;

    // Smooth Acceleration / Coasting / Braking
    if (input.accel) {
      // Softer start at low speeds
      const accelMulti = Math.abs(state.speed) < (ms * 0.3) ? 0.65 : 1.0; 
      state.speed = Math.min(state.speed + ar * accelMulti * dt, ms);
    } else if (input.brake) {
      if (state.speed > 0) {
        state.speed = Math.max(state.speed - brForce * dt, 0);
      } else {
        // Reverse
        state.speed = Math.max(state.speed - ar * 0.5 * dt, -ms * 0.3);
      }
    } else {
      // Coasting drag - smoother than old hard friction
      state.speed *= Math.pow(0.98, dt * 60);
    }

    // Smooth Steering (momentum)
    const steerAccel = tr * 4.0;
    const steerDecel = tr * 6.0;
    
    if (input.left)  state.steer -= steerAccel * dt;
    else if (input.right) state.steer += steerAccel * dt;
    else {
      // Auto-center steering smoothly
      if (state.steer > 0) state.steer = Math.max(0, state.steer - steerDecel * dt);
      if (state.steer < 0) state.steer = Math.min(0, state.steer + steerDecel * dt);
    }
    
    // Clamp steer to max capabilities
    state.steer = Math.max(-tr, Math.min(tr, state.steer));

    // Apply steering angle (dependent on current speed to prevent spinning in place)
    if (Math.abs(state.speed) > 5) {
      const speedFactor = Math.abs(state.speed) / (ms * 0.85); 
      const grip = Math.min(speedFactor, 1.2); 
      const dir = state.speed >= 0 ? 1 : -1;
      state.angle += state.steer * grip * dt * dir;
    }

    // Velocity integration
    state.x += Math.cos(state.angle) * state.speed * dt;
    state.y += Math.sin(state.angle) * state.speed * dt;
  }

  function getKmh(state, car) {
    // Pixel speed → km/h (calibrated: maxSpeed stat=9 ≈ 280 km/h)
    const ms = maxSpeed(car);
    return Math.round((Math.abs(state.speed) / ms) * 280);
  }

  return { createCarState, update, maxSpeed, getKmh };
})();
