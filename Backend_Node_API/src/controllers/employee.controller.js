const db = require("../db")
const { isEmptyOrNull } =  require("../utils/service")

//=========================Get All Employee ===============

const getAll_Employee = (req,res)=>{
    var sql = "SELECT * FROM employee"
    db.query(sql,(err,row)=>{
        if(err){
            res.json({
                message: err,
                err:true
            })
        }else{
            res.json({
                user : req.user,
                user_id : req.user_id,
                list : row
            })
        }
    })
  

}

//===========================Get One Employee ==========================
const getOne_employee = (req,res)=>{
    var id = req.params.id
    var sql = "SELECT * FROM employee WHERE employee_id = ?"
    db.query(sql,[id],(err,row)=>{
        if(err){
            res.json({
                message : err,
                err : true
            })
        }else{
            res.json({
                list:row
            })
        }
    })

}

// ============================ Create Emplyee =========================
const create_employee = (req,res)=>{
    const {
        firstname,
        lastname,
        tel,
        email,
        base_salary,
        address,
        province,
        country
    } = req.body

    var message = {}

    if(isEmptyOrNull(firstname)){
        message.firstname = "firstname required!"
    }
    if(isEmptyOrNull(lastname)){
        message.lastname = "lastname required!"
    }
    if(isEmptyOrNull(tel)){
        message.tel = "tel required!"
    } 
    if(Object.keys(message).length >0){
        res.json({
            err : true,
            message : message
        })
        return
    } 

    var sql = "INSERT INTO employee (`firstname`, `lastname`, `tel`, `email`, `base_salary`, `address`, `province`, `country`) VALUES (?,?,?,?,?,?,?,?)"
    var param_data = [firstname,lastname,tel,email,base_salary,address,province,country]
    db.query(sql,param_data,(err,row)=>{
        if(err){
            res.json({
                message : err,
                err : true
            })
        }
        else{
            res.json({
                message : "Employee create successfully!",
                data : row
            })
        }
    })
}

//================================== Update EMployee =======================
const update_employee = (req,res) =>{
    const {
        employee_id,
        firstname,
        lastname,
        tel,
        email,
        base_salary,
        address,
        province,
        country
    } = req.body

    var message = {}

    if(isEmptyOrNull(employee_id)){
        message.employee_id = "employee_id required!"
    }
    if(isEmptyOrNull(firstname)){
        message.firstname = "firstname required!"
    }
    if(isEmptyOrNull(lastname)){
        message.lastname = "lastname required!"
    }
    if(isEmptyOrNull(tel)){
        message.tel = "tel required!"
    } 
    if(Object.keys(message).length >0){
        res.json({
            err : true,
            message : message
        })
        return
    } 
    var sql = "UPDATE employee SET firstname=?, lastname=?, tel=?, email=?, base_salary=?, address=?, province=?, country=? WHERE employee_id=?";
    var param_sql =[firstname,lastname,tel,email,base_salary,address,province,country,employee_id]
    db.query(sql,param_sql,(err,row)=>{
        if(err){
            res.json({
                err : true,
                message : err

            })
        }else{
            res.json({
                message : row.affectedRows ? "Update successfully!" : "Data not in system",
                data : row
            })
        }
    })
}

// ====================================Remove Employee =======================
const remove_employee = (req,res)=>{
    var {id} = req.params
    var sql = "DELETE FROM employee WHERE employee_id = ?"
    db.query(sql,[id],(err,row)=>{
        if(err){
            res.json({
                err:true,
                message:err
            })
        }else{
            res.json({
                message : (row.affectedRows !=0)?"Delete successfuly!": "Data not in system",
                data : row
            })
        }
    })

}

module.exports = {
    getAll_Employee,
    getOne_employee,
    create_employee,
    update_employee,
    remove_employee
}