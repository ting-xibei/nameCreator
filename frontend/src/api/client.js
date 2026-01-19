import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 60000, // 60秒超时，因为AI生成可能需要较长时间
  headers: {
    'Content-Type': 'application/json'
  }
})

export async function generateTitles({ showName, season, episode, plot, styles }) {
  try {
    const response = await api.post('/generate-titles', {
      showName,
      season,
      episode,
      plot,
      styles
    })

    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.error || '生成失败')
    }
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || '服务器错误')
    } else if (error.request) {
      throw new Error('无法连接到服务器，请确保后端服务正在运行')
    } else {
      throw error
    }
  }
}
