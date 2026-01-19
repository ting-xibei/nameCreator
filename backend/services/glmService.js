import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const GLM_API_URL = process.env.GLM_API_URL || 'https://open.bigmodel.cn/api/paas/v4/chat/completions'
const GLM_API_KEY = process.env.GLM_API_KEY

if (!GLM_API_KEY) {
  console.warn('⚠️  警告: 未设置GLM_API_KEY环境变量')
}

/**
 * 调用GLM API生成标题
 */
async function callGLM(prompt) {
  try {
    const response = await axios.post(
      GLM_API_URL,
      {
        model: 'glm-4-flash', // 使用GLM-4-Flash模型，速度快且成本低
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 2000
      },
      {
        headers: {
          'Authorization': `Bearer ${GLM_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30秒超时
      }
    )

    return response.data.choices[0].message.content.trim()
  } catch (error) {
    console.error('GLM API调用失败:', error.response?.data || error.message)
    throw new Error('AI服务调用失败，请检查API密钥和网络连接')
  }
}

/**
 * 生成各种风格的标题
 */
export async function generateTitles({ showName, season, episode, plot, styles }) {
  // 构建基础提示词
  const baseInfo = `美剧名称：${showName}\n季数：${season}\n集数：${episode}`
  const plotInfo = plot ? `\n剧情简介：${plot}` : '\n剧情简介：请根据该剧集信息自行推断'

  // 风格类型映射
  const stylePrompts = {
    waterMargin: '"waterMargin": "水浒传章回体标题（格式：第X回 XXXX XXXX，两句各7-10字，对仗工整）"',
    poem: '"poem": "一首七言绝句或五言绝句，概括剧集主题"',
    couplet: '"couplet": "一副对联（上联和下联，每句7-11字，标注上联/下联）"',
    news: '"news": "新闻标题风格（客观、简洁、吸引人，15-20字）"',
    funny: '"funny": "搞笑幽默风格（网络流行语、梗、幽默表达，20-30字）"',
    emoji: '"emoji": "用5-8个emoji表情概括剧集内容"'
  }

  const styleDescriptions = {
    waterMargin: '水浒传章回体要符合古典文学风格',
    poem: '诗词要押韵，有意境',
    couplet: '对联要工整对仗',
    news: '新闻标题要有吸引力',
    funny: '搞笑风格要轻松有趣',
    emoji: 'emoji要形象生动'
  }

  // 构建选中的风格的JSON结构
  const selectedStylesJson = styles.map(s => `  ${stylePrompts[s]}`).join(',\n')
  const requirements = styles.map(s => `${styleDescriptions[s]}`).join('；')

  // 同时生成选中的标题（一次API调用）
  const prompt = `你是一个创意标题生成专家。请根据以下美剧集数信息，生成${styles.length}种不同风格的标题。

${baseInfo}${plotInfo}

请严格按照以下JSON格式返回结果，不要添加任何其他文字：

{
${selectedStylesJson}
}

要求：
1. 所有标题都要紧扣剧集内容
2. ${requirements}

请直接返回JSON，不要有任何其他说明文字。`

  try {
    const response = await callGLM(prompt)

    // 尝试解析JSON响应
    let parsedResponse
    try {
      // 清理可能存在的markdown代码块标记
      const cleanedResponse = response
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim()

      parsedResponse = JSON.parse(cleanedResponse)
    } catch (parseError) {
      console.error('解析GLM响应失败:', parseError)
      console.error('原始响应:', response)

      // 如果解析失败，返回默认响应
      parsedResponse = {
        waterMargin: `第${season}季${episode}集 ${showName}精彩纷呈`,
        poem: `${showName}好戏连台看，${season}季${episode}集更精彩`,
        couplet: `上联：${showName}第${season}季\n下联：第${episode}集精彩不断`,
        news: `${showName}第${season}季第${episode}集热播 引观众热议`,
        funny: `看完${showName}S${season}E${episode}，我直呼好家伙！`,
        emoji: '🎬📺✨🔥👀'
      }
    }

    // 验证并填充缺失的字段
    const defaultTitles = {
      waterMargin: `第${season}季${episode}集 ${showName}精彩纷呈`,
      poem: `${showName}好戏连台看，${season}季${episode}集更精彩`,
      couplet: `上联：${showName}第${season}季\n下联：第${episode}集精彩不断`,
      news: `${showName}第${season}季第${episode}集热播 引观众热议`,
      funny: `看完${showName}S${season}E${episode}，我直呼好家伙！`,
      emoji: '🎬📺✨🔥👀'
    }

    // 只返回选中的风格
    const result = {}
    styles.forEach(style => {
      result[style] = parsedResponse[style] || defaultTitles[style]
    })

    return result
  } catch (error) {
    console.error('生成标题失败:', error)
    throw error
  }
}

/**
 * 获取剧集信息（可选功能）
 * 如果需要从TMDB等API获取剧集信息，可以在这里实现
 */
export async function getEpisodeInfo({ showName, season, episode }) {
  // TODO: 集成TMDB或其他剧集数据库API
  // 目前GLM会根据剧集名称和集数推断剧情
  return null
}
