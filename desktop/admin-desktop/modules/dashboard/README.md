# Dashboard 预约管理模块

## 功能描述
管理员预约管理页面，专注于图书馆座位预约的管理和监控。

## 核心功能
- 今日预约数、座位使用率、违约人次统计
- 实时座位使用情况监控
- 预约与违约记录查看
- 预约趋势分析

## 对应 Axure 原型
- `桌面管理员端-数据概览.html`

## 页面列表
| 页面 | 文件 | 说明 |
|-----|------|-----|
| 预约管理 | pages/overview.html | 预约管理主面板 |

## 依赖组件
- `/core/components/sidebar` - 侧边栏
- `/core/components/navbar` - 顶部导航
- `/core/components/data-card` - 数据卡片
- `/core/components/filter-dropdown` - 筛选下拉框
- `/core/components/table` - 数据表格

## 页面功能

### 筛选区域
- 楼层选择（下拉框）
- 日期选择（日期选择器）

### 数据卡片区域
展示 4 个关键指标：
| 指标 | 说明 |
|-----|------|
| 总用户数 | 系统注册用户总数 |
| 座位总数 | 可预约座位数量 |
| 今日预约 | 当日预约次数 |
| 违约人次 | 累计违约统计 |

### 图表区域
- 实时座位使用情况（横条图）
- 预约与违约记录（列表/图表）

## 数据结构
```json
{
  "statistics": {
    "totalUsers": 1234,
    "totalSeats": 500,
    "todayReservations": 89,
    "violations": 12
  },
  "seatUsage": {
    "floor": "1",
    "total": 100,
    "occupied": 75,
    "available": 25
  },
  "records": [
    {
      "id": 1,
      "user": "张三",
      "type": "reservation",
      "seat": "A-01",
      "time": "2025-11-29 09:00-12:00",
      "status": "completed"
    }
  ]
}
```

## AI 生成提示
```
请为 dashboard 模块生成 overview.html 页面：
1. 使用 /core/layouts/admin-layout 布局
2. 顶部包含楼层和日期筛选
3. 展示 4 个数据卡片（使用 /core/components/data-card）
4. 下方展示实时座位使用横条图
5. 底部展示预约与违约记录表格
```
