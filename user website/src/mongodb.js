const mongoose=require('mongoose');
const uri=process.env.DB.replace('<password>',process.env.DBPASSWORD);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`connected to the database`);
  });

  const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
  })
  const user=new mongoose.model("Users",userSchema);
  module.exports=user
