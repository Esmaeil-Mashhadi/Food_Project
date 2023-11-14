const { default: mongoose } = require("mongoose");
async function connectDB(){
    if(mongoose.connections[0].readyState){
        return
    }mongoose.set("strictQuery" , false)
    mongoose.connect(process.env.MONGO_URI).then(result => console.log("connected to data base")).catch(err => console.log("failed to connect to data base"))
}


export default connectDB