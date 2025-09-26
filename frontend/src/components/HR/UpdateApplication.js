import React, { useEffect, useState } from 'react';
import API from '../../api'; // your Axios instance

const UpdateApplication = ({ jobId }) => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchApplications = async () => {
            setLoading(true);
            try {
                const { data } = await API.get(`/jobs/${jobId}/applications`);
                setApplications(data.applications);
            } catch (error) {
                console.error('Error fetching applications:', error);
                alert('Failed to fetch applications.');
            }
            setLoading(false);
        };

        if (jobId) {
            fetchApplications();
        }
    }, [jobId]);

    const updateStatus = async (applicationId, newStatus, applicantEmail, applicantName) => {
        setLoading(true);
        try {
            // First, update the application status
            await API.patch(`/jobs/update-status/${jobId}/${applicationId}`, { status: newStatus });
    
            // Send email for accepted, waiting, and rejected statuses
            await API.post('/send-email', {
                to: applicantEmail,
                name: applicantName,
                jobId: jobId,
                status: newStatus, // Pass status here
            });
    
            // Update local state
            setApplications(prevApps =>
                prevApps.map(app =>
                    app._id === applicationId ? { ...app, status: newStatus } : app
                )
            );
    
            alert(`Application ${newStatus} successfully!`);
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update application status.');
        }
        setLoading(false);
    };
    
    return (
        <div>
            <h2>Applications</h2>
            {loading && <p>Loading...</p>}
            {applications.length === 0 && !loading && <p>No applications found.</p>}
            {applications.map(app => (
                <div key={app._id} style={{ border: '1px solid gray', padding: '10px', marginBottom: '10px' }}>
                    <p><strong>Name:</strong> {app.userId?.name}</p>
                    <p><strong>Email:</strong> {app.userId?.email}</p>
                    <p>
                        <strong>Resume:</strong> {' '}
                        <a href={`http://localhost:5000/${app.resume}`} target="_blank" rel="noopener noreferrer">
                            View Resume
                        </a>
                    </p>
                    <p><strong>Status:</strong> {app.status}</p>
                    <button onClick={() => updateStatus(app._id, 'waiting', app.userId?.email, app.userId?.name)}>Waiting</button>
                    <button onClick={() => updateStatus(app._id, 'accepted', app.userId?.email, app.userId?.name)}>Accept</button>
                    <button onClick={() => updateStatus(app._id, 'rejected', app.userId?.email, app.userId?.name)}>Reject</button>
                </div>
            ))}
        </div>
    );
    
};

export default UpdateApplication;
