import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lazyPlugin from 'vue3-lazy'
import loadingDirective from '@/components/base/loading/directive'
import noResultDirective from '@/components/base/no-result/directive'
import { load, saveAll } from '@/assets/js/array-store'
import { processSongs } from '@/service/song'
import { FAVORITE_KEY, PLAY_KEY } from '@/assets/js/constant'

// 引入全局样式文件
import '@/assets/scss/index.scss'

const favoriteSongs = load(FAVORITE_KEY)
if (favoriteSongs.length > 0) {
  processSongs(favoriteSongs).then((songs) => {
    store.commit('setFavoriteList', songs)
    saveAll(songs, FAVORITE_KEY)
  })
}

// 处理歌曲 url 过期问题：每次初始化时请求新的数据，并替换原有存储内容
const historySongs = load(PLAY_KEY)
if (historySongs.length > 0) {
  processSongs(historySongs).then((songs) => {
    // 提交 vuex 修改 state 数据
    store.commit('setPlayHistory', songs)
    // 更新本地存储
    saveAll(songs, PLAY_KEY)
  })
}

createApp(App).use(store).use(router).use(lazyPlugin, {
  loading: require('@/assets/images/default.png')
}).directive('loading', loadingDirective).directive('no-result', noResultDirective).mount('#app')
