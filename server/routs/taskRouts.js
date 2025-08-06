const express=require("express")
const verifyJWT=require("../middleware/verifyJWT")
const router=express.Router()

const taskController=require("../controllers/taskController")


router.use(verifyJWT)
router.post("/",taskController.createNewTask)
router.get("/",taskController.getAllTasks)
router.get("/:id",taskController.getTaskById)
router.put("/",taskController.updateTask)
router.put("/complete",taskController.updateTaskComplete)
router.delete("/",taskController.deletTask)
router.post("/add",taskController.addStep)
module.exports=router



