(function () {
  const cat = document.getElementById("corner-cat");
  if (!cat) return;

  let x = 20;
  let direction = 1;
  let moving = false;
  let rafId = null;
  let timer = null;

  function bounds() {
    const pad = 12;
    const w = cat.offsetWidth || 92;
    return {
      min: pad,
      max: window.innerWidth - w - pad
    };
  }

  function clampX() {
    const b = bounds();
    x = Math.max(b.min, Math.min(b.max, x));
  }

  function applyX() {
    cat.style.left = `${x}px`;
  }

  function face() {
    if (direction < 0) cat.classList.add("face-left");
    else cat.classList.remove("face-left");
  }

  function setState(state) {
    cat.classList.remove("idle", "walking");
    cat.classList.add(state);
  }

  function randomTarget() {
    const b = bounds();
    return b.min + Math.random() * (b.max - b.min);
  }

  function walkTo(target, duration) {
    cancelAnimationFrame(rafId);
    moving = true;

    const start = x;
    const delta = target - start;
    direction = delta >= 0 ? 1 : -1;
    face();
    setState("walking");

    const startTime = performance.now();

    function step(now) {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 2);
      x = start + delta * eased;
      applyX();

      if (p < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        moving = false;
        setState("idle");
        scheduleMove();
      }
    }

    rafId = requestAnimationFrame(step);
  }

  function scheduleMove() {
    clearTimeout(timer);
    const wait = 1000 + Math.random() * 2200;
    timer = setTimeout(() => {
      if (document.hidden) {
        scheduleMove();
        return;
      }
      walkTo(randomTarget(), 1800 + Math.random() * 1600);
    }, wait);
  }

  cat.addEventListener("mouseenter", () => {
    const mouth = cat.querySelector(".cat-mouth");
    if (mouth) mouth.setAttribute("d", "M39 49 Q41.5 53 44 49");
  });

  cat.addEventListener("mouseleave", () => {
    const mouth = cat.querySelector(".cat-mouth");
    if (mouth) mouth.setAttribute("d", "M39 49 Q41.5 51 44 49");
  });

  window.addEventListener("resize", () => {
    clampX();
    applyX();
  });

  setState("idle");
  clampX();
  applyX();
  scheduleMove();
})();