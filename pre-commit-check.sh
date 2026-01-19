#!/bin/bash
# 提交前安全检查脚本

echo "🔒 检查是否有敏感信息..."

# 检查是否包含.env文件
if git ls-files | grep -q "^\.env$"; then
    echo "❌ 错误：.env文件已被添加到Git，请先移除："
    echo "   git rm --cached .env"
    echo "   git commit -m 'Remove .env from tracking'"
    exit 1
fi

# 检查代码中是否有硬编码的API密钥
if grep -r "GLM_API_KEY\s*=" backend/ --include="*.js" | grep -v "process.env" | grep -v "node_modules"; then
    echo "❌ 警告：发现可能硬编码的API密钥"
    exit 1
fi

echo "✅ 安全检查通过"
