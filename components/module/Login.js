import styles from './login.module.css'

import {BsFillPatchExclamationFill} from 'react-icons/bs'
import{BsFillPatchCheckFill} from 'react-icons/bs'
import{AiFillEyeInvisible} from 'react-icons/ai'
import {AiFillEye} from 'react-icons/ai'
import Link from 'next/link'


const Login = ({data , setData , changeHandler , focusHandler , LoginHandler , errorMessages}) => {

    const {email,password  ,touch  , 
        eyeClick , linkClick} = data

        const {emailMessage , passwordMessage } = errorMessages
        return ( 
        <div className={ linkClick ? styles.formLogContainer : styles.transformContainer}> 
         <h2>Hey 👋, Welcome Back</h2>
         
      <div className={styles.formField}>
         <input  name='email' id='loginEmail' value={email} onFocus={focusHandler}  onChange={changeHandler} className={!emailMessage ? styles.emailChecked :null }  type='text'   required/>  
         <label htmlFor='LoginEmail'>Email</label>
         <div className={!emailMessage  ? styles.checkSvg  : touch.email ? styles.touched : styles.exSvg }> {!emailMessage  ? <BsFillPatchCheckFill/> : <BsFillPatchExclamationFill/>}  </div>
     
     </div>   
     
     <div className={styles.formField}>
         <input  id='passInput' name='password' value={password}   onChange={changeHandler} onFocus={focusHandler}  type={eyeClick ? "text" : "password"}  className={!passwordMessage ? styles.passChecked : null} required/>  
         <label htmlFor='passInput'>password</label>
         <div className={!passwordMessage ? styles.checkSvg  : touch.password ? styles.touched : styles.exSvg}> {!passwordMessage ? <BsFillPatchCheckFill/> :<BsFillPatchExclamationFill/>}  </div>
         <div onClick={()=> setData({...data , eyeClick : !eyeClick})} className={touch.password ? styles.eye : styles.defaultEye}> {eyeClick ? <AiFillEye/> : <AiFillEyeInvisible/> }</div>
     
     </div>   
         
     <div className={styles.login}>
    <Link onClick={()=>setData({...data , linkClick : !linkClick})} href="">Don't have an account?</Link>
    <button onClick={LoginHandler}  disabled={emailMessage || passwordMessage} className={passwordMessage || passwordMessage ? styles.fadeButton :""}>
       Log In</button>

     </div>
       </div>
    );
};

export default Login;