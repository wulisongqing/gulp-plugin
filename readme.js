// 如果用 yarn install 安装依赖失败, 可以考虑使用 cnpm 来安装
// https://npm.taobao.org/
// 1, 先按照 https://npm.taobao.org/ 教程按照 cnpm 模块
// 2, 然后输入 cnpm install 来安装依赖
// 3, 因为不使用默认的gulpfile，可以用gulp -f gulpfile.babel.js来编译；（用yarn run xxx 或者gulp 默认是用gulpfile，对gulp的原理不是很熟悉的话，也可以gulp对比看看build目录下的一些差异）

// gulp 插件其实就是函数, 接收输入, 处理数据, 产生输出
// 只不过通常输入和输出都是文件

// 我们会实现一个自定义的 gulp 插件: gulp-msq
// 这个插件的作用就是会在文件最后一行添加 msq 注释
// 比如 js 文件就添加 // msq
// css 文件就添加 /* msq */
// 其他文件就添加 # msq

