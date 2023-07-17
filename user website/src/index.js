const express=require('express');
const app=express();
const path=require('path');
const dotenv=require('dotenv');
const hbs=require('hbs');
dotenv.config({});
const user=require('./mongodb');
const { Collection } = require('mongoose');
const templatePath=path.join(__dirname,'../templates');//as __dirname is the folder in which the js file being run is
app.use(express.json());//using this middleware for all requests body parser puts stuff in req.body
app.set('view engine','hbs');//to set the view engine
app.set('views',templatePath)//to set the folder from which static files are to be served

app.use(express.urlencoded({extended:false}));//as the form sends the data in the url
const port=process.env.PORT;

app.get('/',(req,res,next)=>{
    res.render('login');
})

app.get('/signup',(req,res,next)=>{
    res.render('signup');
})

app.post("/signup",async (req,res,next)=>{
const data={
    name:req.body.name,
    password:req.body.password,
}
await user.insertMany([data]);//after sign up send to home page
res.render("home");

})
app.post('/login',async (req,res,next)=>{
    const check=await user.findOne({name:req.body.name});
    if(!check)
    {
        res.render("signup")
       
    }
    else{
    if(check.password===req.body.password)
    {
        res.render('home');
    }
    else{
    res.render("signup")
    }
}
})
app.listen(port,()=>{
    console.log('port connected');
 })
