const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid');
const app = express();
dotenv.config();

const port = process.env.PORT || 3000;
const static_path = path.join(__dirname,"/public");

const username = process.env.MONGODB_USERNAME;
const pass = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${pass}@cluster0.b6klvxc.mongodb.net/PasswordChange`,{
  useNewUrlParser : true,
  useUnifiedTopology : true,
}).then(()=>{
  console.log(`MongoDB connected successfully!`);
}).catch((err)=> console.log(`No connection!`));

const regisS = new mongoose.Schema({
    text : String,
    pass : String
});

const regis = mongoose.model("password", regisS);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
  secret:uuidv4(),
  resave:false,
  saveUninitialized:true
}))

app.use(express.static(static_path));


//password change
app.post("/pchange", async (req,res) => {
        const check = await regis.findOne({_id:"65f1d6f0edce33eb9e14b978"});
        if(req.body.oldpass===check.pass){
       await regis.findOneAndUpdate({
        text:"nibir123",
       },{
        pass:req.body.newpass,
       })
          res.redirect("/");
        }
        else{
          res.send("Old password is wrong!");
        }
});
//Login
app.post("/login", async (req,res) => {
  
  try{
    const check = await regis.findOne({text:req.body.text})
   
   if(check.pass===req.body.pass && check.text === req.body.text){
      req.session.user = req.body.text;
      res.redirect("/home");
    }
    else{
      res.send("Wrong username or password!")
    }
  }catch{
    res.send("Wrong username or password!")
  }
  
});

//log out
app.get('/logout',(req,res)=>{
  req.session.destroy(function(err){
    if(err){
      console.log(err)
      res.send("Something error!")
    }else{
      res.redirect("/");
    }
  })
})

app.get("/success", (req,res)=>{
  res.sendFile(__dirname+"/register/success.html");
});
app.get("/login", (req,res)=>{
  res.sendFile(__dirname+"/Login_page/index.html");
});
app.get("/home", (req,res)=>{
  if(req.session.user){
    res.sendFile(__dirname+"/home.html",{user:req.session.user});
  }else{
    res.redirect('/');
  }
  
});

app.get("/error", (req,res)=>{
  res.sendFile(__dirname+"/register/error.html");
});
app.get("/exist", (req,res)=>{
  res.sendFile(__dirname+"/register/exist.html");
});
app.get('/', (req,res) =>{
  if(req.session.user){
    res.redirect('/home');
  }else{
    res.sendFile(__dirname+"/index.html"); 
  }
    
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});