const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resume: { type: String }, // File path to the uploaded resume
    status: { type: String, enum: ['waiting', 'accepted', 'rejected'], default: 'waiting' },
});

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['open', 'closed'], default: 'open' },
    applications: [ApplicationSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // HR reference
});

module.exports = mongoose.model('Job', JobSchema);
