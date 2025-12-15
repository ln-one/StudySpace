/**
 * Toast - 消息提示组件
 * 用法: Toast.show('消息内容', 'success')
 * 类型: info, success, error, warning
 */

const Toast = {
  container: null,
  timeout: null,

  init() {
    if (this.container) return;
    this.container = document.createElement('div');
    this.container.id = 'toast-container';
    document.body.appendChild(this.container);
  },

  show(message, type = 'info', duration = 2500) {
    this.init();
    
    // 移除现有 toast
    const existing = document.querySelector('.toast');
    if (existing) {
      existing.remove();
      clearTimeout(this.timeout);
    }

    // 创建新 toast
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    
    // 图标映射
    const icons = {
      info: 'ℹ️',
      success: '✓',
      error: '✕',
      warning: '⚠'
    };
    
    toast.innerHTML = `
      <span class="toast__icon">${icons[type] || ''}</span>
      <span class="toast__message">${message}</span>
    `;
    
    document.body.appendChild(toast);

    // 自动消失
    this.timeout = setTimeout(() => {
      toast.classList.add('toast--out');
      setTimeout(() => toast.remove(), 300);
    }, duration);

    return toast;
  },

  info(message, duration) {
    return this.show(message, 'info', duration);
  },

  success(message, duration) {
    return this.show(message, 'success', duration);
  },

  error(message, duration) {
    return this.show(message, 'error', duration);
  },

  warning(message, duration) {
    return this.show(message, 'warning', duration);
  }
};

// 兼容旧的 showToast 函数
function showToast(message, type = 'info') {
  Toast.show(message, type);
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Toast;
}
