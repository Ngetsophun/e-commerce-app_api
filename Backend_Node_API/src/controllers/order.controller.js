
const db = require("../db")
const { isEmptyOrNull, invoiceNumber } = require("../util/service")

///=============================== genergate Invoice =================================
const generateInvoiceNo = async () => {
    const data = await db.query("SELECT MAX( order_id ) as id FROM `order`; ");
    return invoiceNumber(data[0].id) //null,1,2
}

///================================== Order ============================
const getAll_order = async (req, res) => {
    const list = await db.query("SELECT * FROM `order`; ")
    res.json({
        list: list,
        number: await generateInvoiceNo()
    })

}

///==============================Get one Order===================================
const getOne_order = async (req, res) => {
    const list = await db.query("SELECT * FROM order WHERE order_id =?", [req.params.id])
    res.json({
        list: list
    })
}

///============================= Order By Customer ===============================
const getOrder_byCustomer = async (rerq, res) => {
    const { customer_id } = req.body;
    const list = await db.query("SELECT * FROM order WHERE customer_id = ?", [customer_id])
    res.json({
        list: list
    })

}

///=============================== Create Order ==============================
const create_order = async (req, res) => {
    try {
        db.beginTransaction()
        //order
        const {
            customer_id,
            customer_address_id,
            payement_methode_id,
            comment
        } = req.body;
        // const order_status_id = 1 //padding
        // const invvoice_no = "1212"

        var message = {}
        if (isEmptyOrNull(customer_id)) { message.customer_id = "customer id required!" }
        if (isEmptyOrNull(customer_address_id)) { message.customer_address_id = "customer address id required!" }
        if (isEmptyOrNull(payement_methode_id)) { message.payement_methode_id = "payment methode id required!" }

        if (Object.keys(message).length > 0) {
            res.json({
                message: message,
                error: true
            })
            return 0;
        }

        //find customer_address_info by address_id (from client)
        var address = await db.query("SELECT * FROM customer_address WHERE customer_address_id = ?", [customer_address_id])

        if (address?.length > 0) {
            const { firstname, lastname, tel, address_des } = address[0]

            //find total_order => need getcartInfo by customer
            var product = await db.query("SELECT c.*, p.price FROM cart c INNER JOIN product p ON (c.product_id = p.product_id) WHERE c.customer_id = ?", [customer_id]);

            if (product.length > 0) {
                //find order_total base from cart
                var order_total = 0;
                product.map((item, index) => {
                    order_total += (item.quantity * item.price)
                })

                //insert data to table order
                var order_status_id = 1 //padding
                var invo_no = await generateInvoiceNo();

                var sqlOrder = "INSERT INTO `order`" +
                    "(customer_id, payement_methode_id, order_status_id, invoice_no, comment, order_total, firstname, lastname, telelphone, address_des) VALUES" +
                    "(?,?,?,?,?,?,?,?,?,?)";
                const param_sqlOrder = [customer_id, payement_methode_id, order_status_id, invo_no, comment, order_total, firstname, lastname, tel, address_des]
                const order_data = await db.query(sqlOrder, param_sqlOrder)

                //insert order detail
                product.map(async (item, index) => {
                    var sqlOrderDetail = "INSERT INTO order_detail (order_id,product_id,quantity,price) VALUES (?,?,?,?)"
                    var param_SqlOrderDetail = [order_data.insertId, item.product_id, item.quantity, item.price];
                    const OrderDetail = await db.query(sqlOrderDetail, param_SqlOrderDetail)

                    //cut stock from table product
                    var sqlProduct = "UPDATE product SET quantity=(quantity-?) WHERE product_id = ?"
                    var updateProduct_data = await db.query(sqlProduct, [item.quantity, item.product_id])

                })

                //clear cart by customer
                await db.query("DELETE FROM cart WHERE customer_id =?", [customer_id])
                res.json({
                    message: "Your order has been successfully!",
                    data: order_data
                })
                db.commit();

            }else{
                res.json({
                    message: "Your Cart is Empty!",
                    error: true
                })

            }

        }else{
            res.json({
                error: true,
                message: "Please select your address!"
            })
        }
    } catch (e) {
        db.rollback();
        res.json({
            message: e,
            error: true
        })
    }
}

module.exports = {
    getAll_order,
    getOne_order,
    getOrder_byCustomer,
    create_order
}
