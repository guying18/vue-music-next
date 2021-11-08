import { useStore } from 'vuex'
import { computed, watch, ref } from 'vue'
import { getLyric } from '@/service/song'
import Lyric from 'lyric-parser'

export default function useLyric ({ songReady, currentTime }) {
  const currentLyric = ref(null)
  const pureMusicLyric = ref(0)
  const currentLineNum = ref(0)
  const playingLyric = ref('')
  const lyricScrollRef = ref(null)
  const lyricListRef = ref(null)

  const store = useStore()
  const currentSong = computed(() => store.getters.currentSong)

  watch(currentSong, async (newSong) => {
    if (!newSong.url || !newSong.id) {
      return
    }
    // 切歌时重置归零，防止 get 请求歌词和 audio 的 canplay 这两个异步事件造成的逻辑混乱
    stopLyric()
    currentLyric.value = null
    currentLineNum.value = null
    pureMusicLyric.value = ''
    playingLyric.value = ''

    const lyric = await getLyric(newSong)
    store.commit('addSongLyric', {
      song: newSong,
      lyric
    })
    // 如果频繁切歌，而请求 lyric 是异步操作，会发生歌曲和歌词不同步，故需要判断一下
    if (currentSong.value.lyric !== lyric) {
      // debugger 测试会不会出现此情况
      return
    }
    // 使用'lyric-parser'
    currentLyric.value = new Lyric(lyric, handleLyric)
    const hasLyric = currentLyric.value.lines.length
    if (hasLyric) {
      if (songReady.value) {
        playLyric()
      }
    } else {
      playingLyric.value = pureMusicLyric.value = lyric.replace(/\[(\d{2}):$1:$1\]/, '')
    }
  })

  function handleLyric ({ lineNum, txt }) {
    currentLineNum.value = lineNum
    playingLyric.value = txt
    const scrollComp = lyricScrollRef.value
    const listEl = lyricListRef.value
    if (!listEl) {
      return
    }
    if (lineNum > 5) {
      const lineEl = listEl.children[lineNum - 5]
      scrollComp.scroll.scrollToElement(lineEl, 1000)
    } else {
      scrollComp.scroll.scrollTo(0, 0, 1000)
    }
  }

  function playLyric () {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.seek(currentTime.value * 1000)
    }
  }

  function stopLyric () {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.stop()
    }
  }

  return {
    currentLyric,
    pureMusicLyric,
    playingLyric,
    currentLineNum,
    playLyric,
    stopLyric,
    lyricScrollRef,
    lyricListRef
  }
}
