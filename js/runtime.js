function updateRuntime() {
  const start = new Date("2024-01-01"); // 改成你的建站时间
  const now = new Date();

  const diff = now - start;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const seconds = Math.floor(diff / 1000) % 60;

  const el = document.getElementById("runtime");
  if (el) {
    el.innerHTML = `本站已运行 ${days} 天 ${hours} 小时 ${minutes} 分 ${seconds} 秒`;
  }
}

setInterval(updateRuntime, 1000);
updateRuntime();