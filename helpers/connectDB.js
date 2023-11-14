const { default: mongoose } = require("mongoose");
async function connectDB(){
    if(mongoose.connections[0].readyState){
        return
    }mongoose.set("strictQuery" , false)
    mongoose.connect(process.env.TEST_URI).then(result => console.log("connected to test"))
}

export default connectDB