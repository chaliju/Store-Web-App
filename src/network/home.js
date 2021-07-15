// 封装首页数据的请求(因为可能会有多个请求，方便统一管理)
import {
  request
} from "./request"

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: 'home/data',
    params: {
      type,
      page
    }
  })
}

/* // 函数调用 -> 压入函数栈（保存函数调用过程中所有变量）
// 函数调用结束 -> 弹出函数栈（释放函数所有的变量）
function test() {
  const names = ['clj', 'wch']
}

test() */

/* // 把数组里的数据塞到另一个数组中
const totalNums = []

const nums1 = [20, 11, 222]
const nums1 = [22, 33, 444]

// for (let n of nums) {
//   totalNums.push(n)
// }



totalNums.push(...num1) */
