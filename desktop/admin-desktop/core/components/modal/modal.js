/**
 * Modal - 弹窗组件
 * 用法: Modal.open('modalId') / Modal.close('modalId')
 */

const Modal = {
  activeModals: [],

  open(id) {
    const modal = document.getElementById(id);
    if (!modal) {
      console.warn(`Modal #${id} not found`);
      return;
    }
    
    modal.classList.add('modal--open');
    document.body.style.overflow = 'hidden';
    this.activeModals.push(id);
    
    // ESC 关闭
    this.bindEscClose(id);
    
    // 点击遮罩关闭
    const overlay = modal.querySelector('.modal__overlay');
    if (overlay) {
      overlay.onclick = () => this.close(id);
    }
  },

  close(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    
    modal.classList.remove('modal--open');
    
    // 从活动列表移除
    const index = this.activeModals.indexOf(id);
    if (index > -1) {
      this.activeModals.splice(index, 1);
    }
    
    // 如果没有其他弹窗，恢复滚动
    if (this.activeModals.length === 0) {
      document.body.style.overflow = '';
    }
  },

  closeAll() {
    this.activeModals.forEach(id => {
      const modal = document.getElementById(id);
      if (modal) modal.classList.remove('modal--open');
    });
    this.activeModals = [];
    document.body.style.overflow = '';
  },

  bindEscClose(id) {
    const handler = (e) => {
      if (e.key === 'Escape' && this.activeModals.includes(id)) {
        this.close(id);
        document.removeEventListener('keydown', handler);
      }
    };
    document.addEventListener('keydown', handler);
  },

  // 确认弹窗
  confirm(message, options = {}) {
    return new Promise((resolve) => {
      const {
        title = '确认',
        confirmText = '确定',
        cancelText = '取消',
        type = 'info'
      } = options;

      const modalId = 'confirm-modal-' + Date.now();
      const modal = document.createElement('div');
      modal.id = modalId;
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal__overlay"></div>
        <div class="modal__content modal__content--sm">
          <div class="modal__header">
            <h3 class="modal__title">${title}</h3>
          </div>
          <div class="modal__body">
            <p class="modal__message">${message}</p>
          </div>
          <div class="modal__footer">
            <button class="btn btn--secondary modal__cancel">${cancelText}</button>
            <button class="btn btn--${type === 'danger' ? 'danger' : 'primary'} modal__confirm">${confirmText}</button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);
      this.open(modalId);

      modal.querySelector('.modal__cancel').onclick = () => {
        this.close(modalId);
        setTimeout(() => modal.remove(), 300);
        resolve(false);
      };

      modal.querySelector('.modal__confirm').onclick = () => {
        this.close(modalId);
        setTimeout(() => modal.remove(), 300);
        resolve(true);
      };

      modal.querySelector('.modal__overlay').onclick = () => {
        this.close(modalId);
        setTimeout(() => modal.remove(), 300);
        resolve(false);
      };
    });
  }
};

// 兼容旧函数
function openModal(id) { Modal.open(id); }
function closeModal(id) { Modal.close(id); }

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Modal;
}
