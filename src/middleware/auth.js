const jwt=require('jsonwebtoken')
const User=require('../model/user')


const auth=async (req,res,next)=>
{
    try
    {
        const token=await req.header('Authorization').replace('Bearer ','')
        const decoded=await jwt.verify(token,'mytoken')
        const user=await User.findOne({_id:decoded._id,'tokens.token':token})
        if(!user)
        {
            throw new Error('token invalide')
        }
        req.user=user
        next()
    }catch(err)
    {
        res.send('err:',err)
    }
}
module.exports=auth
