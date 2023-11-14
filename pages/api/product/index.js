import connectDB from "@/helpers/connectDB";
import foodUser from "@/models/userModel";
import { getSession } from "next-auth/react";

async function handler(req , res){


if(req.method =="POST"){
        try {
    
            await connectDB()
            const session = await getSession({req})
            const {email} = session.user
            
            const {food, quantity , orderDate} = req.body
            food.quantity = quantity
            food.orderDate = orderDate
            const checkUser = await foodUser.findOne({email})
               
            if(!checkUser.email){
               return res.status(404).json({
                statusCode: 404 , 
                data: {
                    message: "user not found register first"
                }
               })
            }

            const same = checkUser.ordered.find(item => item.id == food.id)
   
            if(same){
                const newQuantity = same.quantity + food.quantity
                const updateSame = await foodUser.updateOne({'ordered.id' : food.id}, {$set:{'ordered.$.quantity': newQuantity}})
                if(updateSame.modifiedCount == 0){
                    return res.status(500).json({
                        statusCode:500 , 
                        data:{
                            message:"failed to update order"
                        }
                    })
                }
                return res.status(200).json({
                    statusCode:200,
                    status:"success",
                    data: {
                        message:"updated successfully"
                    }
                })
            }

            const result = await foodUser.updateOne({email} , {$push : {ordered : food}} ,{upsert:true})

            if(result.modifiedCount == 0 ){
                return res.status(500).json({
                    statusCode: 500, 
                    data:{
                        message:"something went wrong , try again"
                    }
                })
            }

            return res.status(200).json({
                statusCode:200,
                status:"success", 
                data : {
                    message :"order updated successfully"
                }
            })


        } catch (error) {
           console.log(error);
        }

    }

if(req.method == "GET"){
    try {
        await connectDB()
        const session = await getSession({req})
        const {email} = session.user
        const products = await foodUser.find({email} , {ordered :1 , history:1 , _id:0 })


        if(!products) return res.status(404).json({
            statusCode: 404 , 
            data : {
                message:"failed to find orders"
            }
            })
       
    return res.status(200).json({
        statusCode : 200 , 
        data : {
            products
        }
    })
        
    } catch (error) {
        console.log(error);
    }
}


}


export default handler