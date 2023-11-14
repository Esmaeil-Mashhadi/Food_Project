import styles from './MenuPage.module.css'
import Card from "../module/Card";

const MenuPage = ({data}) => {

    return (
        <div className={styles.container}>
           {data.map(item=> <Card key={item.id} {...item}/>)} 
        </div>
    );
};

export default MenuPage;


