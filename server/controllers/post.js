const Post = require('../models/post')
const image = require('../utils/image')

function createPost(req, res){
    const post = new Post(req.body)
    post.create_at = new Date()

    const imagePath = image.getFilePath(req.files.miniature)  
    post.miniature = imagePath

    post.save((error, postStored) =>{
        if (error) {
            res.status(400).send({msg: "error al crear el post"})
        }else{
            res.status(200).send(postStored)
        }
    })
}

function getPost(req, res){

    const {page = 1, limit = 10} = req.query

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { create_at: "desc"}
    }

    Post.paginate({}, options ,(error, postStored)=>{
        if (error) {
            res.status(400).send({msg: "error al obtener post"})
        }else{
            res.status(200).send(postStored)
        }
    })
}

function updatePost(req,res){

    const {id} = req.params
    const postData = req.body

    if (req.files.miniature) {
        const imagePath = image.getFilePath(req.files.miniature)
        postData.miniature = imagePath
    }

    Post.findByIdAndUpdate({_id:id}, postData, (error)=>{
        if (error) {
            res.status(400).send({msg: "error al actualizar el post"})
        }else{
            res.status(200).send({msg: "actualizacion correcta"})
        }
    })
}

function deletePost(req, res){

    const {id} = req.params

    Post.findByIdAndDelete({_id:id},(error)=>{
        if (error) {
            res.status(400).send({msg: "error al eliminar el post"})
        }else{
            res.status(200).send({msg: "eliminacion del post completada"})
        }
    })
}

function getPostByPath(req,res){
    const {path} = req.params

    Post.findOne({path}, (error, postStored)=>{
        if(error){
            res.status(500).send({msg: "error del servidor"})
        }else if(!postStored){
            res.status(400).send({msg: "no se ha encontrado ningun post"})
        }else{
            res.status(200).send(postStored)
        }
    })
}

module.exports = {
    createPost,
    getPost,
    updatePost,
    deletePost,
    getPostByPath
}