import CategoryPage from "@/components/templates/CategoryPage";
import { FoodData } from "@/data/jsonFiles";
import { getFoodData } from "@/utils/dataHelper";
import { useRouter } from "next/router";

const Category = () => {
    const router = useRouter()
   const {difficulty , time} = router.query
    const data =  getFoodData(difficulty , time)
    return (
        <div>
            <CategoryPage data= {data} />
        </div>
    );
};

export default Category;

