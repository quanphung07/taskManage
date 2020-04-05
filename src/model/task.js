const mongoose=require('mongoose')
const Task=mongoose.model('Task',{
    description:{
        type:String,
        require:true
    },
    completed:{
        type:Boolean
    }
})
module.exports=Task