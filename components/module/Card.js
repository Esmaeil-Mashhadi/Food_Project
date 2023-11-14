import Link from 'next/link';
import styles from "./Card.module.css"

//icons

import {MdLocationOn} from 'react-icons/md'


const Card = (props) => {
     const {id , name , price , discount , details } = props
    
  
    
    
    return (
        <div className={styles.container}>
            <img src={`/images/${id}.jpeg`}/>


            <div className={styles.name}>{name}</div>

            <div className={styles.money}>

            <div className={styles.location}> <MdLocationOn/>{details[0].Cuisine}</div>

             
            {discount ?  <span className={styles.pirceContainer}> 
            <span className={styles.disline}>  {price}$</span> {price * (100-discount)/100}$</span> 

             : <span className={styles.normalPrice}>{price}$</span>}

            {discount ? <div className={styles.tag}>{discount}% OFF</div> :null } 
            </div>

            <Link href={`/Menu/${id}`}>

                    <div className={styles.details}>
                        See Details
                    </div>
            
            </Link>


            
        </div>
    );
};

export default Card;