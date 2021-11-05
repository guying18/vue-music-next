export function shuffle (source) {
  // 复制数组，防止修改原数组
  const arr = source.slice()
  for (let i = 0; i < arr.length; i++) {
    const j = getRandomInt(i)
    swap(arr, i, j)
  }
  return arr
}
// 获取 0~max 之间随机整数的函数
function getRandomInt (max) {
  return Math.floor(Math.random() * (max + 1))
}
// 交换 arr[i] 和 arr[j] 的函数
function swap (arr, i, j) {
  const t = arr[i]
  arr[i] = arr[j]
  arr[j] = t
}
