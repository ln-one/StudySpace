/**
 * Login Modals - 登录页面弹窗内容
 * 动态注入弹窗 HTML
 */

(function() {
  const modalsHTML = `
    <!-- 管理员手册弹窗 -->
    <div class="modal" id="manualModal">
      <div class="modal__overlay"></div>
      <div class="modal__content modal__content--lg">
        <div class="modal__header">
          <h3>📖 管理员手册</h3>
          <button class="modal__close" onclick="Modal.close('manualModal')">✕</button>
        </div>
        <div class="modal__body">
          <div class="manual-nav">
            <button class="manual-nav__item manual-nav__item--active" data-section="intro">系统简介</button>
            <button class="manual-nav__item" data-section="login">登录说明</button>
            <button class="manual-nav__item" data-section="dashboard">预约管理</button>
            <button class="manual-nav__item" data-section="seats">座位管理</button>
            <button class="manual-nav__item" data-section="users">用户管理</button>
            <button class="manual-nav__item" data-section="faq">常见问题</button>
          </div>
          <div class="manual-content">
            <div class="manual-section manual-section--active" id="manual-intro">
              <h4>欢迎使用 StudySpace 管理系统</h4>
              <p>StudySpace 是一款智能学习空间管理系统，帮助您高效管理图书馆座位预约、用户管理、学习记录统计等功能。</p>
              <h5>主要功能模块</h5>
              <ul>
                <li><strong>预约管理</strong> - 查看和管理所有座位预约记录</li>
                <li><strong>座位管理</strong> - 配置座位状态、设施和可用性</li>
                <li><strong>学习记录</strong> - 统计分析学生学习时长和趋势</li>
                <li><strong>用户管理</strong> - 管理用户账户、权限和违约处理</li>
                <li><strong>公告通知</strong> - 发布系统公告和消息通知</li>
                <li><strong>系统设置</strong> - 配置预约规则和系统参数</li>
              </ul>
            </div>
            <div class="manual-section" id="manual-login">
              <h4>登录说明</h4>
              <h5>账号密码登录</h5>
              <p>使用管理员账号和密码进行登录，密码长度至少6位。</p>
              <h5>验证码登录</h5>
              <p>输入账号后点击获取验证码，验证码将发送到绑定的手机或邮箱。</p>
              <h5>安全建议</h5>
              <ul>
                <li>定期更换密码，建议每3个月更换一次</li>
                <li>不要在公共设备上保存登录状态</li>
                <li>发现异常登录请立即联系技术支持</li>
              </ul>
            </div>
            <div class="manual-section" id="manual-dashboard">
              <h4>预约管理</h4>
              <p>预约管理页面展示实时座位使用情况和预约记录。</p>
              <h5>功能说明</h5>
              <ul>
                <li>查看今日预约统计数据</li>
                <li>实时监控座位使用率</li>
                <li>处理违约记录</li>
                <li>查看预约趋势图表</li>
              </ul>
            </div>
            <div class="manual-section" id="manual-seats">
              <h4>座位管理</h4>
              <p>座位管理页面用于配置和管理所有座位。</p>
              <h5>座位状态</h5>
              <ul>
                <li><strong>可用</strong> - 座位可以被预约</li>
                <li><strong>已预约</strong> - 座位已被预约但未使用</li>
                <li><strong>使用中</strong> - 座位正在被使用</li>
                <li><strong>不可用</strong> - 座位暂停使用</li>
              </ul>
            </div>
            <div class="manual-section" id="manual-users">
              <h4>用户管理</h4>
              <p>用户管理页面用于管理所有用户账户。</p>
              <h5>用户权限</h5>
              <ul>
                <li><strong>普通用户</strong> - 基础预约权限</li>
                <li><strong>VIP用户</strong> - 优先预约权限</li>
                <li><strong>黑名单</strong> - 禁止预约</li>
              </ul>
            </div>
            <div class="manual-section" id="manual-faq">
              <h4>常见问题</h4>
              <div class="faq-item">
                <h5>Q: 如何重置用户密码？</h5>
                <p>A: 在用户管理页面找到对应用户，点击"编辑信息"后可重置密码。</p>
              </div>
              <div class="faq-item">
                <h5>Q: 如何处理违约用户？</h5>
                <p>A: 在用户管理的"违约处理"标签页中，可以发送警告或禁用账户。</p>
              </div>
              <div class="faq-item">
                <h5>Q: 如何发布系统公告？</h5>
                <p>A: 进入公告通知页面，点击"发布公告"按钮即可。</p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal__footer">
          <button class="btn btn--secondary" onclick="Modal.close('manualModal')">关闭</button>
          <button class="btn btn--primary" onclick="downloadManual()">下载 PDF 版本</button>
        </div>
      </div>
    </div>

    <!-- 技术支持弹窗 -->
    <div class="modal" id="supportModal">
      <div class="modal__overlay"></div>
      <div class="modal__content">
        <div class="modal__header">
          <h3>🎧 技术支持</h3>
          <button class="modal__close" onclick="Modal.close('supportModal')">✕</button>
        </div>
        <div class="modal__body">
          <div class="support-info">
            <div class="support-item">
              <span class="support-icon">📞</span>
              <div class="support-detail">
                <strong>技术支持热线</strong>
                <p>400-888-8888</p>
                <small>工作日 9:00-18:00</small>
              </div>
            </div>
            <div class="support-item">
              <span class="support-icon">📧</span>
              <div class="support-detail">
                <strong>技术支持邮箱</strong>
                <p>support@studyspace.com</p>
                <small>24小时内回复</small>
              </div>
            </div>
            <div class="support-item">
              <span class="support-icon">💬</span>
              <div class="support-detail">
                <strong>在线客服</strong>
                <p>点击下方按钮开始对话</p>
                <small>实时在线支持</small>
              </div>
            </div>
          </div>
          <div class="support-form">
            <h4>提交问题反馈</h4>
            <div class="form-group">
              <label>问题类型</label>
              <select class="support-select" id="issueType">
                <option value="">请选择问题类型</option>
                <option value="login">登录问题</option>
                <option value="function">功能异常</option>
                <option value="data">数据问题</option>
                <option value="suggestion">功能建议</option>
                <option value="other">其他问题</option>
              </select>
            </div>
            <div class="form-group">
              <label>问题描述</label>
              <textarea class="support-textarea" id="issueDesc" placeholder="请详细描述您遇到的问题..."></textarea>
            </div>
          </div>
        </div>
        <div class="modal__footer">
          <button class="btn btn--secondary" onclick="Modal.close('supportModal')">关闭</button>
          <button class="btn btn--primary" onclick="submitSupport()">提交反馈</button>
          <button class="btn btn-chat" onclick="startChat()">💬 在线客服</button>
        </div>
      </div>
    </div>

    <!-- 隐私政策弹窗 -->
    <div class="modal" id="privacyModal">
      <div class="modal__overlay"></div>
      <div class="modal__content">
        <div class="modal__header">
          <h3>🔒 隐私政策</h3>
          <button class="modal__close" onclick="Modal.close('privacyModal')">✕</button>
        </div>
        <div class="modal__body">
          <div class="policy-content">
            <h4>信息收集</h4>
            <p>我们收集您的账号信息、登录记录和使用数据，用于提供和改进服务。</p>
            <h4>信息使用</h4>
            <p>您的信息仅用于系统运营和服务优化，不会出售给第三方。</p>
            <h4>信息保护</h4>
            <p>我们采用行业标准的加密技术保护您的数据安全。</p>
            <h4>用户权利</h4>
            <p>您有权访问、更正或删除您的个人信息，请联系技术支持。</p>
          </div>
        </div>
        <div class="modal__footer">
          <button class="btn btn--primary" onclick="Modal.close('privacyModal')">我已了解</button>
        </div>
      </div>
    </div>

    <!-- 服务条款弹窗 -->
    <div class="modal" id="termsModal">
      <div class="modal__overlay"></div>
      <div class="modal__content">
        <div class="modal__header">
          <h3>📋 服务条款</h3>
          <button class="modal__close" onclick="Modal.close('termsModal')">✕</button>
        </div>
        <div class="modal__body">
          <div class="policy-content">
            <h4>服务说明</h4>
            <p>StudySpace 管理系统为图书馆座位预约管理提供技术支持服务。</p>
            <h4>使用规范</h4>
            <p>管理员应妥善保管账号密码，不得将账号借给他人使用。</p>
            <h4>责任限制</h4>
            <p>因不可抗力导致的服务中断，我们不承担相关责任。</p>
            <h4>条款更新</h4>
            <p>我们保留更新服务条款的权利，更新后将通过系统公告通知。</p>
          </div>
        </div>
        <div class="modal__footer">
          <button class="btn btn--primary" onclick="Modal.close('termsModal')">我已了解</button>
        </div>
      </div>
    </div>

    <!-- 忘记密码弹窗 -->
    <div class="modal" id="forgotModal">
      <div class="modal__overlay"></div>
      <div class="modal__content">
        <div class="modal__header">
          <h3>🔑 找回密码</h3>
          <button class="modal__close" onclick="Modal.close('forgotModal')">✕</button>
        </div>
        <div class="modal__body">
          <div class="forgot-steps">
            <div class="forgot-step forgot-step--active" data-step="1">
              <span class="forgot-step__num">1</span>
              <span class="forgot-step__text">验证身份</span>
            </div>
            <div class="forgot-step" data-step="2">
              <span class="forgot-step__num">2</span>
              <span class="forgot-step__text">重置密码</span>
            </div>
            <div class="forgot-step" data-step="3">
              <span class="forgot-step__num">3</span>
              <span class="forgot-step__text">完成</span>
            </div>
          </div>
          <div class="forgot-form" id="forgotStep1">
            <div class="form-group">
              <label>管理员账号</label>
              <input type="text" class="forgot-input" id="forgotAccount" placeholder="请输入您的账号">
            </div>
            <div class="form-group">
              <label>验证方式</label>
              <div class="verify-options">
                <label class="verify-option verify-option--active">
                  <input type="radio" name="verifyType" value="phone" checked>
                  <span>📱 手机验证</span>
                </label>
                <label class="verify-option">
                  <input type="radio" name="verifyType" value="email">
                  <span>📧 邮箱验证</span>
                </label>
              </div>
            </div>
          </div>
          <div class="forgot-form" id="forgotStep2" style="display:none;">
            <div class="form-group">
              <label>验证码</label>
              <div class="verify-code-row">
                <input type="text" class="forgot-input" id="forgotCode" placeholder="请输入验证码">
                <button class="btn-code" id="forgotCodeBtn">获取验证码</button>
              </div>
            </div>
            <div class="form-group">
              <label>新密码</label>
              <input type="password" class="forgot-input" id="newPassword" placeholder="请输入新密码（至少6位）">
            </div>
            <div class="form-group">
              <label>确认密码</label>
              <input type="password" class="forgot-input" id="confirmPassword" placeholder="请再次输入新密码">
            </div>
          </div>
          <div class="forgot-form" id="forgotStep3" style="display:none;">
            <div class="forgot-success">
              <span class="forgot-success__icon">✅</span>
              <h4>密码重置成功！</h4>
              <p>请使用新密码登录系统</p>
            </div>
          </div>
        </div>
        <div class="modal__footer">
          <button class="btn btn--secondary" id="forgotBackBtn" style="display:none;" onclick="forgotBack()">上一步</button>
          <button class="btn btn--primary" id="forgotNextBtn" onclick="forgotNext()">下一步</button>
        </div>
      </div>
    </div>
  `;

  // 注入弹窗
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('modals-container');
    if (container) {
      container.innerHTML = modalsHTML;
    }
  });
})();
