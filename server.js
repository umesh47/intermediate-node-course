const express= require('express');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const port=8000;
const app= express();
const User=require('./models/User');
mongoose.connect('mongodb://localhost/userData')

app.use(bodyParser.json());

app.listen(port, ()=>{
	console.log(`server is listening on port:${port}`)
})

function sendResponse(res,err, data){
  if (err){
    res.json({
      success: false,
      message: err
    })
  } else if (!data){
    res.json({
      success: false,
      message: "Not Found"
    })
  } else{
    res.json({
      success: true,
      data: data
    })
  }
}

// CREATE
app.post('/users',(req,res)=>{
  User.create(
    //{
    //  name:req.body.newData.name,
    //  email:req.body.newData.email,
    //  password:req.body.newData.password
    //}, instead of this we can write
    {...req.body.newData},
    (err,data)=>{sendResponse(res,err,data)}
  )
  // User.create()
})

app.route('/users/:id')
// READ
.get((req,res)=>{
  // User.findById()
  User.findById(req.params.id,
    (err,data)=>{sendResponse(res,err,data)})
})
// UPDATE
.put((req,res)=>{
  // User.findByIdAndUpdate()
  User.findByIdAndUpdate(
    req.params.id,
    //{
    //  name:req.body.newData.name,
    //  email:req.body.newData.email,
    //  password:req.body.newData.password
    //}, instead of this we can write
    {...req.body.newData},
    {
      new:true
    },
    (err,data)=>{sendResponse(res,err,data)}
  )
})
// DELETE
.delete((req,res)=>{
  // User.findByIdAndDelete()
  User.findByIdAndDelete(
    req.params.id,
    (err,data)=>{sendResponse(res,err,data)}
  )
})