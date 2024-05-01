const express = require("express")
const app = express()
const cors =require("cors")

app.use(cors({
    origin: '*'
}))

app.use(express.json())
app.get("/",(req,res)=>{res.send("Hello")})

const Category = require("./src/routes/category.route")


 Category(app,"/api/category")





app.listen(8081,()=>{  //define 8081 for application
    console.log("Server run http://localhost:8081")
})