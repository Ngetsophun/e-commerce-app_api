const controller = require("../controllers/customer.controller")

const Customer = (app,base_route) => {
    app.get(base_route,controller.getAll_customer)
    app.get(`${base_route}/:id`,controller.getOne_customer)
    app.post(base_route,controller.create_customer)
    app.post(`${base_route}/auth/login`,controller.login_customer)
    app.put(base_route,controller.update_customer)
    app.delete(`${base_route}/:id`,controller.remove_customer)

   
    app.get(`${base_route}_address`,controller.listAll_Address)
    app.get(`${base_route}_address/:id`,controller.listOne_address)
    app.post(`${base_route}_address`,controller.new_Address)
    app.put(`${base_route}_address`,controller.update_Address)
    app.delete(`${base_route}_address/:id`,controller.remove_Address)
}
module.exports = Customer