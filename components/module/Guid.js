import Link from "next/link";
import styles from './Guid.module.css'
function Guide() {
  return (
    <div className={styles.container}>
      <Link href="/Menu">Menu</Link>
      <Link href="/category">Categories</Link>
      <Link href="/Register">Sign up</Link>
      <Link href="/">Discount</Link>
    </div>
  );
}

export default Guide;
