/**
 * Sidebar 侧边栏组件脚本
 * 提供用户菜单交互和登出功能
 */

(function() {
  // 初始化侧边栏用户交互
  function initSidebarUser() {
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');
    const logoutBtn = document.getElementById('logoutBtn');

    if (!userBtn || !userDropdown) return;

    // 切换下拉菜单
    userBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle('show');
    });

    // 点击外部关闭
    document.addEventListener('click', () => {
      userDropdown.classList.remove('show');
    });

    // 退出登录
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        if (confirm('确定要退出登录吗？')) {
          // 根据当前页面深度计算登录页路径
          const depth = window.location.pathname.split('/').filter(p => p).length;
          let loginPath = 'pages/login.html';
          
          if (window.location.pathname.includes('/modules/')) {
            loginPath = '../../../pages/login.html';
          } else if (window.location.pathname.includes('/pages/')) {
            loginPath = 'login.html';
          }
          
          window.location.href = loginPath;
        }
      });
    }
  }

  // 初始化时间显示
  function initNavbarTime() {
    const timeEl = document.getElementById('currentTime');
    if (!timeEl) return;

    function updateTime() {
      const now = new Date();
      const options = { 
        month: 'short', 
        day: 'numeric',
        weekday: 'short',
        hour: '2-digit', 
        minute: '2-digit'
      };
      timeEl.textContent = now.toLocaleString('zh-CN', options);
    }
    
    updateTime();
    setInterval(updateTime, 60000);
  }

  // DOM 加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initSidebarUser();
      initNavbarTime();
    });
  } else {
    initSidebarUser();
    initNavbarTime();
  }
})();
