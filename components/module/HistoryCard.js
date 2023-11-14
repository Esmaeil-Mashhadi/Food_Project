import Link from 'next/link';
import styles from './history.module.css'


import {BiSolidDish} from "react-icons/bi"
import {FaMoneyBillWave} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {RiShoppingCartFill} from 'react-icons/ri'
import {FaRegCalendarTimes} from 'react-icons/fa'

const HistoryCard = ({product}) => {
    const {id , name , price , discount , details , quantity , orderDate } = product
    const finishedPrice = (price * (100-discount)/100)

    console.log(discount);

    const [date , time] = orderDate.split(',')
    
    return (
     <div className={styles.cardContainer}>
          <div className={styles.food}>

            <Link className={styles.imageLink} title='watch Product '  href={`/Menu/${product.id}`}>
              <img src={`/images/${id}.jpeg`}/>
            </Link>

              <div className={styles.money}>

               <div className={styles.left}>
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
              </div>
                
                  <div className={styles.ordertime}>
                        <h3> <FaRegCalendarTimes/> reserved time </h3>
                        <p> Date: {date}</p>
                        <p>time: {time} </p>
                  </div>
              </div>

          </div>
    </div>

    );
};

export default HistoryCard;
