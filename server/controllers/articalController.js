const Artical=require("../modles/Artical")
const createNewArtical=async(req,res)=>{
    const {title,active,author,category}=req.body
    const artical=await Artical.create( {title,active,author,category})
    res.json(artical)
}
const getAllArticals=async(req,res)=>{
    const artical=await Artical.find()
    res.json(artical)
}
const updateArtical=async(req,res)=>{
    const {id,title,active,author,category}=req.body
    const artical=await Artical.findById(id)
    artical.title=title,
    artical.active=active,
    artical.author=author,
    artical.category=category
    await artical.save()
    res.json(artical)
}
const deletArtical=async(req,res)=>{
    const{id}=req.body
    const artical=await Artical.findById(id)
    await artical.deleteOne()
    res.json(`The artica ${id} deleted`)
}
module.exports={createNewArtical,getAllArticals,updateArtical,deletArtical}
