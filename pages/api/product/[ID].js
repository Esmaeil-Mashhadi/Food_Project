import connectDB from "@/helpers/connectDB";
import foodUser from "@/models/userModel";
import mongoose from "mongoose";
import { getSession } from "next-auth/react";

async function handler(req , res){
    if(req.method == "DELETE"){
        
   const {ID} = req.query
   try {

    const session = await getSession({req})
        
    if(!session){
        return res.status(400).json({
            message :"you are not authorize for this action register first"
        })
    }

    const {email} = session.user
    const product = await foodUser.findOne({email})
    if(!product){
        return res.status(404).json({
            message: "could'nt find the product"
        })
    }

    const findPulled = await foodUser.findOne(
        { 'ordered.id': +ID },
        { 'ordered.$': 1 },
      );
  
      const {ordered} = findPulled
      const [data] = ordered.map(item => {
        return {
            price : item.price,
            quantity: item.quantity,
            discount : item.discount
        }
      })
    
    const result = await foodUser.updateOne({email} , {$pull:{'ordered' :{id:+ID}}}) 
  
    if(result.modifiedCount  == 0){
        return res.status(500).json({
            message:"failed to cancel order , something went wrong"
        })
    }

    return res.status(200).json({
        message :"order cancelled successfully",
        data 
    })

    
   } catch (error) {
    console.log(error);
   }
}

if(req.method  == "POST"){
    try {
            await connectDB()
            const {ID} = req.query
            const data = req.body
            const historyResult = await foodUser.updateOne({'ordered.id' : +ID} , {$push : {history : data}})
            const {ordered} = await foodUser.findOne({'ordered.id' : +ID})

            const [orderDetail] = ordered.map(item => {
                return { price :item.price , discount: item.discount , quantity: item.quantity }
            })
            
            await foodUser.updateOne({'ordered.id' : +ID} , {$pull : {ordered : {id : +ID}}})

            if(!historyResult) return res.status(500).json({status:500 , data :{message:"failed to complete order"}})
            if(historyResult){
                return res.status(200).json({
                    statusCode:200,
                    data: {
                        orderDetail,
                        message:"ordered completed successfully"
                    }
                })
            }


    } catch (error) { 
      console.log(error);
    }
}
}




export default handler