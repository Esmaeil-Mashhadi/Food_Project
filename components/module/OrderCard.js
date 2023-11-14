import styles from './OrderCard.module.css'

import {BiSolidDish} from "react-icons/bi"
import {FaMoneyBillWave} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {RiShoppingCartFill} from 'react-icons/ri'
import {IoTrashBinSharp} from 'react-icons/io5'


import Link from 'next/link'


const OrderCard = ({product  , cancelHandler , checkout}) => {

    const {id , name , price , discount , details , quantity } = product
    const finishedPrice = (price * (100-discount)/100)
    const progressString = localStorage.getItem("inProgress") ||JSON.stringify({progress:false})
    const{progress} =  JSON.parse(progressString) 

    return (
        <div className={styles.cardContainer}>
          <div className={styles.food}>
            <Link className={styles.imageLink} title='watch Product '  href={`/Menu/${product.id}`}>
              <img src={`/images/${id}.jpeg`}/>
            </Link>

          <div className={styles.money}>
            <h4><BiSolidDish/> {name}</h4>
            <div className={styles.location}><MdLocationOn/>{details[0].Cuisine}</div>
            {discount ? 
              <div className={styles.priceContainer}>
                <p className={styles.disline}><FaMoneyBillWave/> {price}</p> 
                <p className={styles.discountPrice}>{finishedPrice}$</p>
                {quantity > 1 && <p><span>* {quantity} = {(finishedPrice * quantity).toFixed(2)}$</span></p>}
              </div>
              : <div className={styles.normalPrice}> <FaMoneyBillWave/> {quantity == 1 ? <p>{price} $</p> : <p>{price}*{quantity} = {price*quantity} $</p> }</div>}
              <div>
              {quantity > 1 && <p className={styles.amount}> <RiShoppingCartFill/> amount : {quantity}</p>}
              </div>

              <button  id={product.id} disabled = {progress && checkout} onClick={cancelHandler} className={progress && checkout ? styles.disabled :styles.cancel}>
              <IoTrashBinSharp/> <p>cancel order</p> 
             </button>
          </div>


          
          </div>
        </div>
    );
};

export default OrderCard;