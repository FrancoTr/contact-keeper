const mongoose = require('mongoose')

const ContactSchema = mongoose.Schema({
    user: { //Relation between user and contact
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    email: {    //Not necessarily unique
        type: String,
        required: true  
    },
    phone: {
        type: String
    },
    type: {
        type: String,
        default: 'personal' //Can be personal or professional
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('contact', ContactSchema)