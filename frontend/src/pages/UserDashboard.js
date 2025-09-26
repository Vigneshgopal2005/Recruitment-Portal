import React, { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom'; // Correct import for navigation
import '../UserDashboard.css'
const UserDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null); // Track the job the user is applying for
    const [resume, setResume] = useState(null); // Track the uploaded resume file
    const navigate = useNavigate(); // useNavigate hook to navigate programmatically

    // Fetch the list of jobs
    const fetchJobs = async () => {
        try {
            const { data } = await API.get('/jobs'); // Fetch all available jobs
            setJobs(data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    // Fetch the user's applications
    const fetchApplications = async () => {
        try {
            const { data } = await API.get('/jobs/applications'); // Fetch user's application statuses
            setApplications(data);
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    useEffect(() => {
        fetchJobs(); // Call fetchJobs on component mount
        fetchApplications(); // Call fetchApplications on component mount
    }, []); // Empty dependency array ensures this runs once after the initial render

    const handleApply = async () => {
        if (!resume) {
            alert('Please upload your resume.');
            return;
        }

        const formData = new FormData();
        formData.append('resume', resume);

        try {
            await API.post(`/jobs/apply/${selectedJob}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Applied successfully!');
            setSelectedJob(null); // Reset after applying
            setResume(null); // Reset the resume file input
            // Re-fetch jobs and applications to reflect the new state
            fetchJobs();
            fetchApplications();
        } catch (error) {
            console.error('Error applying for job:', error.response?.data || error.message);
            alert('Failed to apply for job.');
        }
    };

    const handleLogout = () => {
        // Clear session or token (depending on your app's authentication flow)
        localStorage.removeItem('authToken'); // Example if using localStorage for token
        navigate('/login'); // Redirect to the login page using navigate
    };

    return (
        <div>
            <h1>User Dashboard</h1>

            <button onClick={handleLogout}>Logout</button> {/* Logout button */}

            <h2>Available Jobs</h2>
            {jobs.length > 0 ? (
                jobs.map((job) => (
                    <div key={job._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                        <h3>{job.title}</h3>
                        <p>{job.description}</p>
                        {selectedJob === job._id ? (
                            <div>
                                <input
                                    type="file"
                                    onChange={(e) => setResume(e.target.files[0])}
                                    accept=".pdf,.doc,.docx"
                                />
                                <button onClick={handleApply}>Submit Application</button>
                                <button onClick={() => setSelectedJob(null)}>Cancel</button>
                            </div>
                        ) : (
                            <button onClick={() => setSelectedJob(job._id)}>Apply Now</button>
                        )}
                    </div>
                ))
            ) : (
                <p>No jobs available at the moment.</p>
            )}

            <h2>Your Applications</h2>
            {applications.length > 0 ? (
                applications.map((app) => (
                    <div key={app.jobId} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                        <p><strong>Job Title:</strong> {app.title}</p>
                        <p><strong>Status:</strong> {app.application.status}</p>
                    </div>
                ))
            ) : (
                <p>You haven't applied for any jobs yet.</p>
            )}
        </div>
    );
};

export default UserDashboard;
