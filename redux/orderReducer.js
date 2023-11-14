const { createSlice } = require("@reduxjs/toolkit");
const { useReducer } = require("react");

const initialState = {
    ordered :[],
    totalOrder : 0,
    totalPrice :0,
    
}
 function sum(item){
 const totalOrder =  item.reduce((total , product) => {
   return total += product.quantity
 }, 0)

 const totalPrice =  item.reduce((total , product) => {
   const {discount , quantity , price} = product
    if(discount){
      return    total += ((price * (100 - discount)/100 )*quantity)
        
    }
     return  total += (price * quantity)
 }, 0)


 return {totalOrder , totalPrice}
}
  

const orderSlice = createSlice({
    name:"orderFood",
    initialState,
    reducers: {
      add: (state, action) => {
        
        const sameIndex = state.ordered.findIndex(
          (item) => item.id === action.payload.id
        );


       
        if (sameIndex == -1) {
          const firstOrder =  [...state.ordered, action.payload]
          const {totalOrder , totalPrice} = sum(firstOrder)
            return {
            ...state,totalOrder , totalPrice,
            ordered : firstOrder
          };

        } else {
          const updatedItem = {
            ...state.ordered[sameIndex],
            quantity: action.payload.quantity + state.ordered[sameIndex].quantity
          };
  
          const updatedOrdered = [
            ...state.ordered.slice(0, sameIndex),
            updatedItem,
            ...state.ordered.slice(sameIndex + 1)
          ];


         
          const {totalOrder , totalPrice} = sum(updatedOrdered)
        
          return {
            ...state, totalOrder , totalPrice,
            ordered: updatedOrdered
          };
        }

          },

        remove : (state , action)=>{
           const remainItems = state.ordered.filter(item => item.id !== action.payload.id)
           const{totalOrder , totalPrice} = sum(remainItems)

           return {
            ...state , ordered : remainItems , totalOrder , totalPrice
           }
        }
    }
})




export default orderSlice.reducer
export const{add , increase , decrease , remove} = orderSlice.actions