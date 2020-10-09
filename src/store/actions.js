import {ADD_COUNTER,ADD_TO_CART} from './mutation-type'

export default {
  // addCart(context,payload){ //payload新添加的商品
  //   // 1.查找之前数组中是否有该商品
  //   let oldProduct=context.state.cartList.find(item=>item.iid===payload.iid)
  //
  //   //2.判断oldProduct
  //   if(oldProduct){
  //     // oldProduct.count+=1
  //     context.commit(ADD_COUNTER,oldProduct)
  //   }else{
  //     payload.count=1
  //     // context.state.cartList.push(payload)
  //     context.commit(ADD_TO_CART,payload)
  //   }
  // }

  addCart(context,payload){ //payload新添加的商品
    // return new Promise((resovle,reject)=>{
    return new Promise((resovle)=>{
      let oldProduct=context.state.cartList.find(item=>item.iid===payload.iid)

      //2.判断oldProduct
      if(oldProduct){ //数量+1
        // oldProduct.count+=1
        context.commit(ADD_COUNTER,oldProduct)
        resovle('当前的商品数量+1')
      }else{ //添加新的商品
        payload.count=1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART,payload)
        resovle('添加了新的商品')
      }
    })
  }
}
