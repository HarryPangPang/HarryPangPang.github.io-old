### github博客自动化部署

原材料：github博客，travis-ci.org

1. 首先你有一个类似xxx.github.io的博客
2. 打开 https://github.com/settings/tokens
3. 点击Personal access tokens旁的generate new token
4. 复制好这个token，之后会需要
5. 打开 https://travis-ci.org/
6. 用github登陆
7. 点击头像，打开settings，打开你所需要部署的仓库的开关（页面上很明显能找到）
8. 在项目根目录新建.travis.yml，并输入下面
```
language: node_js
node_js:
- lts/*
cache:
  directories:
  - node_modules
install:
- npm ci
script:
- npm run docs:build #scripts里输入你自己的脚步，我这里是基于vuepress的
- cd docs/.vuepress/dist
- echo '你自己的网址域名' > CNAME #如果你需要指向自己的域名
after_script:
- git config credential.helper "store --file=.git/credentials"
- echo "https://${GH_TOKEN}:@github.com" > .git/credentials
- node ./node_modules/grunt-cli/bin/grunt release
- git config --global user.email "邮箱"
- git config --global user.name "用户名"
- git init
- git add .
- git commit -m 'deploy'
- git push -f "https://${GH_TOKEN}@github.com/test/test.github.io.git" master #更换test内容，这里参照你自己的GitHub地址去改
branches:
  only:
  - dev
deploy:
  provider: pages
  skip-cleanup: true
  local_dir: docs/.vuepress/dist
  github_token: "$GH_TOKEN"
  keep-history: true
  on:
    branch: dev

```
9. 在电脑shell里输入
```
gem install travis

travis encrypt GH_TOKEN="第四步保存的key" --add
```
10. 这个时候你会发现你的.travis.yml会多出
```
env:
  global:
    - secure: "lots-of-seemingly-random-characters"
```
这句话，这其实就是加密后的token，用于push代码

11. 然后就像平常一样push代码，就会自动部署啦