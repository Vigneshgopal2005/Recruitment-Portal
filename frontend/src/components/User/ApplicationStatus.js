import React, { useEffect, useState } from 'react';
import API from '../../api';

const ApplicationStatus = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const { data } = await API.get('/jobs/applications');
                setApplications(data);
            } catch (error) {
                alert(error.response.data.message);
            }
        };
        fetchApplications();
    }, []);

    return (
        <div>
            <h2>Application Status</h2>
            {applications.map((app) => (
                <div key={app.jobId}>
                    <h3>{app.title}</h3>
                    <p>Status: {app.application.status || 'Pending'}</p>
                </div>
            ))}
        </div>
    );
};

export default ApplicationStatus;
