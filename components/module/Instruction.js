import styles from './Instruction.module.css'
function Instruction() {
  return (
    <div className={styles.container}>
      <h3>How to Order?</h3>
      <ul>
        <li>Sign in (or create an account) and set your delivery address.</li>
        <li>Go to details page to see order </li>
        <li>Select your items and tap “order Food”.</li>
        <li>To see your order, go  to “profile” in  “orders”.</li>
        <li>Track your order progress.</li>
        <li>when progress bar completed your order is ready</li>
      </ul>
    </div>
  );
}

export default Instruction;
