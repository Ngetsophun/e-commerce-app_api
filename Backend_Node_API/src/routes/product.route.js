
const controller = require("../controllers/product.controller")
const Product = (app,base_route) => {
    app.get(base_route,controller.getAll_Product)
    app.get(`${base_route}/:id`,controller.getone_Product)
    app.post(base_route,controller.create_Product)
    app.put(base_route,controller.update_Product)
    app.delete(`${base_route}/:id`,controller.remove_Product)
    app.post( `${base_route}/change_status`,controller.changeProductStatus)
}
module.exports = Product