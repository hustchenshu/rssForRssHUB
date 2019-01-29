
const path = require('path')
module.exports = {
    mode:'development',
    watch: false,
    output: {
        server:{
            // 为了以 CommonJS2 规范导出渲染函数，以给采用 Node.js 编写的 HTTP 服务调用
            libraryTarget: 'commonjs2',
            // 把最终可在 Node.js 中运行的代码输出到一个 bundle_server.js 文件
            filename: `${path.basename(__dirname)}.server.bundle.js`,
            // 输出文件都放到 dist 目录下
            path: path.resolve(__dirname, './dist'),
        },
        client:{
            filename: `${path.basename(__dirname)}.client.bundle.js`,
            path: path.resolve(__dirname, '../../public'),
        }
    },
}
// 可配置项：
// const workePath = process.cwd();
// const path = require('path')
// module.exports = {
//     entry:{
//         client:path.join(workePath,'./src/client.js'),   浏览器端入口
//         server:path.join(workePath,'./src/server.js')    服务器端入口
//     },
//     mode:'production',   打包模式：生产（production）/开发(development)
//     watch: false,        是否开启watch模式
//     output:{
//         服务端输出打包文件配置
//         server:{
//             // 为了以 CommonJS2 规范导出渲染函数，以给采用 Node.js 编写的 HTTP 服务调用
//             libraryTarget: 'commonjs2',
//             // 把最终可在 Node.js 中运行的代码输出到一个 bundle_server.js 文件
//             filename: 'server.bundle.js',
//             // 输出文件都放到 dist 目录下
//             path: path.join(workePath, './dist'),
//         },
//          客户端输出打包文件配置
//         client:{
//             filename: 'client.bundle.js',
//             path: path.join(workePath, './dist'),
//             publicPath: './dist/'
//         }
//     },
// }