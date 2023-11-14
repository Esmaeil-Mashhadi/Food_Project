import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Order.module.css'
import OrderCard from './OrderCard';
import { remove } from '@/redux/orderReducer';
import toast from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';





const Order = ({product ,  checkout  , setCheckout , refresh , setRefresh }) => {


     const result = product?.details?.[3]["Preparation Time"] || ""
     
     const [cookingTime] = result.split(' ')  
     const step = cookingTime * 60
  
    let [cooking , setCooking] = useState(()=>{
      const savedCookingTime = localStorage.getItem(`${product.id}`);
      const progressString = localStorage.getItem("inProgress") || JSON.stringify({progress:false})
      const{progress} =  JSON.parse(progressString) 
  
      if(savedCookingTime){
            if(progress){
              setCheckout(true)
            }
         const {newcooking} =JSON.parse(savedCookingTime)   
        
         return newcooking
      }else {
        setCheckout(false)
        return step
      } 
    })

    
    let [number , setNumber] = useState(()=>{
      const localDegree = localStorage.getItem(`${product.id}(degree)`)
      if(localDegree){
        const {degree} = JSON.parse(localDegree)
        
        return degree
      }else{ 
        return 1
      }
    }) 


    const [clickId , setClickId] = useState(false) 
    const dispatch = useDispatch()

    const Hour = Math.floor(cooking/3600) 
    const minutes = Math.floor(cooking/60)

      
    const updateLocalStorage = (data)=>{
      const {quantity , price , discount} = data

      localStorage.removeItem(`${product.id}`)
      localStorage.removeItem(`${product.id}(degree)`)

      let finishedPrice =  (price * quantity) * (100 - discount )/100 
      const totalString = localStorage.getItem('total') || JSON.stringify({})
      const {localTotalOrder , localTotalPrice} = JSON.parse(totalString)
      const newTotalOrder = localTotalOrder - quantity || 0
      const newTotalPrice = Number(localTotalPrice) - finishedPrice || 0

      
      localStorage.setItem('total' , JSON.stringify({localTotalOrder : newTotalOrder , localTotalPrice : newTotalPrice.toFixed(2)}))
      setRefresh(!refresh)
     
    }



  const cancelHandler = (e)=>{
      const ID = e.currentTarget.id
    if(ID == product.id ){
    
       setClickId(ID)
       const deleteProduct = async()=>{
        const res= await fetch(`/api/product/${ID}` , {
           method :"DELETE" 
         })
         const {data} = await res.json()
         updateLocalStorage(data)

         if(res.status == 200){
          toast.success("product removed successfully")
         }
       }
        setTimeout(() => {
            dispatch(remove(product))
            deleteProduct()
          }, 500);

    }}

   

  const finished = async()=>{
    axios.post(`/api/product/${product.id}` , {...product})
    .then(res => {
     const data = res.data
     if(data.statusCode == 200){
      toast.success(data.data.message) 
      const audio = new Audio('/sounds/bell.mp3')
      setRefresh(!refresh)
      audio.play()
      const {orderDetail} = data.data
      updateLocalStorage(orderDetail)
    } 
    }).catch(err => {
      if(err) toast.error('internal server error try again')
    })
    
   }


   useEffect(()=>{
     const progressString = localStorage.getItem("inProgress") || JSON.stringify({progress:false})
     const{progress} =  JSON.parse(progressString) 
     localStorage.setItem(`${product.id}`  ,  JSON.stringify({newcooking : cooking}))
     localStorage.setItem(`${product.id}(degree)`, JSON.stringify({degree : number}))  
      if(checkout && progress ){ 
          
        const interval = setInterval(() => {
            setNumber((prevNumber)=> prevNumber + (360/step))
            setCooking((prevNumber)=> prevNumber - 1)
        },1000);

    
      
        if(cooking == 0){ 
          clearInterval(interval)
            localStorage.removeItem(`${product.id}`)
            localStorage.removeItem(`${product.id}(degree)`)
            localStorage.setItem("inProgress" , JSON.stringify({progress:false}))
            setCheckout(false)
            finished()
         
          } 
          return ()=> clearInterval(interval)  
        
      } 

    },[checkout , cooking]) 





    return (
      <div className={styles.orderContainer}>
    
              <div className={` ${clickId == product.id ? styles.transfer : `${styles.orderSubContainer}`}`}>
          
              <OrderCard product = {product} checkout = {checkout}  cancelHandler={cancelHandler}/>
  
              <div className={styles.circleContainer}>
                  <h4>Preparation Time</h4>
                  <div className={styles.circle} style={{background : `conic-gradient(chartreuse ${number}deg , palevioletred ${5}deg)`}}>
                  <div>
                    {cooking > 3600 ? ( <p>{Hour} hours</p> ) 
                    : cooking > 60 ? (<p> {minutes}minutes</p>)
                      :cooking !== 0 ? (<p>{cooking} seconds</p>) : "" } 
                  
                   {cooking == 0 && <p>Ready</p>}
                  </div>
                  </div>
             
              </div>
          </div>
          <ToastContainer/>
          </div>
      )};

export default Order;