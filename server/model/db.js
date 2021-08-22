const mongoose =require('mongoose');
DB_URI=process.env.MONGODB
//mongodb://127.0.0.1:27017/school

 

mongoose.connect(
    DB_URI,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true,

    }
)
.then(()=>console.log("DB connected Successfully"))
.catch((err)=> console.log('DB not connected Successfully'+err));
