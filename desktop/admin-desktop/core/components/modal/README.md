# Modal 弹窗组件

## 用途
用于展示需要用户确认或填写的内容，如编辑座位、确认删除等。

## 使用方式
```html
<div class="modal-backdrop" id="modal-example">
  <div class="modal">
    <div class="modal__header">
      <h3 class="modal__title">弹窗标题</h3>
      <button class="modal__close" onclick="closeModal('modal-example')">×</button>
    </div>
    <div class="modal__body">
      <!-- 弹窗内容 -->
      <p>这里是弹窗内容</p>
    </div>
    <div class="modal__footer">
      <button class="btn btn--secondary">取消</button>
      <button class="btn btn--primary">确定</button>
    </div>
  </div>
</div>
```

## JavaScript 控制
```javascript
// 打开弹窗
function openModal(id) {
  document.getElementById(id).classList.add('modal-backdrop--visible');
}

// 关闭弹窗
function closeModal(id) {
  document.getElementById(id).classList.remove('modal-backdrop--visible');
}
```

## 尺寸变体
- 默认：480px 宽
- `modal--sm`：320px 宽
- `modal--lg`：720px 宽
- `modal--full`：90% 宽度
