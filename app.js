const express=require('express');
const passport = require('passport');
const session =require("express-session");
require("./auth");
var fs=require("fs");
function isloggedin(req,res,next){
    req.user?next():res.sendStatus(401);
}

var homefile = fs.readFileSync("./two.html","utf-8");
var datafile = fs.readFileSync("./three.html", "utf-8");


const app=express();


app.use(session({secret:"simple"}));

app.use(passport.initialize());
app.use(passport.session());



app.get('/',(req,res)=>{

    // res.send('<a href="/auth/google">Authenticate with google</a>');
    res.send(homefile);

})
app.get('/auth/google',passport.authenticate('google',{scope:["email","profile"]}));


app.get('/google/callback',passport.authenticate('google',{
    successRedirect:'/protected',
    failureRedirect:"/auth/failure",
}));


app.get('"/auth/failure',(req,res)=>{
    res.send("something went wrong ! ");
});

app.get('/protected',isloggedin,(req,res)=>{
    // res.send(`hello ! ${req.user.displayName} `);
    res.send(datafile);
})


// app.get('/logout',(req,res)=>{
//     req.logout();
//     req.session.destroy();
//     res.send("Good BYE ! user " );
// })

app.get("/logout",  (req, res) => {
  //   res.send(`hello ! logout `);
  // req.logOut();
    req.session.destroy();
    res.send(`hello ! Goodbye`);
});


app.listen(7600,()=>{
    console.log('connected');
})