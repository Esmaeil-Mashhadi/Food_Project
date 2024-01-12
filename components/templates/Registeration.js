import styles from './register.module.css'
import { useEffect, useState } from 'react';

//helpers

import validate from '@/helpers/Validation';
import {signIn} from 'next-auth/react'
// icons

import { useRouter } from 'next/navigation';
import Signup from '../module/Signup';
import Login from '../module/Login';
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {

    const router= useRouter()
    
    const [data , setData] = useState({
        email:"",
        password:"",
        loginPassword:"",
        confirmPassword:"",
        check :false,
        touch : {
            email : false,
            password:false,
            confirmPassword:false,
        },
        eyeClick : false,
        linkClick : false
    })



    const {email, password,touch} = data
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
        if(result.status == 200){
            toast.success('welcome , Login to confirm')
            setTimeout(() => {
                setData({...data , linkClick : true})
            }, 2000);
        }else{
            toast.error(result.message)
        }

    }
  
    const LoginHandler = async ()=>{
        const res = await signIn('credentials' , {
            email , password , redirect :false
        })

        if(res.status == 200){
            toast.success("welcome back") 
        }else {
           toast.error(res.error)
        }
    }

    

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

       <Toaster />
       </div>
    );
};

export default SignUp;