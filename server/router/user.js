const express = require('express')
const multyparty = require('connect-multiparty')
const userController = require('../controllers/user')
const md_auth = require('../middlewares/authenticated')

const md_upload = multyparty({uploadDir: './uploads/avatar'})
const api = express.Router()

api.get("/user/me",[md_auth.asureAuth], userController.getMe)
api.get("/users",[md_auth.asureAuth], userController.getUsers)
api.post("/user",[md_auth.asureAuth, md_upload], userController.createUsers)
api.patch("/user/:id", [md_auth.asureAuth, md_upload], userController.updateUser)
api.delete("/user/:id", [md_auth.asureAuth], userController.deleteUser)

module.exports = api