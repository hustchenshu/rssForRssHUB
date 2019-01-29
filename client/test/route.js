const path = require('path')
var axios = require("axios")
const { createRenderer } = require('vue-server-renderer')
const rssConfig = require("../../common/rss.config").default
const Api = require("../../common/api/index")
/**
 *获取直出页面
 *
 * @param {Vue实例} vm
 * @param {上下文对象} context
 * @param {html模板} tpl
 *  context.head：（字符串）将会被作为 HTML 注入到页面的头部 (head) 里。
    context.styles：（字符串）内联 CSS，将以 style 标签的形式注入到页面头部。注意，如过你使用了 vue-loader + vue-style-loader 来处理组件 CSS，此属性会在构建过程中被自动生成。
    context.state：（对象）若使用了vuex，则用于初始 Vuex store 状态，将以 window.__INITIAL_STATE__ 的形式内联到页面。内联的 JSON 将使用 serialize-javascript 自动清理，以防止 XSS 攻击。
 * @returns html直出页面内容
 */
exports.getVueSyncPage = function(vm, context, tpl) {
    const renderer = createRenderer({
        template: tpl,
    })
    return renderer.renderToString(vm, context)
}


/**
 * express路由支持vue ssr 示例
 *
 * @param {*} req
 * @param {*} res
 */
exports.route = async function(req, res) {

    const tpl = require('fs').readFileSync(path.resolve(__dirname, './tpl.html'), 'utf-8');
    console.log("test")
    const serverBundle = require(path.resolve(__dirname, `./dist/${path.basename(__dirname)}.server.bundle.js`));
    // 这里添加syncData的url属性来确定router-view的初始渲染组件
    const url = rssConfig[0].src;
    // self.selected = 0;
    // const value = await Api.getContent(url);
    const syncData = {
        rssConfig,
        rss:rssConfig[0].rss
        // result:value
    }
    const context = {
        title: 'ALL IN ONE',
        // 直出数据注入脚本，该数据作为浏览器端创建vue实例的参数，必须在clientScript之前挂载
        syncDataScript: `<script> window.syncData = ${JSON.stringify(syncData)}</script>`,
        // 注入浏览器端js打包文件，实现数据、事件绑定
        clientScript: `<script src="./public/${path.basename(__dirname)}.client.bundle.js"></script>`,
    }
    serverBundle.createVue(syncData).then((vm) => {
        context.state = syncData.state;
        this.getVueSyncPage(vm, context, tpl).then((html) => {
            res.send(html);
        });
    })
}