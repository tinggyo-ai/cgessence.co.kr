(function () {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx    = canvas.getContext('2d');
  const isMob  = window.innerWidth < 640;
  const COUNT  = isMob ? 45 : 120;
  const LINK   = isMob ? 80 : 130;
  const COLORS = ['#00ffcc', '#7b2fff', '#00ff41', '#00b4d8'];

  let W, H, particles, mouse = { x: -9999, y: -9999 };

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
  }

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function initParticles() {
    particles = Array.from({ length: COUNT }, () => ({
      x:     rand(0, W),
      y:     rand(0, H),
      vx:    rand(-0.35, 0.35),
      vy:    rand(-0.35, 0.35),
      size:  rand(1.2, 2.8),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: rand(0.4, 0.9),
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // mouse repulsion
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90) {
        const force = (90 - dist) / 90 * 0.6;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }

      // velocity damping
      p.vx *= 0.98;
      p.vy *= 0.98;
      p.x  += p.vx;
      p.y  += p.vy;

      // wrap edges
      if (p.x < 0)  p.x = W;
      if (p.x > W)  p.x = 0;
      if (p.y < 0)  p.y = H;
      if (p.y > H)  p.y = 0;

      // draw links
      for (let j = i + 1; j < particles.length; j++) {
        const q  = particles[j];
        const lx = p.x - q.x;
        const ly = p.y - q.y;
        const ld = Math.sqrt(lx * lx + ly * ly);
        if (ld < LINK) {
          ctx.beginPath();
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = (1 - ld / LINK) * 0.22;
          ctx.lineWidth   = 0.8;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      // draw particle
      ctx.beginPath();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle   = p.color;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.shadowBlur  = 8;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.shadowBlur  = 0;
    }
    ctx.globalAlpha = 1;
  }

  function loop() {
    draw();
    requestAnimationFrame(loop);
  }

  resize();
  initParticles();
  window.addEventListener('resize', () => { resize(); initParticles(); }, { passive: true });
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });

  loop();
})();
