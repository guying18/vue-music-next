<template>
  <div class="singer"
       v-loading="!singers.length">
    <index-list :data="singers" />
  </div>
</template>

<script>
import { getSingerList } from '@/service/singer.js'
import IndexList from '@/components/base/index-list/index-list.vue'
export default {
  name: 'singer',
  components: {
    IndexList
  },
  data () {
    return {
      singers: []
    }
  },
  async created () {
    const result = await getSingerList()
    this.singers = result.singers
    // console.log(result)
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
.singer {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 88px;
  bottom: 0;
}
</style>
