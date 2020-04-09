#### Gitlab ci/cd

1. 持续集成 开发-测试-集成测试
2. 持续交付
3. 持续部署 

1. ```shell
   #事先安装好docker，下载地址：https://docs.docker.com/
   #拉取gitlab-runner镜像
   docker pull gitlab/gitlab-runner
   ```

2. ```shell
   #在shell里运行下面的命令，注意一下volume映射
   #-v $HOME/gitlab-runner-volume/config:/etc/gitlab-runner \这一行的#\这一行的 $HOME/gitlab-runner-volume/config $HOME可以改成任意本地目录，之后会用到
   # -v /var/run/docker.sock:/var/run/docker.sock \ 这一行的/var/run/docker.sock在win下可能有问题，需要找一下docker的安装位置
   docker run -d \
     --name gitlab-runner \
     --restart always \
     -v $HOME/gitlab-runner-volume/config:/etc/gitlab-runner \
     -v /var/run/docker.sock:/var/run/docker.sock \
     gitlab/gitlab-runner:latest
   
   ```

3. ```shell
   #如果需要更新镜像，可以走这一步，否则跳过即可
   docker pull gitlab/gitlab-runner:latest
   docker stop gitlab-runner && docker rm gitlab-runner
   
   docker run -d \
     --name gitlab-runner \
     --restart always \
     -v $HOME/gitlab-runner-volume/config:/etc/gitlab-runner \
     -v /var/run/docker.sock:/var/run/docker.sock \
     gitlab/gitlab-runner:latest
   
   ```

4. ```shell
   # 注册gitlab-runner 参考https://docs.gitlab.com/runner/register/
   docker run --rm -t -i -v $HOME/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner register
   ```

5. 这时候打开你的gitlab

   ![截屏2020-04-08下午4.20.04](/Users/qiang.zhang/Desktop/截屏2020-04-08下午4.20.04.png)

   ![截屏2020-04-08下午4.22.27](/Users/qiang.zhang/Desktop/截屏2020-04-08下午4.22.27.png)

   

   ```shell
   #上一步之后，会有一堆问题回答
   Runtime platform                                    arch=amd64 os=linux pid=7 revision=4c96e5ad version=12.9.0
   Running in system-mode.                            
                                                      
   Please enter the gitlab-ci coordinator URL (e.g. https://gitlab.com/):
   #上图3的网址
   Please enter the gitlab-ci token for this runner:
   #上图4的地址
   Please enter the gitlab-ci description for this runner:
   [3a594927a932]: vue typescript template
   Please enter the gitlab-ci tags for this runner (comma separated):
   #自己定义的标签，比如test,dev
   Registering runner... succeeded                     runner=aPsdGq2A
   Please enter the executor: docker-ssh, parallels, ssh, virtualbox, custom, docker, shell, docker+machine, docker-ssh+machine, kubernetes:
   #写 docker
   Please enter the default Docker image (e.g. ruby:2.6):
   #写 alpine:latest
   Runner registered successfully. Feel free to start it, but if it's running already the config should be automatically reloaded!
   ```

   回到你的gitlab，你就能看到下面的东西

   ![截屏2020-04-08下午4.25.06](/Users/qiang.zhang/Desktop/截屏2020-04-08下午4.25.06.png)

6. ```shell
   # 运行下面的命令查看是否有问题
   docker logs gitlab-runner
   ```

   如果看到下面的错误，就证明docker没有生成config.toml，需要手动从之前定义的$HOME下找到config.toml复制到docker里

   ```
   ERROR: Failed to load config stat /etc/gitlab-runner/config.toml: no such file or directory  builds=0
   #或者下面的
   ERROR: Failed to load config stat /etc/gitlab-runner/config.toml: no such file or directory  builds=0
   ERROR: Failed to load config stat /etc/gitlab-runner/config.toml: no such file or directory  builds=0
   ERROR: Failed to load config stat /etc/gitlab-runner/config.toml: no such file or directory  builds=0
   ERROR: Failed to load config stat /etc/gitlab-runner/config.toml: no such file or directory  builds=0
   ERROR: Failed to load config stat /etc/gitlab-runner/config.toml: no such file or directory  builds=0
   ```

   解决步骤：

   ```
   docker ps -a
   #看到类似下面这样的，复制CONTAINER ID
   #CONTAINER ID        IMAGE                         COMMAND                  CREATED             STATUS                      PORTS                      NAMES
   c324fdf55c20        bfb85bb1e211                  "gitlab-runner-helpe…"   24 minutes ago      Exited (0) 24 minutes ago                              runner
   
   #接着下面的走
   docker exec -it 刚才复制的containerid /bin/sh
   cd /etc/gitlab-runner
   touch config.toml
   vi config.toml
   然后就是把本地的config.toml贴进去进行
   ```

7. 再执行

   ```
   #
   Configuration loaded                                builds=0
   Configuration loaded                                builds=0
   Checking for jobs... received                       job=872 repo_url=https://gitlab.jingle.cn/websh/ff_event_vue_template.git runner=ejiRy6v7
   WARNING: Failed to parse "X-GitLab-Trace-Update-Interval" header  error=strconv.Atoi: parsing "": invalid syntax header-value= job=872 runner=ejiRy6v7
   WARNING: Failed to parse "X-GitLab-Trace-Update-Interval" header  error=strconv.Atoi: parsing "": invalid syntax header-value= job=872 runner=ejiRy6v7
   WARNING: Failed to parse "X-GitLab-Trace-Update-Interval" header  error=strconv.Atoi: parsing "": invalid syntax header-value= job=872 runner=ejiRy6v7
   WARNING: Failed to parse "X-GitLab-Trace-Update-Interval" header  error=strconv.Atoi: parsing "": invalid syntax header-value= job=872 runner=ejiRy6v7
   WARNING: Failed to parse "X-GitLab-Trace-Update-Interval" header  error=strconv.Atoi: parsing "": invalid syntax header-value= job=872 runner=ejiRy6v7
   WARNING: Failed to parse "X-GitLab-Trace-Update-Interval" header  error=strconv.Atoi: parsing "": invalid syntax header-value= job=872 runner=ejiRy6v7
   Job succeeded                                       duration=27.6497334s job=872 project=42 runner=ejiRy6v7
   WARNING: Failed to parse "X-GitLab-Trace-Update-Interval" header  error=strconv.Atoi: parsing "": invalid syntax header-value= job=872 runner=ejiRy6v7
   ```

   

8. 然后我们在项目的根目录创建一个.gitlab-ci.yml

   ```
   test_job_1:
       tags:
           - dev
       script:
           - echo Hello world
   ```

   

9. 再push上去的时候就能看到成功了

![截屏2020-04-08下午4.47.27](/Users/qiang.zhang/Desktop/截屏2020-04-08下午4.47.27.png)

附：

```
image: node:latest
cache:
    paths:
    - node_modules/
before_script:
    - node -v
    - npm -v
    - npm install
stages:
  - development
test_job_1:
    tags:
        - dev
    stage: development
    script:
        - npm run tpl
        - npm run build
```

