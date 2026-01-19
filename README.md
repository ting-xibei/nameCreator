# 美剧起名大师 🎬

一个有趣的美剧集数标题生成器，使用AI为美剧集数生成各种风格的标题。

## 功能特色

- 📺 支持输入美剧名称和集数
- 🎨 自由选择生成风格：
  - 水浒传章回体风格
  - 诗词风格
  - 对联风格
  - 新闻标题风格
  - 搞笑风格
  - Emoji概括
- ✨ 智能剧情推断

## 技术栈

- **前端**: React + Vite
- **后端**: Node.js + Express
- **AI服务**: GLM API (智谱AI)

## 项目结构

```
美剧起名大师/
├── frontend/          # React前端应用
│   ├── src/
│   │   ├── App.jsx          # 主应用组件
│   │   ├── App.css          # 样式文件
│   │   └── api/
│   │       └── client.js    # API客户端
│   └── package.json
├── backend/           # Node.js后端服务
│   ├── services/
│   │   └── glmService.js    # GLM API集成
│   ├── routes/
│   │   └── titles.js        # API路由
│   ├── server.js            # 服务器入口
│   ├── .env.example         # 环境变量模板 ⚠️ 重要
│   └── package.json
├── .gitignore          # Git忽略文件配置
└── README.md
```


## 快速开始

### 前置要求

- Node.js 18+
- npm 或 yarn
- GLM API Key

### 1. 获取GLM API Key

1. 访问 [智谱AI开放平台](https://open.bigmodel.cn/)
2. 注册并登录账号
3. 进入控制台，创建API Key
4. 复制API Key备用

### 2. 安装依赖

```bash
# 克隆项目后
cd 美剧起名大师

# 安装前端依赖
cd frontend
npm install

# 安装后端依赖
cd ../backend
npm install
```

### 3. 配置环境变量

在 `backend` 目录下创建 `.env` 文件：

```bash
cd backend
cp .env.example .env
```

然后编辑 `.env` 文件，填入你的API密钥：

```env
# GLM API配置
GLM_API_KEY=你的API密钥

# 服务器端口
PORT=3001

# GLM API端点
GLM_API_URL=https://open.bigmodel.cn/api/paas/v4/chat/completions
```

### 4. 启动服务

打开两个终端窗口：

**终端1 - 启动后端：**
```bash
cd backend
npm run dev
```

**终端2 - 启动前端：**
```bash
cd frontend
npm run dev
```

### 5. 访问应用

打开浏览器访问：http://localhost:5173

## 使用说明

1. 输入美剧名称（如：Friends, Breaking Bad等）
2. 输入季数和集数（如：S1E1）
3. 选择你想要的标题风格（可多选）
4. （可选）输入剧集剧情简介
5. 点击"生成标题"按钮
6. 查看AI生成的标题

## API说明

### POST /api/generate-titles

生成美剧集数的标题

**请求体：**
```json
{
  "showName": "Friends",
  "season": 1,
  "episode": 1,
  "plot": "Monica的兄弟Ross结婚后搬来与她同住...",
  "styles": ["waterMargin", "funny", "emoji"]
}
```

**响应：**
```json
{
  "success": true,
  "data": {
    "waterMargin": "第一回 六人行咖啡厅初聚首 莫妮卡姐妹同心度难关",
    "funny": "莫妮卡：我只是想请客吃饭，结果收获了五个终身好友",
    "emoji": "☕👫💕😂🏠"
  }
}
```

## 部署说明

### 部署到生产环境

1. **环境变量**：在服务器上配置 `.env` 文件
2. **构建前端**：`cd frontend && npm run build`
3. **启动服务**：使用 PM2 或其他进程管理工具

### 环境变量清单

- `GLM_API_KEY`: （必填）智谱AI的API密钥
- `PORT`: （可选）后端服务端口，默认3001
- `GLM_API_URL`: （可选）GLM API端点

## 开发说明

### 前端开发
- 使用 Vite 作为开发服务器
- React Hooks 管理状态
- Axios 进行API调用

### 后端开发
- Express 提供 REST API
- GLM API 调用AI服务
- CORS 跨域支持

## 免责声明

本项目仅供学习和个人使用。请遵守智谱AI的使用条款。
