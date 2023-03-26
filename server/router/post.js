const express = require('express')
const multyparty = require('connect-multiparty')
const postController = require('../controllers/post')

const md_auth = require('../middlewares/authenticated')
const md_upload = multyparty({uploadDir: './uploads/blog'})

const api = express.Router()

api.post("/blog", [md_auth.asureAuth, md_upload], postController.createPost)
api.get("/blog", postController.getPost)
api.patch("/blog/:id", [md_auth.asureAuth, md_upload], postController.updatePost)
api.delete("/blog/:id", [md_auth.asureAuth, md_upload], postController.deletePost)
api.get('/blog/:path', postController.getPostByPath)


module.exports = api