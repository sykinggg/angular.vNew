import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-webpack',
    templateUrl: './webpack.component.html',
    styleUrls: ['./webpack.component.scss']
})
export class WebpackComponent implements OnInit {

    public webpackSummary: Array<any> = [
        {
            active: true,
			name: '1 概念',
			content: this.sanitizer.bypassSecurityTrustHtml(`
            <ul>
                <li>webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)</li>
                <li>
                    当需要变化时，不修改原有代码<br/>
                    其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle
                </li>
                <li>
                    <p>重点</p>
                    <ul>
                        <li>
                            <h6>入口(entry)</h6>
                            <ul>
                                <li>入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始</li>
                                <li>进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的</li>
                                <li>
                                    <pre>
module.exports = {
    entry: './path/to/my/entry/file.js'
};
                                    </pre>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h6>出口(output)</h6>
                            <ul>
                                <li>output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist</li>
                                <li>可以通过在配置中指定一个 output 字段，来配置这些处理过程</li>
                                <li>
                                    <pre>
const path = require('path');

module.exports = {
    entry: './path/to/my/entry/file.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js'
    }
};
                                    </pre>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h6>loader</h6>
                            <ul>
                                <li>loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）</li>
                                <li>loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后就可以利用 webpack 的打包能力，对它们进行处理</li>
                                <li>
                                    <pre>
const path = require('path');

const config = {
    output: {
        filename: 'my-first-webpack.bundle.js'
    },
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' }
        ]
    }
};

module.exports = config;
                                    </pre>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h6>插件(plugins)</h6>
                            <ul>
                                <li>loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任</li>
                                <li>插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量</li>
                                <li>想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中</li>
                                <li>多数插件可以通过选项(option)自定义</li>
                                <li>可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建它的一个实例</li>
                                <li>
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

const config = {
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'})
    ]
};

module.exports = config;
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h6>模式</h6>
                            <ul>
                                <li>通过选择 development 或 production 之中的一个，来设置 mode 参数</li>
                                <li>可以启用相应模式下的 webpack 内置的优化</li>
                                <li>
                                    <pre>
module.exports = {
    mode: 'production'
};
                                    </pre>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
			`)
        },
        {
            active: false,
			name: '2 入口起点(entry points)',
            content: this.sanitizer.bypassSecurityTrustHtml(`
<ul>
    <li>
        <h6>单个入口（简写）语法</h6>
        <p>'用法：entry: string|Array<string>'</p>
        <pre>
webpack.config.js
const config = {
    entry: './path/to/my/entry/file.js'
};

module.exports = config;
entry 属性的单个入口语法
const config = {
    entry: {
      main: './path/to/my/entry/file.js'
    }
};
        </pre>
        <p>代码描述</p>
        <ul>
            <li>向 entry 属性传入「文件路径(file path)数组」将创建“多个主入口(multi-main entry)”</li>
            <li>想要多个依赖文件一起注入，并且将它们的依赖导向(graph)到一个“chunk”时，传入数组的方式就很有用</li>
        </ul>
    </li>
    <li>
        <h6>对象语法</h6>
        <p>'用法：entry: {[entryChunkName: string]: string|Array<string>}'</p>
        <pre>
webpack.config.js
const config = {
    entry: {
        app: './src/app.js',
        vendors: './src/vendors.js'
    }
};
        </pre>
        <p>代码描述</p>
        <ul>
            <li>“可扩展的 webpack 配置”是指，可重用并且可以与其他配置组合使用</li>
            <li>用于将关注点(concern)从环境(environment)、构建目标(build target)、运行时(runtime)中分离</li>
            <li>用专门的工具（如 webpack-merge）将它们合并</li>
        </ul>
    </li>
    <li>
        <h6>常见场景</h6>
        <ul>
            <li>
                <h6>分离 应用程序(app) 和 第三方库(vendor) 入口</h6>
                <pre>
webpack.config.js
const config = {
    entry: {
        app: './src/app.js',
        vendors: './src/vendors.js'
    }
};
                </pre>
                <p>代码描述</p>
                <ul>
                    <li>webpack 从 app.js 和 vendors.js 开始创建依赖图(dependency graph)</li>
                    <li>这些依赖图是彼此完全分离、互相独立的（每个 bundle 中都有一个 webpack 引导(bootstrap)）</li>
                    <li>这种方式比较常见于，只有一个入口起点（不包括 vendor）的单页应用程序(single page application)中</li>
                    <li>此设置允许你使用 CommonsChunkPlugin 从「应用程序 bundle」中提取 vendor 引用(vendor reference) 到 vendor bundle，并把引用 vendor 的部分替换为 __webpack_require__() 调用</li>
                    <li>如果应用程序 bundle 中没有 vendor 代码，那么你可以在 webpack 中实现被称为长效缓存的通用模式</li>
                </ul>
            </li>
            <li>
                <h6>多页面应用程序</h6>
                <pre>
webpack.config.js
const config = {
    entry: {
        pageOne: './src/pageOne/index.js',
        pageTwo: './src/pageTwo/index.js',
        pageThree: './src/pageThree/index.js'
    }
};
                </pre>
                <p>代码描述</p>
                <ul>
                    <li> webpack 需要 3 个独立分离的依赖图</li>
                    <li>在多页应用中，（译注：每当页面跳转时）服务器将为你获取一个新的 HTML 文档。页面重新加载新文档，并且资源被重新下载</li>
                    <li>使用 CommonsChunkPlugin 为每个页面间的应用程序共享代码创建 bundle。由于入口起点增多，多页应用能够复用入口起点之间的大量代码/模块</li>
                </ul>
            </li>
        </ul>
    </li>
</ul>
            `)
        },
        {
            active: false,
			name: '3 输出(output)',
            content: this.sanitizer.bypassSecurityTrustHtml(`
<h6>即使可以存在多个入口起点，但只指定一个输出配置</h6>
<ul>
    <li>
        <h6>用法(Usage)</h6>
        <p>在 webpack 中配置 output 属性的最低要求是，将它的值设置为一个对象</p>
        <ul>
            <li>filename 用于输出文件的文件名</li>
            <li>目标输出目录 path 的绝对路径</li>
        </ul>
        <pre>
webpack.config.js
const config = {
    output: {
        filename: 'bundle.js',
        path: '/home/proj/public/assets'
    }
};

module.exports = config;
        </pre>
        <p>代码描述</p>
        <p>此配置将一个单独的 bundle.js 文件输出到 /home/proj/public/assets 目录中</p>
    </li>
    <li>
        <h6>多个入口起点</h6>
        <p>如果配置创建了多个单独的 "chunk"（例如，使用多个入口起点或使用像 CommonsChunkPlugin 这样的插件），则应该使用占位符(substitutions)来确保每个文件具有唯一的名称</p>
        <pre>
{
    entry: {
        app: './src/app.js',
        search: './src/search.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    }
}
// 写入到硬盘：./dist/app.js, ./dist/search.js
        </pre>
    </li>
    <li>
        <h6>高级进阶</h6>
        <pre>
config.js
output: {
    path: "/home/proj/cdn/assets/[hash]",
    publicPath: "http://cdn.example.com/assets/[hash]/"
}
在编译时不知道最终输出文件的 publicPath 的情况下，publicPath 可以留空，并且在入口起点文件运行时动态设置
如果在编译时不知道 publicPath，你可以先忽略它，并且在入口起点设置 __webpack_public_path__
__webpack_public_path__ = myRuntimePublicPath
// 剩余的应用程序入口
        </pre>
    </li>
</ul>
            `)
        },
        {
            active: false,
			name: '4 模式(mode)',
            content: this.sanitizer.bypassSecurityTrustHtml(`
<h6>提供 mode 配置选项，告知 webpack 使用相应模式的内置优化</h6>
<ul>
    <li>
        <h6>用法</h6>
        <pre>
只在配置中提供 mode 选项
module.exports = {
    mode: 'production'
};
或者从 CLI 参数中传递
webpack --mode=production
        </pre>
        <p>语法说明</p>
        <ul>
            <li>
                <p>development</p>
                <span>会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin</span>
            </li>
            <li>
                <p>production</p>
                <span>会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.</span>
            </li>
        </ul>
        <p>记住，只设置 NODE_ENV，则不会自动设置 mode</p>
    </li>
    <li>
        <h6>mode: development</h6>
        <pre>
// webpack.development.config.js
module.exports = {
+   mode: 'development'
-   plugins: [
-       new webpack.NamedModulesPlugin(),
-       new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
-   ]
}
        </pre>
    </li>
    <li>
        <h6>mode: production</h6>
        <pre>
// webpack.production.config.js
module.exports = {
    +  mode: 'production',
    -  plugins: [
    -       new UglifyJsPlugin(/* ... */),
    -       new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
    -       new webpack.optimize.ModuleConcatenationPlugin(),
    -       new webpack.NoEmitOnErrorsPlugin()
    -  ]
}
        </pre>
    </li>
</ul>
            `)
        },
        {
            active: false,
			name: '4 loader',
            content: this.sanitizer.bypassSecurityTrustHtml(`
<h6>总结</h6>
<ul>
    <li>loader 用于对模块的源代码进行转换</li>
    <li>loader 可以使你在 import 或"加载"模块时预处理文件</li>
    <li>loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法</li>
    <li>loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL</li>
    <li>loader 甚至允许你直接在 JavaScript 模块中 import CSS文件</li>
</ul>
<ul>
    <li>
        <h6>示例</h6>
        <p>可以使用 loader 告诉 webpack 加载 CSS 文件，或者将 TypeScript 转为 JavaScript。为此，首先安装相对应的 loader</p>
        <pre>
npm install --save-dev css-loader
npm install --save-dev ts-loader
然后指示 webpack 对每个 .css 使用 css-loader，以及对所有 .ts 文件使用 ts-loader
webpack.config.js
module.exports = {
    module: {
        rules: [
            { test: /\.css$/, use: 'css-loader' },
            { test: /\.ts$/, use: 'ts-loader' }
        ]
    }
};
        </pre>
    </li>
    <li>
        <h6>使用 loader</h6>
        <p>在你的应用程序中，有三种使用 loader 的方式</p>
        <ul>
            <li>配置（推荐）：在 webpack.config.js 文件中指定 loader</li>
            <li>内联：在每个 import 语句中显式指定 loader</li>
            <li>CLI：在 shell 命令中指定它们</li>
        </ul>
    </li>
    <li>
        <h6>配置[Configuration]</h6>
        <p>module.rules 允许你在 webpack 配置中指定多个 loader</p>
        <pre>
module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                { loader: 'style-loader' },
                {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                }
            ]
        }
    ]
}
        </pre>
    </li>
    <li>
        <h6>内联</h6>
        <ul>
            <li>可以在 import 语句或任何等效于 "import" 的方式中指定 loader</li>
            <li>使用 ! 将资源中的 loader 分开</li>
            <li>分开的每个部分都相对于当前目录解析</li>
        </ul>
        <pre>
import Styles from 'style-loader!css-loader?modules!./styles.css';
通过前置所有规则及使用 !，可以对应覆盖到配置中的任意 loader
选项可以传递查询参数，
    例如 ?key=value&foo=bar，
或者一个 JSON 对象，
    例如 ?{"key":"value","foo":"bar"}

    尽可能使用 module.rules，因为这样可以减少源码中的代码量，并且可以在出错时，更快地调试和定位 loader 中的问题
        </pre>
    </li>
    <li>
        <h6>CLI</h6>
        <pre>
可以通过 CLI 使用 loader
webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
对 .jade 文件使用 jade-loader，对 .css 文件使用 style-loader 和 css-loader
        </pre>
    </li>
    <li>
        <h6>loader 特性</h6>
        <ul>
            <li>
                <span>oader 支持链式传递</span>
                <ul>
                    <li>能够对资源使用流水线(pipeline)</li>
                    <li>一组链式的 loader 将按照相反的顺序执行</li>
                    <li>loader 链中的第一个 loader 返回值给下一个 loader</li>
                    <li>在最后一个 loader，返回 webpack 所预期的 JavaScript</li>
                </ul>
            </li>
            <li>loader 可以是同步的，也可以是异步的</li>
            <li>loader 运行在 Node.js 中，并且能够执行任何可能的操作</li>
            <li>loader 接收查询参数。用于对 loader 传递配置</li>
            <li>loader 也能够使用 options 对象进行配置</li>
            <li>除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 package.json 里定义一个 loader 字段</li>
            <li>插件(plugin)可以为 loader 带来更多特性</li>
        </ul>
    </li>
    <li>
        <h6>解析 loader</h6>
        <ul>
            <li>loader 遵循标准的模块解析</li>
            <li>多数情况下，loader 将从模块路径（通常将模块路径认为是 npm install, node_modules）解析</li>
            <li>loader 模块需要导出为一个函数，并且使用 Node.js 兼容的 JavaScript 编写</li>
            <li>通常使用 npm 进行管理，但是也可以将自定义 loader 作为应用程序中的文件</li>
            <li>loader 通常被命名为 xxx-loader（例如 json-loader）</li>
        </ul>
    </li>
</ul>
            `)
        },
        {
            active: false,
			name: '5 插件(plugins)',
            content: this.sanitizer.bypassSecurityTrustHtml(`
<h6>插件目的在于解决 loader 无法实现的其他事</h6>
<ul>
    <li>
        <h6>剖析</h6>
        <ul>
            <li>webpack 插件是一个具有 apply 属性的 JavaScript 对象</li>
            <li>apply 属性会被 webpack compiler 调用，并且 compiler 对象可在整个编译生命周期访问</li>
        </ul>
        <pre>
ConsoleLogOnBuildWebpackPlugin.js

const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.run.tap(pluginName, compilation => {
            console.log("webpack 构建过程开始！");
        });
    }
}

compiler hook 的 tap 方法的第一个参数，应该是驼峰式命名的插件名称
建议为此使用一个常量，以便它可以在所有 hook 中复用
        </pre>
    </li>
    <li>
        <h6>用法</h6>
        <p>由于插件可以携带参数/选项，必须在 webpack 配置中，向 plugins 属性传入 new 实例</p>
        <pre>
配置
webpack.config.js

const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const path = require('path');

const config = {
    entry: './path/to/my/entry/file.js',
    output: {
        filename: 'my-first-webpack.bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({template: './src/index.html'})
    ]
};

module.exports = config;
        </pre>
    </li>
    <li>
        <h6>Node API</h6>
        <p>应该在配置中传入 plugins 属性。compiler.apply 并不是推荐的使用方式</p>
        <pre>
some-node-script.js

const webpack = require('webpack'); //访问 webpack 运行时(runtime)
    const configuration = require('./webpack.config.js');

    let compiler = webpack(configuration);
    compiler.apply(new webpack.ProgressPlugin());

    compiler.run(function(err, stats) {
        // ...
});

wepback 源码中隐藏有大量使用示例
        </pre>
    </li>
</ul>
            `)
        },
        {
            active: false,
            name: '6 配置(configuration)',
            content: this.sanitizer.bypassSecurityTrustHtml(`
<h6> webpack 的配置文件，是导出一个对象的 JavaScript 文件</h6>
<p>webpack 配置是标准的 Node.js CommonJS 模块</p>
<ul>
    <li>通过 require(...) 导入其他文件</li>
    <li>通过 require(...) 使用 npm 的工具函数</li>
    <li>使用 JavaScript 控制流表达式，例如 ?: 操作符</li>
    <li>对常用值使用常量或变量</li>
    <li>编写并执行函数来生成部分配置</li>
</ul>
<h6>不恰当的使用</h6>
<ul>
    <li>在使用 webpack 命令行接口(CLI)（应该编写自己的命令行接口(CLI)，或使用 --env）时，访问命令行接口(CLI)参数</li>
    <li>导出不确定的值（调用 webpack 两次应该产生同样的输出文件）</li>
    <li>编写很长的配置（应该将配置拆分为多个文件）</li>
</ul>
<ul>
    <li>
        <h6>基本配置</h6>
        <pre>
webpack.config.js

var path = require('path');

module.exports = {
    mode: 'development',
    entry: './foo.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'foo.bundle.js'
    }
};
        </pre>
    </li>
    <li>
        <h6>多个 Target</h6>
        <p>多种配置类型(configuration types)</p>
        <ul>
            <li>
                <h6>导出为一个函数</h6>
                <p>从 webpack 配置文件中导出一个函数。该函数在调用时，可传入两个参数</p>
                <pre>
环境对象(environment)作为第一个参数
一个选项 map 对象（argv）作为第二个参数(这个对象描述了传递给 webpack 的选项，并且具有 output-filename 和 optimize-minimize 等 key)

-module.exports = {
    + module.exports = function(env, argv) {
    +  return {
    +    mode: env.production ? 'production' : 'development',
    +    devtool: env.production ? 'source-maps' : 'eval',
            plugins: [
            new webpack.optimize.UglifyJsPlugin({
    +        compress: argv['optimize-minimize'] // 只有传入 -p 或 --optimize-minimize
            })
            ]
    +  };
};
                </pre>
            </li>
            <li>
                <h6>导出一个 Promise</h6>
                <p>webpack 将运行由配置文件导出的函数，并且等待 Promise 返回</p>
                <pre>
便于需要异步地加载所需的配置变量

module.exports = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                entry: './app.js',
                /* ... */
            })
        }, 5000)
    })
}
                </pre>
            </li>
            <li>
                <h6>导出多个配置对象</h6>
                <pre>
webpack 3.1.0 开始支持导出多个函数
导出多个配置对象，对于针对多个构建目标（例如 AMD 和 CommonJS）打包一个 library 非常有用

module.exports = [{
        output: {
            filename: './dist-amd.js',
            libraryTarget: 'amd'
        },
        entry: './app.js',
        mode: 'production',
    }, {
        output: {
            filename: './dist-commonjs.js',
            libraryTarget: 'commonjs'
        },
        entry: './app.js',
        mode: 'production',
}]
                </pre>
            </li>
        </ul>
    </li>
    <li>
        <h6>使用不同语言进行配置(configuration languages) - typeScript</h6>
        <ul>
            <li>webpack 接受以多种编程和数据语言编写的配置文件</li>
            <li>支持的文件扩展名列表，可以在 node-interpret 包中找到</li>
            <li>使用 node-interpret，webpack 可以处理许多不同类型的配置文件</li>
        </ul>
        <pre>
为了用 TypeScript 书写 webpack 的配置文件，必须先安装相关依赖
npm install --save-dev typescript ts-node @types/node @types/webpack

webpack.config.ts
import path from 'path';
import webpack from 'webpack';

const config: webpack.Configuration = {
    mode: 'production',
    entry: './foo.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'foo.bundle.js'
    }
};

export default config;
        </pre>
        <p>注意</p>
        <ul>
            <li>需要核对 tsconfig.json 文件</li>
            <li>如果 tsconfig.json 中的 compilerOptions 中的 module 字段是 commonjs ，则配置是正确的，否则 webpack 将因为错误而构建失败</li>
            <li>ts-node 不支持 commonjs 以外的任何模块语法</li>
            <li>
                <p>这个问题有两种解决方案</p>
                <ul>
                    <li>
                        <div>修改 tsconfig.json</div>
                        打开你的 tsconfig.json 文件并查找 compilerOptions。将 target 设置为 "ES5"，以及将 module 设置为 "CommonJS"（或者完全移除 module 选项）
                    </li>
                    <li>
                        <div>安装 tsconfig-paths</div>
                        安装 tsconfig-paths 包
                        <pre>
npm install --save-dev tsconfig-paths
                        </pre>
                    </li>
                </ul>
            </li>
            <li>
                <pre>
webpack 配置，专门创建一个单独的 TypeScript 配置

tsconfig-for-webpack-config.json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5"
    }
}

ts-node 可以使用 tsconfig-path 提供的环境变量来解析 tsconfig.json 文件

设置 tsconfig-path 提供的环境变量 process.env.TS_NODE_PROJECT

package.json
{
    "scripts": {
        "build": "TS_NODE_PROJECT=\"tsconfig-for-webpack-config.json\" webpack"
    }
}
                </pre>
            </li>
        </ul>
    </li>
</ul>
            `)
        },
        {
            active: false,
            name: '7 模块(modules)',
            content: this.sanitizer.bypassSecurityTrustHtml(`

            `)
        }
    ]

    constructor(
        public sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
    }

}
