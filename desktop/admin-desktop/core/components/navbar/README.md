# Navbar 顶部导航栏

## 用途
页面顶部导航栏，包含搜索框、筛选按钮等功能。

## 使用方式
```html
<header class="navbar">
  <div class="navbar__search">
    <input type="text" class="navbar__search-input" placeholder="搜索...">
    <button class="navbar__search-btn">
      <svg><!-- 搜索图标 --></svg>
    </button>
  </div>
  <div class="navbar__actions">
    <button class="navbar__filter-btn">
      <span>筛选</span>
    </button>
  </div>
</header>
```

## 子组件
- `navbar__search`：搜索框区域
- `navbar__actions`：操作按钮区域
- `navbar__filter-btn`：筛选按钮

## 修饰符
- `navbar--fixed`：固定在顶部
