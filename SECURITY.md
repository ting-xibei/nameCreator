# 安全检查清单

## 提交到GitHub前，请确认以下事项：

### ✅ 必须检查

1. **`.env` 文件未被上传**
   ```bash
   git status
   ```
   确保 `.env` 文件不在待提交列表中

2. **验证 `.gitignore` 配置**
   ```bash
   cat .gitignore | grep .env
   ```
   应该看到 `.env` 在忽略列表中

3. **检查是否有硬编码的密钥**
   ```bash
   grep -r "API_KEY.*=" backend/ --include="*.js" | grep -v "process.env"
   ```
   不应该返回任何结果（除了警告信息）

### 📝 上传后验证

1. 访问你的GitHub仓库
2. 检查 `.env` 文件是否在仓库中
   - 如果在，立即删除并重新生成API密钥！
3. 检查提交历史，确保没有提交过敏感信息

### 🚨 如果意外泄露了API密钥

1. 立即到智谱AI控制台删除旧密钥
2. 生成新的API密钥
3. 在本地更新 `.env` 文件
4. 从GitHub历史中彻底删除敏感信息（考虑使用 BFG Repo-Cleaner）

### 📌 最佳实践

- 定期更换API密钥
- 为不同项目使用不同的API密钥
- 设置API密钥的使用限额和IP白名单
- 不要在 screenshots 或 demo 中展示包含密钥的终端画面

## 快速检查命令

```bash
# 一键检查所有安全项
echo "检查 .env 文件..."
git ls-files | grep -q "^\.env$" && echo "❌ 危险！.env 被跟踪" || echo "✅ .env 安全"

echo "检查硬编码密钥..."
(grep -r "0182796b" . --include="*.js" --include="*.jsx" 2>/dev/null | grep -v node_modules && echo "❌ 发现密钥！") || echo "✅ 未发现硬编码密钥"
```
