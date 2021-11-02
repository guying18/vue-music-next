import axio from 'axios'

const ERR_OK = 0
const baseURL = '/'

axio.defaults.baseURL = baseURL

// 封装 get 请求
export function get (url, params) {
  return axio.get(url, { params })
    .then((res) => {
      // console.log(res)
      const serverData = res.data
      if (serverData.code === ERR_OK) {
        return serverData.result
      }
    }).catch((e) => {
      console.log(e)
    })
}
