const mongoose=require("mongoose")
const conectDB=async()=>{
    try{
        await mongoose.connect(process.env.DB_URI)
    }
    catch(err){
        console.log(`erorrrrrrr!!!!!!!!!!!!\n${err}`)
    }
}
module.exports=conectDB