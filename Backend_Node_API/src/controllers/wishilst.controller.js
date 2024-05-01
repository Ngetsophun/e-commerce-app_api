
const db = require("../db")

///================================== get list All wishList =========================
const getAll_Wishlist = async (req,res)=>{
    const {customer_id} = req.body
    var sql = "SELECT * FROM wishlist WHERE customer_id"
    // var sql = "SELECT FROM wishlist wl"
    // sql += "INNER JOIN "
    const list = await db.query(sql,[customer_id])
    res.json({
        list: list
    })

}

///==================== Create Whishlist ==================================
const create_wishlist =  async (req,res)=>{
    var {customer_id,product_id} = req.body
    var sql  = "INSERT INTO wishlist (customer_id,product_id) VALUES (?,?)"
    var param_sql = [customer_id,product_id]
    var data = await db.query(sql,param_sql)
    res.json({
        message: "Product addded!",
        data:data
    })



}

///================================Remove Wishlist ===================
const remove_wishlist = async (req,res)=>{
    const {wishlist_id} = req.body
    var sql = "DELETE FROM wishlist WHERE wishlist_id = ?"
    var data = await db.query(sql,[wishlist_id])
    res.json({
        message: "Product remove from your wishlist!",
        data:data
    })


}


module.exports = {
    getAll_Wishlist,
    create_wishlist,
    remove_wishlist

}
