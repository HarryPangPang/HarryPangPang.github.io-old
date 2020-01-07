---
title: 手把手教你实现脚手架工具Koa-generator
date: 2019-05-09 16:36:13
tags:
---
我们日常中经常使用各种cli来加速我们的工作，你们也一定和我一样想知道这些cli内部都干了什么？接下来我们就以实现一个koa-generator来打开脚手架工具的大门，来跟着我一步一步做吧：

`为了加快我们的学习进度，更快的理解cli，我们这里会省略一些内容，旨在帮助大家更快建立基本的概念和入门方法`
### 需求分析
首先我们先对我们要实现的工具做一个简单的需求分析：
1. 自动化生成koa初始项目结构
2. 可以自定义一些内容
3. 发布

是不是很简单？没错，真的很简单！

### 逐步实现
#### 1
想要自动化生成koa初始项目结构的前提，就是要知道我们构建出来的结构是什么样的：

![](https://user-gold-cdn.xitu.io/2019/5/9/16a9b4ab026e0644?w=299&h=371&f=png&s=17255)

上图就是我们想要生成的项目结构

明确了我们的目的接下来就开始着手吧！

#### 2
#### 2.1 
创建文件夹
```
mkdir koa-simple-generator
```
#### 2.2 
进入项目目录
```
cd koa-simple-generator
```
#### 2.3 
初始化npm（等不及实践就一路enter，后面也可以再做修改）
```
npm init
```
#### 2.4 
打开我们的package.json，如下

![](https://user-gold-cdn.xitu.io/2019/5/9/16a9b511c3717d41?w=498&h=235&f=png&s=14605)

将下面的代码复制到package.json里
```
{
  "name": "koa-simple-generator",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",


  "main": "bin/wowKoa",
  "bin": {
    "koa2": "./bin/wowKoa"
  },
  "dependencies": {
    "commander": "2.7.1",
    "mkdirp": "0.5.1",
    "sorted-object": "1.0.0"
  },
  "devDependencies": {
    "mocha": "2.2.5",
    "rimraf": "~2.2.8",
    "supertest": "1.0.1"
  },
  "engines": {
    "node": ">= 7.0"
  }
}
```
```
1. dependencies和devDependencies简单来说就是应用的依赖包，devDependencies只会在开发环境安装

2. 这句话的意思是我们的这个工具需要node7.0及以上的版本才能支持
"engines": {
    "node": ">= 7.0"
  }

重点是这两句
"main": "bin/wowKoa",
  "bin": {
    "wowKoa": "./bin/wowKoa"
  },
  意思是默认执行的是bin目录下的wowKoa，
  执行wowKoa的命令，执行的也是bin目录下的wowKoa，
  
```

####2.5 
接下来安装我们的依赖吧
```
npm i
```
#### 2.6 
安装完，我们新建一个目录template
```
mkdir template
```
然后我们可以把我们想要生成的目录结构拷贝进去，这里我就只是把koa2的目录拷贝进去，现在我们的目录长这样：

![](https://user-gold-cdn.xitu.io/2019/5/9/16a9b5f29ca24773?w=256&h=240&f=png&s=10184)
#### 2.7 
新建bin目录，在bin下新建文件wowKoa

![](https://user-gold-cdn.xitu.io/2019/5/9/16a9b632f0c8d54e?w=314&h=166&f=png&s=7354)

#### 2.8
接下来就是关键了，我们的所有工作都是在bin下的wowKoa文件里完成的
直接复制粘贴下面的，然后进入项目目录运行`node bin/wowKoa`就能看到结果了

*代码我已经大部分都注释啦*
```
#!/usr/bin/env node
 // 告诉Unix和Linux系统这个文件中的代码用node可执行程序去运行
var program = require('commander');
var mkdirp = require('mkdirp');
var os = require('os');
var fs = require('fs');
var fsm = require('fs-extra')
var path = require('path');
var readline = require('readline');
var pkg = require('../package.json');

// 退出node进程
var _exit = process.exit;
// s.EOL属性是一个常量，返回当前操作系统的换行符（Windows系统是\r\n，其他系统是\n）
var eol = os.EOL;



var version = pkg.version;
// Re-assign process.exit because of commander
// TODO: Switch to a different command framework
process.exit = exit

program

    /**
     * .version('0.0.1', '-v, --version')
     * 1版本号<必须>,
     * 2自定义标志<可省略>：默认为 -V 和 --version
     * 
     * .option('-n, --name<path>', 'name description', 'default name')
     * 1 自定义标志<必须>：分为长短标识，中间用逗号、竖线或者空格分割；标志后面可跟必须参数或可选参数，前者用 <> 包含，后者用 [] 包含
     * 2 选项描述<省略不报错>：在使用 --help 命令时显示标志描述
     * 3 默认值<可省略>
     * 
     * .usage('[options] [dir]')
     * 作用：只是打印用法说明
     * 
     * .parse(process.argv)
     * 作用：用于解析process.argv，设置options以及触发commands
     * process.argv获取命令行参数
     * 
     * 
     * Commander提供了api来取消未定义的option自动报错机制， .allowUnknownOption()
     */
    .version(version, '-v, --version')
    .allowUnknownOption()
    .usage('[options] [dir]')
    .option('-f, --force', 'force on non-empty directory')
    .parse(process.argv);

// 没有退出时执行主函数
if (!exit.exited) {
    main();
}

/**
 * 主函数
 */
function main() {
    // 获取当前命令执行路径
    var destinationPath = program.args.shift() || '.';
    // 根据文件夹名称定义appname
    // 用于package.json里的name
    var appName = path.basename(path.resolve(destinationPath));

    // 判断当前文件目录是否为空
    emptyDirectory(destinationPath, function (empty) {
        // 如果为空或者强制执行时，就直接生成项目
        if (empty || program.force) {
            createApplication(appName, destinationPath);
        } else {
            // 否则询问
            confirm('当前文件夹不为空，是否继续？[y/N] ', function (ok) {
                if (ok) {
                        // 控制台不再输入时销毁
                        process.stdin.destroy();
                        createApplication(appName, destinationPath);
                } else {
                    console.error('aborting');
                    exit(1);
                }
            });
        }
    })
}

/**
 * Check if the given directory `path` is empty.
 * 判断文件夹是否为空
 * @param {String} path
 * @param {Function} fn
 */

function emptyDirectory(path, fn) {
    fs.readdir(path, function (err, files) {
        if (err && 'ENOENT' != err.code) throw err;
        fn(!files || !files.length);
    });
}

/**
 * 在给定路径中创建应用
 * @param {String} path
 */

function createApplication(app_name, path) {
    // wait的值等于complete函数执行的次数
    // 用于选择在哪一次complete函数执行后执行控制台打印引导使用的文案
    var wait = 1;
    console.log();

    function complete() {
        if (--wait) return;
        var prompt = launchedFromCmd() ? '>' : '$';

        console.log();
        console.log('   install dependencies:');
        console.log('     %s cd %s && npm install', prompt, path);
        console.log();
        console.log('   run the app:');

        // 根据控制台的环境不同打印不同文案（linux或者win）
        if (launchedFromCmd()) {
            console.log('     %s SET DEBUG=koa* & npm start', prompt, app_name);
        } else {
            console.log('     %s DEBUG=%s:* npm start', prompt, app_name);
        }

    }
    copytmp(complete, path,app_name)

}

// 拷贝模拟里的文件到本地
function copytmp(fn, destinationPath,app_name) {
    // 获取模板文件的文件目录
    tmpPath = path.join(__dirname, '..', 'template')
    // 创建目录
    fsm.ensureDir(destinationPath + '/'+app_name)
        .then(() => {
            // 拷贝模板
            fsm.copy(tmpPath, destinationPath + '/'+app_name, err => {
                if (err) return console.log(err)
                fn()
            })
        })
}
/**
 * Determine if launched from cmd.exe
 * 判断控制台环境（liux或者win获取其他）
 */

function launchedFromCmd() {
    return process.platform === 'win32' &&
        process.env._ === undefined;
}


/**
 * node是使用process.stdin和process.stdout来实现标准输入和输出的
 * readline 模块提供了一个接口，用于一次一行地读取可读流（例如 process.stdin）中的数据。 它可以使用以下方式访问：
 */

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// 控制台问答
function confirm(msg, callback) {
    rl.question(msg, function (input) {
        callback(/^y|yes|ok|true$/i.test(input));
    });
}

// 控制台问答
function wrieQuestion(msg, callback) {
    rl.question(msg, function (input) {
        // rl.close()后就不再监听控制台输入了
        rl.close();
        callback(input)
    });
}

/**
 * 通过fs读取模板文件内容
 */

function loadTemplate(name) {
    return fs.readFileSync(path.join(__dirname, '..', 'template', name), 'utf-8');
}

/**
 * echo str > path.
 * 写入文件
 * @param {String} path
 * @param {String} str
 */

function write(path, str, mode) {
    fs.writeFileSync(path, str, { mode: mode || 0666 });
    console.log('   \x1b[36mcreate\x1b[0m : ' + path);
  }

/**
 * 这里是主要解决在winodws上的一些bug，不用卡在这里，核心目的就是为了能让进程优雅退出
 * Graceful exit for async STDIO
 */

function exit(code) {
    // flush output for Node.js Windows pipe bug
    // https://github.com/joyent/node/issues/6247 is just one bug example
    // https://github.com/visionmedia/mocha/issues/333 has a good discussion
    function done() {
        if (!(draining--)) _exit(code);
    }

    var draining = 0;
    var streams = [process.stdout, process.stderr];

    exit.exited = true;

    streams.forEach(function (stream) {
        // submit empty write request and wait for completion
        draining += 1;
        stream.write('', done);
    });

    done();
}
```