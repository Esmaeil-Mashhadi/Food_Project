import DetailsPage from "@/components/templates/DetailsPage";
import { FoodData } from "@/data/jsonFiles";

const Detail = ({data}) => {
    return (
        <div>
            <DetailsPage food = {data}/>
        </div>
    );
};

export default Detail;

export async function getStaticPaths(){
    const data = FoodData.slice(0, 10);

    const paths = data?.map(item=>  ({
        params :{ID : item?.id.toString()}
    }))


    return{
        paths,
        fallback: false
    }
   
}



export async function getStaticProps(context){

     const {params} = context
     const data = FoodData.find(item => item.id == params.ID)
     return{
        props:{
           data     
        }
     }
}


