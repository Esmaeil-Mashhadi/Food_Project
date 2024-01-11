import DetailsPage from "@/components/templates/DetailsPage";
import { FoodData } from "@/data/jsonFiles";
import { useRouter } from "next/router";

const Detail = () => {
    const router = useRouter()
    const data = FoodData.find(item => item.id == router.query.ID)
    
    return (
        <div>
        {data && <DetailsPage food = {data}/>}
        </div>
    );
};

export default Detail;


