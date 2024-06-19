const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT;
const dotenv = require("dotenv").config()

const app = express()
app.use (express.json())

mongoose.connect("process.env.db")
.then(()=>{
    console.log("connection to db is successfully established")
    app.listen(PORT,()=>{
        console.log("application is starting on port  "+PORT)
    })
}).catch((err)=>{

    console.log("unable to connect to db"+err.message)
});

app.get("/",(req,res)=>{
    res.status(200).json("welcome to backend API")
});

const scoreSchema = new mongoose.Schema({
    firstName:{type:String,required:[true,"kindly insert your fisrt name"]},
    lastName:{type:String,required:[true,"kindly insert your last name"]},
    birthYear:{type:String,required:[true,"birth years is required"]},
    age:{type:Number},
    sex:{type:String, enum:["male","female"]},
    state:{type:String,required:[true, "kindly insert your state"]},
    subject:{type:Array,required:[true,"kindly insert your subject"]},
    scores:{type:Object,required:[true,"kindly insert your scores"]},
    total:{type:Number},
    ispassed:{type:Boolean, default:function(){
        if(this.total<200){
    app        return fale
        }else{
            return true
        }
    }}
},{timestamps:true})
  



const scoreModel = mongoose.model('post utme score', scoreSchema)

//create of first user
app.post('/createuser', async(req,res)=>{
    const date = new Date
    try{
        const{firstName,lastName,birthYear,sex,state,subjects,scores}=req.body
        
if(!(subjects.includes(Object.keys(scores)[0]) && subjects.includes(Object.keys(scores)[1]) && subjects.includes(Object.keys(scores)[2]) && subjects.includes(Object.keys(scores)[3]))){
    return res.status(400).json('scores column doesnt maych with the subject provided')
}else{
    const data ={
        firstName,
        lastName,
        birthYear,
        sex,
        state,
        subjects,
        scores,
        age:date.getFullYear()-birthYear,
        total:Object.values(scores).reduce((a,b)=>{
            return a+b
        })

    }
    if(data.age<18){
        return res.status(400).json('you are not eligible to register for this exam')
    }
    const newData= await scoreModel.create(data)
    res.status(201).json({message:"new user creater on your Db"})
}


    }catch(err){
        res.status(500).json(err.message)
    }
});


app.get('/getAll',async(req,res)=>{
    try{
        const allStudents = await scoreModel.find()
        res.status(200).json({message:"kindly find below the `${allStudents.length}` registered student",allStudents})
    }catch(err){
        res.status(500).json(err.message)
    }
});

app.get('/getone/:id', async (req,res)=>{
    try{
     let id = req.params.id

     let foundUser = await scoreModel.findById(id)

     res.status(200).json({info:"kindly find below the requested user", foundUser})
    }catch(err){
        res.status(500).json(err.message)
    }
});


// app.get('/passstudents',async(req,res)=>{
//     try{
//         const getPass= await scoreModel.find({isPassed:true})
//         res.status(200).json({message:kindly find below the ${getPass.length} successful students,data:getPass})
//     }catch(e){
//         res.status(500).json(e.message)


app.get("/status",async(req,res)=>{
    try{
let status = req.param.id
const userStatus = await scoreModel.findById()
res.status(200).json({message:""})
    }catch(error){
        res.status(500).json(err,message)
    }
})
  
      
//update a user
app.put('/updateuser/:id',async (req,res)=>{
    try{
        const userId = req.params.id
        let{yb,subjects,scores}=req.body

        let data={
            birthYear:yb,
            age:date.getFullYear()-yb,
            subjects,
            scores,
            total:Object.values(scores).reduce((a,b)=>{
                return a+b
            })
        }
        if(data.total < 200){
            data.isPassed=false
        }else{
            data.isPassed=true
        }

        if(!(subjects.includes(Object.keys(scores)[0]) && subjects.includes(Object.keys(scores)[1]) && subjects.includes(Object.keys(scores)[2]) && subjects.includes(Object.keys(scores)[3]))){
            return res.status(400).json('scores column doesnt match with the subject provided')
        }else{
            const updateduser = await scoreModel.findByIdAndUpdate(userId,data,{new:true})
            res.status(200).json({message:`${updateduser.firstName} "information has been successfully updated`, data:updateduser})
        }

    }catch(err){
        res.status(500).json(err.message)
    }
});

app.put('/updateinfo/:id',async(req,res)=>{
    try{
        const{firstName,lastName,state,sex}=req.body
        let firstLetter = firstName.charAt(0).toUpperCase()
        let remainingChar=firstName.slice(1).toLowerCase()
        let allTogether=firstLetter.concat(remainingChar)

        let firstLetter2 = lastName.charAt(0).toUpperCase()
        let remainingChar2=lastName.slice(1).toLowerCase()
        let allTogether2=firstLetter2.concat(remainingChar2)

        let firstLetter3 = state.charAt(0).toUpperCase()
        let remainingChar3=state.slice(1).toLowerCase()
        let allTogether3=firstLetter3.concat(remainingChar3)

        const userInfo={
            firstName:allTogether,
            lastName:allTogether2,
            state:allTogether3,
            sex
        }
        if(userInfo.sex !=="male"  && userInfo.sex !=="female"){
            return res.status(400).json('sex can either be male or female')
        }
        let updateUserInfo=await scoreModel.findByIdAndUpdate(req.params.id,userInfo,{new:true})
        res.status(200).json({message:`${updateUserInfo.firstName} information has been updated, userInfo:updateUserInfo`})

    }catch(err){
        res.status(500).json(err.message)
    }
});
        
        
