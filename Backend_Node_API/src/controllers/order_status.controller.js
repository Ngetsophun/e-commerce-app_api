
const db = require("../db")

///======================= get all order status ===========================
const getAll_order_status = async (req,res)=>{
    var sql = "SELECT * FROM order_status"
    const list = await db.query(sql)
    res.json({
        list: list
    })

}

///======================= create order ststus ================================
const create_order_status =  async (req,res)=>{
    var {name,message,sort_order} = req.body;
    var sql  = "INSERT INRO order_status (name,message,sort_order) VALUES (?,?,?)"
    var param_sql = [name,message,sort_order]
    var data = await db.query(sql,param_sql)
    res.json({
        message: "Order status added!",
        data:data
    })



}

///======================== Remove Order ststus =====================
const remove_order_status = async (req,res)=>{
    const {order_status_id} = req.body
    var sql = "DELETE FROM order_status WHERE order_status_id = ?"
    var data = await db.query(sql,[order_status_id])
    res.json({
        message: "Remove from your Order status!",
        data:data
    })


}


module.exports = {
    getAll_order_status,
    create_order_status,
    remove_order_status

}
