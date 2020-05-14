// 一般写 gulp 插件会用 through2 或者 through 这两个库,
// API 更加丰富, 使用更加方便
// 但是我们的需求很简单, 用 node 原生的 Transform 就可以
const { Transform } = require('stream')

// fs.createReadStream(xxx).pipe(fs.createWriteStream())

const log = console.log.bind(console)

const contentForFile = (file) => {
    // buffer 转 string 是调用 toString 方法
    let content = file.contents.toString()
    // .js
    let extension = file.extname.slice(1)
    let s = ''
    if (extension === 'js') {
        s = content + '\n' + '// msq'
    } else if (extension === 'css' || extension === 'scss') {
        s = content + '\n' + '/* msq */'
    } else {
        s = content + '\n' + '# msq'
    }
    // file.contents 是一个 buffer 类型, 所以把字符串转成 buffer
    let b = Buffer.from(s)
    return b
}

const msq = (options) => {
    let t = new Transform({
        // 套路, 直接使用就可以
        objectMode: true,
        transform(file, encoding, callback) {
            // gulp 用 vinyl(https://github.com/gulpjs/vinyl) 来管理文件, 这是一个虚拟文件格式
            // file 就是 Vinyl 类的实例
            // 常用的属性有这么几个
            // contents, 文件的内容, 通常是 buffer 类型
            // path, 文件的绝对路径
            // extname, 文件的扩展名

            // 因为插件只是修改文件内容, 不会修改文件路径, 所以只需要设置 contents 属性的值
            file.contents = contentForFile(file)
            // 这是输出对象所有 key 和 value 的写法
            // Object.entries 参考 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
            Object.entries(file).forEach(([k, v]) => {
                log(`(${k}) is (${v})`)
            })
            // node 回调的常见写法, null 表示没有报错
            // 第二个参数是 file, 通常我们会修改 file 的 contents
            return callback(null, file)
        },
    })
    return t
}

module.exports = msq