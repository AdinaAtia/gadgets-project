const express = require("express")
const verifyJWT = require("../middleware/verifyJWT")
const router = express.Router()

const cartController = require("../controllers/cartController")

// router.get("/", cartController.getAllProducts)

router.use(verifyJWT)
router.post("/", cartController.createNewCart)

router.get("/", cartController.getCartById)


router.delete("/:id", cartController.deletCart)

module.exports = router




