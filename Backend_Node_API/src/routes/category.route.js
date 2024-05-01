const controller =  require("../controllers/category.controller")

const Category = (app,base_route) =>{
    app.get(base_route,controller.getAll_categoy),
    app.get(`${base_route}/:id`,controller.getone_category)
    app.get(base_route,controller.create_category)
    app.put(base_route,controller.update_category)
    app.delete(`${base_route}/:id`,controller.remove_category)

}

module.exports = Category