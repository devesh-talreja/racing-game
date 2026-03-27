// ── renderer.js ───────────────────────────────────────────────
// Canvas rendering: track, cars, start/finish, HUD overlays.

const Renderer = (() => {

  let canvas, ctx;

  function init(canvasEl) {
    canvas = canvasEl;
    ctx    = canvas.getContext('2d');
    resize();
  }

  function resize() {
    // Hardcoded to prevent CSS 'display' collapsing the pixel buffer size
    canvas.width  = 800;
    canvas.height = 600;
  }

  // ─── Scale helpers ─────────────────────────────────────────
  // We design tracks on a 800×600 virtual canvas, scale to actual.
  function sx(x) { return x * (canvas.width  / 800); }
  function sy(y) { return y * (canvas.height / 600); }
  function ss(v) { return v * Math.min(canvas.width / 800, canvas.height / 600); }

  // ─── Draw Track ────────────────────────────────────────────
  function drawTrack(level) {
    const wp = level.waypoints;
    if (!wp || wp.length < 2) return;
    const tw = ss(level.trackWidth);

    // Background
    ctx.fillStyle = level.bgColor || '#1a2035';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw outer road shadow
    ctx.save();
    // ctx.shadowColor = 'rgba(0,0,0,0.6)'; // Disabled for better performance and to avoid context loss
    // ctx.shadowBlur  = 18;

    // Road fill (thick stroked path)
    ctx.beginPath();
    ctx.moveTo(sx(wp[0].x), sy(wp[0].y));
    for (let i = 1; i < wp.length; i++) ctx.lineTo(sx(wp[i].x), sy(wp[i].y));
    ctx.closePath();
    ctx.lineWidth   = tw + 10;
    ctx.strokeStyle = '#111';
    ctx.stroke();
    ctx.restore();

    // Kerb (alternating dashes on outer edge)
    ctx.beginPath();
    ctx.moveTo(sx(wp[0].x), sy(wp[0].y));
    for (let i = 1; i < wp.length; i++) ctx.lineTo(sx(wp[i].x), sy(wp[i].y));
    ctx.closePath();
    ctx.lineWidth   = tw + 8;
    const kerbDash  = ss(18);
    ctx.setLineDash([kerbDash, kerbDash]);
    ctx.lineDashOffset = 0;
    ctx.strokeStyle = level.kerb1 || '#fff';
    ctx.globalAlpha = 0.9;
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.moveTo(sx(wp[0].x), sy(wp[0].y));
    for (let i = 1; i < wp.length; i++) ctx.lineTo(sx(wp[i].x), sy(wp[i].y));
    ctx.closePath();
    ctx.lineWidth   = tw + 8;
    ctx.setLineDash([kerbDash, kerbDash]);
    ctx.lineDashOffset = kerbDash;
    ctx.strokeStyle = level.kerb2 || '#f00';
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;

    // Road surface
    ctx.beginPath();
    ctx.moveTo(sx(wp[0].x), sy(wp[0].y));
    for (let i = 1; i < wp.length; i++) ctx.lineTo(sx(wp[i].x), sy(wp[i].y));
    ctx.closePath();
    ctx.lineWidth   = tw;
    ctx.strokeStyle = level.roadColor || '#222';
    ctx.stroke();

    // Center dashed line
    ctx.beginPath();
    ctx.moveTo(sx(wp[0].x), sy(wp[0].y));
    for (let i = 1; i < wp.length; i++) ctx.lineTo(sx(wp[i].x), sy(wp[i].y));
    ctx.closePath();
    ctx.lineWidth   = ss(2);
    ctx.setLineDash([ss(14), ss(14)]);
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // ─── Draw Start/Finish Line ─────────────────────────────────
  function drawStartLine(level) {
    const wp = level.waypoints;
    if (!wp || wp.length < 2) return;
    const p0 = wp[0], p1 = wp[1];
    const angle = Math.atan2(p1.y - p0.y, p1.x - p0.x);
    const perp  = angle + Math.PI / 2;
    const tw    = ss(level.trackWidth) / 2 + 4;

    ctx.save();
    ctx.translate(sx(p0.x), sy(p0.y));
    ctx.rotate(perp);
    const sqSize = ss(10);
    const cols   = Math.ceil(tw / sqSize);
    for (let i = -cols; i <= cols; i++) {
      for (let j = 0; j < 2; j++) {
        ctx.fillStyle = (i + j) % 2 === 0 ? '#ffffff' : '#000000';
        ctx.fillRect(i * sqSize, j * sqSize - sqSize, sqSize, sqSize);
      }
    }
    ctx.restore();
  }

  // ─── Draw a Car ────────────────────────────────────────────
  function drawCar(state, carDef, scale = 1) {
    const CW = ss(28) * scale;
    const CH = ss(16) * scale;

    ctx.save();
    ctx.translate(sx(state.x), sy(state.y));
    ctx.rotate(state.angle);

    // Body
    ctx.fillStyle = carDef.bodyColor;
    ctx.beginPath();
    ctx.rect(-CW / 2, -CH / 2, CW, CH);
    ctx.fill();

    // Windshield
    ctx.fillStyle = carDef.windshieldColor;
    ctx.beginPath();
    ctx.rect(-CW / 4, -CH * 0.35, CW * 0.4, CH * 0.7);
    ctx.fill();

    // Details (lights)
    ctx.fillStyle = carDef.detailsColor;
    ctx.beginPath();
    ctx.rect(CW * 0.35, -CH * 0.4, CW * 0.15, CH * 0.2);
    ctx.rect(CW * 0.35, CH * 0.2, CW * 0.15, CH * 0.2);
    ctx.fill();

    // Direction arrow
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth   = ss(1.5);
    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(CW * 0.35, 0);
    ctx.stroke();

    ctx.restore();
  }

  // ─── Clear ─────────────────────────────────────────────────
  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  return { init, resize, drawTrack, drawStartLine, drawCar, clear, sx, sy };
})();
