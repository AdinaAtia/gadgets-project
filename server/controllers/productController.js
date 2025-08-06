const Product=require("../modles/Product")
const Cart = require("../modles/Cart");

const createNewProduct=async(req,res)=>{
    const {name,descreption,price,company,img}=req.body
    if(!name || !price || !img ){
        {
            return res.status(400).json({ message: "All fields are required" })
        } 
    }
    const product=await Product.create( {name,descreption,price,company,img})
    if(!product){

        return res.status(400).json({ message: "requst error" })
    }
    res.json(product)
}
const getAllProducts=async(req,res)=>{
    //const tasks=await Task.find().populate("user")
    const products=await Product.find().lean()
    if(!products){
        return res.status(400).json({ message: "The products not found" })
    }

    res.json(products)
}
const getProductById=async (req,res)=>{
    const {id}=req.params
    const product=await Product.findById(id).lean()
    //const task=await Task.findById(id).lean()
    if(!product){
        return res.status(400).json({ message: "The product not found" })
    }
    res.json(product)
}
const updateProduct=async(req,res)=>{
    const {id,name,descreption,price,company,img}=req.body
    console.log(id);
    const product=await Product.findById(id)
    console.log(product);
    if(!product){
        return res.status(400).json({ message: "The product not found" })
    }
    product.name=name,
    product.descreption=descreption,
    product.price=price,
    product.company=company,
    product.img=img,
    await product.save()
   
    res.json(product)
}

const deletProduct=async(req,res)=>{
    // const{id}=req.params
    // console.log({id});
    // await Cart.deleteMany({id})
    // const product=await Product.findById(id)
    
    // // const del=await Cart.deleteMany({id})
    // // const del=await Cart.deleteMany({id})
    // //לבדוק אם צריך
    // // if(!product){
    // //     return res.status(800).json({ message: "The product not found" })
    // // }
    
    // await product.deleteOne()
    // res.json(`The product ${id} deleted`)
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(400).json({ message: "The product not found" });
        }
        await Cart.deleteMany({ product: id });
        await product.deleteOne();
        res.json({ message: `The product ${id} deleted` });
    } catch (error) {
        return res.status(400).json({ message: "Request error" });
    }
}

module.exports={createNewProduct,getAllProducts,getProductById,updateProduct,deletProduct}
