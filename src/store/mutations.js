import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  /* addCart(state, payload) {
     let oldProduct = state.cartList.find(item => item.iid === payload.iid)
     if (oldProduct) {
       oldProduct.count += 1
     } else {
       payload.count = 1
       state.cartList.push(payload)
     }
   } */

  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}
