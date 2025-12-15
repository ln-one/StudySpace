# StudyRecord 学习记录模块

## 功能描述
管理员查看用户学习记录，包括预约历史、使用时长等。

## 页面列表
| 页面 | 文件 | 说明 |
|-----|------|-----|
| 记录列表 | pages/index.html | 学习记录主页 |
| 用户详情 | pages/user-detail.html | 单用户记录详情（可选） |

## 依赖组件
- `/core/components/sidebar` - 侧边栏
- `/core/components/navbar` - 顶部导航
- `/core/components/table` - 记录列表
- `/core/components/filter-dropdown` - 筛选
- `/core/components/data-card` - 统计卡片

## 数据结构
```json
{
  "records": [
    {
      "id": 1,
      "userId": "U001",
      "userName": "张三",
      "seat": "A-01",
      "date": "2025-11-29",
      "startTime": "09:00",
      "endTime": "12:00",
      "duration": 180,
      "status": "completed"
    }
  ],
  "statistics": {
    "totalRecords": 1234,
    "totalDuration": 5678,
    "avgDuration": 120
  }
}
```

## AI 生成提示
```
请为 study-record 模块生成 index.html 页面：
1. 使用 /core/layouts/admin-layout 布局
2. 顶部展示统计卡片（总记录数、总时长等）
3. 支持按用户、日期、座位筛选
4. 主体展示学习记录表格
```
