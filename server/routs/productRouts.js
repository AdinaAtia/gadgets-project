//תקית הROTE היא תקיה בה 





const express = require("express")//מפעיל את EXPRESS 
const verifyJWT = require("../middleware/verifyJWT")//אא לגשת לROUTE בלי להעביר את הטוקן
const router = express.Router()//חבילת ROUTE

const productController = require("../controllers/productController")


router.get("/", productController.getAllProducts)
router.use(verifyJWT)//אא לגשת לROUTE בלי להעביר את הטוקן
router.post("/", productController.createNewProduct)



router.get("/:id", productController.getProductById)
router.put("/", productController.updateProduct)

router.delete("/:id", productController.deletProduct)

module.exports = router




