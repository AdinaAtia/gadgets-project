const User=require("../modles/User")

const createUser=async(req,res)=>{
    const {userName, password, name, email, phone}=req.body
    // if(!userName || !password || !name || !email ){
    //     {
    //         return res.status(400).json({ message: "All fields are required" })
    //     } 
    // }
    const user=await User.create({userName, password, name, email, phone})
    if(!user){
        return res.status(400).json({ message: "requst error" })
    }
    res.json(user)
}
const getAllUsers=async(req,res)=>{
    const users=await User.find()
    if(!users){
        return res.status(400).json({ message: "requst error" })
    }
    res.json(users)
}
const getUserById=async(req,res)=>{
    const {id}=req.params
    const user=await User.findById(id)
    if(!user){
        return res.status(400).json({ message: "The user not found"})  
    }
    res.json(user)
}
const updateUser=async(req,res)=>{
    const {userName, password, name, email, phone,roles,active}=req.body
    const user=await User.findById(id)
    if(!user)
    {
        return res.status(400).json({ message: "The user not found"})
    }
    user.userName=userName
    user.password=password
    user.name=name
    user.email=email
    user.phone=phone
    user.roles=roles
    user.active=active
    const up = await user.save()
    res.json(up)
}
const deleteUser=async(req,res)=>{
    const{id}=req.body
    const user=await User.findById(id)
    //לבדוק אם צריך
    if(!user)
    {
        return res.status(400).json({ message: "The user not found"})
    }
    await user.deleteOne()
    res.json(`The user ${id} deleted`)
}
module.exports={createUser,getAllUsers,getUserById,updateUser,deleteUser}