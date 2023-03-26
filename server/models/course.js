const mongoose = require('mongoose')
const mongoosePaginet = require('mongoose-paginate')

const courseSchema = mongoose.Schema({
    title: String,
    miniature: String,
    description: String,
    url: String,
    price:  Number,
    score: Number
})

courseSchema.plugin(mongoosePaginet)

module.exports = mongoose.model('course', courseSchema)