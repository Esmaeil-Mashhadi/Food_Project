import styles from "./Companies.module.css"

import {BsApple} from 'react-icons/bs'
import {SiBinance} from 'react-icons/si'
import {SiSpacex} from 'react-icons/si'
import {SiTesla} from 'react-icons/si'

function Companies() {
  return (
    <div className={styles.container}>
      <BsApple/>
      <SiBinance/>
      <SiSpacex/>
      <SiTesla/>
    </div>
  );
}

export default Companies;
