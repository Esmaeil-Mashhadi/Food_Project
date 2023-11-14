import styles from './Notification.module.css'

const Nofication = ({message}) => {
    const {notStatus , notMessage} = message
    return (
        <div className={notStatus === "successful" ?styles.success : styles.fail}>
            {notMessage}
        </div> 
    );
};

export default Nofication;