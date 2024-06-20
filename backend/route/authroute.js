const express = require("express");
const route = express.Router();
const AuthControler = require("../controler/authcontroler");



route.post("/login", AuthControler.login);

route.post("/signup", AuthControler.signup);

route.put("/signup/:id", AuthControler.edit);

route.get("/signup", AuthControler.get);

route.get("/signup/:id", AuthControler.getbyid);

route.delete("/signup/:id", AuthControler.del);


module.exports = route;