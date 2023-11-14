
import {BsFillRocketTakeoffFill} from 'react-icons/bs'
import {IoMdRestaurant} from 'react-icons/io'
import {TbHandFinger} from 'react-icons/tb'
import {BsFillClockFill} from 'react-icons/bs'
import styles from './Attribute.module.css'

function Attributes() {
  return (
    <div className={styles.container}>
      <h3>Why us?</h3>
      <div className={styles.subContainer}>

        <div className={styles.fast}>
          <BsFillRocketTakeoffFill />
          <p>Fast</p>
        </div>

        <div className={styles.restaurant}>
          <IoMdRestaurant/>
          <p>Best Restaurants</p>
        </div>

        <div className={styles.choice}>
          <TbHandFinger />
          <p>Your Choice</p>
        </div>

        <div className={styles.clock}>
          <BsFillClockFill />
          <p>24-7</p>
        </div>
      </div>
    </div>
  );
}

export default Attributes;