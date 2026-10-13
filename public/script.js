document.documentElement.classList.add('js');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setupNav() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  const label = toggle ? toggle.querySelector('.nav-toggle-label') : null;

  function setOpen(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
    if (label) label.textContent = open ? 'Close' : 'Menu';
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
  }

  if (nav) {
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setOpen(false));
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) setOpen(false);
  });

  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });
}

function setupEventState() {
  const end = Date.parse('2026-10-15T01:00:00Z');
  if (Number.isNaN(end) || Date.now() <= end) return;
  document.querySelectorAll('[data-event-state]').forEach((node) => {
    node.textContent = 'Recent';
  });
}

function setupFaq() {
  const buttons = document.querySelectorAll('.faq-item button');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const willOpen = button.getAttribute('aria-expanded') !== 'true';
      buttons.forEach((other) => {
        other.setAttribute('aria-expanded', 'false');
        const panel = document.getElementById(other.getAttribute('aria-controls'));
        if (panel) panel.hidden = true;
      });
      if (!willOpen) return;
      button.setAttribute('aria-expanded', 'true');
      const panel = document.getElementById(button.getAttribute('aria-controls'));
      if (panel) panel.hidden = false;
    });
  });
}

function setupForm() {
  const form = document.getElementById('signupForm');
  if (!form) return;

  const statusMessage = document.getElementById('statusMessage');
  const submitBtn = form.querySelector('.submit-btn');
  const emailInput = form.querySelector('input[type="email"]');
  const nameInput = form.querySelector('input[name="name"]');

  form.querySelectorAll('.form-input').forEach((input) => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('is-focused');
    });
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('is-focused');
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!emailInput || !nameInput || !submitBtn || !statusMessage) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    nameInput.value = name;
    emailInput.value = email;

    if (!name || !email) {
      statusMessage.textContent = 'Name and email are required.';
      statusMessage.className = 'status-message error';
      return;
    }

    if (!email.endsWith('@jh.edu')) {
      statusMessage.textContent = 'Please use your JHU email address (@jh.edu).';
      statusMessage.className = 'status-message error';
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    statusMessage.textContent = 'Sending your request...';
    statusMessage.className = 'status-message';

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();

      if (result.success) {
        statusMessage.textContent = result.message;
        statusMessage.className = 'status-message success';
        submitBtn.textContent = 'Sent';
        setTimeout(() => {
          form.reset();
          statusMessage.textContent = '';
          statusMessage.className = 'status-message';
          submitBtn.textContent = 'Join the list';
          submitBtn.disabled = false;
        }, 3200);
        return;
      }

      statusMessage.textContent = result.message || 'Something went wrong. Please try again.';
      statusMessage.className = 'status-message error';
      submitBtn.textContent = 'Join the list';
      submitBtn.disabled = false;
    } catch (error) {
      statusMessage.textContent = 'Network error. Email jhudatascienceclub@gmail.com and we will add you.';
      statusMessage.className = 'status-message error';
      submitBtn.textContent = 'Join the list';
      submitBtn.disabled = false;
    }
  });
}

function setupScatter(canvas) {
  if (!canvas) return;
  const context = canvas.getContext('2d');
  if (!context) return;

  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let points = [];
  let frameId = 0;
  let onScreen = true;
  const colors = {
    blue: '#9dc0ff',
    gold: '#e4b86a'
  };

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  function seed() {
    const count = canvas.clientWidth < 560 ? 34 : 62;
    points = Array.from({ length: count }, () => {
      const cluster = Math.random() < 0.58 ? 0 : 1;
      const centerX = cluster === 0 ? 0.33 : 0.71;
      const centerY = cluster === 0 ? 0.64 : 0.36;
      return {
        x: Math.min(0.92, Math.max(0.08, centerX + random(-0.15, 0.15))),
        y: Math.min(0.9, Math.max(0.1, centerY + random(-0.16, 0.16))),
        vx: random(-0.00022, 0.00022),
        vy: random(-0.0002, 0.0002),
        r: random(1.35, 2.5),
        cluster
      };
    });
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width < 2 || height < 2) return;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
  }

  function step() {
    points.forEach((point) => {
      const centerX = point.cluster === 0 ? 0.33 : 0.71;
      const centerY = point.cluster === 0 ? 0.64 : 0.36;
      point.vx += (centerX - point.x) * 0.000045;
      point.vy += (centerY - point.y) * 0.000045;
      point.vx *= 0.995;
      point.vy *= 0.995;
      point.x += point.vx;
      point.y += point.vy;
      if (point.x < 0.06 || point.x > 0.94) point.vx *= -1;
      if (point.y < 0.08 || point.y > 0.92) point.vy *= -1;
      point.x = Math.min(0.96, Math.max(0.04, point.x));
      point.y = Math.min(0.96, Math.max(0.04, point.y));
    });
  }

  function draw() {
    const width = canvas.width;
    const height = canvas.height;
    context.clearRect(0, 0, width, height);

    const padLeft = 26 * dpr;
    const padRight = 14 * dpr;
    const padTop = 10 * dpr;
    const padBottom = 18 * dpr;
    const innerWidth = width - padLeft - padRight;
    const innerHeight = height - padTop - padBottom;

    context.lineWidth = dpr;
    context.strokeStyle = 'rgba(232, 238, 247, 0.07)';
    context.beginPath();
    for (let i = 0; i <= 4; i += 1) {
      const y = padTop + (innerHeight * i) / 4;
      context.moveTo(padLeft, y);
      context.lineTo(padLeft + innerWidth, y);
      const x = padLeft + (innerWidth * i) / 4;
      context.moveTo(x, padTop);
      context.lineTo(x, padTop + innerHeight);
    }
    context.stroke();

    const maxDistance = 0.022;
    for (let i = 0; i < points.length; i += 1) {
      for (let j = i + 1; j < points.length; j += 1) {
        const a = points[i];
        const b = points[j];
        if (a.cluster !== b.cluster) continue;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = dx * dx + dy * dy;
        if (dist > maxDistance) continue;
        const alpha = (1 - dist / maxDistance) * 0.42;
        context.strokeStyle = a.cluster === 0
          ? `rgba(157, 192, 255, ${alpha})`
          : `rgba(228, 184, 106, ${alpha})`;
        context.beginPath();
        context.moveTo(padLeft + a.x * innerWidth, padTop + a.y * innerHeight);
        context.lineTo(padLeft + b.x * innerWidth, padTop + b.y * innerHeight);
        context.stroke();
      }
    }

    points.forEach((point) => {
      context.fillStyle = point.cluster === 0 ? colors.blue : colors.gold;
      context.beginPath();
      context.arc(
        padLeft + point.x * innerWidth,
        padTop + point.y * innerHeight,
        point.r * dpr,
        0,
        Math.PI * 2
      );
      context.fill();
    });
  }

  function loop() {
    step();
    draw();
    if (onScreen && !document.hidden) frameId = requestAnimationFrame(loop);
    else frameId = 0;
  }

  function start() {
    if (reduceMotion || frameId || !onScreen || document.hidden) return;
    frameId = requestAnimationFrame(loop);
  }

  resize();
  seed();
  draw();
  start();

  if ('ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw();
    });
    resizeObserver.observe(canvas);
  } else {
    window.addEventListener('resize', () => {
      resize();
      if (reduceMotion) draw();
    });
  }

  if ('IntersectionObserver' in window) {
    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
    });
    visibility.observe(canvas);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = 0;
      return;
    }
    start();
  });
}

setupNav();
setupEventState();
setupFaq();
setupForm();
setupScatter(document.getElementById('scatter'));
