import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart(context, payload) {
    // payload新添加的商品
    // 方法一：
    /*  let oldProduct = null
     for (let item of state.cartList) {
       if (item.iid === payload.iid) {
         oldProduct = item
       }
     }
     // 2.判断oldProduct
     if (oldProduct) {
       oldProduct.count += 1
     } else {
       payload.count = 1
       state.cartList.push(payload)
     } */

    //  方法二：
    /* let index = state.cartList.indexOf(payload)
    if (index === -1) {
      let oldProduct = state.cartList[index]
      oldProduct.count += 1
    } else {
      payload.count = 1
      state.cartList.push(payload)
    } */

    //  方法三：find函数
    return new Promise((resolve, reject) => {
      // 1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      // 2.判断oldProduce
      if (oldProduct) { // 数量+1
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前的商品数量+1')
      } else { // 添加新的商品
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })
  }
}
