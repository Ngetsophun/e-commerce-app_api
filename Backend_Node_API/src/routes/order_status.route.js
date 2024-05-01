
const controller = require("../controllers/order_status.controller")

const Order_status = (app,base_route) => {
    app.get(base_route,controller.getAll_order_status)
    app.post(base_route,controller.create_order_status)
    app.delete(`${base_route}/:id`,controller.remove_order_status)
}
module.exports = Order_status