(function () {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const isMobile = window.innerWidth < 640;
  if (isMobile) { canvas.style.display = 'none'; return; }

  const CHARS = 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ01ㅏㅓㅗㅜABCDEFGHIJKLMN01XYZ<>{}[]';
  const FONT_SIZE = 13;
  let cols, drops;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols  = Math.floor(canvas.width / FONT_SIZE);
    drops = Array.from({ length: cols }, () => Math.random() * -50);
  }

  function draw() {
    ctx.fillStyle = 'rgba(2, 4, 8, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41';
    ctx.font = FONT_SIZE + 'px JetBrains Mono, monospace';

    for (let i = 0; i < drops.length; i++) {
      const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
      const x  = i * FONT_SIZE;
      const y  = drops[i] * FONT_SIZE;
      ctx.globalAlpha = Math.random() * 0.5 + 0.1;
      ctx.fillText(ch, x, y);
      ctx.globalAlpha = 1;
      if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 0.5;
    }
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  let frame = 0;
  function loop() {
    frame++;
    if (frame % 2 === 0) draw();
    requestAnimationFrame(loop);
  }
  loop();
})();
