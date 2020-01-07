#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# mount -o remount rw /
# 生成静态文件
# npm run docs:build
# git add .
# git commit -m'build'
# git push -f https://github.com/harryzq/harryzq.github.io.git dev

vuepress build docs

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
echo 'www.easyrentsh.xyz' > CNAME
echo '
node_modules 
.VSCODE
docs/.vuepress/dist' > .gitignore
git init
git add -A
git commit -m 'deploy'


# 建立远程链接
# git remote add origin/master https://github.com/harryzq/harryzq.github.io.git
# 如果发布到 https://<USERNAME>.github.io
git push -f https://github.com/harryzq/harryzq.github.io.git master

cd -