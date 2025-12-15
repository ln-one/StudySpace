/**
 * Login Page - 登录页面脚本
 */

const LoginPage = {
  currentTab: 'password',
  forgotStep: 1,

  init() {
    this.bindElements();
    this.bindEvents();
  },

  bindElements() {
    this.form = document.getElementById('loginForm');
    this.formMessage = document.getElementById('formMessage');
    this.loginBtn = document.getElementById('loginBtn');
    this.sendCodeBtn = document.getElementById('sendCodeBtn');
    this.passwordGroup = document.getElementById('passwordGroup');
    this.codeGroup = document.getElementById('codeGroup');
    this.passwordInput = document.getElementById('password');
    this.codeInput = document.getElementById('verifyCode');
  },

  bindEvents() {
    // 登录方式切换
    document.querySelectorAll('.login-tab').forEach(tab => {
      tab.addEventListener('click', () => this.switchTab(tab));
    });

    // 发送验证码
    this.sendCodeBtn?.addEventListener('click', () => this.sendCode());

    // 表单提交
    this.form?.addEventListener('submit', (e) => this.handleSubmit(e));

    // 输入时清除错误
    document.querySelectorAll('.input').forEach(input => {
      input.addEventListener('input', () => this.clearError());
    });

    // 忘记密码
    document.querySelector('.link-text')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.openForgotModal();
    });

    // 帮助链接
    document.querySelectorAll('.help-link').forEach((link, index) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        if (index === 0) this.openManualModal();
        else this.openSupportModal();
      });
    });

    // 系统状态
    document.querySelector('.system-status')?.addEventListener('click', () => {
      Toast.success('系统运行正常，响应时间 < 100ms');
    });

    // 底部链接
    document.getElementById('privacyLink')?.addEventListener('click', (e) => {
      e.preventDefault();
      Modal.open('privacyModal');
    });

    document.getElementById('termsLink')?.addEventListener('click', (e) => {
      e.preventDefault();
      Modal.open('termsModal');
    });

    // 品牌 Logo
    document.querySelector('.brand-logo')?.addEventListener('click', () => {
      Toast.info('StudySpace v2.0.0');
    });

    // 记住登录
    document.getElementById('rememberMe')?.addEventListener('change', function() {
      Toast.info(this.checked ? '已开启7天免登录' : '已关闭免登录');
    });

    // 手册导航
    document.querySelectorAll('.manual-nav__item').forEach(item => {
      item.addEventListener('click', () => this.switchManualSection(item));
    });

    // 技术支持项
    document.querySelectorAll('.support-item').forEach(item => {
      item.addEventListener('click', () => {
        const type = item.querySelector('strong')?.textContent;
        Toast.info(`正在连接${type}...`);
      });
    });

    // 验证方式选择
    document.querySelectorAll('.verify-option').forEach(option => {
      option.addEventListener('click', () => {
        document.querySelectorAll('.verify-option').forEach(o => o.classList.remove('verify-option--active'));
        option.classList.add('verify-option--active');
      });
    });

    // 忘记密码验证码
    document.getElementById('forgotCodeBtn')?.addEventListener('click', () => this.sendForgotCode());
  },

  switchTab(tab) {
    const tabType = tab.dataset.tab;
    if (tabType === this.currentTab) return;

    this.currentTab = tabType;
    document.querySelectorAll('.login-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    if (tabType === 'password') {
      this.passwordGroup.style.display = 'block';
      this.codeGroup.style.display = 'none';
      this.passwordInput.required = true;
      if (this.codeInput) this.codeInput.required = false;
    } else {
      this.passwordGroup.style.display = 'none';
      this.codeGroup.style.display = 'block';
      this.passwordInput.required = false;
      if (this.codeInput) this.codeInput.required = true;
    }

    this.clearMessage();
  },

  sendCode() {
    const account = document.getElementById('account')?.value.trim();
    if (!account) {
      this.showMessage('请先输入账号', 'error');
      return;
    }

    let countdown = 60;
    this.sendCodeBtn.disabled = true;
    this.sendCodeBtn.textContent = `${countdown}s 后重发`;

    const timer = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        this.sendCodeBtn.textContent = `${countdown}s 后重发`;
      } else {
        clearInterval(timer);
        this.sendCodeBtn.disabled = false;
        this.sendCodeBtn.textContent = '获取验证码';
      }
    }, 1000);

    this.showMessage('验证码已发送，请查收', 'success');
  },

  handleSubmit(e) {
    e.preventDefault();
    this.clearMessage();

    const account = document.getElementById('account')?.value.trim();
    
    if (!account) {
      this.showMessage('请输入管理员账号', 'error');
      return;
    }

    if (this.currentTab === 'password') {
      const password = this.passwordInput?.value.trim();
      if (!password) {
        this.showMessage('请输入登录密码', 'error');
        return;
      }
      if (password.length < 6) {
        this.showMessage('密码长度不能少于6位', 'error');
        return;
      }
    } else {
      const code = this.codeInput?.value.trim();
      if (!code) {
        this.showMessage('请输入验证码', 'error');
        return;
      }
      if (code.length !== 6) {
        this.showMessage('请输入6位验证码', 'error');
        return;
      }
    }

    // 模拟登录
    this.loginBtn.disabled = true;
    this.loginBtn.textContent = '登录中...';

    setTimeout(() => {
      this.showMessage('登录成功，正在跳转...', 'success');
      setTimeout(() => {
        window.location.href = '../modules/dashboard/pages/overview.html';
      }, 800);
    }, 1000);
  },

  showMessage(text, type = 'error') {
    if (!this.formMessage) return;
    this.formMessage.textContent = text;
    this.formMessage.className = `form-message show ${type}`;
  },

  clearMessage() {
    if (!this.formMessage) return;
    this.formMessage.textContent = '';
    this.formMessage.className = 'form-message';
  },

  clearError() {
    if (this.formMessage?.classList.contains('error')) {
      this.clearMessage();
    }
  },

  // 弹窗相关
  openManualModal() {
    Modal.open('manualModal');
  },

  openSupportModal() {
    Modal.open('supportModal');
  },

  openForgotModal() {
    this.forgotStep = 1;
    this.updateForgotStep();
    Modal.open('forgotModal');
  },

  switchManualSection(item) {
    const section = item.dataset.section;
    document.querySelectorAll('.manual-nav__item').forEach(i => i.classList.remove('manual-nav__item--active'));
    item.classList.add('manual-nav__item--active');
    
    document.querySelectorAll('.manual-section').forEach(s => s.classList.remove('manual-section--active'));
    document.getElementById(`manual-${section}`)?.classList.add('manual-section--active');
  },

  sendForgotCode() {
    const btn = document.getElementById('forgotCodeBtn');
    let countdown = 60;
    btn.disabled = true;
    btn.textContent = `${countdown}s`;

    const timer = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        btn.textContent = `${countdown}s`;
      } else {
        clearInterval(timer);
        btn.disabled = false;
        btn.textContent = '获取验证码';
      }
    }, 1000);

    Toast.success('验证码已发送');
  },

  updateForgotStep() {
    // 更新步骤指示器
    document.querySelectorAll('.forgot-step').forEach((step, index) => {
      step.classList.remove('forgot-step--active', 'forgot-step--done');
      if (index + 1 < this.forgotStep) {
        step.classList.add('forgot-step--done');
      } else if (index + 1 === this.forgotStep) {
        step.classList.add('forgot-step--active');
      }
    });

    // 显示对应表单
    document.getElementById('forgotStep1').style.display = this.forgotStep === 1 ? 'block' : 'none';
    document.getElementById('forgotStep2').style.display = this.forgotStep === 2 ? 'block' : 'none';
    document.getElementById('forgotStep3').style.display = this.forgotStep === 3 ? 'block' : 'none';

    // 更新按钮
    const backBtn = document.getElementById('forgotBackBtn');
    const nextBtn = document.getElementById('forgotNextBtn');
    
    backBtn.style.display = this.forgotStep > 1 && this.forgotStep < 3 ? 'inline-block' : 'none';
    
    if (this.forgotStep === 3) {
      nextBtn.textContent = '完成';
      nextBtn.onclick = () => Modal.close('forgotModal');
    } else {
      nextBtn.textContent = '下一步';
      nextBtn.onclick = () => this.forgotNext();
    }
  }
};

// 全局函数
function forgotNext() {
  if (LoginPage.forgotStep === 1) {
    const account = document.getElementById('forgotAccount')?.value.trim();
    if (!account) {
      Toast.error('请输入账号');
      return;
    }
  } else if (LoginPage.forgotStep === 2) {
    const code = document.getElementById('forgotCode')?.value.trim();
    const newPwd = document.getElementById('newPassword')?.value.trim();
    const confirmPwd = document.getElementById('confirmPassword')?.value.trim();
    
    if (!code || code.length !== 6) {
      Toast.error('请输入6位验证码');
      return;
    }
    if (!newPwd || newPwd.length < 6) {
      Toast.error('密码长度至少6位');
      return;
    }
    if (newPwd !== confirmPwd) {
      Toast.error('两次密码不一致');
      return;
    }
  }
  
  LoginPage.forgotStep++;
  LoginPage.updateForgotStep();
}

function forgotBack() {
  if (LoginPage.forgotStep > 1) {
    LoginPage.forgotStep--;
    LoginPage.updateForgotStep();
  }
}

function downloadManual() {
  Toast.info('正在生成 PDF...');
  setTimeout(() => Toast.success('下载已开始'), 1500);
}

function submitSupport() {
  const type = document.getElementById('issueType')?.value;
  const desc = document.getElementById('issueDesc')?.value.trim();
  
  if (!type) {
    Toast.error('请选择问题类型');
    return;
  }
  if (!desc) {
    Toast.error('请描述您的问题');
    return;
  }
  
  Toast.info('正在提交...');
  setTimeout(() => {
    Toast.success('反馈已提交，我们会尽快处理');
    Modal.close('supportModal');
  }, 1000);
}

function startChat() {
  Toast.info('正在连接在线客服...');
  setTimeout(() => Toast.success('客服已接入，请在新窗口中对话'), 1500);
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  LoginPage.init();
});
