const db = require("../db")
const { isEmptyOrNull } = require("../util/service")


///================================Get all Product ===================================
const getAll_Product = async (req,res)=>{

     //join to tb category pagination search
    const list = await db.query("SELECT * FROM product")
    res.json({
        list:list
    })
}

///====================================Get one Product ================================
const getone_Product = async (req,res)=>{
    const {id} = req.params

    var sql = "SELECT * FROM prosuct WHERE product_id = ?"
    const list = await db.query(sql,[id]) 
    res.json({
        list:list
    })

}

 ///============================== Create Product ==================================
const create_Product = async (req,res)=>{
    var{
        category_id,
        barcode,
        name, 
        quantity, 
        price,
        image, 
        description, 

    }= req.body
    var message = {}
    if(isEmptyOrNull(category_id)){message.category_id = "category id required!"}
    if(isEmptyOrNull(barcode)){message.barcode = "barcode required!"}
    if(isEmptyOrNull(name)){message.name = "name required!"}
    if(isEmptyOrNull(quantity)){message.quantity = "quantity required!"}
    if(isEmptyOrNull(price)){message.price = "price required!"}
    
    if(Object.keys(message).length >0){
        res.json({
            err : true,
            message : message
        })
        return false;
    } 
    var sql = "INSERT INTO product (category_id, barcode, name, quantity, price, image, description) VALUES (?,?,?,?,?,?,?)"
    var param_sql = [category_id,barcode, name, quantity, price, image, description]
    var data = await db.query(sql,param_sql)
    res.json({
        list: "create Product",
        data:data
    })
}

///=============================Update Product ========================================
const update_Product = (req,res)=>{
    const[
        product_id,
        category_id,
        barcode,
        name, 
        quantity, 
        price,
        image, 
        description, 
     

    ] = req.body

    var message = {}
    if(isEmptyOrNull (product_id)){
        message.product_id = "product id required!"
    }
    if(isEmptyOrNull (category_id)){
        message.category_id = "category id required!"
    }
    if(isEmptyOrNull (barcode)){
        message.barcode = "barcode required!"
    }
    if(isEmptyOrNull(name)){
        message.name = "name required!"
    }
    if(isEmptyOrNull(quantity)){
        message.quantity = "quantity required!"
    }
    if(isEmptyOrNull(price)){
        message.price = "price required"
    }

    if(Object.keys(message).length > 0){
        res.json({
            message : message,
            err : true
        })
        return false;
    }
    var sql = "UPDATE product SET category_id=?, name=?, quantity=?, price=?, image=?, description=? WHERE product_id=?";
    var param_sql =[category_id,name,quantity,price,image,description,product_id]
    var data = db.query(sql,param_sql)
    res.json({
        list: "Update Product",
        data:data
    })
}

///============================= Remove Product ==================================
const remove_Product = async (req,res)=>{
    const {id}= req.body;
    var sql = "DELETE FROM product WHERE product_id = ?"
    const data = await db.query(sql,[id])
    res.json({
        message : "Remove success",
        data:data
    })
}

///==========================Change Product Status ==============================
const changeProductStatus = async (req,res)=>{
    const {is_active }= req.body;  //1,0
    var sql = "UPDATE product SET is_active =? WHERE product_id = ?"
    const data = await db.query(sql,[is_active])
    res.json({
        message : "Update status to "+ (is_active == 0? "inactived" :"actived"),
        data:data
    })

}

module.exports = {
    getAll_Product,
    getone_Product,
    create_Product,
    update_Product,
    remove_Product,
    changeProductStatus
}



