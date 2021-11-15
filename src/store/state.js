import { PLAY_MODE, SEARCH_KEY } from '@/assets/js/constant'
import { load } from '@/assets/js/array-store'

const state = {
  sequenceList: [],
  playList: [],
  playing: false,
  palyMode: PLAY_MODE.sequence,
  currentIndex: 0,
  fullScreen: false,
  // 初始化从本地读取
  favoriteList: [],
  searchHistory: load(SEARCH_KEY),
  playHistory: []
}

export default state
