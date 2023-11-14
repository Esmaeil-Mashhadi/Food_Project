import { useSession } from 'next-auth/react'
import styles from './Details.module.css'

//icons
import {FaMoneyBillWave} from 'react-icons/fa'
import {MdOutlineMenuBook} from 'react-icons/md'
import {AiFillWarning} from 'react-icons/ai'

import { useContext, useEffect,  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add } from '@/redux/orderReducer'
import toast, { Toaster } from 'react-hot-toast'
import { appContext } from '../layout/Layout'
import { Hourglass} from 'react-loader-spinner'
import {updateTotal} from '@/helpers/updateLocalStorage'


const DetailsPage = ({food}) => {
    const {id , name , price , discount , introduction , details , ingredients , recipe} = food
    const finalPrice = (price)*(100-discount)/100
    
    const [showPop , setShowPop] = useState(false)
    const [sendData, setSendData] = useState(false)
    let [quantity , setQuantity] = useState(1)
    const orderDate = new Date().toLocaleString()
    const {status} = useSession()
    
 
 const [checkout , setCheckout] = useState(false)

   const {totalOrder , totalPrice } = useSelector(item => item.order)
  const {refresh , setRefresh  } = useContext(appContext)
  
   const dispatch  = useDispatch() 
   
   const confirmHandler = async()=>{
     setSendData(true)
       dispatch(add({...food , quantity})) 
       setShowPop(false)
     
    }


   

  
    useEffect(()=>{

      const progressString = localStorage.getItem('inProgress')
      const{progress} = JSON.parse(progressString) || false
       setCheckout(progress)
      async function fetching(){
        const res = await fetch("/api/product" , {
          method:"POST" , body : JSON.stringify({food , quantity , orderDate}) , headers :{"Content-Type" :"Application/json"}
         })
         const result = await res.json()

         if(result.status == "success"){ 
          const updated = updateTotal(food, totalOrder , totalPrice , quantity)
          if(updated) setRefresh(!refresh)
          toast.success('successfully added to the cart')

         }else{
          console.log(result);
          toast.error("failed to add product to the cart")
          
         }}
         if(sendData){
           fetching()
         }

    },[sendData ,totalOrder]) 

    return (
        <div className={showPop ? styles.overlay : styles.container}>
          
            <div className={styles.top}>

              <div className={styles.imageContaienr}>
              <img src={`/images/${id}.jpeg`} />  
              {discount ? <span className={styles.off}> %{discount} OFF </span> :""}
              {status === "authenticated"  ? !checkout && <button onClick={()=> setShowPop(true)}> <MdOutlineMenuBook/> order food</button> : <div className={styles.sign2see}>sign up for ordering food<AiFillWarning/></div>} 
              {checkout  && (<div className={styles.preventOrder}> 
                <Hourglass width="20px"  colors={['rgb(231, 94, 94)']} /> cant order food during preperation ! <Hourglass colors={['rgb(231, 94, 94)']} width='20px'/></div>)}

              </div>
       
              </div>
               <div className={styles.subcontainer}> 

              <p className={styles.intro}>{introduction}</p>

              <h2>details</h2>

              <ul className={styles.topDetails}>
                <li className={styles.key}><p >name</p> : {name}</li>
                <li  className={styles.key}><p>price</p> : <span className={discount ? styles.lineThrough :""}>{price} $ </span>  
                {discount ? <span className={styles.discount}>{(price)*(100-discount)/100} $</span> :""}</li>
              </ul>
              
              {details.map((item , index)=> <ul key={index}> <li 
                className={styles.key}> <p>{Object.keys(item)} </p> : <span>{Object.values(item)}</span>  </li> 
                 </ul>

               )}
               
               </div>

                <div className={styles.details}>
                    <h2>Ingredients</h2>
                    <ul>
                        {ingredients.map((item , index) => <li key={index}>
                            <p>{item}</p>
                        </li>)}
                    </ul>

                </div>
              
                <div className={styles.recipe}> 

                   <h2>Recipe</h2>
              {recipe.map((item , index)=> <div key={index} className={index % 2 ? styles.oddback : styles.evenback}><span> {index+1} </span> {item} </div>)}


                </div>
              
              {showPop && 
              <div className={styles.popUp}>
                <h1>Confirm to set the order</h1>
                <h4> <span>food</span> : {name}</h4>
                <h4> <span>Preparation Time</span> : {details[3]["Preparation Time"]}</h4>
                <h4 className={styles.pricePop}><FaMoneyBillWave/> <span>Price</span> : <p className={!discount == 0 ? styles.lineThrough : ""}> 
                 {price * quantity} $</p> {!discount == 0 && <p>{(finalPrice*quantity).toFixed(2)} $</p>} </h4>
                

                <div className={styles.countContainer}>

                <h4><span>Number of orders :</span></h4>
        
                <button onClick={()=> setQuantity(quantity += 1)}>+</button>
                <span>{quantity}</span>
                <button onClick={()=>{
                  if(quantity>1){
                    setQuantity(quantity -= 1)
                  }
                }}>-</button>
                </div>

                <div className={styles.confirmContainer}>
                <button onClick={confirmHandler}>Confirm</button>
                <button onClick={()=> {setShowPop(false)}}>cancel</button> 
                </div>
                
              </div>}


           <Toaster />
         

        </div>
    );
};

export default DetailsPage;