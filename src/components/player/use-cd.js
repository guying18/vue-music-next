import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'

export default function useCd () {
  const cdRef = ref(null)
  const cdImageRef = ref(null)

  const store = useStore()
  const playing = computed(() => store.state.playing)

  const cdCls = computed(() => {
    // 仅添加此动态 .playing 属性的话，暂停播放时图片会恢复初始角度
    return playing.value ? 'playing' : ''
  })

  // 需 watch playing 的状态，在暂停时修改相关 DOM 节点的旋转角度
  watch(playing, (newPlaying) => {
    if (!newPlaying) {
      syncTransform(cdRef.value, cdImageRef.value)
    }
  })

  function syncTransform (wrapper, inner) {
    const wrapperTransform = getComputedStyle(wrapper).transform
    const innerTransform = getComputedStyle(inner).transform
    // 内部图片是相对于父节点的旋转，要保持同步，需叠加外层和内层的旋转角度
    wrapper.style.transform = wrapperTransform === 'none'
      ? innerTransform : innerTransform + wrapperTransform
    // 角度叠加也可采用 concat，用空格隔开， 是为了让矩阵叠加；
    // ? innerTransform : innerTransform.concat('', wrapperTransform)
  }

  return { cdCls, cdRef, cdImageRef }
}
