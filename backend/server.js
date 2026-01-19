import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import titlesRouter from './routes/titles.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// 中间件
app.use(cors())
app.use(express.json())

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: '美剧起名大师后端服务运行正常' })
})

// API路由
app.use('/api', titlesRouter)

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('服务器错误:', err)
  res.status(500).json({
    success: false,
    error: '服务器内部错误'
  })
})

// 404处理
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: '接口不存在'
  })
})

app.listen(PORT, () => {
  console.log(`🚀 美剧起名大师后端服务启动成功`)
  console.log(`📡 服务运行在: http://localhost:${PORT}`)
  console.log(`🏥 健康检查: http://localhost:${PORT}/health`)
  console.log(`📝 API端点: http://localhost:${PORT}/api/generate-titles`)
})
