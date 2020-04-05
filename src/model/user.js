const mongoose=require('mongoose')
const validator=require('validator')
const User=mongoose.model('User',{
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
module.exports=User