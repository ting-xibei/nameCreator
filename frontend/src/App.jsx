import { useState } from 'react'
import { generateTitles } from './api/client'
import './App.css'

const STYLE_OPTIONS = [
  { id: 'waterMargin', label: '水浒传章回体', icon: '📖' },
  { id: 'poem', label: '诗词风格', icon: '🎭' },
  { id: 'couplet', label: '对联风格', icon: '🎊' },
  { id: 'news', label: '新闻标题', icon: '📰' },
  { id: 'funny', label: '搞笑风格', icon: '😄' },
  { id: 'emoji', label: 'Emoji概括', icon: '😀' }
]

function App() {
  const [showName, setShowName] = useState('')
  const [season, setSeason] = useState('')
  const [episode, setEpisode] = useState('')
  const [plot, setPlot] = useState('')
  const [selectedStyles, setSelectedStyles] = useState(
    STYLE_OPTIONS.map(s => s.id)
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [results, setResults] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setResults(null)
    setLoading(true)

    try {
      const data = await generateTitles({
        showName: showName.trim(),
        season: parseInt(season),
        episode: parseInt(episode),
        plot: plot.trim(),
        styles: selectedStyles
      })
      setResults(data)
    } catch (err) {
      setError(err.message || '生成标题失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const toggleStyle = (styleId) => {
    setSelectedStyles(prev => {
      if (prev.includes(styleId)) {
        return prev.filter(id => id !== styleId)
      } else {
        return [...prev, styleId]
      }
    })
  }

  const isFormValid = showName && season && episode && selectedStyles.length > 0

  return (
    <div className="app">
      <header className="header">
        <h1>🎬 美剧起名大师</h1>
        <p>AI驱动的剧集标题生成器 - 让每集都有独特的名字</p>
      </header>

      <div className="container">
        <form onSubmit={handleSubmit} className="input-section">
          <div className="form-group">
            <label htmlFor="showName">美剧名称 *</label>
            <input
              id="showName"
              type="text"
              placeholder="例如：Friends, Breaking Bad, Game of Thrones"
              value={showName}
              onChange={(e) => setShowName(e.target.value)}
              required
            />
          </div>

          <div className="season-episode-inputs">
            <div className="form-group">
              <label htmlFor="season">季数 (Season) *</label>
              <input
                id="season"
                type="number"
                min="1"
                placeholder="1"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="episode">集数 (Episode) *</label>
              <input
                id="episode"
                type="number"
                min="1"
                placeholder="1"
                value={episode}
                onChange={(e) => setEpisode(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="plot">
              剧情简介（可选）
              <span style={{ fontWeight: 'normal', color: '#666', marginLeft: '10px' }}>
                如果不填写，AI将根据剧集信息自动生成
              </span>
            </label>
            <textarea
              id="plot"
              placeholder="简要描述这一集的剧情内容..."
              value={plot}
              onChange={(e) => setPlot(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              选择标题风格 *（至少选择一种）
            </label>
            <div className="style-selector">
              {STYLE_OPTIONS.map(style => (
                <label key={style.id} className="style-option">
                  <input
                    type="checkbox"
                    checked={selectedStyles.includes(style.id)}
                    onChange={() => toggleStyle(style.id)}
                  />
                  <span className="style-label">
                    <span className="style-icon">{style.icon}</span>
                    <span className="style-name">{style.label}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="generate-btn"
            disabled={!isFormValid || loading}
          >
            {loading ? '生成中...' : '✨ 生成标题'}
          </button>
        </form>

        {error && (
          <div className="error">
            ❌ {error}
          </div>
        )}

        {loading && (
          <div className="loading">
            AI正在创作中，请稍候
          </div>
        )}

        {results && (
          <div className="results-section">
            <h2>🎨 生成的标题</h2>
            <div className="results-grid">
              {STYLE_OPTIONS.filter(style => selectedStyles.includes(style.id)).map(style => (
                <ResultCard
                  key={style.id}
                  title={`${style.icon} ${style.label}`}
                  icon={style.icon}
                  content={results[style.id]}
                  isEmoji={style.id === 'emoji'}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ResultCard({ title, icon, content, isEmoji = false }) {
  return (
    <div className="result-card">
      <h3>{title}</h3>
      <div className={isEmoji ? 'emoji-content' : 'content'}>
        {content}
      </div>
    </div>
  )
}

export default App
