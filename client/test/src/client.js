//client.js

import { createApp } from './app'

// 客户端特定引导逻辑……
const { app } = createApp(syncData);
app.$mount('#app')