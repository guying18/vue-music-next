<template>
  <div class="singer"
       v-loading="!singers.length">
    <index-list :data="singers"
                @select="selectSinger"></index-list>
    <router-view v-slot="{ Component }">
      <transition appear
                  name="slide">
        <component :is="Component"
                   :data="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { getSingerList } from '@/service/singer.js'
import IndexList from '@/components/index-list/index-list.vue'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'

export default {
  name: 'singer',
  components: {
    IndexList
  },
  data () {
    return {
      singers: [],
      seletedSinger: null
    }
  },
  async created () {
    const result = await getSingerList()
    this.singers = result.singers
    // console.log(result)
  },
  methods: {
    selectSinger (singer) {
      this.seletedSinger = singer
      this.catchSinger(singer)
      this.$router.push({
        path: `/singer/${singer.mid}`
      })
    },
    catchSinger (singer) {
      storage.session.set(SINGER_KEY, singer)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
