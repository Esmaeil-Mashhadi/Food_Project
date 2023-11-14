import styles from './register.module.css'
import { useEffect, useState } from 'react';
import Nofication from '@/helpers/Nofication';

//helpers

import validate from '@/helpers/Validation';
import {signIn} from 'next-auth/react'
// icons

import { useRouter } from 'next/navigation';
import Signup from '../module/Signup';
import Login from '../module/Login';

const SignUp = () => {

    const router= useRouter()
    
    const [data , setData] = useState({
        email:"",
        password:"",
        loginPassword:"",
        confirmPassword:"",
        check :false,
        validEmail : false,
        validPassword: false,
        validConfirm : false,
        touch : {
            email : false,
            password:false,
            confirmPassword:false,
        },
        signBoolean : true,
        Message:{
            notMessage :'',
            notStatus: ''
        },
        eyeClick : false,
        linkClick : false
    })

    const [showNot , setShowNot] = useState(false)

    const {email, password,check ,emailStatus,
          passwordStatus,confirmStatus,touch
          ,signBoolean, Message } = data
        
        const {validationResult} = validate(data)


    const changeHandler = (e)=>{

        if(e.target.name === "check"){
            setData({
                ...data , check :e.target.checked
            })
        } else{
             setData({
        ...data , [e.target.name] : e.target.value
      }) 
        }


    }

    const focusHandler = (e)=>{
       
      setData({...data , touch :{...touch ,[e.target.name] : true}})
       
    }

    const signUpHanlder = async(event)=>{
        event.preventDefault() 
        const res = await fetch("/api/register", {
            method :"POST" , body : JSON.stringify({email , password}) , headers :{'Content-Type': 'application/json'  }
        })

        const result = await res.json()
        setData({...data , Message :{notMessage : result.message , notStatus : result.status}})

        setTimeout(() => {
            setData({...data , Message :{notMessage : false}})
            if(result.status === "successful"){
                 setData({...data , linkClick : true})
            }  
        }, 2000);
    }
  
    const LoginHandler = async ()=>{
        setShowNot(true)
   
        const res = await signIn('credentials' , {
            email , password , redirect :false
        })

        
        if(res.status == 200){
            setData({...data , Message:{notMessage : "welcome 🤗" , notStatus:"successful"}})
            setTimeout(() => {
                router.push("/")
            }, 3000);
        }else {
            setData({...data ,Message : {notMessage :res.error , notStatus:"failed"}})
        }

  
    }

    
    useEffect(()=>{
         
       setData({...data , 
        validEmail : emailStatus  === "valid",
        validPassword:passwordStatus === "valid",  
        validConfirm : confirmStatus ==="valid",
        signBoolean : !!Object.keys(validationResult).length})  

  
   },[emailStatus , passwordStatus , confirmStatus , check , signBoolean ])    
 
   useEffect(()=>{
   
        setTimeout(() => {
            setShowNot(false)
        }, 5000);
    
   },[showNot])

    return (

   <div className={styles.wholeContainer}> 

         <div className={ styles.container}>

         <img className={styles.mainImage} src='/images/register.jpg' />
         <img className={styles.mobileImage} src='/images/mobile.png' />

            <Signup data= {data}  setData={setData} changeHandler = {changeHandler} focusHandler = {focusHandler}
             errorMessages ={validationResult} signUpHanlder = {signUpHanlder}/>

            <Login data= {data}  setData={setData} changeHandler = {changeHandler} focusHandler = {focusHandler}
             errorMessages ={validationResult} LoginHandler = {LoginHandler}/>
    
        </div>

        {Message.notMessage &&  showNot && 
          <div className={styles.notContainer}>
        <Nofication message ={Message}/>
         </div>
        }
       
       </div>
    );
};

export default SignUp;