import { PLAY_MODE } from '@/assets/js/constant'

const state = {
  sequenceList: [],
  playList: [],
  playing: false,
  palyMode: PLAY_MODE.sequence,
  currentIndex: 0,
  fullScreen: false,
  favoriteList: []
}

export default state
