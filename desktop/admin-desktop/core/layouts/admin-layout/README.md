# AdminLayout 管理员端主布局

## 用途
管理员端页面的统一布局模板，包含侧边栏和主内容区。

## 布局结构
```
┌─────────────────────────────────────────────────┐
│                    Navbar                        │
├──────────┬──────────────────────────────────────┤
│          │                                       │
│          │                                       │
│ Sidebar  │           Main Content               │
│          │                                       │
│          │                                       │
└──────────┴──────────────────────────────────────┘
```

## 使用方式
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>页面标题 - StudySpace 管理后台</title>
  <link rel="stylesheet" href="/core/styles/main.css">
  <link rel="stylesheet" href="/core/layouts/admin-layout/style.css">
  <link rel="stylesheet" href="/core/components/sidebar/style.css">
  <link rel="stylesheet" href="/core/components/navbar/style.css">
  <!-- 页面特定样式 -->
</head>
<body>
  <div class="admin-layout">
    <!-- 侧边栏 -->
    <aside class="sidebar">...</aside>
    
    <!-- 主内容区 -->
    <div class="admin-layout__main">
      <!-- 顶部导航 -->
      <header class="navbar">...</header>
      
      <!-- 页面内容 -->
      <main class="admin-layout__content">
        <!-- 页面具体内容 -->
      </main>
    </div>
  </div>
  
  <!-- 页面脚本 -->
</body>
</html>
```

## 响应式断点
- Desktop: > 1200px（完整布局）
- Tablet: 768px - 1200px（侧边栏收起）
- Mobile: < 768px（侧边栏隐藏）
