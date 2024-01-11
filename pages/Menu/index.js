import MenuPage from '@/components/templates/MenuPage';
import { FoodData } from '@/data/jsonFiles';


const Menu = ({data}) => {
    return (
        <div>
            <MenuPage data ={data}/>
        </div>
    );
};

export default Menu;

//just show casing how would ssg and ssr works with serverless data
export async function getStaticProps(){
    const data = FoodData
    
return{
    props:{data},
    revalidate:10,
}
}