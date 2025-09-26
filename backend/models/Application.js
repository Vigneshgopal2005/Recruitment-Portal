// backend/models/Application.js
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    applicantName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Waiting', 'Accepted', 'Rejected'],
        default: 'Waiting',
    },
});

module.exports = mongoose.model('Application', applicationSchema);
