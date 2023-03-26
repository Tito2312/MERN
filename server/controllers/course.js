const multipart = require('connect-multiparty')
const Course = require('../models/course')
const image = require('../utils/image')

//funciones

function createCourse(req, res){
    const course = new Course(req.body)

    const imagePath = image.getFilePath(req.files.miniature)
    course.miniature = imagePath

    course.save((error, courseStored) => {
        if (error) {
            res.status(400).send({msg: "error al crear el curso"})
        }else{
            res.status(201).send(courseStored)
        }
    })
}

function getCourses(req, res){
    const {page = 1, limit = 10} = req.query

    const options = {
        page: parseInt(page),
        limit: parseInt(limit)
    }

    Course.paginate({}, options, (error, courses)=>{
        if(error){
            res.status(400).send({msg: "error al obtener los cursos"})
        }else{
            res.status(200).send(courses)
        }
    })
}

function updateCourse (req, res){

    const {id} = req.params
    const CourseData = req.body

    if(req.files.miniature){
        const imagePath = image.getFilePath(req.files.miniature)
        CourseData.miniature = imagePath
    }

    Course.findByIdAndUpdate({_id: id}, CourseData, (error)=>{
        if (error) {
            res.status(400).send({msg: "error al actualizar el curso"})
        }else{
            res.status(200).send({msg: "actualizacion correcta"})
        }
    })
}

function deleteCourse(req, res){
    const {id} = req.params

    Course.findByIdAndDelete(id, (error)=>{
        if (error) {
            res.status(400).send({msg: "error al elimiar el curso"})
        }else{
            res.status(200).send({msg:"curso eliminado"})
        }
    })
}

module.exports = {
    createCourse,
    getCourses,
    updateCourse,
    deleteCourse
}