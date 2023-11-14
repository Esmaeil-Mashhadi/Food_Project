import { Schema, model, models } from "mongoose"



const foodModel = new Schema({
    email:{
        type:String,
        required :true
    },

    password:{
        type:String,
        required:true
    },
    createdAt:{
        type :Date,
        default :()=>Date.now(),
        immutable:true
    },
    ordered : {
        type:[Object],
        default :[]
    },
    history : {
        type:[Object],
        default : [] , 
    }
}, {timestamps:true})


const foodUser =  models.foodUser || model("foodUser" , foodModel)

export default foodUser