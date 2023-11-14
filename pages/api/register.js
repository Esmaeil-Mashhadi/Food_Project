import { hashing } from "@/helpers/apiFunctions"
import connectDB from "@/helpers/connectDB"
import foodUser from "@/models/userModel"


 async function handler (req, res){
    
    if(req.method !== "POST")
    return 

  try {
    await connectDB()
    const {email , password} = req.body
  
    if(!email || !password){
      res.send({status:"failed" , message:"Please enter valid data"})
    }
    
    const user = await foodUser.findOne({email})
    if(user){
      return res.send({status:400 , message :"User already exist"})
    }

    const hashedPassword =  await hashing(password)
    await foodUser.create({
      email : email,
      password : hashedPassword,
    })

    return res.send({status:"successful" , message:"Welcome ! ,  Please login to confirm"})



  } catch (error) {
    throw new Error ('failed to connect to data base')
  }
    
}


export default handler