/**
 * Interactions - 通用交互工具
 * 提供页面级别的通用交互功能
 */

const Interactions = {
  /**
   * 初始化所有通用交互
   */
  init() {
    this.initDropdowns();
    this.initSearch();
    this.initNotification();
    this.initUserMenu();
    this.initTime();
    this.initDataCards();
  },

  /**
   * 下拉框交互
   */
  initDropdowns() {
    // 切换下拉框
    window.toggleDropdown = (id) => {
      const dropdown = document.getElementById(id);
      if (!dropdown) return;
      
      const isOpen = dropdown.classList.contains('filter-dropdown--open');
      
      // 关闭所有下拉框
      document.querySelectorAll('.filter-dropdown').forEach(d => {
        d.classList.remove('filter-dropdown--open');
      });
      
      // 切换当前
      if (!isOpen) {
        dropdown.classList.add('filter-dropdown--open');
      }
    };

    // 点击外部关闭
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.filter-dropdown')) {
        document.querySelectorAll('.filter-dropdown').forEach(d => {
          d.classList.remove('filter-dropdown--open');
        });
      }
    });

    // 选择下拉项
    document.querySelectorAll('.filter-dropdown__item').forEach(item => {
      item.addEventListener('click', function() {
        const dropdown = this.closest('.filter-dropdown');
        const label = dropdown?.querySelector('.filter-dropdown__label');
        
        // 更新选中状态
        dropdown?.querySelectorAll('.filter-dropdown__item').forEach(i => {
          i.classList.remove('filter-dropdown__item--active');
        });
        this.classList.add('filter-dropdown__item--active');
        
        // 更新显示文本
        if (label) {
          label.textContent = this.textContent;
        }
        
        // 关闭下拉框
        dropdown?.classList.remove('filter-dropdown--open');
        
        // 触发自定义事件
        dropdown?.dispatchEvent(new CustomEvent('change', {
          detail: { value: this.textContent, item: this }
        }));
      });
    });
  },

  /**
   * 搜索框交互
   */
  initSearch() {
    const searchInput = document.querySelector('.search-bar__input');
    const searchBtn = document.querySelector('.search-bar__btn');
    
    const doSearch = () => {
      const query = searchInput?.value.trim();
      if (query) {
        Toast.info(`正在搜索: "${query}"`);
        // 触发搜索事件
        document.dispatchEvent(new CustomEvent('search', { detail: { query } }));
      }
    };

    searchInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') doSearch();
    });

    searchBtn?.addEventListener('click', doSearch);
  },

  /**
   * 通知按钮
   */
  initNotification() {
    document.querySelector('.navbar__notification')?.addEventListener('click', () => {
      Toast.info('您有 3 条未读通知');
      // 可以在这里打开通知面板
    });
  },

  /**
   * 用户菜单
   */
  initUserMenu() {
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');
    const logoutBtn = document.getElementById('logoutBtn');

    userBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdown?.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.sidebar__footer')) {
        userDropdown?.classList.remove('show');
      }
    });

    // 菜单项交互
    document.querySelectorAll('.user-dropdown__item').forEach(item => {
      item.addEventListener('click', function() {
        const text = this.textContent.trim();
        
        if (this.classList.contains('user-dropdown__item--danger')) {
          // 退出登录
          Modal.confirm('确定要退出登录吗？', { type: 'danger' }).then(confirmed => {
            if (confirmed) {
              // 计算登录页路径
              const path = window.location.pathname;
              let loginPath = 'pages/login.html';
              if (path.includes('/modules/')) {
                loginPath = '../../../pages/login.html';
              }
              window.location.href = loginPath;
            }
          });
        } else if (text.includes('个人信息')) {
          Toast.info('正在打开个人信息...');
        } else if (text.includes('修改密码')) {
          Toast.info('正在打开修改密码...');
        } else if (text.includes('系统设置')) {
          const path = window.location.pathname;
          let settingsPath = 'modules/settings/pages/index.html';
          if (path.includes('/modules/')) {
            settingsPath = '../../settings/pages/index.html';
          }
          window.location.href = settingsPath;
        }
        
        userDropdown?.classList.remove('show');
      });
    });
  },

  /**
   * 时间显示
   */
  initTime() {
    const updateTime = () => {
      const timeEl = document.getElementById('currentTime');
      if (!timeEl) return;
      
      const now = new Date();
      const options = { 
        month: 'short', 
        day: 'numeric',
        weekday: 'short',
        hour: '2-digit', 
        minute: '2-digit'
      };
      timeEl.textContent = now.toLocaleString('zh-CN', options);
    };
    
    updateTime();
    setInterval(updateTime, 60000);
  },

  /**
   * 数据卡片点击
   */
  initDataCards() {
    document.querySelectorAll('.data-card').forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function() {
        const title = this.querySelector('.data-card__title')?.textContent;
        if (title) {
          Toast.info(`正在查看${title}详情...`);
        }
      });
    });
  }
};

// 页面加载后自动初始化
document.addEventListener('DOMContentLoaded', () => {
  Interactions.init();
});
