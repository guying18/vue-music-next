<template>
  <div class="search-input">
    <i class="icon-search"></i>
    <!-- input 输入内容绑定的是 query -->
    <input class="input-inner"
           v-model="query"
           :placeholder="placeholder">
    <i class="icon-dismiss"
       v-show="query"
       @click="clear"></i>
  </div>
</template>

<script>
import { debounce } from 'throttle-debounce'

export default {
  name: 'search-input',
  props: {
    // 父子组件双向绑定的是 modelValue 这个 prop
    modelValue: String,
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  data () {
    return {
      query: this.modelValue
    }
  },
  created () {
    this.$watch('query', debounce(300, (newQuery) => {
      this.$emit('update:modelValue', newQuery.trim())
    }))

    this.$watch('modelValue', (newVal) => {
      this.query = newVal
    })
  },
  // watch: {
  //   // watch 内部无法添加 debounce 函数
  //   query (newQuery) {
  //     this.$emit('update:modelValue', newQuery.trim())
  //   }
  // }
  methods: {
    clear () {
      this.query = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

.search-input {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 32px;
  background: $color-highlight-background;
  border-radius: 6px;
  .icon-search {
    font-size: 24px;
    color: $color-text-d;
  }
  .input-inner {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: $color-highlight-background;
    color: $color-text;
    font-size: $font-size-medium;
    outline: 0;
    &::placeholder {
      color: $color-text-d;
    }
  }
  .icon-dismiss {
    font-size: 16px;
    color: $color-text-d;
  }
}
</style>
