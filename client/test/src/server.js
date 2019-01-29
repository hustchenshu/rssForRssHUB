import { createApp } from './app'
// 这里改为接受一个参数，根据其url确定router-view的初始渲染组件
let createVue = syncData => {
    return new Promise((resolve, reject) => {
        const { app} = createApp(syncData);
        resolve(app)
    })
}
export { createVue }