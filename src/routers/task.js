const express=require('express')
const Task=require('../model/task')
const router=new express.Router()

router.post('/tasks',(req,res)=>{
    const task=new Task(req.body)
    task.save().then(()=>{
        res.send(task)
    }).catch(e=>res.status(400).send(e))
})




router.get('/tasks',(req,res)=>{
    Task.find({}).then(tasks=>res.send(tasks)).catch(err=>res.status(400).send(err))
})
router.get('/tasks/:id',(req,res)=>{
    const _id=req.params.id
    Task.findById(_id).then(task=>res.send(task)).catch(err=>res.status(400).send(err))
})


router.patch('/tasks/:id',async(req,res)=>{
    const updates=Object.keys(req.body)
    const validUpdates=['description','completed']
    let isValidation=updates.every(update=>validUpdates.includes(update))
    const id=req.params.id
    if(!isValidation)
    {
      return  res.status(404).send('some property is not invalid')
    }
   try{
     let taskUpdate= await Task.findById(id)
     updates.forEach(update=>taskUpdate[update]=req.body[update])
    await taskUpdate.save()
     res.status(200).send(taskUpdate)
   }catch(e)
   {
       res.status(404).send(e)  
   }
    
})
module.exports=router