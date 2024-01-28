const express= require("express");
const app=express();
const bodyParser= require('body-parser');
const path= require("path");
const cors=require('cors');
const hbs=require("hbs");
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
require("./db/conn");
const Register= require("./models/registration");
console.log("test server")
console.log("dirname ", __dirname)
 const template_path= path.join(__dirname,"../views");
//  const static_path= path.join(__dirname,"/");


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static("E:/Btech_minor_project/SkyVision"));


app.set("view engine", "hbs");
app.set("views", template_path);

app.get("/",(req,res)=>{
    res.render("index");
 })
 app.get("/login",(req,res)=>{
    res.render("login");
 })
 app.get("/mapbox",(req,res)=>{
    res.render("mapbox");
 })
 app.get("/dashboard",(req,res)=>{
  res.render("dashboard");
})
app.get("/dashboard/Recordings",(req,res)=>{
  res.render("Recordings");
})
app.get("/dashboard/Certificates",(req,res)=>{
  res.render("Certificates");
})

 //get post put delete these are the four editable options mady by the http request
 app.post("/signup",async(req,res)=>{
    console.log("signup working...")
    // console.log(req.body);
    try{
        const registereduser= new Register({
            name: req.body.fname,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password1
        })
        const registered= await registereduser.save();
        res.status(201).render("index");    
    } catch (error){
        res.status(400).send(error);
    }
    // res.status(200).send("testing")
 })


 app.post("/login",async(req,res)=>{
    console.log("login working...")
    const email= req.body.email;
    const password= req.body.orgpass;

    const user= await Register.findOne({email});

    if(!user){
        return res.status(401).send("Invalid Username or password");
    }
    const isPasswordValid = await password === user.password;
    if (!isPasswordValid) {
      return res.status(401).send('Invalid username or password');
    }
    
    res.redirect('/dashboard');

    // res.status(200).send("testing")
 })

app.listen(3000,()=>{
    console.log("server is running now")
})