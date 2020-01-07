---
title: 常用的一些git命令行
date: 2019-02-16 11:41:21
tags:
---
## 工作中常用的一些git命令行

#### 相关概念

| 四个库   | 四种文件状态                         |
|:--------|-----------------------------------:|
| 工作区   | Unstracked(未被跟踪的)              |
|         | Modified(有修改的，和本地仓库快照不同) |
| 暂存区   | staged(暂存状态)                    |
| 本地仓库 | Unmodify(未改动)                    |
| 远程仓库 |                                    |


#### 克隆代码仓库

* `git clone 仓库地址`

远程地址为仓库地址
***
#### 暂存区操作

* `git add 文件名` 添加文件到暂存区

* `git add .` 添加所有（未被添加过但存在在仓库文件夹里的）文件到暂存区

* `git rm 文件名` 从暂存区删除文件,文件会被删除

* `git rm 文件名 -f` 从暂存区强制删除，文件会被删除

* `git rm 文件名 --cached` 从暂存区删除，但是文件不会被删除，状态变为Unstracked

* `git checkout -- 文件名` 从暂存区拉取文件覆盖到工作区

* `git reset HEAD 文件名` 从本地仓库拉取文件覆盖到暂存区

* `git mv 'oldName' 'newName'` 更改文件名

* `git status` 获取仓库状态，包含四个库和文件状态

* `git reset --hard HEAD^` 重置到上一个commit状态，覆盖staged和工作区

* `git reset --hard <commitkey>` 重置到对应commit版本，覆盖staged和工作区

##### 一些技巧
*工作区误删文件（手动删除）*
`git checkout -- 文件名` 

*暂存区误删文件，删除之后想恢复*
`git reset HEAD 文件名 + git checkout -- 文件名`

#### 本地仓库操作

* `git commit -m 提交描述信息` 将暂存区里的改动提交到本地仓库， -m 参数表示带入提交描述信息，不加命令行会打开vim在让你输入

* `git commit -a -m 提交描述信息` 将所有非Unstracked状态的文件改动提交到本地仓库，相当于`git add 改动文件 + git commit -m`

* `git commit --amend` 补充上一次的提交

#### 远程仓库操作

* `git remote -v` 查看目前远程仓库地址

* `git remote add origin 远程仓库地址` 添加远程仓库地址，已经有了的话会失败

* `git remote origin` 删除远程仓库，解除关联

* `git remote set-url origin 远程仓库地址` 设置远程仓库地址，可覆盖

* `git push -u origin master` 推送本地仓库到远程仓库master分支，-u表示关联，之后可省略为`git push, git pull`

* `git pull` 从远程仓库拉取到本地



#### 基础操作流程图(不包含全部)
![流程图](https://img-blog.csdn.net/20140417113336421)