const express=require('express')
const User=require('../model/user')
const router=new express.Router()

router.post('/users',async (req,res)=>{
    const user=new User(req.body)
     try
     {
         await user.save()
         res.status(201).send(user)
     }catch(e)
     {
         res.status(400).send(e);
     }
     
 })
 router.post('/users/login', async (req,res)=>{
    try{
        let user=await User.findByEmailPass(req.body.email,req.body.password)
        res.status(201).send(user)
    }
    catch(e)
    {
        res.status(404).send('error'+e)
    }

 })
 router.get('/users',async (req,res)=>{
    try 
    {
        let users=await User.find({});
        res.send(users)
    }
    catch(e)
    {
        res.send(e)
    }
})
router.get('/users/:id',async (req,res)=>{
    try{
        let user= await User.find({_id: req.params.id})
        res.status(201).send(user)
    }
    catch(e)
    {
        res.status(401).send(e)
    }

})
router.patch('/users/:id',async (req,res)=>{
    const updates=Object.keys(req.body)
    const validUpdates=['name','email','password','age']
    let isValidation=updates.every(update=>validUpdates.includes(update))
    if(!isValidation)
    {
      return  res.status(404).send('some property is not invalid')
    }
   
    try
    {
        const user=await User.findById(req.params.id)
        updates.forEach(update=>user[update]=req.body[update])
        await user.save();

        // let userUpdate=await User.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
        if(!user)
        {
            res.status(404).send()
        }else 
        {
            res.status(201).send(user)
        }
      
    }catch(e)
    {
        res.status(401).send(e)
    }
})

module.exports=router