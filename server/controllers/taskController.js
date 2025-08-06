const Task=require("../modles/Task")


const createNewTask=async(req,res)=>{
    const {name,complete,important,tags,type,icon,steps,user,range,location,status}=req.body
    const task=await Task.create( {name,complete,important,tags,type,icon,steps,user,range,location,status})
    res.json(task)
}
const getAllTasks=async(req,res)=>{
    //const tasks=await Task.find().populate("user")
    const tasks=await Task.find().lean()
    res.json(tasks)
}
const getTaskById=async (req,res)=>{
    const {id}=req.params
    const task=await Task.findById(id).populate("user")
    //const task=await Task.findById(id).lean()
    res.json(task)
}
const updateTask=async(req,res)=>{
    const {id,name,complete,important,tags,type,icon,steps,user,range,location,status}=req.body
    const task=await Task.findById(id)
    task.name=name,
    task.icon=icon,
    task.complete=complete,
    task.important=important,
    task.tags=tags,
    task.type=type,
    task.steps=steps,
    task.user=user,
    task.range=range,
    task.location=location,
    task.status=status
    await task.save()
    res.json(task)
}
const updateTaskComplete=async(req,res)=>{
    const {id}=req.body
    const task=await Task.findById(id)
    task.complete=true
    await task.save()
    res.json(task)
}
const deletTask=async(req,res)=>{
    const{id}=req.body
    const task=await Task.findById(id)
    await task.deleteOne()
    res.json(`The task ${id} deleted`)
}
const addStep=async(req,res)=>{
    const{id,step}=req.body
    const task= await Task.findById(id)
    task.steps=[...task.steps,step]
    await task.save()
    res.json(task)
}
module.exports={createNewTask,getAllTasks,getTaskById,updateTask,updateTaskComplete,deletTask,addStep}
