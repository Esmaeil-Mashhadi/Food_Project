import { FoodData } from "@/data/jsonFiles"

 export function getFoodData(difficulty , time){


     const result = FoodData.filter(item=> {

        const Details = item.details

        const diffResult = Details.filter(item => item.Difficulty === difficulty)
  
    
        const timeResult = Details.filter(item => { 
        
            const cookingTime = item["Cooking Time"] || "" ; 
                 
    
            const [timeDetail] = cookingTime.split(" "); 
  
            if(time === "less"  && timeDetail && +timeDetail <= 30){
                
                return item
               
            } else if(time ==="more" && timeDetail && +timeDetail >30){
              return item
             
            }
                
        })
    
         
        if ( timeResult.length && diffResult.length && difficulty && time) {
            return item;
          } else if(!timeResult.length && difficulty&& diffResult.length && !time){
          return item;
        } else if (!difficulty && timeResult.length){
            return item
        }   
     })
       
     return result
     
}