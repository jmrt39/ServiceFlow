import express from "express";

const app = express();

app.use(express.json());


app.get("/api/health", (req,res)=>{
    res.json({
        status:"running"
    });
});


app.listen(5000,()=>{
    console.log("API running on port 5000");
});