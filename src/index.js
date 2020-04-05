const express=require('express')
require('./db/mongoose.js')
const userRouter=require('./routers/user')
const taskRouter=require('./routers/task')
const port=process.env.PORT||3000

//middleware
const app=express()
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)






 app.listen(port,()=>{
     console.log('running ...in port:'+port)
 })

