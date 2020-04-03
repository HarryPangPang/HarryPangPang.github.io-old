1. 安装go
2. go env -w GO111MODULE=auto //使用go 模块
3. go env -w GOPATH="/Users/qiang.zhang/Documents/go_project" //修改工作目录      
4. go env -w GOPROXY="https://goproxy.cn,direct" //下载超时解决方案
5. mkdir bin pkg src
6. go mod init maxcb //初始化mod
7. 测试环境：go run *.go 编译: go build //go会自动下载包


### docker 部署测试环境
```
redis:
    image: redis:alpine
    ports:
      - "127.0.0.1:2306:6379"
  
mysql:
    image: percona:5.7
    ports:
      - "127.0.0.1:2307:3306"
    environment:
      MYSQL_DATABASE: app
      MYSQL_USER: app
      MYSQL_PASSWORD: app
      MYSQL_ROOT_PASSWORD: app
    command: --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
  
web:
    build: .
    links:
      - redis:cache1
      - mysql:db1
    ports:
      - "127.0.0.1:2308:80"
    volumes:
      - .:/var/www/yourproject
    tty: true
    working_dir: /var/www/yourproject
    environment:
      - GO111MODULE=auto
      - GOPORT=80
  
```
```
# Use Alpine Go
FROM golang:1.11.2-alpine
a

# Install Git
RUN apk update && apk upgrade && \
	apk add --no-cache nginx git nginx-mod-http-geoip

# Build the outyet command inside the container.
# (You may fetch or manage dependencies here,
# either manually or with a tool like "godep".)
RUN export GOPROXY=https://goproxy.io,direct
RUN go get github.com/dgrijalva/jwt-go && \
    go get github.com/go-redis/redis && \
    go get github.com/go-sql-driver/mysql && \
    go get github.com/gorilla/handlers && \
    go get github.com/gorilla/mux && \
    go get github.com/jinzhu/gorm && \
    go get github.com/joho/godotenv && \
    go get gopkg.in/mgo.v2 && \
    go get gopkg.in/guregu/null.v3 && \
    go get github.com/thedevsaddam/renderer && \
    go get golang.org/x/sync/singleflight && \
    go get gopkg.in/gomail.v2 && \
    go get github.com/sirupsen/logrus && \
    go get go.uber.org/zap
```