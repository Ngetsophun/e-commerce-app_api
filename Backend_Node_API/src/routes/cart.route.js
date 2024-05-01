
const controller = require("../controllers/cart.controller")

const Cart = (app,base_route) => {
    app.get(base_route,controller.getAll_CartByCustomer)
    app.post(base_route,controller.Add_Cart)
    app.put(base_route,controller.update_Cart)
    app.delete(`${base_route}/:id`,controller.remove_Cart)
}
module.exports = Cart