
const db = require("../db")

///============================= Get all payment method ==================================
const getAll_payement_methode = async (req,res)=>{
    var sql = "SELECT * FROM payement_methode"
    const list = await db.query(sql)
    res.json({
        list: list
    })

}

///========================== Create payment menthod =========================
const create_payement_methode =  async (req,res)=>{
    var {name,code} = req.body
    var sql  = "INSERT INRO payement_methode (name,code) VALUES (?,?)"
    var param_sql = [name,code]
    var data = await db.query(sql,param_sql)
    res.json({
        message: " Payment added!",
        data:data
    })



}

///====================== Remove Payment method=======================
const remove_payement_methode = async (req,res)=>{
    const {payement_methode_id} = req.body;
    var sql = "DELETE FROM payement_methode WHERE payement_methode_id = ?"
    var data = await db.query(sql,[payement_methode_id])
    res.json({
        message: "Remove from your Payment Methode!",
        data:data
    })


}


module.exports = {
    getAll_payement_methode,
    create_payement_methode,
    remove_payement_methode

}
