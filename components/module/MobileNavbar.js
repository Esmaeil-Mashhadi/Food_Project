import { useState } from 'react';
import {FaHamburger} from 'react-icons/fa'
import {ImCross} from 'react-icons/im'
import styles from './MobileNavbar.module.css'
import Link from 'next/link';



const MobileNavbar = ({quantity}) => {

    const [touched , settouched] = useState(false)

    const navHandler = ()=>{
            settouched(!touched)
    }
    return (

        <>
          <button onClick={navHandler} className={styles.hamMenu}>
                   <span>Menu</span> {touched ?  <ImCross style={{scale: "1"}}/> : <FaHamburger />}
         </button>

           <div className={touched ? styles.show : styles.hide} >
                    <Link onClick={()=> settouched(false)} href="/">Home</Link>
                    <Link onClick={()=> settouched(false)} href="/category">Category</Link>
                    <Link onClick={()=> settouched(false)} href="/Register">Sign Up</Link>
                    <Link onClick={()=> settouched(false)} href="/Profile">Profile</Link>

            {quantity  ? <div className={styles.hamQuantity}>{quantity}</div> : null}
            
            </div>

            {quantity && !touched ? <div className={styles.quantity}>{quantity}</div> : null}
        </>
     
    );
};

export default MobileNavbar;