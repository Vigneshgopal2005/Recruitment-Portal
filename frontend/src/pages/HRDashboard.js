import React, { useState, useEffect } from 'react';
import API from '../api';
import CreateJob from '../components/HR/CreateJob';
import UpdateApplication from '../components/HR/UpdateApplication';
import '../HRDashboard.css';
const HRDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);

    // Fetch jobs from the server
    const fetchJobs = async () => {
        try {
            const { data } = await API.get('/jobs');
            setJobs(data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    // Fetch jobs when the component loads
    useEffect(() => {
        fetchJobs();
    }, []);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Assuming you're using token-based auth
        window.location.href = '/login'; // Redirect to login page
    };

    return (
        <div>
            <h1>HR Dashboard</h1>

            {/* Logout Button */}
            <button
                style={{
                    backgroundColor: '#f44336',
                    color: 'white',
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    float: 'right',
                }}
                onClick={handleLogout}
            >
                Logout
            </button>

            {/* Create New Job Section */}
            <CreateJob
                onJobCreated={() => {
                    fetchJobs(); // Refresh the job list after a new job is created
                }}
            />

            {/* Job Listings */}
            <h2>Job Listings</h2>
            {jobs.length > 0 ? (
                jobs.map((job) => (
                    <div key={job._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                        <h3>{job.title}</h3>
                        <p>{job.description}</p>
                        <button onClick={() => setSelectedJob(job._id)}>View Applications</button>
                    </div>
                ))
            ) : (
                <p>No jobs available at the moment.</p>
            )}

            {/* View Applications for a Selected Job */}
            {selectedJob && <UpdateApplication jobId={selectedJob} />}
        </div>
    );
};

export default HRDashboard;
