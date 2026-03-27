// ── main.js ───────────────────────────────────────────────────
// Entry point: wires all event listeners and orchestrates screen flow.

document.addEventListener('DOMContentLoaded', () => {

  // ─── Load saved state ──────────────────────────────────────
  let selectedCarId   = Storage.getSelectedCar();
  let selectedLevelId = Storage.getSelectedLevel();
  let unlockedLevel   = Storage.getUnlockedLevel();

  // ─── Home Buttons ──────────────────────────────────────────
  document.getElementById('btn-start').addEventListener('click', () => {
    launchRace();
  });

  document.getElementById('btn-cars').addEventListener('click', () => {
    UI.renderCarCards(CARS, selectedCarId);
    UI.showScreen('screen-cars');
  });

  document.getElementById('btn-levels').addEventListener('click', () => {
    UI.renderLevelGrid(LEVELS, unlockedLevel, selectedLevelId);
    UI.showScreen('screen-levels');
  });

  document.getElementById('btn-records').addEventListener('click', () => {
    UI.renderRecords(LEVELS);
    UI.showScreen('screen-records');
  });

  document.getElementById('btn-controls').addEventListener('click', () => {
    UI.showScreen('screen-controls');
  });

  // ─── Settings ──────────────────────────────────────────────
  const elSteer = document.getElementById('range-steer');
  const elAccel = document.getElementById('range-accel');
  const elBrake = document.getElementById('range-brake');
  
  function updateSettingsUI() {
    if(elSteer) document.getElementById('val-steer').textContent = parseFloat(elSteer.value).toFixed(1) + 'x';
    if(elAccel) document.getElementById('val-accel').textContent = parseFloat(elAccel.value).toFixed(1) + 'x';
    if(elBrake) document.getElementById('val-brake').textContent = parseFloat(elBrake.value).toFixed(1) + 'x';
  }

  [elSteer, elAccel, elBrake].forEach(el => {
    if (el) el.addEventListener('input', updateSettingsUI);
  });

  document.getElementById('btn-settings').addEventListener('click', () => {
    const s = Storage.getSettings ? Storage.getSettings() : { steerSens: 1.0, accelSens: 1.0, brakeSens: 1.0 };
    if (elSteer) elSteer.value = s.steerSens || 1.0;
    if (elAccel) elAccel.value = s.accelSens || 1.0;
    if (elBrake) elBrake.value = s.brakeSens || 1.0;
    updateSettingsUI();
    UI.showScreen('screen-settings');
  });

  document.getElementById('settings-back').addEventListener('click', () => {
    UI.showScreen('screen-home');
  });

  document.getElementById('btn-save-settings').addEventListener('click', () => {
    if (Storage.setSettings) {
      Storage.setSettings({
        steerSens: parseFloat(elSteer.value),
        accelSens: parseFloat(elAccel.value),
        brakeSens: parseFloat(elBrake.value)
      });
    }
    UI.showScreen('screen-home');
  });

  // ─── Car Selection ─────────────────────────────────────────
  document.getElementById('cars-back').addEventListener('click', () => {
    UI.showScreen('screen-home');
  });

  document.getElementById('cars-confirm').addEventListener('click', () => {
    const sel = document.querySelector('.car-card.selected');
    if (sel) {
      selectedCarId = parseInt(sel.dataset.carid, 10);
      Storage.setSelectedCar(selectedCarId);
    }
    UI.showScreen('screen-home');
  });

  // ─── Level Selection ────────────────────────────────────────
  document.getElementById('levels-back').addEventListener('click', () => {
    UI.showScreen('screen-home');
  });

  document.getElementById('levels-confirm').addEventListener('click', () => {
    const sel = document.querySelector('.level-card.selected:not(.locked)');
    if (sel) {
      selectedLevelId = parseInt(sel.dataset.levelid, 10);
      Storage.setSelectedLevel(selectedLevelId);
    }
    launchRace();
  });

  // ─── Records ───────────────────────────────────────────────
  document.getElementById('records-back').addEventListener('click', () => {
    UI.showScreen('screen-home');
  });

  // ─── Controls ──────────────────────────────────────────────
  document.getElementById('controls-back').addEventListener('click', () => {
    UI.showScreen('screen-home');
  });

  // ─── Race / Pause Controls ──────────────────────────────────
  document.getElementById('btn-pause').addEventListener('click', togglePause);

  document.getElementById('btn-resume').addEventListener('click', () => {
    hidePause();
    Game.resume();
  });

  document.getElementById('btn-restart').addEventListener('click', () => {
    hidePause();
    Game.stopRace();
    launchRace();
  });

  document.getElementById('btn-quit').addEventListener('click', () => {
    hidePause();
    Game.stopRace();
    UI.showScreen('screen-home');
  });

  // ─── Global keyboard (pause + race + menus) ──────────────────
  document.addEventListener('keydown', e => {
    Game.handleKeyDown(e);

    // Prevent hold-down 'Enter' from skipping across screens
    if (e.repeat && (e.code === 'Enter' || e.code === 'Space')) return;

    // Menu Navigation
    if (!Game.isRacing() && !Game.isPaused() && e.code.match(/^(ArrowUp|ArrowDown|ArrowLeft|ArrowRight|KeyW|KeyS|KeyA|KeyD|Enter|Space|Tab)$/)) {
      if (e.code === 'ArrowUp' || e.code === 'ArrowLeft' || e.code === 'KeyW' || e.code === 'KeyA') {
        UI.moveFocus(-1);
        e.preventDefault();
      } else if (e.code === 'ArrowDown' || e.code === 'ArrowRight' || e.code === 'KeyS' || e.code === 'KeyD' || e.code === 'Tab') {
        UI.moveFocus(1);
        e.preventDefault();
      } else if (e.code === 'Enter' || e.code === 'Space') {
        UI.clickFocus();
        if (e.code === 'Space') e.preventDefault();
      }
    } else if (Game.isPaused() && e.code.match(/^(ArrowUp|ArrowDown|KeyW|KeyS|Enter|Space|Tab)$/)) {
      if (e.code === 'ArrowUp' || e.code === 'KeyW') { UI.moveFocus(-1); e.preventDefault(); }
      else if (e.code === 'ArrowDown' || e.code === 'KeyS' || e.code === 'Tab') { UI.moveFocus(1); e.preventDefault(); }
      else if (e.code === 'Enter' || e.code === 'Space') { UI.clickFocus(); if (e.code === 'Space') e.preventDefault(); }
    }

    if ((e.code === 'KeyP' || e.code === 'Escape') && Game.isRacing()) {
      e.preventDefault();
      togglePause();
    }
    if (e.code === 'KeyR' && Game.isRacing()) {
      e.preventDefault();
      hidePause();
      Game.stopRace();
      launchRace();
    }
  });
  document.addEventListener('keyup', Game.handleKeyUp);

  // Resize canvas when window resizes
  window.addEventListener('resize', () => {
    if (document.getElementById('screen-race').classList.contains('active')) {
      // Renderer.resize() is called inside game loop – safe
    }
  });

  // ─── Results Buttons ────────────────────────────────────────
  document.getElementById('btn-retry').addEventListener('click', () => {
    UI.showScreen('screen-race');
    launchRace();
  });

  document.getElementById('btn-next-level').addEventListener('click', () => {
    const nextId = Math.min(selectedLevelId + 1, LEVELS.length - 1);
    unlockedLevel = Storage.getUnlockedLevel();
    if (nextId <= unlockedLevel) {
      selectedLevelId = nextId;
      Storage.setSelectedLevel(selectedLevelId);
    }
    UI.showScreen('screen-race');
    launchRace();
  });

  document.getElementById('btn-results-home').addEventListener('click', () => {
    UI.showScreen('screen-home');
  });

  // ─── Pause helpers ──────────────────────────────────────────
  function togglePause() {
    if (Game.isPaused()) {
      hidePause();
      Game.resume();
    } else {
      showPause();
      Game.pause();
    }
  }
  function showPause() { 
    document.getElementById('pause-overlay').style.display = 'flex'; 
    UI.initKeyboardFocus('#pause-overlay .btn');
  }
  function hidePause() { 
    document.getElementById('pause-overlay').style.display = 'none'; 
    UI.initKeyboardFocus('');
  }

  // ─── Launch Race ───────────────────────────────────────────
  function launchRace() {
    const car   = CARS[selectedCarId]          || CARS[0];
    const level = LEVELS[selectedLevelId]      || LEVELS[0];

    // Update HUD level display
    document.getElementById('hud-level').textContent = selectedLevelId + 1;

    // Reset progress bars
    document.getElementById('progress-player').style.width = '0%';
    document.getElementById('progress-npc').style.width    = '0%';
    document.getElementById('hud-npc-progress').textContent = '0%';

    // Reset countdown
    const cdOv = document.getElementById('countdown-overlay');
    cdOv.classList.remove('hidden');
    document.getElementById('countdown-text').textContent = '3';

    // Hide pause overlay
    hidePause();

    UI.showScreen('screen-race');

    // Small delay to let CSS transition complete before starting canvas
    setTimeout(() => {
      Game.startRace(level, car, ({ playerTime, npcTime, playerFinished }) => {
        unlockedLevel = Storage.getUnlockedLevel();
        UI.showResults(
          playerFinished ? playerTime : 0,
          npcTime,
          selectedLevelId
        );
      });
    }, 80);
  }

  // ─── Initial screen ─────────────────────────────────────────
  UI.showScreen('screen-home');
});
