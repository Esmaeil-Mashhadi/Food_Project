import { useEffect,  useState } from 'react';
import styles from './Category.module.css'
import { useRouter } from 'next/router';

//icons
import{AiFillCaretDown} from 'react-icons/ai'
import {BiSearchAlt} from "react-icons/bi"
import {AiOutlineCheckCircle} from 'react-icons/ai'
import Card from '../module/Card';

const CategoryPage = ({data}) => {


    const [difEmpty , setDifEmpty] = useState(true)
    const [timeEmpty , setTimeEmpty] = useState(true)
    const [difToggle , setDifToggle] = useState(false)
    const [timeToggle , setTimeToggle] = useState(false)
    const [searchToggle , setSearchToggle] = useState(false)
    const [query , setQuery] = useState({difficulty:"" , time:""})

    const [difCheck , setDifCheck] = useState({

        Easy:false,
        Medium:false,
        Hard:false,

    })

    const [timeCheck, setTimeCheck] = useState({
        more:false,
        less:false
    })


  
    const {Easy , Medium, Hard} = difCheck
    const {more , less} = timeCheck
   
    const router = useRouter()
    

    const difCheckHandler = (e)=>{
        const {name} = e.target
        setDifCheck({
            Easy : name === "Easy" ,
            Medium:name === "Medium" ,
            Hard:name === "Hard" 
        })

        setQuery({
            ...query,
            difficulty : name
        })

        setDifEmpty(false)
      
    }


   
    const toggleDifficulty = (e)=>{
      setDifToggle(!difToggle)
      setDifCheck(false)   
      setDifEmpty(true)
       setQuery({
        ...query , 
        difficulty :""
       })

    }
    
    
    
    const timeCheckHandler = (e)=>{
      const{name} = e.target
      
      setTimeCheck({
        more: name === "more" ,
        less: name === "less" 
      });
      
      setQuery({
        ...query,
        time:name
      })
      
      setTimeEmpty(false)
      
    }
    
    
    const toggleTimeHanlder = ()=>{ 
      setTimeCheck(false)
      setTimeToggle(!timeToggle)
      setTimeEmpty(true)

      setQuery({
        ...query , 
        time :""
       })
      
    }
      

   const searchHandler = ()=>{
     setSearchToggle(true)
    router.push({
        pathname:"/category",
        query
    })
   }



   useEffect(()=>{
     router.push({
      pathname:"/category",
      query
     })

    
    },[]) 
    
    
    return (
        
        <>
        <div className={styles.Container}>

        <div className={styles.buttonContainer}>
       
            <div  className={styles.selectContainer}>

            <button  className={styles.diff} onClick={toggleDifficulty}>
            difficulty <AiFillCaretDown/>
           </button>

            <div className={styles.difOptions}>

            <button disabled={!difToggle} onClick={difCheckHandler} name ="Easy" className={ difToggle ? styles.move : styles.hidden}>
             Easy {Easy && <AiOutlineCheckCircle/>} 
           </button>

           <button disabled={!difToggle} onClick={difCheckHandler} name ="Medium" className={ difToggle ? styles.move : styles.hidden}>
             Medium  {Medium && <AiOutlineCheckCircle/>}
           </button>
           <button disabled={!difToggle} name ="Hard" onClick={difCheckHandler} className={ difToggle ? styles.move : styles.hidden}>
             Hard  {Hard && <AiOutlineCheckCircle/>}
           </button>
            </div>
        

            </div>

            <div className={styles.timeContainer}>
                <button className={styles.time} onClick={toggleTimeHanlder}>
                  Cooking Time <AiFillCaretDown/>
                </button>

                <div className={styles.timeOptoins}>

                 <button disabled={!timeToggle} name='more' onClick={timeCheckHandler} className={timeToggle ? styles.timeMove :styles.hideTime}>
                    more than 30 minutes {more && <AiOutlineCheckCircle/>}
                </button>

                <button disabled={!timeToggle} name='less' onClick={timeCheckHandler} className={timeToggle ? styles.timeMove :styles.hideTime}>
                    less than 30 minutes {less && <AiOutlineCheckCircle/>}
                </button>
                </div>

            
            </div>
             <button className={!difEmpty || !timeEmpty ? styles.search :styles.fade} disabled={!difEmpty || !timeEmpty ? false : true} onClick={searchHandler} > Search <BiSearchAlt/></button>
            
         </div>

         {!searchToggle && <img className={styles.searchImage} src='./images/search.png' /> }

          {searchToggle &&    <div className={styles.resultContainer}>
        {data.map(item=> <Card key={item.id} {...item} />)}
        </div>}
        
        </div>

       
     </>
    );
};

export default CategoryPage;