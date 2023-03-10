const express = require('express')
const multyparty = require('connect-multiparty')
const CourseController = require('../controllers/course')
const md_auth = require('../middlewares/authenticated')

const md_upload = multyparty({uploadDir: "./uploads/course"})
const api = express.Router()

api.post('/course', [md_auth.asureAuth, md_upload], CourseController.createCourse)

module.exports = api