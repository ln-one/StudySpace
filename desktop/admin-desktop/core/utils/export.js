// 数据导出工具
class DataExporter {
  constructor() {
    this.exportModal = null;
  }

  // 显示导出选项弹窗
  showExportOptions() {
    this.createExportModal();
  }

  // 创建导出弹窗
  createExportModal() {
    // 移除已存在的弹窗
    this.closeExportModal();

    this.exportModal = document.createElement('div');
    this.exportModal.className = 'modal';
    this.exportModal.innerHTML = `
      <div class="modal__content" style="max-width: 500px;">
        <div class="modal__header">
          <h3 class="modal__title">导出数据</h3>
          <button class="modal__close" onclick="dataExporter.closeExportModal()">✕</button>
        </div>
        <div class="modal__body">
          <div class="export-options">
            <div class="export-section">
              <h4 class="export-section__title">导出格式</h4>
              <div class="export-format-grid">
                <label class="export-format-option">
                  <input type="radio" name="format" value="excel" checked>
                  <div class="export-format-card">
                    <span class="export-format-icon">📊</span>
                    <span class="export-format-name">Excel</span>
                    <span class="export-format-desc">适合数据分析</span>
                  </div>
                </label>
                <label class="export-format-option">
                  <input type="radio" name="format" value="csv">
                  <div class="export-format-card">
                    <span class="export-format-icon">📄</span>
                    <span class="export-format-name">CSV</span>
                    <span class="export-format-desc">通用格式</span>
                  </div>
                </label>
                <label class="export-format-option">
                  <input type="radio" name="format" value="pdf">
                  <div class="export-format-card">
                    <span class="export-format-icon">📋</span>
                    <span class="export-format-name">PDF</span>
                    <span class="export-format-desc">打印报告</span>
                  </div>
                </label>
              </div>
            </div>

            <div class="export-section">
              <h4 class="export-section__title">导出内容</h4>
              <div class="export-content-options">
                <label class="checkbox-option">
                  <input type="checkbox" name="content" value="basic" checked>
                  <span class="checkbox-label">基本信息（姓名、学号、专业）</span>
                </label>
                <label class="checkbox-option">
                  <input type="checkbox" name="content" value="contact" checked>
                  <span class="checkbox-label">联系方式（邮箱、手机）</span>
                </label>
                <label class="checkbox-option">
                  <input type="checkbox" name="content" value="stats">
                  <span class="checkbox-label">学习统计（累计时长、预约次数）</span>
                </label>
                <label class="checkbox-option">
                  <input type="checkbox" name="content" value="violations">
                  <span class="checkbox-label">违约记录</span>
                </label>
                <label class="checkbox-option">
                  <input type="checkbox" name="content" value="permissions">
                  <span class="checkbox-label">权限信息</span>
                </label>
              </div>
            </div>

            <div class="export-section">
              <h4 class="export-section__title">筛选条件</h4>
              <div class="export-filters">
                <div class="filter-row">
                  <label class="filter-label">用户状态：</label>
                  <select class="filter-select" name="status">
                    <option value="all">全部状态</option>
                    <option value="normal">正常用户</option>
                    <option value="vip">VIP用户</option>
                    <option value="warning">警告中</option>
                    <option value="disabled">已禁用</option>
                  </select>
                </div>
                <div class="filter-row">
                  <label class="filter-label">年级：</label>
                  <select class="filter-select" name="grade">
                    <option value="all">全部年级</option>
                    <option value="大一">大一</option>
                    <option value="大二">大二</option>
                    <option value="大三">大三</option>
                    <option value="大四">大四</option>
                    <option value="研究生">研究生</option>
                  </select>
                </div>
                <div class="filter-row">
                  <label class="filter-label">注册时间：</label>
                  <div class="date-range">
                    <input type="date" class="filter-date" name="startDate">
                    <span>至</span>
                    <input type="date" class="filter-date" name="endDate">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal__footer">
          <button type="button" class="btn btn--secondary" onclick="dataExporter.closeExportModal()">取消</button>
          <button type="button" class="btn btn--primary" onclick="dataExporter.startExport()">开始导出</button>
        </div>
      </div>
    `;

    document.body.appendChild(this.exportModal);
    
    // 显示弹窗
    setTimeout(() => {
      this.exportModal.classList.add('show');
    }, 10);

    // 点击背景关闭
    this.exportModal.addEventListener('click', (e) => {
      if (e.target === this.exportModal) {
        this.closeExportModal();
      }
    });
  }

  // 开始导出
  startExport() {
    const format = this.exportModal.querySelector('input[name="format"]:checked').value;
    const contentOptions = Array.from(this.exportModal.querySelectorAll('input[name="content"]:checked')).map(cb => cb.value);
    const status = this.exportModal.querySelector('select[name="status"]').value;
    const grade = this.exportModal.querySelector('select[name="grade"]').value;
    const startDate = this.exportModal.querySelector('input[name="startDate"]').value;
    const endDate = this.exportModal.querySelector('input[name="endDate"]').value;

    if (contentOptions.length === 0) {
      Toast.error('请至少选择一项导出内容');
      return;
    }

    // 关闭弹窗
    this.closeExportModal();

    // 显示导出进度
    this.showExportProgress(format, {
      content: contentOptions,
      status,
      grade,
      startDate,
      endDate
    });
  }

  // 显示导出进度
  showExportProgress(format, options) {
    const progressModal = document.createElement('div');
    progressModal.className = 'modal show';
    progressModal.innerHTML = `
      <div class="modal__content" style="max-width: 400px; text-align: center;">
        <div class="modal__body">
          <div class="export-progress">
            <div class="export-progress__icon">📊</div>
            <h3 class="export-progress__title">正在导出数据</h3>
            <p class="export-progress__desc">正在生成 ${format.toUpperCase()} 文件，请稍候...</p>
            <div class="progress-bar">
              <div class="progress-bar__fill" id="exportProgressFill"></div>
            </div>
            <div class="export-progress__status" id="exportStatus">准备中...</div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(progressModal);

    // 模拟导出进度
    let progress = 0;
    const progressFill = progressModal.querySelector('#exportProgressFill');
    const statusText = progressModal.querySelector('#exportStatus');

    const updateProgress = () => {
      progress += Math.random() * 20;
      if (progress > 100) progress = 100;

      progressFill.style.width = progress + '%';

      if (progress < 30) {
        statusText.textContent = '正在收集数据...';
      } else if (progress < 60) {
        statusText.textContent = '正在处理数据...';
      } else if (progress < 90) {
        statusText.textContent = '正在生成文件...';
      } else if (progress < 100) {
        statusText.textContent = '即将完成...';
      } else {
        statusText.textContent = '导出完成！';
        setTimeout(() => {
          this.completeExport(progressModal, format, options);
        }, 500);
        return;
      }

      setTimeout(updateProgress, 200 + Math.random() * 300);
    };

    updateProgress();
  }

  // 完成导出
  completeExport(progressModal, format, options) {
    // 移除进度弹窗
    progressModal.remove();

    // 生成文件名
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const fileName = `用户数据_${timestamp}.${format}`;

    // 模拟文件下载
    this.downloadFile(fileName, format, options);

    // 显示成功消息
    Toast.success(`数据导出成功！文件：${fileName}`);
  }

  // 模拟文件下载
  downloadFile(fileName, format, options) {
    // 生成模拟数据
    const data = this.generateExportData(options);
    
    let content, mimeType;

    switch (format) {
      case 'csv':
        content = this.generateCSV(data);
        mimeType = 'text/csv;charset=utf-8;';
        break;
      case 'excel':
        content = this.generateExcelData(data);
        mimeType = 'application/vnd.ms-excel;charset=utf-8;';
        break;
      case 'pdf':
        content = this.generatePDFData(data);
        mimeType = 'application/pdf;charset=utf-8;';
        break;
    }

    // 创建下载链接
    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(link.href);
  }

  // 生成导出数据
  generateExportData(options) {
    // 模拟用户数据
    const users = [
      { name: '张晓明', studentId: '2021112573', major: '计算机科学', grade: '大三', email: 'zhangxm@edu.cn', phone: '13800138001', status: 'vip', studyHours: 142, violations: 0 },
      { name: '李思雨', studentId: '2022115847', major: '软件工程', grade: '大二', email: 'lisy@edu.cn', phone: '13800138002', status: 'normal', studyHours: 98, violations: 1 },
      { name: '赵欣怡', studentId: '2020114892', major: '人工智能', grade: '大四', email: 'zhaoxy@edu.cn', phone: '13800138003', status: 'warning', studyHours: 85, violations: 3 },
      { name: '陈小刚', studentId: '2022118956', major: '信息安全', grade: '大二', email: 'chenxg@edu.cn', phone: '13800138004', status: 'disabled', studyHours: 12, violations: 5 }
    ];

    // 根据筛选条件过滤数据
    let filteredUsers = users;
    
    if (options.status !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.status === options.status);
    }
    
    if (options.grade !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.grade === options.grade);
    }

    return filteredUsers;
  }

  // 生成CSV内容
  generateCSV(data) {
    const headers = ['姓名', '学号', '专业', '年级', '邮箱', '手机', '状态', '学习时长', '违约次数'];
    const rows = data.map(user => [
      user.name,
      user.studentId,
      user.major,
      user.grade,
      user.email,
      user.phone,
      user.status,
      user.studyHours + 'h',
      user.violations + '次'
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  // 生成Excel数据（简化版）
  generateExcelData(data) {
    return this.generateCSV(data); // 简化处理，实际应用中可使用专门的Excel库
  }

  // 生成PDF数据（简化版）
  generatePDFData(data) {
    let content = '用户数据报告\n\n';
    content += '导出时间：' + new Date().toLocaleString() + '\n\n';
    
    data.forEach((user, index) => {
      content += `${index + 1}. ${user.name}\n`;
      content += `   学号：${user.studentId}\n`;
      content += `   专业：${user.major} · ${user.grade}\n`;
      content += `   邮箱：${user.email}\n`;
      content += `   状态：${user.status}\n`;
      content += `   学习时长：${user.studyHours}h\n`;
      content += `   违约次数：${user.violations}次\n\n`;
    });

    return content;
  }

  // 关闭导出弹窗
  closeExportModal() {
    if (this.exportModal) {
      this.exportModal.classList.remove('show');
      setTimeout(() => {
        if (this.exportModal && this.exportModal.parentNode) {
          this.exportModal.parentNode.removeChild(this.exportModal);
        }
        this.exportModal = null;
      }, 300);
    }
  }
}

// 创建全局实例
const dataExporter = new DataExporter();