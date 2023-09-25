
const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        // required: true,
    },
    lastName: {
        type: String,
        // required: true,
    },
    phone: {
        type: Number,
        // required: true,
    },
    address1: {
        type: String,
        // required: true,
    },
    address2: {
        type: String,
        // required: true,
    },
    resumePDF: {
        type: String,
        // required: true,
    }
});


const Resume = mongoose.model('Resume', resumeSchema);
module.exports = Resume;