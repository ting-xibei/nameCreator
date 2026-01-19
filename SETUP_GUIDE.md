# 美剧起名大师 - 快速启动指南

## 📋 前置要求

1. **Node.js**: 版本 18.0 或更高
2. **npm**: 版本 9.0 或更高（随Node.js一起安装）
3. **GLM API Key**: 从智谱AI平台获取

## 🔑 获取GLM API Key

1. 访问智谱AI开放平台：https://open.bigmodel.cn/
2. 注册并登录账号
3. 进入控制台，创建API Key
4. 复制API Key备用

## 🚀 快速开始

### 1. 安装依赖

在项目根目录打开终端：

```bash
# 安装前端依赖
cd frontend
npm install

# 安装后端依赖
cd ../backend
npm install
```

### 2. 配置环境变量

在 `backend` 目录下创建 `.env` 文件：

```bash
cd backend
cp .env.example .env
```

编辑 `.env` 文件，填入你的GLM API Key：

```env
GLM_API_KEY=你的API_KEY
PORT=3001
GLM_API_URL=https://open.bigmodel.cn/api/paas/v4/chat/completions
```

### 3. 启动服务

你需要同时运行前端和后端服务，打开两个终端窗口：

**终端1 - 启动后端：**
```bash
cd backend
npm run dev
```

你会看到：
```
🚀 美剧起名大师后端服务启动成功
📡 服务运行在: http://localhost:3001
🏥 健康检查: http://localhost:3001/health
📝 API端点: http://localhost:3001/api/generate-titles
```

**终端2 - 启动前端：**
```bash
cd frontend
npm run dev
```

你会看到：
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

### 4. 访问应用

打开浏览器，访问：http://localhost:5173

## 📝 使用示例

### 示例1: 老友记 (Friends)
- 美剧名称: `Friends`
- 季数: `1`
- 集数: `1`
- 剧情简介（可选）: `Monica的兄弟Ross结婚后搬来与她同住，Ross因妻子是同性恋而沮丧。Monica的老朋友Rachel逃离婚礼，闯入他们的生活。`

点击"生成标题"后，你将获得6种不同风格的标题！

### 示例2: 绝命毒师 (Breaking Bad)
- 美剧名称: `Breaking Bad`
- 季数: `1`
- 集数: `1`

### 示例3: 权力的游戏 (Game of Thrones)
- 美剧名称: `Game of Thrones`
- 季数: `1`
- 集数: `1`

## 🐛 常见问题

### Q1: 前端无法连接后端
**A:** 确保后端服务正在运行在 http://localhost:3001，检查终端输出是否有错误。

### Q2: GLM API调用失败
**A:** 检查以下几点：
- API Key是否正确配置在 `.env` 文件中
- 网络连接是否正常
- API Key是否有效（检查智谱AI控制台）

### Q3: 生成的标题质量不好
**A:** 可以尝试：
- 填写详细的剧情简介
- 调整 `glmService.js` 中的 `temperature` 参数（越高越有创意）

### Q4: 端口冲突
**A:** 如果3001或5173端口被占用，可以修改：
- 后端端口: 修改 `backend/.env` 中的 `PORT`
- 前端端口: 修改 `frontend/vite.config.js` 中的 `server.port`

## 📦 项目结构

```
美剧起名大师/
├── frontend/                 # React前端
│   ├── src/
│   │   ├── App.jsx          # 主应用组件
│   │   ├── App.css          # 样式文件
│   │   ├── main.jsx         # 入口文件
│   │   └── api/
│   │       └── client.js    # API客户端
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── backend/                  # Node.js后端
│   ├── services/
│   │   └── glmService.js    # GLM API集成
│   ├── routes/
│   │   └── titles.js        # API路由
│   ├── server.js            # 服务器入口
│   ├── .env.example         # 环境变量模板
│   └── package.json
│
├── shared/                   # 共享代码（预留）
├── README.md
└── .gitignore
```

## 🎨 自定义开发

### 添加新的标题风格

1. 编辑 `backend/services/glmService.js`
2. 在prompt中添加新的风格要求
3. 在返回的JSON中添加新字段
4. 编辑 `frontend/src/App.jsx`，添加新的 `ResultCard`

### 更换GLM模型

在 `backend/services/glmService.js` 中修改：
```javascript
model: 'glm-4-flash', // 可选: glm-4, glm-4-plus, glm-4-air
```

### 集成TMDB API

如果你想要自动获取剧集信息，可以：
1. 注册TMDB API Key: https://www.themoviedb.org/
2. 在 `backend/services/glmService.js` 中实现 `getEpisodeInfo` 函数
3. 修改 `generateTitles` 函数，在需要时调用TMDB API

## 📄 License

MIT License - 随意使用和修改！

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📧 联系方式

如有问题，请在GitHub上提Issue。
