function updateRuntime() {
  const start = new Date("2026-03-16 00:00:00");
  const now = new Date();
  const diff = now - start;

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const m = Math.floor(diff / (1000 * 60)) % 60;
  const s = Math.floor(diff / 1000) % 60;

  const el = document.getElementById("runtime");
  if (el) {
    el.textContent = `本站已运行 ${d} 天 ${h} 小时 ${m} 分 ${s} 秒`;
  }
}
setInterval(updateRuntime, 1000);
updateRuntime();

const typingTexts = [
  "欢迎来到我的博客！",
  "这里记录了我的学习和生活点滴。",
  "希望你能喜欢这里的内容！",
];

let ti = 0;
let tj = 0;
let deleting = false;

function runTyping() {
  const el = document.getElementById("footer-typing");
  if (!el) return;

  const text = typingTexts[ti];

  if (!deleting) {
    tj++;
  } else {
    tj--;
  }

  el.textContent = text.slice(0, tj);

  let delay = deleting ? 40 : 80;

  if (!deleting && tj === text.length) {
    delay = 1200;
    deleting = true;
  } else if (deleting && tj === 0) {
    deleting = false;
    ti = (ti + 1) % typingTexts.length;
    delay = 300;
  }

  setTimeout(runTyping, delay);
}

runTyping();