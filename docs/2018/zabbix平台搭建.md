---
title: zabbix平台搭建
date: 2018-03-14 14:06:45
tags:
---
最近给公司搞了个zabbix平台监测，不得不说，网上的文章太杂了
下面是我使用成功在centos7安装zabbix 3.11.4的命令
1.1 安装依赖包：
```
yum -y install wget net-snmp-devel OpenIPMI-devel httpd openssl-devel java lrzsz fping-devel libcurl-devel perl-DBI pcre-devel libxml2 libxml2-devel mysql-devel gcc php php-bcmath php-gd php-xml php-mbstring php-ldap php-mysql.x86_64 php-pear php-xmlrpc  net-tools wget vim-enhanced
```
1.2 关闭防火墙：
```
# systemctl stop firewalld.service
# systemctl disable firewalld.service 
需要关闭 selinux，一定要关闭这个，开启selinux会引起一连串问题，甚至zabbix的discovery功能也不能正常使用
# sed -i "s/SELINUX=enforcing/SELINUX=disabled/g" /etc/selinux/config
确认是否修改成功
# grep SELINUX /etc/selinux/config
然后重启系统即可

# reboot
```
2.1 搭建lamp环境
在centos7上安装zabbix server3.0之前，我们首先搭建zabbix所需要的lamp环境。

下载最新的yum源，如下：
```
# wget -P /etc/yum.repos.d http://mirrors.aliyun.com/repo/Centos-7.repo
```
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf289ca12ca6f?w=500&h=138&f=png&s=54932)
在开始安装之前，还需要说明下centos7自带的mysql是mariadb，我们可以通过如下命令查看：
```
yum search mysql|tac
```
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf289cac5b93a?w=550&h=117&f=png&s=20151)
现在开始安装lamp环境，使用如下命令：
```
yum -y install mariadb mariadb-server php php-mysql httpd
```
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf289caebc541?w=500&h=210&f=png&s=99112)

通过上图，我们可以很明显的看出centos7默认安装的是php5.4、httpd2.4和maradb5.5，这个完全符合zabbix3.0对软件版本的要求。

lamp安装完毕后，我们现在来配置mysql数据库。

设置开机自启动mysql，并启动mysql，使用如下命令：
```
[root@zabbix ~]# systemctl enable mariadb.service
[root@zabbix ~]# systemctl start mariadb.service
```
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf289cc84fa02?w=886&h=66&f=png&s=3094)
初始化mysql数据库，并配置root用户密码。使用如下命令：
```
[root@zabbix ~]# mysql_secure_installation
```
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf289cde7dd14?w=500&h=342&f=png&s=104894)
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf289cdfa42e9?w=426&h=136&f=png&s=2147)
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf289f31c1c10?w=500&h=409&f=png&s=105873)
注意：在上图中的Enter current passwdord for root处，我们直接敲回车键即可。因为centos7上mysql的默认root用户密码为空。
上图中主要是为root用户配置密码，并刷新相关权限。（密码设为123456，只为实验用，生产环境自定义）
Remove anonymous users? 删除匿名用户？
Disallow root login remotely? 禁止root远程登陆
Remove test database and access to it? 删除测试数据库并且和访问它
Reload privilege tables now? 重新载入特权表
上图中主要是配置匿名用户、test用户以及root用户远程连接等相关配置。
mysql初始化完毕后，我们现在来创建zabbix数据库及其用户，使用如下命令：
```
[root@zabbix ~]# mysql -uroot -p123456 -e "create database zabbix default character set utf8 collate utf8_bin;"

[root@zabbix ~]# mysql -uroot -p123456 -e "grant all on zabbix.* to "zabbix"@"%" identified by "zabbix";"
```
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf289f80f9ba8?w=550&h=71&f=png&s=39165)
现在来测试刚刚创建的zabbix用户，是否可以连接mysql数据库，如下：
```
[root@zabbix ~]# mysql -uzabbix -pzabbix

MariaDB [(none)]> show databases;

MariaDB [(none)]> quit
```
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf289fe4f7f03?w=500&h=210&f=png&s=49276)
通过上图，我们可以很明显的看出zabbix用户是可以正常连接数据库的。

启动apache以及开放80端口，如下：
```
[root@zabbix ~]# systemctl start httpd.service

[root@zabbix ~]# netstat -ltun
```
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf28a03047765?w=500&h=118&f=png&s=45381)

![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf28a08b208e6?w=615&h=21&f=png&s=1120)
到此lamp环境已经全部搭建完毕。
浏览器输入IP地址即可看到如下
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf28a0b3a3547?w=500&h=113&f=png&s=75540)
2.2 服务器端安装zabbix server3.0（zabbix server）
lamp环境搭建完毕后，我们现在开始正式安装zabbix3.0。

安装zabbix3.0所需要EPEL源和zabbix的yum源，如下：
```
#rpm -ivh https://mirrors.aliyun.com/centos/6.9/extras/x86_64/Packages/epel-release-6-8.noarch.rpm
````
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf28a26598a68?w=500&h=65&f=png&s=33448)
```
#rpm -ivh http://repo.zabbix.com/zabbix/3.0/rhel/7/x86_64/zabbix-release-3.0-1.el7.noarch.rpm
```
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf28a2704d6e7?w=825&h=98&f=png&s=5156)
以上安装完毕后，我们现在来正式安装zabbix3.0，使用如下命令：
```
[root@zabbix ~]# yum -y install zabbix-server-mysql zabbix-web-mysql zabbix-get
```
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf28a309e3504?w=814&h=304&f=png&s=31892)
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf28a3d3b20be?w=827&h=129&f=png&s=4702)

通过上图，我们可以很明显的看出目前zabbix server是3.0.5版本的。

以上安装完毕后，我们现在开始进行zabbix的相关配置。

导入zabbix数据库结构，如下：
```
[root@zabbix ~]# cd /usr/share/doc/zabbix-server-mysql-3.0.5/

[root@zabbix zabbix-server-mysql-3.0.5]# zcat create.sql.gz | mysql -uroot -pDe123456 zabbix
```
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf28a3e070b44?w=732&h=67&f=png&s=3377)
数据库导入完毕后，我们现在来修改zabbix sever的配置文件，如下：（我们只需要关注 DBHost、DBName、DBUser、
DBPassword 几项即可。这几项是配置zabbix server连接mysql数据库的参数。）
```
[root@zabbix ~]# vi /etc/zabbix/zabbix_server.conf

LogFile=/var/log/zabbix/zabbix_server.log

LogFileSize=0

PidFile=/var/run/zabbix/zabbix_server.pid

DBHost=localhost

DBName=zabbix

DBUser=zabbix

DBPassword=zabbix

SNMPTrapperFile=/var/log/snmptrap/snmptrap.log

Timeout=4

AlertScriptsPath=/usr/lib/zabbix/alertscripts

ExternalScripts=/usr/lib/zabbix/externalscripts

LogSlowQueries=3000
```
以上修改完毕后，我们再来修改下zabbix.conf文件。如下：
```
vi /etc/httpd/conf.d/zabbix.conf

Alias /zabbix /usr/share/zabbix

Options FollowSymLinks

AllowOverride None

Require all granted

php_value max_execution_time 300

php_value memory_limit 128M

php_value post_max_size 16M

php_value upload_max_filesize 2M

php_value max_input_time 300

php_value always_populate_raw_post_data -1

   php_value date.timezone Asia/Shanghai 
```
修改最后一项php_value date.timezone Asia/Shanghai 就行，定义php的时区
以上修改完毕后，我们把把zabbix-server加入开机启动，并启动zabbix-server，如下：
```
[root@zabbix ~]# systemctl start zabbix-server.service

[root@zabbix ~]# systemctl enable zabbix-server.service
```
最后重启apache，如下：
```
[root@zabbix ~]# systemctl restart httpd.service
```
3.1配置zabbix
登录http://ip/zabbix/setup.php（ip就是你服务器的IP地址）
一开始会有要输入密码的时候，如下
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf28a48afcfca?w=611&h=231&f=png&s=49591)
输入之前设置的数据库密码即可
接下来，很重要！
一路next。。。
然后就点登录 默认用户名是Admin 密码 zabbix 然后点击sign in
zabbix server端就设置完毕
4.1 配置客户端安装zabbix agent（被监测的服务器）
zabbix agent的安装比较简单，我们只需要安装相应的仓库，然后执行安装命令即可。
```
[root@zabbix ~]# yum clean all

[root@zabbix ~]# yum -y install zabbix zabbix-agent
```
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf28a4c3cf45b?w=500&h=156&f=png&s=64317)
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf28a5aa62ae4?w=629&h=221&f=png&s=54174)
在安装时如出现如上图所示错误，原因是软件这两个版本不一致，仔细观察发现这两个软件包使用了不同的仓库，把epel的关闭(enabled=0，位于/etc/yum.repos.d/epel.repo)再重装
4.2 配置zabbix agent

zabbix agent的配置很简单，只需要修改zabbix agent配置文件中的Server、ServerActive和Hostname这三项即可。

其中Server、ServerActive是zabbix server服务器的IP地址，Hostname是被监控端的IP地址，如下：
```
[root@zabbix ~]# vi /etc/zabbix/zabbix_agentd.conf

PidFile=/var/run/zabbix/zabbix_agentd.pid

LogFile=/var/log/zabbix/zabbix_agentd.log

LogFileSize=0

Server=127.0.0.1

ServerActive=127.0.0.1

Hostname=127.0.0.1

Include=/etc/zabbix/zabbix_agentd.d/
```
以上配置完毕后，我们在zabbix web端添加该监控机器时，只需要把honst name与该配置文件中的hostname对应即可。如下：

Server=服务器ip地址

ServerActive=服务器ip地址

Hostname=客户端ip地址

Server被动ServerActive主动

到此zabbix agent就已经安装完毕。

启动客户端
```
[root@zabbix ~]# zabbix_agentd -c /etc/zabbix/zabbix_agentd.conf

[root@zabbix ~]# systemctl start zabbix-agent

[root@zabbix ~]# systemctl restart zabbix-agent

[root@zabbix ~]# systemctl enable zabbix-agent
```
然后在浏览器中根据下面的美图设置
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf28a61d1df49?w=1240&h=308&f=png&s=96888)
看到第四个了没，ZBX绿了就成功了

点左上角的小人就能设置语言是中文
但是会遇到图标坐标系没有文字的问题如下

![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf28a6cf44eff?w=376&h=212&f=png&s=15317)
解决乱码方法：
把Windows 系统中找到 C:\Windows\Fonts 中的楷体（常规）用winscp （百度一下）拷贝到linux根目录
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf28a6fc86e4a?w=975&h=300&f=png&s=44909)
可以上传到 linux 里面了，接下来把 SIMKAI.TTF 移动到 zabbix 安装目录的 fonts 目录下
```
[root@zabbix ~]# mv SIMKAI.TTF /usr/share/zabbix/fonts/
```
可以直接按照下面的图片设置，然后再看看，是不是搞定了
![image.png](https://user-gold-cdn.xitu.io/2018/12/21/167cf28a7b02865b?w=610&h=263&f=png&s=6823)



