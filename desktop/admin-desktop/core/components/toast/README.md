# Toast 消息提示组件

轻量级消息提示组件，用于操作反馈。

## 使用方法

### 引入文件

```html
<link rel="stylesheet" href="core/components/toast/style.css">
<script src="core/components/toast/toast.js"></script>
```

### API

```javascript
// 基础用法
Toast.show('消息内容', 'info');

// 快捷方法
Toast.info('提示信息');
Toast.success('操作成功');
Toast.error('操作失败');
Toast.warning('警告信息');

// 自定义持续时间（毫秒）
Toast.show('消息内容', 'success', 5000);

// 兼容旧函数
showToast('消息内容', 'success');
```

### 类型

- `info` - 蓝色，普通提示
- `success` - 绿色，成功提示
- `error` - 红色，错误提示
- `warning` - 橙色，警告提示

## 样式定制

通过 CSS 变量自定义样式：

```css
.toast {
  --toast-bg-info: var(--color-primary);
  --toast-bg-success: var(--color-success);
  --toast-bg-error: var(--color-error);
  --toast-bg-warning: var(--color-warning);
}
```
