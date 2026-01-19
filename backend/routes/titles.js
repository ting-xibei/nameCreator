import express from 'express'
import { generateTitles } from '../services/glmService.js'

const router = express.Router()

/**
 * POST /api/generate-titles
 * 生成美剧集数的各种风格标题
 */
router.post('/generate-titles', async (req, res) => {
  try {
    const { showName, season, episode, plot, styles } = req.body

    // 验证必填字段
    if (!showName || !season || !episode) {
      return res.status(400).json({
        success: false,
        error: '请提供美剧名称、季数和集数'
      })
    }

    if (!styles || styles.length === 0) {
      return res.status(400).json({
        success: false,
        error: '请至少选择一种标题风格'
      })
    }

    console.log(`收到请求: ${showName} S${season}E${episode}, 风格:`, styles)

    // 调用GLM服务生成标题
    const titles = await generateTitles({
      showName,
      season,
      episode,
      plot,
      styles
    })

    res.json({
      success: true,
      data: titles
    })
  } catch (error) {
    console.error('生成标题失败:', error)
    res.status(500).json({
      success: false,
      error: error.message || '生成标题失败，请重试'
    })
  }
})

export default router
