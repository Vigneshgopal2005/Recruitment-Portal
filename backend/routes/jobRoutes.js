const express = require('express');
const Job = require('../models/Job');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const router = express.Router();

// Middleware for verifying tokens
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

// Configure multer for resume uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage });

// HR: Post a new job
router.post('/create', verifyToken, async (req, res) => {
    if (req.user.role !== 'hr') return res.status(403).json({ message: 'Forbidden' });

    const { title, description } = req.body;

    try {
        const job = new Job({ title, description, createdBy: req.user.id });
        await job.save();
        res.status(201).json({ message: 'Job created successfully', job });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// User: Apply for a job
router.post('/apply/:jobId', [verifyToken, upload.single('resume')], async (req, res) => {
    if (req.user.role !== 'user') return res.status(403).json({ message: 'Forbidden' });

    const { jobId } = req.params;

    try {
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        const application = {
            userId: req.user.id,
            resume: req.file.path,
        };

        job.applications.push(application);
        await job.save();

        res.status(201).json({ message: 'Applied successfully', job });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// HR: View applications for a job
router.get('/:jobId/applications', verifyToken, async (req, res) => {
    if (req.user.role !== 'hr') return res.status(403).json({ message: 'Forbidden' });

    const { jobId } = req.params;

    try {
        const job = await Job.findById(jobId).populate('applications.userId', 'name email');
        if (!job) return res.status(404).json({ message: 'Job not found' });

        res.status(200).json({ applications: job.applications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// HR: Update application status
router.patch('/update-status/:jobId/:applicationId', verifyToken, async (req, res) => {
    if (req.user.role !== 'hr') return res.status(403).json({ message: 'Forbidden' });

    const { jobId, applicationId } = req.params;
    const { status } = req.body;

    try {
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        const application = job.applications.id(applicationId);
        if (!application) return res.status(404).json({ message: 'Application not found' });

        application.status = status;
        await job.save();

        res.status(200).json({ message: 'Status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find(); // Fetch all jobs
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


// User: View their application statuses
router.get('/applications', verifyToken, async (req, res) => {
    if (req.user.role !== 'user') return res.status(403).json({ message: 'Forbidden' });

    try {
        const jobs = await Job.find({ 'applications.userId': req.user.id });
        const userApplications = jobs.map(job => ({
            jobId: job._id,
            title: job.title,
            application: job.applications.find(app => app.userId.toString() === req.user.id),
        }));

        res.status(200).json(userApplications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
