# FormControls 表单控件

## 用途
表单输入控件集合，包括输入框、选择框、开关等。

## 输入框
```html
<div class="form-group">
  <label class="form-label">标签名称</label>
  <input type="text" class="form-input" placeholder="请输入">
  <span class="form-hint">提示信息</span>
</div>
```

## 选择框
```html
<div class="form-group">
  <label class="form-label">选择项</label>
  <select class="form-select">
    <option value="">请选择</option>
    <option value="1">选项1</option>
    <option value="2">选项2</option>
  </select>
</div>
```

## 开关
```html
<label class="form-switch">
  <input type="checkbox" class="form-switch__input">
  <span class="form-switch__slider"></span>
  <span class="form-switch__label">开启通知</span>
</label>
```

## 状态
- 默认状态
- `form-input--error`：错误状态
- `form-input--disabled`：禁用状态
