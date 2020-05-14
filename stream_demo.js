// node 有好几个流, 有的可读, 有的可写
// Transform 可以用来转换, 简单来说就是可以读, 并且对读的内容进行处理, 然后可以写
const { Transform } = require('stream')

const log = console.log.bind(console)

// 实现 Transform 的方式一般有两种
// 如果使用继承的方式, 必须实现 _transform 方法
// 如果通过构造函数调用, 必须传入 transform 方法(注意, 没有下划线)
const demo1 = () => {
        class MsqTransform extends Transform {
        constructor(options) {
            super(options)
        }
        _transform(chunk, encoding, callback) {
            // chunk 是读取的内容, buffer 内容, 调用 toString 方法会转成字符串
            let s = chunk.toString()
            // this.push 是一个套路方法, 可以理解为想输出什么就 push 什么
            // 不用纠结 缓冲区 这样的概念
            this.push(s)
            // 调用 callback 也是一个套路做法
            callback()
        }
    }

    let t = new MsqTransform()
    t.write('hello msq')
    let a = t.read()
    log('demo1', a.toString())
}

// 通过构造函数调用和定义子类的方式差不多, 主要差别是 transform 方法不加下划线
const demo2 = () => {
    let t = new Transform({
        transform(chunk, encoding, callback) {
            let s = chunk.toString()
            this.push(s)
            callback()
        }
    })
    t.write('hello msq')
    log('demo2', t.read().toString())
}

if (require.main === module) {
    demo1()
    demo2()
}