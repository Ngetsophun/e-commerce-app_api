
const controller = require("../controllers/payment_method.controller")

const Payment_method = (app,base_route) => {
    app.get(base_route,controller.getAll_payement_methode)
    app.post(base_route,controller.create_payement_methode)
    app.delete(`${base_route}/:id`,controller.remove_payement_methode)
}
module.exports = Payment_method