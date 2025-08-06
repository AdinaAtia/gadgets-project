
const User = require("../modles/User")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const login = async (req, res) => {
    const {userName, password} = req.body
    //validation
    if (!userName || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }
    const foundUser= await User.findOne({userName:userName}).lean()
    if (!foundUser || foundUser.active===false) {
        return res.status(401).json({ message: "Unathorized" })
    }
    const match =await bcrypt.compare(password,foundUser.password)
    if(!match){
        return res.status(401).json({ message: "Unathorized" })
    }
    const userInfo={
        _id:foundUser. _id,
        name:foundUser.name,
        userName:foundUser.userName,
        roles:foundUser.roles,
        email:foundUser.email,
    }
    const accessToken=jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    res.send(accessToken)
}
const register = async (req, res) => {
    const {userName, password, name, email, phone} = req.body
    //validation
    if (!userName || !password || !name || !email || !phone) {
        return res.status(13).json({ message: "All fields are required" })
    }
    //chek for duplicate
    const duplicateUser = await User.findOne({ userName: userName }).lean()
    console.log(duplicateUser);
    if (duplicateUser) {
        console.log("1");
        return res.status(409).json({ message: "Duplicate user" })
    }
    const hashPassword=await bcrypt.hash(password,10)
    console.log(`userName: ${userName}password: ${password} name:${name} email${email} phone${phone}`);
    const user =await User.create({ userName, password:hashPassword, name, email, phone})
     console.log("3");
    if (!user) {
        return res.status(400).json({ message: "Bad request" }) 
    }
    res.json({id:user.id,userName:user.userName,name:user.name})
}
module.exports = { login, register }