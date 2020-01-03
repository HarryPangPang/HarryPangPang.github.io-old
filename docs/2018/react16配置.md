前端工程化至上

目录

版本说明
目录结构
初始化项目
webpack
react
配置loader(sass,jsx)
引入babel
使用HtmlWebpackPlugin
使用webpack-dev-server
多入口页面配置
ref="http://www.imooc.com/article/details/id/291278#entry">如何理解entry point(bundle),chunk,module
多入口页面html配置
redux
使用react-router
使用redux-thunk
模块热替换（Hot Module Replacement）
使用ESLint
使用axios和async/await
Code Splitting
使用CommonsChunkPlugin
版本说明

由于构建相关例如webpack，babel，react-router等更新的较快，所以本文档以下面各种模块的版本号为主，各位安装的时候需要注意一下或者可以直接执行npm i将模块都安装好。

"dependencies": {
    "babel-core": "^6.26.3",
    "babel-eslint": "^8.2.3",
    "babel-loader": "^7.1.4",
    "babel-plugin-transform-async-to-generator": "^6.24.1",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "babel-preset-stage-3": "^6.24.1",
    "css-loader": "^0.28.11",
    "eslint": "^4.19.1",
    "eslint-loader": "^2.0.0",
    "eslint-plugin-react": "^7.9.1",
    "file-loader": "^1.1.11",
    "history": "^4.7.2",
    "html-webpack-plugin": "^3.2.0",
    "react": "^16.6.0",
    "react-dom": "^16.6.0",
    "react-hot-loader": "^4.3.12",
    "react-redux": "^6.0.0",
    "react-router": "^4.3.1",
    "react-router-dom": "^4.3.1",
    "redux": "^4.0.1",
    "sass-loader": "^7.0.3",
    "style-loader": "^0.21.0",
    "url-loader": "^1.0.1",
    "webpack": "^4.12.0",
    "webpack-cli": "^3.0.3",
    "webpack-dev-server": "^3.1.1"
}
目录结构

开发和发布版本的配置文件是分开的，多入口页面的目录结构。

react-family/
    |
    |──dist/                                    * 发布版本构建输出路径
    |
    |──dev/                                     * 调试版本构建输出路径
    |
    |──src/                                     * 工具函数
    |     |
    |     |—— component/                        * 各页面公用组件
    |     |
    |     |—— page/                             * 页面代码
    |     |      |—— index/                     * 页面代码
    |     |      |        |—— Main/             * 组件代码
    |     |      |        |       |—— Main.jsx  * 组件jsx
    |     |      |        |       |—— Main.scss * 组件css
    |     |      |
    |     |      |—— detail/                    * 页面代码
    |     |
    |     |—— static/                           * 静态文件js，css
    |
    |
    |──webpack.config.build.js                  * 发布版本使用的webpack配置文件
    |──webpack.config.dev.js                    * 调试版本使用的webpack配置文件
    |──.eslint                                  * eslint配置文件
    |__.babelrc                                 * babel配置文件
初始化项目

创建文件夹
mkdir react-family-bucket
初始化npm
cd react-family-bucket 
npm init
如果有特殊需要，可以填入自己的配置，一路回车下来，会生成一个package.json，里面是你项目的基本信息，后面的npm依赖安装也会配置在这里。

webpack

安装webpack
npm install webpack --save
or
npm install webpack --g
--save是将当前webpack安装到react-family-bucket下的/node_modules。

--g是将当前webpack安装到全局下面，可以在node的安装目录下找到全局的/node_modules。

配置webopack配置文件
touch webpack.config.dev.js
新建一个app.js

touch app.js
写入基本的webpack配置，可以参考这里：

const path = require('path');
const srcRoot = './src';
module.exports = {

    // 输入配置
    entry: [
      './app.js'
    ],,

    // 输出配置
    output: {
        path: path.resolve(__dirname, './dev'),

        filename: 'bundle.min.js'
    },

};
3, 执行webpack命令
如果是全局安装：

webpack --config webpack.config.dev.js
如果是当前目录安装：

./node_modules/.bin/webpack --config webpack.config.dev.js
在package.json中添加执行命令：

  "scripts": {
    "dev": "./node_modules/.bin/webpack --config webpack.config.dev.js",
  },
执行npm run dev命令之后，会发现需要安装webpack-cli，（webpack4之后需要安装这个）

npm install webpack-cli --save
去除WARNING in configuration警告,在webpack.config.dev.js增加一个配置即可：

...
mode: 'development'
...
成功之后会在dev下面生成bundle.min.js代表正常。

如果想要动态监听文件变化需要在命令后面添加 --watch

react

安装react
npm install react react-dom --save
创建page目录和index页面文件：
mkdir src
mkdir page
cd page
创建index

mkdir index
cd index & touch index.js & touch index.html
index.js

import ReactDom from 'react-dom';
import Main from './Main/Main.jsx';

ReactDom.render(<Main />, document.getElementById('root'));
index.html

<!DOCTYPE html>
<html>
<head>
    <title>index</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">

</head>
<body>
<div id="root"></div>
</body>
</html>


创建Main组件
import React from 'react';

class Main extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (<div>Main</div>);
    }
}

export default Main;


export 和 export default区别：


export可以有多个

xx.js:
export const test1 = 'a'
export function test2() {}

yy.js:
import { test1, test2 } from 'xx.js';
export default只能有1个

xx.js:
let test1 = 'a';
export default test1;

yy.js:
import test1 from 'xx.js';
export 和 module.exports
let exports = module.exports;
修改webpack配置入口文件
entry: [
    path.resolve(srcRoot,'./page/index/index.js')
],
配置loader

处理样式文件需要这些loader:
css-loader
sass-loader
style-loader


npm install css-loader sass-loader style-loader file-loader --save
配置：

 module: {
        // 加载器配置
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'], include: path.resolve(srcRoot)},
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'], include: path.resolve(srcRoot)}
        ]
    },


url-loader处理处理静态文件
npm install url-loader --save

配置：

    module: {
        // 加载器配置
        rules: [
            { test: /\.(png|jpg|jpeg)$/, use: 'url-loader?limit=8192&name=images/[name].[hash].[ext]', include: path.resolve(srcRoot)}
        ]
    },
limit:表示超过多少就使用base64来代替，单位是byte

name:可以设置图片的路径，名称和是否使用hash 具体参考这里

引入babel

bebel是用来解析es6语法或者是es7语法分解析器，让开发者能够使用新的es语法，同时支持jsx，vue等多种框架。

安装babel
babel-core
babel-loader
npm install babel-core babel-loader --save
配置：

 module: {
        // 加载器配置
        rules: [
            { test: /\.(js|jsx)$/, use: [{loader:'babel-loader'}] ,include: path.resolve(srcRoot)},
        ]
    },
babel配置文件：.babelrc

touch .babelrc

配置：

{
    "presets": [
        "es2015",
        "react",
        "stage-0"
    ],
    "plugins": []
}
babel支持自定义的预设(presets)或插件(plugins),只有配置了这两个才能让babel生效，单独的安装babel是无意义的


presets：代表babel支持那种语法(就是你用那种语法写)，优先级是从下往上,state-0|1|2|..代表有很多没有列入标准的语法回已state-x表示,参考这里

plugins:代表babel解析的时候使用哪些插件，作用和presets类似，优先级是从上往下。
依次安装：

babel-preset-es2015
babel-preset-react
babel-preset-stage-0


npm install babel-preset-es2015 babel-preset-react babel-preset-stage-0 --save
babel-polyfill是什么？

我们之前使用的babel，babel-loader 默认只转换新的 JavaScript 语法，而不转换新的 API。例如，Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转译。如果想使用这些新的对象和方法，必须使用 babel-polyfill，为当前环境提供一个垫片。
npm install --save babel-polyfill
使用：

import "babel-polyfill";
transform-runtime有什么区别？

当使用babel-polyfill时有一些问题：
默认会引入所有babel支持的新语法，这样就会导致你的文件代码非常庞大。
通过向全局对象和内置对象的prototype上添加方法来达成目的,造成全局变量污染。


这时就需要transform-runtime来帮我们有选择性的引入

npm install --save babel-plugin-transform-runtime
配置文件：

{
  "plugins": [
    ["transform-runtime", {
      "helpers": false,
      "polyfill": false,
      "regenerator": true,
      "moduleName": "babel-runtime"
    }]
  ]
}
使用HtmlWebpackPlugin

记得我们之前新建的index.html么 我们执行构建命令之后并没有将index.html打包到dev目录下 我们需要HtmlWebpackPlugin来将我们output的js和html结合起来

npm install html-webpack-plugin --save
配置：

const HtmlWebpackPlugin = require('html-webpack-plugin');
...
plugins: [
    new HtmlWebpackPlugin({
        filename: path.resolve(devPath, 'index.html'),
        template: path.resolve(srcRoot, './page/index/index.html'),
    })
]
filename:可以设置html输出的路径和文件名

template:可以设置已哪个html文件为模版
更多参数配置可以参考这里

使用webpack-dev-server

webpack-dev-server是一个小型的Node.js Express服务器,它使用webpack-dev-middleware来服务于webpack的包。



安装
npm install webpack-dev-server --save
修改在package.json中添加的执行命令：

  "scripts": {
    "dev": "./node_modules/.bin/webpack-dev-server --config webpack.config.dev.js",
  },
配置webpack配置文件：
devServer: {
    "contentBase": devPath,
    "compress": true,
},
contentBase 表示server文件的根目录
compress 表示开启gzip
更多的配置文档参考这里

webpack-dev-server默认情况下会将output的内容放在内存中，是看不到物理的文件的，如果想要看到物理的dev下面的文件可以安装write-file-webpack-plugin这个插件。
webpack-dev-server默认会开启livereload功能
devtool功能：

具体来说添加了devtool: 'inline-source-map'之后，利用source-map你在chrome控制台看到的source源码都是真正的源码，未压缩，未编译前的代码，没有添加，你看到的代码是真实的压缩过，编译过的代码，更多devtool的配置可以参考这里
多入口文件配置

在之前的配置中，都是基于单入口页面配置的，entry和output只有一个文件，但是实际项目很多情况下是多页面的，在配置多页面时，有2中方法可以选择：

在entry入口配置时，传入对象而不是单独数组,output时利用[name]关键字来区分输出文件例如：
entry: {
    index: [path.resolve(srcRoot,'./page/index/index1.js'),path.resolve(srcRoot,'./page/index/index2.js')],
    detail: path.resolve(srcRoot,'./page/detail/detail.js'),
    home: path.resolve(srcRoot,'./page/home/home.js'),
},
output: {
    path: path.resolve(__dirname, './dev'),

    filename: '[name].min.js'
},


通过node动态遍历需要entry point的目录，来动态生成entry：
const pageDir = path.resolve(srcRoot, 'page');
function getEntry() {
    let entryMap = {};

    fs.readdirSync(pageDir).forEach((pathname)=>{
        let fullPathName = path.resolve(pageDir, pathname);
        let stat = fs.statSync(fullPathName);
        let fileName = path.resolve(fullPathName, 'index.js');

        if (stat.isDirectory() && fs.existsSync(fileName)) {
            entryMap[pathname] = fileName;
        }

    });

    return entryMap;
}
{
    ...
    entry: getEntry()
    ...
}
本demo采用的是第二中写法，能够更加灵活。

如何理解entry point(bundle),chunk,module

在webpack中，如何理解entry point(bundle),chunk,module?先看看下图：


根据图上的表述，我这里简单说一下结论：

配置中每个文件例如index1.js,index2.js,detail.js,home.js都属于entry point.
entry这个配置中，每个key值,index,detail,home都相当于chunk。
我们在代码中的require或者import的都属于module，这点很好理解。
chunk的分类比较特别，有entry chunk,initial chunk,normal chunk,参考这个文章
正常情况下，一个chunk对应一个output,在使用了CommonsChunkPlugin或者require.ensure之后，chunk就变成了initial chunk,normal chunk，这时，一个chunk对应多个output。

理解这些概念对于后续使用webpack插件有很大的帮助。
多入口页面html配置

之前我们配置HtmlWebpackPlugin时，同样采用的是但页面的配置，这里我们将进行多页面改造,entryMap是上一步得到的entry：

function htmlAarray(entryMap) {
    let htmlAarray = [];

    Object.keys(entryMap).forEach(function(key){
        let fullPathName = path.resolve(pageDir, key);
        let fileName = path.resolve(fullPathName, key + '.html')
        if (fs.existsSync(fileName)) {
            htmlAarray.push(new HtmlWebpackPlugin({
                chunks: key, // 注意这里的key就是chunk
                filename: key + '.html',
                template: fileName,
                inlineSource:  '.(js|css)'
            }))
        }
    });

    return htmlAarray;

}
修改plugin配置：

plugins: [
     ...
].concat(htmlMap)
redux

关于redux的使用可以参考阮一峰老师的入门教程

安装redux
redux
react-redux
npm install redux react-redux --save
新建reducers，actions目录和文件
|—— index/                          
|—— Main/                   * 组件代码
|       |—— Main.jsx        * 组件jsx
|       |—— Main.scss       * 组件css
|
|—— actions/ 
|       |—— actionTypes.js  * action常量
|       |—— todoAction.js   * action
|
|—— reducers/ 
|       |—— todoReducer.js  * reducer
|       |—— main.js         * 将所有reducer进行combin，store.js只引入这个
|
|—— store.js
|
|—— index.js


修改代码，引入redux,这里以一个redux todo为demo例子：
index.js

import ReactDom from 'react-dom';
import React from 'react';
import Main from './Main/Main.jsx';
import store from './store.js';
import { Provider } from 'react-redux';

ReactDom.render(
    <Provider store={store}>
        <Main />
    </Provider>
, document.getElementById('root'));
store.js

import { createStore } from 'redux';
import todoReducer from './reducers/todoReducer.js';

const store = createStore(todoReducer);

export default store;
tabReducer.js

import { ADD_TODO } from '../actions/actionTypes.js';

const initialState = {
      todoList: []
};

const addTodo = (state, action) => {

  return { ...state, todoList: state.todoList.concat(action.obj) }
}

const todoReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_TODO: return addTodo(state, action);
    default: return state;
  }
};
export default todoReducer;
Main.jsx

import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions/todoAction.js';

class Main extends React.Component {

    onClick(){
        let text = this.refs.input;

        this.props.dispatch(addTodo({
            text: text.value
        }))
    }
    render() {
        return (
            <div>
                <input ref="input" type="text"></input>
                <button onClick={()=>this.onClick()}>提交</button>
                <ul>
                {this.props.todoList.map((item, index)=>{
                    return <li key={index}>{item.text}</li>
                })}
                </ul>
            </div>
        );
    }
}

export default connect(
    state => ({
        todoList: state.todoList
    })
)(Main);
todoAction.js

import { ADD_TODO } from './actionTypes.js';

export const addTodo = (obj) => {
  return {
    type: ADD_TODO,
    obj: obj
  };
};
使用react-router

react-router强大指出在于方便代码管理，结合redux使用更加强大，同时支持web，native更多参考这里

安装react-router-dom
npm install react-router-dom --save
如果项目中用了redux，可以安装connected-react-router
npm install connected-react-router history --save


修改代码：

index.js:
import ReactDom from 'react-dom';
import React from 'react';
import Container from './Main/Container.jsx';
import { store, history } from './store.js';

import { Provider } from 'react-redux';

import { ConnectedRouter } from 'connected-react-router';

ReactDom.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Container />
        </ConnectedRouter>
    </Provider>
, document.getElementById('root'));
结合history,react-router一共有3中不同的router：

BrowserRouter通过history/createBrowserHistory引入:当切换时，url会动态更新，底层使用的时html5的pushState。
HashRouter通过history/createHashHistory引入:当切换时，动态修改hash，利用hashchange事件。
MemoryRouter通过history/createMemoryHistory引入:将路径，路由相关数据存入内存中，不涉及url相关更新，兼容性好。
更多配置可以参考这里



如果想要在代码逻辑中获取当前的route的location信息需要在main.js中添加router的reducer:

新建main.js:
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import todoReducer from './todoReducer.js';

const reducers = (history) => combineReducers({
  todoReducer,
  router: connectRouter(history)
});
export default reducers;
编写store.js:

import { createStore } from 'redux';
import mainReducer from './reducers/main.js';
import createHistory from 'history/createHashHistory';

export const history = createHistory();

const store = createStore(
        createRootReducer(history),
    );

export default store;
然后就可以在this.props.router里面获取到相关的location路径信息，其实就是将router对象放在组件的props里面。

如果需要自己通过dispatch一个action来触发router的跳转，需要引入routerMiddleware:
import { createStore,applyMiddleware,compose } from 'redux';
import mainReducer from './reducers/main.js';
import createHistory from 'history/createHashHistory';
import { routerMiddleware } from "connected-react-router";

export const history = createHistory();


const store = createStore(
        createRootReducer(history),
        compose(applyMiddleware(routerMiddleware(history)))
    );

export default store;
最后，将改动同步在index.js长这样：

index.js:

import ReactDom from 'react-dom';
import React from 'react';
import Container from './Main/Container.jsx';
import store, { history } from './store.js';

import { Provider } from 'react-redux';

import { ConnectedRouter } from 'connected-react-router';

ReactDom.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Container />
        </ConnectedRouter>
    </Provider>
, document.getElementById('root'));
看到这里，大家可能会对react-router，react-router-dom，connected-react-router，history这些东西给搞晕了，在这里解释一下：

react-router：是react-router的核心逻辑，并不涉及到UI，必须引入。
react-router-dom：是react-router的DOM绑定模块，只有用了react-router-dom才能用类似,这些组件，必须引入。
history：是一个让你灵活控制或者模拟浏览器的历史操作的一个库，包括BrowserHistory，HashHistory，MemoryHistory，他可以脱离React使用，也可以结合React使用，可选引入。
connected-react-router：简单来说就是你的项目如果用的React和Redux，如果想要用router的话就可以引入connected-react-router，它能帮你把router的状态放在store里来管理(注意根据你使用的react-router版本不同，会使用不同的版本，它的前身是react-router-redux，官方已经不再维护了)，可选引入。
使用Route和Link和withRouter:

先说说都是干嘛的：
Route:component里面的内容即是tab的主要内容，这个从react-router4开始生效：
<Route exact path="/" component={Div1}></Route> 
<Route path="/2" component={Div2}></Route>
Link:通常也可以用NavLink，相当于tab按钮，控制router的切换,activeClass表示当前tab处于激活态时应用上的class。
withRouter:如果你用了redux，那么你一定要引入它。
export default withRouter(connect(
    state => ({
        todoList: state.todoReducer.todoList
    })
)(Main));
如果你在使用hash时遇到Warning: Hash history cannot PUSH the same path; a new entry will not be added to the history stack错误，可以将push改为replace即

<NavLink
    replace={true}
    to="/2"
    activeClassName="selected"
    >切换到2号</NavLink>
设置初始化路由：
BrowserRouter和HashRouter:
const history = createHistory(); 
history.push('2');
MemoryRouter:
const history = createMemoryHistory({
    initialEntries: ['/2']
});
使用redux-thunk

redux-thunk 是一个比较流行的 redux 异步 action 中间件，比如 action 中有 setTimeout 或者通过 fetch通用远程 API 这些场景，那么久应该使用 redux-thunk 了。redux-thunk 帮助你统一了异步和同步 action 的调用方式，把异步过程放在 action 级别解决，对 component 没有影响。

安装redux-thunk:
npm install redux-thunk --save
修改store.js:
import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import mainReducer from './reducers/main';
...
const store = createStore(mainReducer, applyMiddleware(thunk));
...
export default store;


在action.js使用redux-thunk：
export const getData = (obj) => (dispatch, getState) => {
  setTimeout(()=>{
    dispatch({
        type: GET_DATA,
        obj: obj
    });
  },1000);
};
模块热替换（Hot Module Replacement）

模块热替换(Hot Module Replacement 或 HMR)是 webpack 提供的最有用的功能之一。它允许在运行时更新各种模块，而无需进行完全刷新,很高大上有木有！

下面说一下配置方法，它需要结合devServer使用：

devServer: {
    hot: true // 开启HMR
},
开启plugin：

const webpack = require('webpack');
plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
].concat(htmlMap)
结合React一起使用：

安装react-hot-loader,
npm install react-hot-loader --save
并新建一个Container.jsx:

import React from 'react';
import Main from './Main.jsx';
import { hot } from 'react-hot-loader'

class Container extends React.Component {

    render() {
        return <Main />
    }
        
}
export default hot(module)(Container);
结合redux：如果项目没有使用redux，可以无需配置后面2步

2. 修改store.js新增下面代码，为了让reducer也能实时热替换

if (module.hot) {
    module.hot.accept('./reducers/todoReducer.js', () => {
      const nextRootReducer = require('./reducers/todoReducer.js').default;
      store.replaceReducer(nextRootReducer);
    });
}


修改index.js
import ReactDom from 'react-dom';
import React from 'react';
import Container from './Main/Container.jsx';
import store from './store.js';

import { Provider } from 'react-redux';

ReactDom.render(
    <Provider store={store}>
        <Container />
    </Provider>
, document.getElementById('root'));
当控制台看到[WDS] Hot Module Replacement enabled.代表开启成功

使用ESLint

ESLint 是众多 Javascript Linter 中的其中一种，其他比较常见的还有 JSLint 跟 JSHint，之所以用 ESLint 是因为他可以自由选择要使用哪些规则，也有很多现成的 plugin 可以使用，另外他对 ES6 还有 JSX 的支持程度跟其他 linter 相比之下也是最高的。

安装ESLint
npm install eslint eslint-loader babel-eslint --save
其中eslint-loader是将webpack和eslint结合起来在webpack的配置文件中新增一个eslint-loader种，修改如下

{ test: /\.(js|jsx)$/, use: [{loader:'babel-loader'},{loader:'eslint-loader'}] ,include: path.resolve(srcRoot)},
新建.eslintrc配置文件,将parser配置成babel-eslint
{
    "extends": ["eslint:recommended"],
    
    "parser": "babel-eslint",

    "globals": {
    },
    "rules": {
    }
}
安装eslint-plugin-react:
npm install eslint-plugin-react --save
说明一下，正常情况下每个eslint规则都是需要在rule下面配置，如果什么都不配置，其实本身eslint是不生效的。
eslint本身有很多默认的规则模版，可以通过extends来配置，默认可以使用eslint:recommended。
在使用react开发时可以安装eslint-plugin-react来告知使用react专用的规则来lint
修改.eslintrc配置文件,增加rules，更多rules配置可以参考这里
{
    "extends": ["eslint:recommended","plugin:react/recommended"],
    
    "parser": "babel-eslint",

    "globals": {
        "window": true,
        "document": true,
        "module": true,
        "require": true
    },
    "rules": {
        "react/prop-types" : "off",
        "no-console" : "off"
    }
}
使用axios和async/await

axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端：

从浏览器中创建 XMLHttpRequest
从 node.js 发出 http 请求
支持 Promise API
自动转换JSON数据
安装axios:
npm install axios --save
在action中使用axios：
import axios from 'axios';
export const getData = (obj) => (dispatch, getState) => {
    axios.get('/json/comments.json').then((resp)=>{
        dispatch({
            type: GET_DATA,
            obj: resp
        });
    });
};
async/await：

Javascript的回调地狱，相信很多人都知道，尤其是在node端，近些年比较流行的是Promise的解决方案，但是随着 Node 7 的发布，编程终级解决方案的 async/await应声而出。

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  var result = await resolveAfter2Seconds();
}

asyncCall();
async/await的用途是简化使用 promises 异步调用的操作，并对一组 Promises执行某些操作。await前提是方法返回的是一个Promise对象，正如Promises类似于结构化回调，async/await类似于组合生成器和 promises。

async/await需要安装babel-plugin-transform-async-to-generator。
npm install babel-plugin-transform-async-to-generator --save
在.babelrc中增加配置：
   "plugins": [
        "transform-async-to-generator"
    ]
这样做仅仅是将async转换generator，如果你当前的浏览器不支持generator，你将会收到一个Uncaught ReferenceError: regeneratorRuntime is not defined的错误，你需要：

3. 安装babel-plugin-transform-runtime:

npm install babel-plugin-transform-async-to-generator --save
修改.babelrc中的配置(可以去掉之前配置的transform-async-to-generator)：
   "plugins": [
        "transform-runtime"
    ]
如果不想引入所有的polyfill(参考上面对babel的解释),可以增加配置：
    "plugins": [
        "transform-runtime",
            {
                "polyfill": false,

                "regenerator": true,
            }
    ]
结合axios使用：
import axios from 'axios';
export const getData = (obj) => async (dispatch, getState) => {
    let resp = axios.get('/json/comments.json');
    dispatch({
        type: GET_DATA,
        obj: resp
    });
};
Code Splitting

对于webpack1，2之前，你可以使用require.ensure来控制一个组件的懒加载：
require.ensure([], _require => {
    let Component = _require('./Component.jsx');
},'lazyname')
在webpack4中，官方已经不再推荐使用require.ensure来使用懒加载功能Dynamic Imports，取而代之的是ES6的import()方法：
import(
  /* webpackChunkName: "my-chunk-name" */
  /* webpackMode: "lazy" */
  'module'
);
不小小看注释里的代码，webpack在打包时会动态识别这里的代码来做相关的配置，例如chunk name等等。
3. Prefetching/Preloading modules:

webpack 4.6.0+支持了Prefetching/Preloading的写法:

//...
import(/* webpackPreload: true */ 'ChartingLibrary');
结合React-Router使用:
react-loadable对上述的功能做了封装，丰富了一些功能，结合React-Router起来使用更加方便。

npm install react-loadable --save
在react-router里使用：

function Loading() {
  return <div>Loading...</div>;
}

let Div2 = Loadable({
  loader: () => import('./Div2'), 
  loading: Loading,
});

<Route path="/2" component={Div2}></Route>
使用CommonsChunkPlugin

CommonsChunkPlugin 插件，是一个可选的用于建立一个独立文件(又称作 chunk)的功能，这个文件包括多个入口 chunk 的公共模块。通过将公共模块拆出来，最终合成的文件能够在最开始的时候加载一次，便存起来到缓存中供后续使用。

在webpack4之前的用法：
new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    chunks: ['page1','page2'],
    minChunks: 3
})
name: string: 提出出的名称
chunks: string[]: webpack会从传入的chunk里面提取公共代码,默认从所有entry里提取
minChunks: number|infinity|function(module,count)->boolean: 如果传入数字或infinity(默认值为3)，就是告诉webpack，只有当模块重复的次数大于等于该数字时，这个模块才会被提取出来。当传入为函数时，所有符合条件的chunk中的模块都会被传入该函数做计算，返回true的模块会被提取到目标chunk。
更多的参数配置，可以参考这里
在webpack4之后的用法：
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
splitChunks: 配置一个分离chunk(代替老版本的CommonsChunkPlugin)
cacheGroups: 自定义配置主要使用它来决定生成的文件:
test: 限制范围
name: 生成文件名
priority: 优先级
minSize: number: 最小尺寸必须大于此值，默认30000B
minChunks: 其他entry引用次数大于此值，默认1
maxInitialRequests: entry文件请求的chunks不应该超过此值（请求过多，耗时）
maxAsyncRequests: 异步请求的chunks不应该超过此值
automaticNameDelimiter: 自动命名连接符
chunks: 值为"initial", “async”（默认） 或 “all”:
initial: 入口chunk，对于异步导入的文件不处理
async: 异步chunk，只对异步导入的文件处理
all: 全部chunk
