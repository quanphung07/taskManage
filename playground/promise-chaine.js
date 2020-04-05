require('../src/db/mongoose')
const {MongoClient,ObjectID}=require('mongodb')
const Task=require('../src/model/task')
const User=require('../src/model/user')
const deleteTaskbyIdCount=async (id)=>{

    let deleteTask=await Task.findByIdAndDelete(id);
    let count=await Task.countDocuments({})
    return {
        deleteTask,
        count
    }
}

deleteTaskbyIdCount(new ObjectID("5e89a463e589ef154c054033")).then(obj=>console.log(obj)).catch(e=>console.log(e))


// const updataAgeandCount=async (id,age)=>{
//    let updateAge=  await User.findByIdAndUpdate(id,{age:age})
//    let count= await User.countDocuments({})
//    return count

// }
// const id=new ObjectID("5e89893ffd9543157cc1db4c");
// updataAgeandCount(id,22).then(c=>console.log(c))
// .catch(e=>console.log(e));