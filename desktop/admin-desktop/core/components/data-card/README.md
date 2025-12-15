# DataCard 数据统计卡片

## 用途
用于展示关键数据指标，如总用户数、座位总数、今日预约、违约人次等。

## 使用方式
```html
<div class="data-card">
  <div class="data-card__header">
    <span class="data-card__title">总用户数</span>
    <span class="data-card__icon">👥</span>
  </div>
  <div class="data-card__value">1,234</div>
  <div class="data-card__footer">
    <span class="data-card__trend data-card__trend--up">↑ 12%</span>
    <span class="data-card__desc">较上周</span>
  </div>
</div>
```

## 变体
- 默认：白色背景
- `data-card--primary`：主色背景
- `data-card--success`：成功色背景
- `data-card--warning`：警告色背景

## 预约管理页面使用的卡片
| 标题 | 说明 |
|-----|------|
| 总用户数 | 系统注册用户总数 |
| 座位总数 | 可预约座位数量 |
| 今日预约 | 当日预约次数 |
| 违约人次 | 累计违约统计 |
