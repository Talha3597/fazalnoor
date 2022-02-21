const mongoose=require('mongoose');
const bcrypt =require('bcryptjs')

const EmailSchema=mongoose.Schema({
    service:{
        type:String,
        trim:true,
        
    }, 
    username:{
        type:String,
        trim:true,
    },
    password:{
        type:String,
        trim:true,
    },
    hashString:{
        type:String,
        trim:true,
    },
   
},
{ timestamps: true });
EmailSchema.pre("save", async function(next){
    if(!this.isModified("password"))
    {
        next()
    }
    const salt =await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    next()
});

const Email=mongoose.model('Email',EmailSchema);
module.exports=Email
