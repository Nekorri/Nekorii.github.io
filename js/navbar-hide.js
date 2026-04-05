(() => {
  let lastScrollTop = 0;
  const navbar = document.getElementById('navbar');

  if (!navbar) return;

  window.addEventListener('scroll', () => {
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;

    // 页面顶部时始终显示
    if (currentScroll <= 0) {
      navbar.classList.remove('navbar-hide');
      lastScrollTop = 0;
      return;
    }

    // 向下滚动：隐藏
    if (currentScroll > lastScrollTop && currentScroll > 80) {
      navbar.classList.add('navbar-hide');
    } else {
      // 向上滚动：显示
      navbar.classList.remove('navbar-hide');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
})();