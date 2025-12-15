// 公告弹窗管理
class AnnouncementModal {
  constructor() {
    this.modal = null;
    this.isEditing = false;
    this.currentAnnouncementId = null;
  }

  // 显示新建公告弹窗
  showNewAnnouncement() {
    this.isEditing = false;
    this.currentAnnouncementId = null;
    this.createModal('发布新公告', this.getAnnouncementForm());
  }

  // 显示编辑公告弹窗
  showEditAnnouncement(announcementId, announcementData) {
    this.isEditing = true;
    this.currentAnnouncementId = announcementId;
    this.createModal('编辑公告', this.getAnnouncementForm(announcementData));
  }

  // 创建弹窗
  createModal(title, content) {
    // 移除已存在的弹窗
    this.close();

    this.modal = document.createElement('div');
    this.modal.className = 'announcement-modal';
    this.modal.innerHTML = `
      <div class="announcement-modal__content">
        <div class="announcement-modal__header">
          <h3 class="announcement-modal__title">${title}</h3>
          <button class="announcement-modal__close" onclick="announcementModal.close()">✕</button>
        </div>
        <div class="announcement-modal__body">
          ${content}
        </div>
      </div>
    `;

    document.body.appendChild(this.modal);
    
    // 显示弹窗
    setTimeout(() => {
      this.modal.classList.add('show');
    }, 10);

    // 点击背景关闭
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // 绑定事件
    this.bindEvents();
  }

  // 获取公告表单
  getAnnouncementForm(data = {}) {
    return `
      <form id="announcementForm">
        <div class="announcement-form-grid">
          <div class="announcement-form-main">
            <div class="form-group">
              <label class="form-label form-label--required">公告标题</label>
              <input type="text" class="form-input" name="title" placeholder="请输入公告标题" value="${data.title || ''}" required>
            </div>

            <div class="form-group">
              <label class="form-label form-label--required">公告内容</label>
              <div class="announcement-editor">
                <div class="announcement-editor__toolbar">
                  <button type="button" class="editor-btn" data-action="bold">
                    <strong>B</strong> 粗体
                  </button>
                  <button type="button" class="editor-btn" data-action="italic">
                    <em>I</em> 斜体
                  </button>
                  <button type="button" class="editor-btn" data-action="underline">
                    <u>U</u> 下划线
                  </button>
                  <button type="button" class="editor-btn" data-action="list">
                    • 列表
                  </button>
                  <button type="button" class="editor-btn" data-action="link">
                    🔗 链接
                  </button>
                </div>
                <textarea class="announcement-editor__content" name="content" placeholder="请输入公告内容..." required>${data.content || ''}</textarea>
              </div>
            </div>
          </div>

          <div class="announcement-form-sidebar">
            <div class="announcement-settings">
              <h4 class="announcement-settings__title">发布设置</h4>
              
              <div class="setting-item">
                <label class="setting-label">优先级</label>
                <select class="setting-select" name="priority">
                  <option value="low" ${data.priority === 'low' ? 'selected' : ''}>普通</option>
                  <option value="medium" ${data.priority === 'medium' ? 'selected' : ''}>重要</option>
                  <option value="high" ${data.priority === 'high' ? 'selected' : ''}>紧急</option>
                </select>
              </div>

              <div class="setting-item">
                <label class="setting-label">发布范围</label>
                <select class="setting-select" name="scope">
                  <option value="all" ${data.scope === 'all' ? 'selected' : ''}>所有用户</option>
                  <option value="students" ${data.scope === 'students' ? 'selected' : ''}>仅学生</option>
                  <option value="vip" ${data.scope === 'vip' ? 'selected' : ''}>仅VIP用户</option>
                </select>
              </div>

              <div class="setting-item">
                <label class="setting-checkbox">
                  <input type="checkbox" name="pinned" ${data.pinned ? 'checked' : ''}>
                  <span class="setting-checkbox-label">置顶显示</span>
                </label>
              </div>

              <div class="setting-item">
                <label class="setting-checkbox">
                  <input type="checkbox" name="sendNotification" ${data.sendNotification !== false ? 'checked' : ''}>
                  <span class="setting-checkbox-label">发送推送通知</span>
                </label>
              </div>

              <div class="setting-item">
                <label class="setting-label">定时发布</label>
                <input type="datetime-local" class="setting-datetime" name="scheduledTime" value="${data.scheduledTime || ''}">
              </div>
            </div>

            <div class="announcement-preview">
              <h4 class="announcement-preview__title">预览</h4>
              <div class="announcement-preview__content" id="announcementPreview">
                ${data.content || '在左侧输入内容，这里将显示预览...'}
              </div>
            </div>
          </div>
        </div>

        <div class="announcement-modal__footer">
          <button type="button" class="btn btn--secondary" onclick="announcementModal.close()">取消</button>
          <button type="button" class="btn btn--ghost" onclick="announcementModal.saveDraft()">保存草稿</button>
          <button type="submit" class="btn btn--primary">${this.isEditing ? '更新公告' : '发布公告'}</button>
        </div>
      </form>
    `;
  }

  // 绑定事件
  bindEvents() {
    // 表单提交
    const form = this.modal.querySelector('#announcementForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit(form);
    });

    // 编辑器工具栏
    const editorBtns = this.modal.querySelectorAll('.editor-btn');
    editorBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleEditorAction(btn.dataset.action);
      });
    });

    // 内容预览
    const contentTextarea = this.modal.querySelector('textarea[name="content"]');
    const previewDiv = this.modal.querySelector('#announcementPreview');
    
    contentTextarea.addEventListener('input', () => {
      const content = contentTextarea.value.trim();
      previewDiv.textContent = content || '在左侧输入内容，这里将显示预览...';
    });

    // 优先级变化
    const prioritySelect = this.modal.querySelector('select[name="priority"]');
    prioritySelect.addEventListener('change', () => {
      this.updatePriorityIndicator();
    });
  }

  // 处理编辑器操作
  handleEditorAction(action) {
    const textarea = this.modal.querySelector('textarea[name="content"]');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    let replacement = '';
    
    switch (action) {
      case 'bold':
        replacement = `**${selectedText || '粗体文字'}**`;
        break;
      case 'italic':
        replacement = `*${selectedText || '斜体文字'}*`;
        break;
      case 'underline':
        replacement = `<u>${selectedText || '下划线文字'}</u>`;
        break;
      case 'list':
        replacement = `\n• ${selectedText || '列表项'}\n• 列表项2`;
        break;
      case 'link':
        const url = prompt('请输入链接地址:', 'https://');
        if (url) {
          replacement = `[${selectedText || '链接文字'}](${url})`;
        }
        break;
    }
    
    if (replacement) {
      textarea.value = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
      textarea.focus();
      
      // 触发预览更新
      textarea.dispatchEvent(new Event('input'));
    }
  }

  // 更新优先级指示器
  updatePriorityIndicator() {
    const priority = this.modal.querySelector('select[name="priority"]').value;
    // 这里可以添加优先级指示器的视觉更新
  }

  // 处理表单提交
  handleSubmit(form) {
    const formData = new FormData(form);
    const announcementData = {};
    
    // 收集表单数据
    for (let [key, value] of formData.entries()) {
      if (key === 'pinned' || key === 'sendNotification') {
        announcementData[key] = true;
      } else {
        announcementData[key] = value;
      }
    }

    // 处理复选框（未选中的不会出现在FormData中）
    announcementData.pinned = form.querySelector('input[name="pinned"]').checked;
    announcementData.sendNotification = form.querySelector('input[name="sendNotification"]').checked;

    // 验证必填字段
    if (!announcementData.title || !announcementData.content) {
      Toast.error('请填写标题和内容');
      return;
    }

    // 提交数据
    if (this.isEditing) {
      this.updateAnnouncement(announcementData);
    } else {
      this.publishAnnouncement(announcementData);
    }
  }

  // 发布公告
  publishAnnouncement(data) {
    // 模拟API调用
    setTimeout(() => {
      const message = data.scheduledTime ? 
        `公告已设置为定时发布（${new Date(data.scheduledTime).toLocaleString()}）` : 
        '公告发布成功';
      
      Toast.success(message);
      this.close();
      
      // 刷新公告列表
      if (typeof refreshAnnouncementList === 'function') {
        refreshAnnouncementList();
      }
    }, 500);
  }

  // 更新公告
  updateAnnouncement(data) {
    // 模拟API调用
    setTimeout(() => {
      Toast.success('公告更新成功');
      this.close();
      
      // 刷新公告列表
      if (typeof refreshAnnouncementList === 'function') {
        refreshAnnouncementList();
      }
    }, 500);
  }

  // 保存草稿
  saveDraft() {
    const form = this.modal.querySelector('#announcementForm');
    const formData = new FormData(form);
    const draftData = {};
    
    for (let [key, value] of formData.entries()) {
      draftData[key] = value;
    }

    // 模拟保存草稿
    setTimeout(() => {
      Toast.success('草稿已保存');
    }, 300);
  }

  // 关闭弹窗
  close() {
    if (this.modal) {
      this.modal.classList.remove('show');
      setTimeout(() => {
        if (this.modal && this.modal.parentNode) {
          this.modal.parentNode.removeChild(this.modal);
        }
        this.modal = null;
      }, 300);
    }
  }
}

// 创建全局实例
const announcementModal = new AnnouncementModal();