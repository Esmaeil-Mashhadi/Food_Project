import Link from "next/link";
import styles from "./Layout.module.css"
import MobileNavbar from "../module/MobileNavbar";
import { useSession } from "next-auth/react";

//icons
import {MdFastfood} from 'react-icons/md'
import {ImProfile} from 'react-icons/im'
import {BiSolidCategoryAlt} from 'react-icons/bi'
import {SiHomeassistantcommunitystore} from 'react-icons/si'
import { createContext, useEffect, useState } from "react";

export const appContext = createContext()

const Layout = ({children}) => {

    const {status} = useSession()
    let [quantity , setQuantity] = useState()
    const[refresh , setRefresh] = useState(false)
    const [checkout , setCheckout] = useState(false)

     
    const contextValue = {
        refresh , setRefresh , checkout , setCheckout 
    }

    useEffect(()=>{
        async function gettingProduct(){
            const res = await fetch("/api/product") 
            const {data : {products}} = await res?.json()
            const [finalData] = products
            const {ordered} = finalData || {ordered :[]}
            setQuantity(ordered.length)
        }
          gettingProduct() 
 
    },[refresh]) 
    
    
    return (
        <div className={styles.layoutContainer}>

            <header className={styles.head} >
        
             <div className={styles.headSubContainer}>

                 <div className={styles.left}>
                    <MdFastfood/>
                    Esi Food
                 </div>

                <div className={ styles.right} >
                    <Link href="/"><SiHomeassistantcommunitystore/>Home</Link>
                    <Link href="/category"> <BiSolidCategoryAlt/>Category</Link>
                    {status === 'authenticated' ? <Link href="/Profile"> <ImProfile/>Profile {!quantity == 0 && <span className={styles.number}>{quantity}!</span>}</Link>:<Link href="/Register">Sign Up</Link>}
                    
                </div>

                <div className={styles.mobileNavbar}>
                    <MobileNavbar quantity={quantity}/>
                </div>
             </div>
        
            </header>

                <div className={styles.childs}>

                <appContext.Provider value={contextValue}>
                {children}
                </appContext.Provider>

                </div>

            <footer className={styles.footer}>
                <p>&copy; 2023 Esi Food. All rights reserved</p>
            </footer>
        </div>
    );
};

export default Layout;