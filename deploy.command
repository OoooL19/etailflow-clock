#!/bin/bash
# Etailflow Clock — 一键发布到 GitHub Pages（双击运行；以后更新网站也双击它）
cd "$(dirname "$0")" || exit 1
REPO="etailflow-clock"
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

say() { printf "\n\033[1m%s\033[0m\n" "$1"; }
stop() { say "✗ $1"; read -r -p "按回车关闭…" _; exit 1; }

command -v git >/dev/null 2>&1 || stop "没有找到 git。请先在终端运行：xcode-select --install，装完后再双击本文件。"

if ! command -v gh >/dev/null 2>&1; then
  if command -v brew >/dev/null 2>&1; then
    say "正在安装 GitHub 命令行工具 (gh)…"
    brew install gh || stop "gh 安装失败。"
  else
    stop "没有找到 GitHub 命令行工具 gh。请从 https://cli.github.com 下载安装（macOS 安装包），装完后再双击本文件。"
  fi
fi

if ! gh auth status -h github.com >/dev/null 2>&1; then
  say "需要登录 GitHub：按提示复制验证码，在打开的浏览器里确认。"
  gh auth login -h github.com -p https -w || stop "GitHub 登录没有完成。"
fi
gh auth setup-git

OWNER="$(gh api user --jq .login)" || stop "读取 GitHub 账号失败。"

# 清理可能残留的锁文件
rm -f .git/*.lock .git/objects/maintenance.lock 2>/dev/null
find .git -name 'tmp_obj_*' -delete 2>/dev/null

[ -d .git ] || git init -q -b main
git config user.name  >/dev/null || git config user.name  "$OWNER"
git config user.email >/dev/null || git config user.email "$OWNER@users.noreply.github.com"
printf ".DS_Store\n" > .gitignore

git add -A
git diff --cached --quiet || git commit -q -m "Update site $(date '+%Y-%m-%d %H:%M')"

if ! gh api "repos/$OWNER/$REPO" >/dev/null 2>&1; then
  say "正在创建仓库 $OWNER/$REPO …"
  gh repo create "$REPO" --public --description "Etailflow Clock · 三语员工打卡网站" || stop "创建仓库失败。"
fi

git remote remove origin 2>/dev/null
git remote add origin "https://github.com/$OWNER/$REPO.git"
say "正在推送…"
git push -u origin main || stop "推送失败。"

if ! gh api "repos/$OWNER/$REPO/pages" >/dev/null 2>&1; then
  say "正在开启 GitHub Pages…"
  gh api -X POST "repos/$OWNER/$REPO/pages" -f 'source[branch]=main' -f 'source[path]=/' >/dev/null || say "Pages 自动开启失败，可在仓库 Settings → Pages 里手动选 main 分支。"
fi

say "✓ 完成。网站地址（首次发布需等 1–3 分钟）："
echo "https://$OWNER.github.io/$REPO/"
read -r -p "按回车关闭…" _
