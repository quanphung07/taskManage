const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const validator=require('validator')

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            require:true,
            trim:true
        },
        age:{
            type:Number,
           
            validate(value){
                if(value<0)
                {
                    throw new Error('age is a positive number')
                }
            }
        },
        email:{
            type:String,
            require:true,
            unique:true,
            validate(value){
                if(!validator.isEmail(value))
                {
                    throw new Error('Email isnot invalid')
                }
                
    
            }
    
        },
        password:{
            type:String,
            require:true,
            minlength:6,
            trim:true,
            validate(value)
            {
                if(value.match('password'))
                {
                    throw new Error('password isnot contain "password"')
                }
            }
    
        }
    
    })

userSchema.statics.findByEmailPass= async  (email,password)=>{
    let user=await User.findOne({email})
    if(!user)
    {
     throw new Error('email is not valid')
    }
    let passIsValide=await bcrypt.compare(password,user.password)
    if(!passIsValide)
    {
        throw new Error('password is not valid')
    }
    return user
}

    //hashed password before saving
userSchema.pre('save',async function (next){
    const user=this
    if(user.isModified('password'))
    {
        user.password=await bcrypt.hash(user.password,8)
    }
    next()

})
const User=mongoose.model('User',userSchema)

module.exports=User