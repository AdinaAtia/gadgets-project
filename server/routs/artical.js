const express=require("express")
const router=express.Router()
const articalController=require("../controllers/articalController")
router.post("/",articalController.createNewArtical)
router.get("/",articalController.getAllArticals)
router.put("/",articalController.updateArtical)
router.delete("/",articalController.deletArtical)
module.exports=router
