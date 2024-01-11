import MenuPage from '@/components/templates/MenuPage';
import { FoodData } from '@/data/jsonFiles';


const Menu = () => {
    return (
        <div>
            <MenuPage data ={FoodData}/>
        </div>
    );
};

export default Menu;

//just show casing how would ssg and ssr works with serverless data
