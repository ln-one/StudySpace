# FilterDropdown 筛选下拉框

## 用途
用于筛选数据，如选择楼层、日期等。

## 使用方式
```html
<div class="filter-dropdown">
  <button class="filter-dropdown__trigger">
    <span class="filter-dropdown__label">楼层 1</span>
    <span class="filter-dropdown__arrow">▼</span>
  </button>
  <div class="filter-dropdown__menu">
    <div class="filter-dropdown__item filter-dropdown__item--active">楼层 1</div>
    <div class="filter-dropdown__item">楼层 2</div>
    <div class="filter-dropdown__item">楼层 3</div>
  </div>
</div>
```

## 管理员端使用场景
- 座位管理页：楼层筛选、日期筛选
- 预约管理页：楼层筛选、日期筛选
- 设置页：预约时长选择、次数选择

## 修饰符
- `filter-dropdown--open`：展开状态
- `filter-dropdown__item--active`：选中项
