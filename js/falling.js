(function () {
  const layer = document.getElementById("global-fx-layer");
  if (!layer) return;

  const sakuraChars = ["❀", "✿", "🌸"];
  const snowChars = ["❄", "✦", "✧"];

  function isDarkMode() {
    return (
      document.documentElement.getAttribute("data-user-color-scheme") === "dark" ||
      document.documentElement.getAttribute("data-default-color-scheme") === "dark" ||
      document.documentElement.classList.contains("dark") ||
      document.body.classList.contains("dark")
    );
  }

  function createItem() {
    const item = document.createElement("span");
    item.className = "falling-item";

    const dark = isDarkMode();
    const chars = dark ? snowChars : sakuraChars;
    item.textContent = chars[Math.floor(Math.random() * chars.length)];

    // ===== 更密集参数 =====
    const left = Math.random() * 100;
    const size = 14 + Math.random() * 18;   // 更大一点
    const fallDuration = 6 + Math.random() * 6; // 更快（原来 8~16）
    const swayDuration = 2 + Math.random() * 2;
    const delay = Math.random() * 3; // 延迟更短

    item.style.left = left + "vw";
    item.style.fontSize = size + "px";
    item.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
    item.style.animationDelay = `${delay}s, 0s`;
    item.style.opacity = dark ? 0.65 : 0.75;
    item.style.color = dark ? "#e6f2ff" : "#f7a9cc";

    layer.appendChild(item);

    // 自动删除（避免内存堆积）
    setTimeout(() => {
      item.remove();
    }, (fallDuration + delay) * 1000 + 1000);
  }

  function startGenerate() {
    setInterval(() => {
      if (document.hidden) return;

      // ===== 每次生成多个 =====
      createItem();
      if (Math.random() > 0.4) createItem();
      if (Math.random() > 0.7) createItem();
    }, 350); // 原来 450ms，现在更密
  }

  startGenerate();
})();