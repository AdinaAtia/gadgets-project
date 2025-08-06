const Cart=require("../modles/Cart")


const createNewCart=async(req,res)=>{
    const {product}=req.body
    
    const user=req.user._id
    if(!product){
        return res.status(400).json({ message: "All fields are required" })
    }
    console.log(user);
    const cart=await Cart.create( {product,user:user})
    
    if(!cart){
        return res.status(400).json({ message: "requst error" })
    }

    res.json(cart)
}
const getCartById=async(req,res)=>{
    const {user}=req.user._id
    const carts=await Cart.find({user:req.user._id}).populate("product")
    if(!carts){
        return res.status(400).json({ message: "The carts not found"})  
    }
    
    res.json(carts)
}


const deletCart=async(req,res)=>{
    const{id}=req.params
    const cart=await Cart.findById(id)
    //לבדוק אם צריך
    if(!cart){
        return res.status(400).json({ message: "The cart not found" })
    }
    await cart.deleteOne()
    res.json(`The cart ${id} deleted`)
}

module.exports={createNewCart,getCartById,deletCart}
