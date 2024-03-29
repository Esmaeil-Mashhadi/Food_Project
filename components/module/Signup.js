import styles from './Signup.module.css'

import {BsFillPatchExclamationFill} from 'react-icons/bs'
import{BsFillPatchCheckFill} from 'react-icons/bs'
import{AiFillEyeInvisible} from 'react-icons/ai'
import {AiFillEye} from 'react-icons/ai'


import Link from 'next/link';




const Signup = ({data , setData , changeHandler , focusHandler , signUpHanlder , errorMessages  }) => {
    
    const {email, password , confirmPassword ,  check , touch , eyeClick , linkClick} = data
    const {emailMessage , passwordMessage , confirmMessage} = errorMessages

    return (
        
        <div className={linkClick ? styles.transformContainer : styles.formSubContainer}>

        <h2>Sign up Form</h2>

      <div className={styles.formField}>
         <input autoComplete='email'  name='email'  id='email' value={email} onChange={changeHandler} onFocus={focusHandler} className={!emailMessage ? styles.emailChecked :null }  type='text'  required/>  
         <label htmlFor='email'>Email</label>  
         <div className={!emailMessage  ? styles.checkSvg  : touch.email ? styles.touched : styles.exSvg }> {!emailMessage  ? <BsFillPatchCheckFill/> : <BsFillPatchExclamationFill/>}  </div>
         <span className={styles.errorSpan}>{emailMessage && touch.email && `${emailMessage}`} </span>
     </div> 

     <div className={styles.formField}>
         <input id='input' name='password'  value={password} onChange={changeHandler} onFocus={focusHandler} className={!passwordMessage ? styles.passChecked : null} type={eyeClick ? "text" : "password"}  required/>  
         <label htmlFor='input'>password</label>  
         <div className={!passwordMessage ? styles.checkSvg  : touch.password ? styles.touched : styles.exSvg}> {!passwordMessage ? <BsFillPatchCheckFill/> :<BsFillPatchExclamationFill/>}  </div>
         <div onClick={()=> setData({...data , eyeClick : !eyeClick})} className={touch.password ? styles.eye : styles.defaultEye}> {eyeClick ? <AiFillEye/> : <AiFillEyeInvisible/> }</div>
         <span className={styles.errorSpan}>{passwordMessage && touch.password && `${passwordMessage}`} </span>

     </div> 

     <div className={styles.formField}>
         <input id='confirm' type='password' name='confirmPassword' value={confirmPassword} onChange={changeHandler} onFocus={focusHandler} className={!confirmMessage  ? styles.confirmed : null} required/>  
         <label htmlFor='confirm'>Confirm  password</label>
         <div className={!confirmMessage ? styles.checkSvg  : touch.confirmPassword ? styles.touched : styles.exSvg}> {!confirmMessage ? <BsFillPatchCheckFill/> :<BsFillPatchExclamationFill/>}  </div>
         <span className={styles.errorSpan}>{confirmMessage && touch.confirmPassword && `${confirmMessage}`} </span>


     </div>  
         <div className={styles.submition}>
             <div className={check ? styles.accepted :""}>Accept our terms and conditions</div>
                 <input className={styles.checkInput } type='checkbox' name='check' onChange={changeHandler} />
         </div>
 

     <div className={styles.signUp}>
         <Link onClick={()=>setData({...data , linkClick : !linkClick})} href="">Already Have an Account?</Link>
         <button className={Object.keys(errorMessages).length ? styles.fadeButton :""}  onClick={signUpHanlder}>signIn</button>        
     </div> 
    </div> 
    );
};

export default Signup;
