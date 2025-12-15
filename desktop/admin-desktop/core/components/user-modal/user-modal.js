// 用户弹窗管理
class UserModal {
  constructor() {
    this.modal = null;
    this.isEditing = false;
    this.currentUserId = null;
  }

  // 显示添加用户弹窗
  showAddUser() {
    this.isEditing = false;
    this.currentUserId = null;
    this.createModal('添加用户', this.getAddUserForm());
  }

  // 显示编辑用户弹窗
  showEditUser(userId, userData) {
    this.isEditing = true;
    this.currentUserId = userId;
    this.createModal('编辑用户', this.getEditUserForm(userData));
  }

  // 创建弹窗
  createModal(title, content) {
    // 移除已存在的弹窗
    this.close();

    this.modal = document.createElement('div');
    this.modal.className = 'user-modal';
    this.modal.innerHTML = `
      <div class="user-modal__content">
        <div class="user-modal__header">
          <h3 class="user-modal__title">${title}</h3>
          <button class="user-modal__close" onclick="userModal.close()">✕</button>
        </div>
        <div class="user-modal__body">
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

    // 绑定表单事件
    this.bindFormEvents();
  }

  // 获取添加用户表单
  getAddUserForm() {
    return `
      <form id="userForm">
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label form-label--required">姓名</label>
            <input type="text" class="form-input" name="name" placeholder="请输入姓名" required>
          </div>
          <div class="form-group">
            <label class="form-label form-label--required">学号</label>
            <input type="text" class="form-input" name="studentId" placeholder="请输入学号" required>
          </div>
          <div class="form-group">
            <label class="form-label form-label--required">邮箱</label>
            <input type="email" class="form-input" name="email" placeholder="请输入邮箱" required>
          </div>
          <div class="form-group">
            <label class="form-label">手机号</label>
            <input type="tel" class="form-input" name="phone" placeholder="请输入手机号">
          </div>
          <div class="form-group">
            <label class="form-label form-label--required">专业</label>
            <select class="form-select" name="major" required>
              <option value="">请选择专业</option>
              <option value="计算机科学">计算机科学</option>
              <option value="软件工程">软件工程</option>
              <option value="人工智能">人工智能</option>
              <option value="数据科学">数据科学</option>
              <option value="信息安全">信息安全</option>
              <option value="网络工程">网络工程</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label form-label--required">年级</label>
            <select class="form-select" name="grade" required>
              <option value="">请选择年级</option>
              <option value="大一">大一</option>
              <option value="大二">大二</option>
              <option value="大三">大三</option>
              <option value="大四">大四</option>
              <option value="研究生">研究生</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">权限等级</label>
          <div class="permission-selector">
            <div class="permission-option selected" data-permission="normal">
              <span class="permission-option__icon">👤</span>
              <div class="permission-option__title">普通用户</div>
              <div class="permission-option__desc">标准预约权限</div>
            </div>
            <div class="permission-option" data-permission="vip">
              <span class="permission-option__icon">⭐</span>
              <div class="permission-option__title">VIP用户</div>
              <div class="permission-option__desc">优先预约权限</div>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">备注</label>
          <textarea class="form-textarea" name="notes" placeholder="可选，添加用户备注信息"></textarea>
          <div class="form-help">管理员可见的用户备注信息</div>
        </div>

        <div class="user-modal__footer">
          <button type="button" class="btn btn--secondary" onclick="userModal.close()">取消</button>
          <button type="submit" class="btn btn--primary">添加用户</button>
        </div>
      </form>
    `;
  }

  // 获取编辑用户表单
  getEditUserForm(userData) {
    return `
      <form id="userForm">
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label form-label--required">姓名</label>
            <input type="text" class="form-input" name="name" value="${userData.name}" required>
          </div>
          <div class="form-group">
            <label class="form-label form-label--required">学号</label>
            <input type="text" class="form-input" name="studentId" value="${userData.studentId}" required readonly>
            <div class="form-help">学号不可修改</div>
          </div>
          <div class="form-group">
            <label class="form-label form-label--required">邮箱</label>
            <input type="email" class="form-input" name="email" value="${userData.email}" required>
          </div>
          <div class="form-group">
            <label class="form-label">手机号</label>
            <input type="tel" class="form-input" name="phone" value="${userData.phone || ''}">
          </div>
          <div class="form-group">
            <label class="form-label form-label--required">专业</label>
            <select class="form-select" name="major" required>
              <option value="计算机科学" ${userData.major === '计算机科学' ? 'selected' : ''}>计算机科学</option>
              <option value="软件工程" ${userData.major === '软件工程' ? 'selected' : ''}>软件工程</option>
              <option value="人工智能" ${userData.major === '人工智能' ? 'selected' : ''}>人工智能</option>
              <option value="数据科学" ${userData.major === '数据科学' ? 'selected' : ''}>数据科学</option>
              <option value="信息安全" ${userData.major === '信息安全' ? 'selected' : ''}>信息安全</option>
              <option value="网络工程" ${userData.major === '网络工程' ? 'selected' : ''}>网络工程</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label form-label--required">年级</label>
            <select class="form-select" name="grade" required>
              <option value="大一" ${userData.grade === '大一' ? 'selected' : ''}>大一</option>
              <option value="大二" ${userData.grade === '大二' ? 'selected' : ''}>大二</option>
              <option value="大三" ${userData.grade === '大三' ? 'selected' : ''}>大三</option>
              <option value="大四" ${userData.grade === '大四' ? 'selected' : ''}>大四</option>
              <option value="研究生" ${userData.grade === '研究生' ? 'selected' : ''}>研究生</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">权限等级</label>
          <div class="permission-selector">
            <div class="permission-option ${userData.permission === 'normal' ? 'selected' : ''}" data-permission="normal">
              <span class="permission-option__icon">👤</span>
              <div class="permission-option__title">普通用户</div>
              <div class="permission-option__desc">标准预约权限</div>
            </div>
            <div class="permission-option ${userData.permission === 'vip' ? 'selected' : ''}" data-permission="vip">
              <span class="permission-option__icon">⭐</span>
              <div class="permission-option__title">VIP用户</div>
              <div class="permission-option__desc">优先预约权限</div>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">备注</label>
          <textarea class="form-textarea" name="notes" placeholder="可选，添加用户备注信息">${userData.notes || ''}</textarea>
        </div>

        <div class="user-modal__footer">
          <button type="button" class="btn btn--secondary" onclick="userModal.close()">取消</button>
          <button type="submit" class="btn btn--primary">保存修改</button>
        </div>
      </form>
    `;
  }

  // 绑定表单事件
  bindFormEvents() {
    // 权限选择
    const permissionOptions = this.modal.querySelectorAll('.permission-option');
    permissionOptions.forEach(option => {
      option.addEventListener('click', () => {
        permissionOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
      });
    });

    // 表单提交
    const form = this.modal.querySelector('#userForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit(form);
    });
  }

  // 处理表单提交
  handleSubmit(form) {
    const formData = new FormData(form);
    const userData = {};
    
    // 收集表单数据
    for (let [key, value] of formData.entries()) {
      userData[key] = value;
    }

    // 获取选中的权限
    const selectedPermission = this.modal.querySelector('.permission-option.selected');
    userData.permission = selectedPermission.dataset.permission;

    // 验证必填字段
    if (!userData.name || !userData.studentId || !userData.email || !userData.major || !userData.grade) {
      Toast.error('请填写所有必填字段');
      return;
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      Toast.error('请输入正确的邮箱格式');
      return;
    }

    // 验证学号格式（假设10位数字）
    if (!/^\d{10}$/.test(userData.studentId)) {
      Toast.error('学号应为10位数字');
      return;
    }

    // 提交数据
    if (this.isEditing) {
      this.updateUser(userData);
    } else {
      this.addUser(userData);
    }
  }

  // 添加用户
  addUser(userData) {
    // 模拟API调用
    setTimeout(() => {
      Toast.success(`用户 ${userData.name} 添加成功`);
      this.close();
      // 这里可以刷新用户列表
      if (typeof refreshUserList === 'function') {
        refreshUserList();
      }
    }, 500);
  }

  // 更新用户
  updateUser(userData) {
    // 模拟API调用
    setTimeout(() => {
      Toast.success(`用户 ${userData.name} 信息更新成功`);
      this.close();
      // 这里可以刷新用户列表
      if (typeof refreshUserList === 'function') {
        refreshUserList();
      }
    }, 500);
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
const userModal = new UserModal();