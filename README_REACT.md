# A Dark Room - React 重写项目

**当前分支**: `dev` (React重写版本)  
**原始分支**: `main` (JavaScript原版)

## 🎮 项目概览

这是对经典文字冒险游戏 "A Dark Room" 的完整React重写。项目正在进行中，已完成Phase 1基础架构。

- 📍 **当前进度**: 12% (Phase 1-2)
- ⚙️ **构建状态**: ✅ 成功
- 📦 **包大小**: 206KB (65KB gzipped)

## 🚀 快速开始

### 安装依赖
```bash
cd adarkroom-react
npm install
```

### 开发模式
```bash
npm run dev
# 访问 http://localhost:5173
```

### 构建生产版本
```bash
npm run build
# 输出到 dist/
```

### 预览生产构建
```bash
npm run preview
```

## 📁 项目结构

```
adarkroom/
├── main/                      # 原始JavaScript项目
├── adarkroom-react/           # React重写项目
│   ├── src/
│   │   ├── components/        # React UI组件
│   │   ├── hooks/             # 自定义React hooks
│   │   ├── stores/            # Zustand状态存储
│   │   ├── services/          # 业务逻辑服务
│   │   ├── utils/             # 工具函数 (EventBus)
│   │   ├── constants/         # 游戏常量
│   │   ├── styles/            # 全局样式
│   │   ├── App.jsx            # 主应用组件
│   │   └── main.jsx           # 入口点
│   ├── public/                # 静态资源（从原项目复制）
│   │   ├── css/               # 游戏样式
│   │   ├── img/               # 游戏图片
│   │   ├── audio/             # 游戏音频
│   │   └── lang/              # 支持25+种语言
│   ├── dist/                  # 构建输出
│   └── package.json
├── task.json                  # 项目任务清单 (54个任务)
├── progress.json              # 实时进度追踪
├── PROGRESS_REPORT.md         # 详细进度报告
└── IMPLEMENTATION_GUIDE.md    # 实现细节指南
```

## 📋 文档

三个核心文档可帮助理解项目：

### 1. **task.json** - 任务清单
- 54个详细的任务分解
- 按优先级和依赖关系组织
- 按9个阶段分组

### 2. **progress.json** - 实时进度
- 每个任务的当前状态
- 完成日期记录
- 总体进度统计

### 3. **PROGRESS_REPORT.md** - 详细报告
- 已完成工作总结
- 架构决策说明
- 下一个优先级工作
- 性能指标

### 4. **IMPLEMENTATION_GUIDE.md** - 实现指南
- 工程最佳实践
- 如何添加新功能
- 状态和事件系统参考
- 测试计划

## ✅ 已完成 (Phase 1)

- ✅ React项目使用Vite初始化
- ✅ 项目目录结构设置
- ✅ Zustand状态管理系统 (全部12个分类)
- ✅ EventBus事件系统 (25+ 事件类型)
- ✅ React Hooks集合 (15+ hooks)
- ✅ UI基础组件 (Button, Notifications)
- ✅ 多语言系统架构
- ✅ 游戏引擎服务基础
- ✅ 项目成功构建 (无错误)

## 🔄 进行中 (Phase 2)

- 🔄 GameEngine核心逻辑 (50%)
- ⏳ 模块初始化系统 (待开始)

## ⏳ 待完成

### 优先级1 (Phase 4-6: 20-30小时)
- Room模块 (火焰、建筑、工作人员)
- Outside模块 (狩猎、战斗、遇遇)
- World/Path/Ship/Space模块

### 优先级2 (Phase 7-8: 15-20小时)
- Fabricator系统
- Prestige声望系统
- 音频系统
- 性能优化

### 优先级3 (Phase 9: 30-40小时)
- 功能对比测试
- Bug修复
- 浏览器兼容性测试
- 最终优化和部署

## 🛠️ 技术栈

| 技术 | 版本 |  用途 |
|------|------|------|
| React | 18 | UI框架 |
| Vite | 8 | 构建工具 |
| Zustand | Latest | 状态管理 |
| PropTypes | 15 | 类型检查 |
| CSS | Native | 样式 |

## 💾 状态管理

使用Zustand管理游戏状态，支持嵌套路径访问：

```javascript
// 获取值
const wood = gameStore.getState('stores.wood');

// 设置值
gameStore.setState('stores.wood', 100);

// 增加值
gameStore.addToState('stores.wood', 10);

// 观察状态变化
useGameStateWatch('stores.wood', (value) => {
  console.log('Wood updated to:', value);
});
```

## 📡 事件系统

使用自定义EventBus进行组件通信：

```javascript
// 订阅事件
eventBus.subscribe('gameStart', () => {
  console.log('Game started!');
});

// 发布事件
eventBus.publish('gameStart', { level: 1 });
```

可用事件类型见 `EVENT_TYPES` 常量。

## 🎯 下一步行动

要继续开发，请：

1. 查看 `task.json` 了解全部任务
2. 参考 `IMPLEMENTATION_GUIDE.md` 学习添加新功能的方式
3. 按优先级继续完成Phase 4 (Room模块)
4. 运行 `npm run build` 定期验证构建

## 🐛 报告问题

遇到问题时：

1. 检查控制台错误信息
2. 查看git提交历史
3. 验证React DevTools中的状态
4. 参考 `PROGRESS_REPORT.md` 了解已知问题

## 📊 进度追踪

实时查看进度：
```bash
cat progress.json | jq '.summary'
# 显示: 总任务数、完成数、进度百分比等
```

## 🔗 相关链接

- **原项目**: https://github.com/doublespeakgames/adarkroom
- **游戏地址**: http://adarkroom.doublespeakgames.com
- **React文档**: https://react.dev
- **Zustand文档**: https://github.com/pmndrs/zustand
- **Vite文档**: https://vitejs.dev

## 📝 许可证

继承自原项目: MPL-2.0

---

**最后更新**: 2026-05-03  
**当前阶段**: Phase 1 完成，Phase 2进行中  
**下次审查**: Phase 4完成时
