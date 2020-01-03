---
title: webpack下build报错
date: 2019-02-09 16:01:23
tags:
---
执行npm run build时报错如下：
```
D:\MyProjects\react_ssr_demo>npm run build

> react_ssr_demo@1.0.0 build D:\MyProjects\react_ssr_demo
> webpack --config build/webpack.config.js

Hash: 0b1003a436390263970e
Version: webpack 4.29.3
Time: 633ms
Built at: 2019-02-09 15:46:04
 1 asset
Entrypoint app = app.0b1003a436390263970e.js
[2] ./client/App.jsx 3 KiB {0} [not cacheable] [built] [failed] [1 error]
[3] ./client/app.js 100 bytes {0} [built]
[9] (webpack)/buildin/global.js 472 bytes {0} [built]
    + 7 hidden modules

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for th
is value. Set 'mode' option to 'development' or 'production' to enable defaults
for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https
://webpack.js.org/concepts/mode/

ERROR in ./client/App.jsx
Module build failed (from ./node_modules/_babel-loader@8.0.5@babel-loader/lib/in
dex.js):
Error: Cannot find module '@babel/core'
 babel-loader@8 requires Babel 7.x (the package '@babel/core'). If you'd like to
 use Babel 6.x ('babel-core'), you should install 'babel-loader@7'.
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:581:15)
    at Function.Module._load (internal/modules/cjs/loader.js:507:25)
    at Module.require (internal/modules/cjs/loader.js:637:17)
    at require (D:\MyProjects\react_ssr_demo\node_modules\_v8-compile-cache@2.0.
2@v8-compile-cache\v8-compile-cache.js:159:20)
    at Object.<anonymous> (D:\MyProjects\react_ssr_demo\node_modules\_babel-load
er@8.0.5@babel-loader\lib\index.js:10:11)
    at Module._compile (D:\MyProjects\react_ssr_demo\node_modules\_v8-compile-ca
che@2.0.2@v8-compile-cache\v8-compile-cache.js:178:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
    at Module.load (internal/modules/cjs/loader.js:599:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:538:12)
    at Function.Module._load (internal/modules/cjs/loader.js:530:3)
    at Module.require (internal/modules/cjs/loader.js:637:17)
    at require (D:\MyProjects\react_ssr_demo\node_modules\_v8-compile-cache@2.0.
2@v8-compile-cache\v8-compile-cache.js:159:20)
    at loadLoader (D:\MyProjects\react_ssr_demo\node_modules\_loader-runner@2.4.
0@loader-runner\lib\loadLoader.js:18:17)
    at iteratePitchingLoaders (D:\MyProjects\react_ssr_demo\node_modules\_loader
-runner@2.4.0@loader-runner\lib\LoaderRunner.js:169:2)
    at runLoaders (D:\MyProjects\react_ssr_demo\node_modules\_loader-runner@2.4.
0@loader-runner\lib\LoaderRunner.js:365:2)
    at NormalModule.doBuild (D:\MyProjects\react_ssr_demo\node_modules\_webpack@
4.29.3@webpack\lib\NormalModule.js:280:3)
    at NormalModule.build (D:\MyProjects\react_ssr_demo\node_modules\_webpack@4.
29.3@webpack\lib\NormalModule.js:427:15)
    at Compilation.buildModule (D:\MyProjects\react_ssr_demo\node_modules\_webpa
ck@4.29.3@webpack\lib\Compilation.js:635:10)
    at factory.create (D:\MyProjects\react_ssr_demo\node_modules\_webpack@4.29.3
@webpack\lib\Compilation.js:884:14)
    at factory (D:\MyProjects\react_ssr_demo\node_modules\_webpack@4.29.3@webpac
k\lib\NormalModuleFactory.js:405:6)
    at hooks.afterResolve.callAsync (D:\MyProjects\react_ssr_demo\node_modules\_
webpack@4.29.3@webpack\lib\NormalModuleFactory.js:155:13)
    at AsyncSeriesWaterfallHook.eval [as callAsync] (eval at create (D:\MyProjec
ts\react_ssr_demo\node_modules\_tapable@1.1.1@tapable\lib\HookCodeFactory.js:32:
10), <anonymous>:6:1)
    at resolver (D:\MyProjects\react_ssr_demo\node_modules\_webpack@4.29.3@webpa
ck\lib\NormalModuleFactory.js:138:29)
    at process.nextTick (D:\MyProjects\react_ssr_demo\node_modules\_webpack@4.29
.3@webpack\lib\NormalModuleFactory.js:342:9)
    at process._tickCallback (internal/process/next_tick.js:61:11)
 @ ./client/app.js 2:0-27 4:16-19
npm ERR! code ELIFECYCLE
npm ERR! errno 2
npm ERR! react_ssr_demo@1.0.0 build: `webpack --config build/webpack.config.js`
npm ERR! Exit status 2
npm ERR!
npm ERR! Failed at the react_ssr_demo@1.0.0 build script.
npm ERR! This is probably not a problem with npm. There is likely additional log
ging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\Administrator.PC-201812050004\AppData\Roaming\npm-cache\_l
ogs\2019-02-09T07_46_04_537Z-debug.log
```

这里面有两个问题
1. WARNING in configuration
> 解决方法：在webpack.config.js下增加mode: 'none'
module.exports = {
    mode: 'none',


2. Error: Cannot find module '@babel/core'
 babel-loader@8 requires Babel 7.x (the package '@babel/core'). If you'd like to
 use Babel 6.x ('babel-core'), you should install 'babel-loader@7'.
> 解决方法：npm i babel-loader@7 -D
