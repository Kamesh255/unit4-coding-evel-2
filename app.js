const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json())
 

const connect = () =>{
    return mongoose.connect("mongodb://127.0.0.1:27017/get_job");
};
const citySchema = new mongoose.Schema({
    city_name:{type:String, required:true},
},
{
    versionKey:false,
});
const City = mongoose.model("city",citySchema); 

app.post("/citys",async(req,res) => {
    try{
        const citys = await City.create(req.body);
        return res.send(citys);
    } catch (e){
        res.status(500).json({message: e.message, status:"Faild"});
    }
});

app.get("/citys",async(req,res)=>{
    try{
        const citys = await City.find().lean().exec();
        return res.send({citys});
    } catch (e){
        res.status(500).json({massage: e.massage,status:"Failed"})
    }
})
app.get("/citys/:id",async(req,res)=>{
    try{
        const users = await City.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        }).lean().exec();
        return res.send(citys);
    } catch (e){
        res.status(500).json({massage: e.massage,status:"Failed"})
    }
}); 

const companySchema = new mongoose.Schema({
    city_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"city",
        required:true,
    },
    Company_name:{type:String, required:true},
    Company_type:{type:String,required:true},
    job_openings:{type:String,required:true},
    
},
{
    versionKey:false, 
});
const Company = mongoose.model("company", companySchema)
 
const jobSchema = new mongoose.Schema({
    designation:{type:String,required:true},
    noticePeriod:{type:String,required:true},
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"city",
        required:true,
    },
    company_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"company",
        required:true,
    }, 
   rating:{type:Number, required : true}
},
{
    versionKey:false,
    timestamp: true
}
);



app.post("/companys",async(req,res) => {
    try{
        const companys = await Company.create(req.body);
        return res.send(companys);
    } catch (e){
        res.status(500).json({message: e.message, status:"Faild"});
    }
});
app.get("/companys",async(req,res)=>{
    try{
        const companys = await Company.find().lean().exec();
        return res.send({companys});
    } catch (e){
        res.status(500).json({massage: e.massage,status:"Failed"})
    }
})

// GET MAX JOB OPENINGS
app.get("/companys/maxOpen",async(req,res)=>{
    try{
        const companys = await Company.find().sort({job_openings:-1}).lean().exec();
        return res.send(companys[0]);
    } catch (e){
        res.status(500).json({massage: e.massage,status:"Failed"})
    }
})
//FIND COMPANY BY ID 
app.get("/companys/:id",async(req,res)=>{
    try{
        const companys = await Company.findById(req.params.id).lean().exec();
        return res.status(201).send(companys);
    } catch (e){
        res.status(500).json({massage: e.massage,status:"Failed"})
    }
});
app.patch("/companys/:id",async(req,res)=>{
    try{
        const users = await Company.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        }).lean().exec();
        return res.status(201).send(companys);
    } catch (e){
        res.status(500).json({massage: e.massage,status:"Failed"})
    }
});


app.listen(2345, async function(){
    await connect()
    console.log("listening on port 2345")
})
 
