# Sidebar 侧边栏导航

## 用途
管理员端左侧导航栏，包含 Logo、导航菜单项，支持高亮当前页面。

## 使用方式
```html
<aside class="sidebar">
  <div class="sidebar__logo">
    <span class="sidebar__logo-text">StudySpace</span>
  </div>
  <nav class="sidebar__nav">
    <a href="#" class="sidebar__nav-item sidebar__nav-item--active">
      <span class="sidebar__nav-text">预约管理</span>
    </a>
    <a href="#" class="sidebar__nav-item">
      <span class="sidebar__nav-text">任务</span>
    </a>
    <a href="#" class="sidebar__nav-item">
      <span class="sidebar__nav-text">日历</span>
    </a>
    <a href="#" class="sidebar__nav-item">
      <span class="sidebar__nav-text">学习记录</span>
    </a>
    <a href="#" class="sidebar__nav-item">
      <span class="sidebar__nav-text">座位管理</span>
    </a>
    <a href="#" class="sidebar__nav-item">
      <span class="sidebar__nav-text">管理员设置</span>
    </a>
  </nav>
</aside>
```

## 导航项（管理员端完整菜单）
| 名称 | 模块 | 链接目标 |
|-----|------|---------|
| 预约管理 | dashboard | /modules/dashboard/pages/overview.html |
| 任务 | task | /modules/task/pages/index.html |
| 日历 | calendar | /modules/calendar/pages/index.html |
| 学习记录 | study-record | /modules/study-record/pages/index.html |
| 座位管理 | seat-management | /modules/seat-management/pages/seat-list.html |
| 管理员设置 | settings | /modules/settings/pages/index.html |

## 修饰符
- `sidebar__nav-item--active`：当前激活的导航项
