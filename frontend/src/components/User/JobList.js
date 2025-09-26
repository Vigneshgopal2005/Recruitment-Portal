import React, { useState } from 'react';
import API from '../../api';

const JobList = ({ jobs }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleApply = async (jobId) => {
        if (!selectedFile) {
            alert('Please upload your resume before applying.');
            return;
        }

        const formData = new FormData();
        formData.append('resume', selectedFile);

        try {
            await API.post(`/jobs/apply/${jobId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Applied successfully!');
        } catch (error) {
            console.error('Error applying for job:', error.response?.data || error.message);
            alert('Failed to apply for job. Please try again.');
        }
    };

    return (
        <div>
            {jobs.map((job) => (
                <div key={job._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                    <h3>{job.title}</h3>
                    <p>{job.description}</p>

                    <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                    <button onClick={() => handleApply(job._id)}>Apply Now</button>
                </div>
            ))}
        </div>
    );
};

export default JobList;
