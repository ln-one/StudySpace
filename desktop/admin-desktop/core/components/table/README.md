# Table 数据表格

## 用途
用于展示列表数据，如预约记录、违约记录等。

## 使用方式
```html
<div class="table-wrapper">
  <table class="table">
    <thead class="table__head">
      <tr>
        <th class="table__th">用户</th>
        <th class="table__th">座位</th>
        <th class="table__th">时间</th>
        <th class="table__th">状态</th>
        <th class="table__th">操作</th>
      </tr>
    </thead>
    <tbody class="table__body">
      <tr class="table__row">
        <td class="table__td">张三</td>
        <td class="table__td">A-01</td>
        <td class="table__td">09:00-12:00</td>
        <td class="table__td">
          <span class="badge badge--success">已签到</span>
        </td>
        <td class="table__td">
          <button class="btn btn--text btn--sm">详情</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

## 修饰符
- `table--striped`：斑马纹
- `table--bordered`：带边框
- `table--hover`：悬停高亮
- `table__row--selected`：选中行
