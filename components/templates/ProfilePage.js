import React, {  useContext, useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Order from '../module/Order';
import styles from './ProfilePage.module.css'

//icons 
import {CgProfile} from 'react-icons/cg'
import {RiHistoryFill} from 'react-icons/ri'
import {MdOutlineMenuBook} from 'react-icons/md'
import {MdShoppingCartCheckout} from 'react-icons/md'
import {AiFillWarning} from 'react-icons/ai'

import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import {  Hourglass } from 'react-loader-spinner';
import { appContext } from '../layout/Layout';
import HistoryCard from '../module/HistoryCard';
import  { reDefineTheLocalStorage } from '@/helpers/updateLocalStorage';



const ProfilePage = ({email}) => {

    const router= useRouter()
    const {show} = router.query
    const session = useSession()

    let totalOrder , totalPrice , ordered 
   

    const [dbOrdered , setDbOrdered] = useState([])
    const [history , setHistory] = useState([])
    const [localTotal , setLocalTotal] = useState()
  

    const {checkout , setCheckout , refresh , setRefresh }  = useContext(appContext)
    
    
    const data = useSelector(item => item.order)

    totalOrder =    localTotal?.localTotalOrder ||data.totalOrder
    totalPrice =    localTotal?.localTotalPrice || data.totalPrice
    ordered = dbOrdered
    

    const checkoutHandler = ()=>{ 
        localStorage.setItem('inProgress' , JSON.stringify({progress : true}))
        setCheckout(true)
        
        toast("thank you for the purchase , wait until the preperation timer complete" , {
            duration:6000,
        })
    }
 
    
    useEffect(()=>{

        if(session.status === 'unauthenticated'){
            router.push("/")
        }
     
       },[session.status])         

    useEffect(()=>{  
        const invalidValues = [undefined , null , NaN , "" , " " , 0 ]  

        async function gettingProduct(){

            const res = await fetch("/api/product") 
            
            const {data : {products}} = await res?.json()
            const [finalData] = products
            const {ordered , history} = finalData || {ordered : [] , history : []}  

            

            if( typeof localTotal == 'undefined' || Object.values(localTotal).includes(invalidValues)){
                const result = reDefineTheLocalStorage(ordered) 
                setRefresh(result) 
            } 

            setDbOrdered(ordered)
            setHistory(history)
        }
      
          gettingProduct()

       return ()=>{
            setRefresh(false)
        }
    },[refresh])  

     

    useEffect(()=>{    
        try {
            const totalString = localStorage.getItem('total')   
            const localTotal= JSON?.parse(totalString) || {}
            setLocalTotal(localTotal) 
              
        } catch (error) { 
            console.log(error);
        }
    },[refresh])  

  

    return (
        <div>
            {session.status == ("unauthenticated" || "loading") ? (<h1>Loading ...</h1>) : (<div className={styles.container}>
            
            <div className={styles.form}>
              <div className={styles.profile}>
                    <CgProfile/>
                    <p>{email}</p>
                    <button onClick={()=> signOut()}>Log out</button>
              </div> 
            </div>
            
            <div className={styles.linkContainer}>

            <Link href={{pathname:'/Profile' , query:{show:"history"}}}> <RiHistoryFill/>history</Link>
            <Link href={{pathname:'/Profile'}}><MdOutlineMenuBook/> orders</Link>

            </div>
            <div className={styles.orders}>

            {ordered && show !== 'history' &&
                 <div className={styles.ordered}>
                     {ordered.map((item , index)=>{
                        return  <Order key={index} checkout={checkout} refresh ={refresh}  setRefresh = {setRefresh} setCheckout={setCheckout} product={item}/>
                     })}</div>}


                {history && show == "history" &&
                 <div className={styles.history}>{
                     history.map((item , index)=>{
                     return <HistoryCard key={index} product={item} />
                 })
                 }
                 </div>} 
              </div>
              {checkout && <p className={styles.warning}> <span><AiFillWarning/>Warning! <AiFillWarning/> </span> Leaving this page or going offline will temporarily suspend your order.</p>}
         
        
            {ordered && ordered.length && show !== 'history'?
                <div className={styles.checkoutContainer}>
                   <div>total order :<p>{totalOrder}</p> </div>
                   <div>total Price : <p>{totalPrice} $</p></div>

                   <button disabled ={checkout} onClick={checkoutHandler}>
                   {checkout ? <div className={styles.loading}>making it ready <Hourglass  width={'20px'} height={'15px'} colors="black" /> </div> 
                   :<div><MdShoppingCartCheckout/>Check out</div> }</button>
        
             </div> : show !="history" && <div className={styles.noOrder}>
               no order yet , <Link href="/Menu"  > click here to order food </Link>  
               </div>}

               {!history.length && show == 'history' && <div className={styles.noHistory}> there is no order yet</div>}

              
            </div>)}
           <Toaster/>
            
            
        </div>
    );
};



export default ProfilePage;

  