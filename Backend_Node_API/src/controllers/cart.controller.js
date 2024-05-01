

const db = require("../db");
const { isEmptyOrNull } = require("../util/service");

///============================= Get all cart by Customer =======================
const getAll_CartByCustomer = async (req,res)=>{
    const {customer_id} = req.body;
   // var sql = "SELECT * FROM cart WHERE customer_id"

   var sql = "SELECT c.cart_id, c.quantity, p.* FROM cart c "
   sql += "INNER JOIN product p ON (c.product_id = p.product_id)"
   sql += "WHERE c.customer_id = ?"
    const list = await db.query(sql,[customer_id])
    res.json({
        list: list
    })

}

///================================ Add Cart ============================================
const Add_Cart =  async (req,res)=>{
    const {
        customer_id,
        product_id,
        quantity
    } = req.body

    var message = {}
    if(isEmptyOrNull(customer_id)){message.customer_id = "customer id required!"}
    if(isEmptyOrNull(product_id)){message.product_id = "product is required!"}
    if(isEmptyOrNull(quantity)){message.quantity = "quantity required!"}

    if(Object.keys(message).length >0){
        res.json({
            error: true,
            message: message
        })
    }
    var sql  = "INSERT INTO cart (customer_id,product_id,quantity) VALUES (?,?,?)"
    var param_sql = [customer_id,product_id,quantity]
    var data = await db.query(sql,param_sql)
    res.json({
        message: "Add cart success!",
        data:data
    })



}

///========================= Update cart =======================================
const update_Cart = async (req,res) =>{
    const {
        cart_id,
        quantity
    } = req.body

    var message = {}
    if(isEmptyOrNull(cart_id)){message.cart_id = "cart id required!"}
    if(isEmptyOrNull(quantity)){message.quantity = "quantity required!"}

    if(Object.keys(message).length >0){
        res.json({
            error: true,
            message: message
        })
    }
    var sql  = "UPDATE cart SET quantity=(quantity+?) WHERE cart_id=?"
    var data = await db.query(sql,[quantity,cart_id])
    res.json({
        message: "Update cart success!",
        data:data
    })



}

///============================Remove Cart =========================
const remove_Cart = async (req,res)=>{
    const {cart_id} = req.body;
    var sql = "DELETE FROM cart WHERE cart_id = ?"
    var data = await db.query(sql,[cart_id])
    res.json({
        message: "Remove from cart!",
        data:data
    })


}


module.exports = {
    getAll_CartByCustomer,
    Add_Cart,
    update_Cart,
    remove_Cart

}
