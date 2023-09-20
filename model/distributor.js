// models/distributor.js
const mongoose = require('mongoose');

const distributorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    operatingYears: {
        type: Number,
        required: true,
    },
    investment: {
        type: Number,
        required: true,
    },
    hasVehicle: {
        type: Boolean,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    bankName: {
        type: String,
        required: true,
    },
    operatingYearsBank: {
        type: Number,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    officerName: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    signature: {
        type: String,
        required: true,
    },
});


const Distributor = mongoose.model('Distributor', distributorSchema);
module.exports = Distributor;