const mongoose = require('mongoose')
const moongosePaginate = require('mongoose-paginate')


const PostSchema = mongoose.Schema({
    title: String,
    miniature: String,
    content: String,
    path: {
        type:String,
        unique:true
    },
    create_at: Date

})

PostSchema.plugin(moongosePaginate)

module.exports = mongoose.model("Post", PostSchema)