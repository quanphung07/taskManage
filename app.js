const {MongoClient,ObjectID}=require('mongodb')
const id=new ObjectID();

const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='task-app'

MongoClient.connect(connectionURL,{useNewUrlParser:true,useUnifiedTopology: true},(error,client)=>{
    if(error)
    {
        return console.log('connect failed');
    }   
    const db=client.db(databaseName);
    const updatePromise=db.collection('users').updateOne({_id:new ObjectID("5e897037fa78d338a82b8471")},{
        $set:{
            name:'Phung Quan'
        }
    })
    updatePromise.then(res=>console.log(res)).catch(err=>console.log(err));
      
   
            
})