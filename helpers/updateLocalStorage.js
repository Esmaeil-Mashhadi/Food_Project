
const updateTotal = (food, totalOrder , totalPrice , quantity)=>{
    const { price , discount} = food
    const finalPrice = (price)*(100-discount)/100

    const totalString = localStorage.getItem('total')
    const totalLocalValue = JSON.parse(totalString) || {}

    let totalObject

    if(Object.keys(totalLocalValue).length && !Object.values(totalLocalValue).includes([undefined , NaN ,"NaN" , null])){
      const {localTotalOrder , localTotalPrice} = totalLocalValue || {localTotalOrder : 0 , localTotalPrice : 0}
      
       totalObject = {
       'localTotalOrder' : quantity + Number(localTotalOrder),
       'localTotalPrice' : ((finalPrice * quantity) + Number(localTotalPrice)).toFixed(2)
      }
    
    }else{
      totalObject = {
       'localTotalOrder': totalOrder,
       'localTotalPrice': totalPrice.toFixed(2)
     } 
    } 

    localStorage.setItem('total' , JSON.stringify(totalObject))
    return true
   } 
 
const reDefineTheLocalStorage =  (ordered)=>{
    let result = {} 
  
    if(ordered?.length){
      console.log(ordered);
      ordered.reduce((acc,  curr)=>( 
             result.localTotalOrder = acc + curr.quantity  
      ), 0)  


     const priceSum =  ordered.map(item => {
      if(item.discount){
       return  ((item.price)*(100 - item.discount)/100)*item.quantity
      }else{
        return  (item.price)*item.quantity
      }
      
     }).reduce((acc , curr)=> { return acc += curr}, 0)

     result.localTotalPrice = priceSum.toFixed(2)
    


     

       localStorage.setItem('total', JSON.stringify(result))
       return true
    }
}

export {
    updateTotal,
    reDefineTheLocalStorage
}