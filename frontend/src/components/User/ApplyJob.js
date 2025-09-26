import React, { useState } from 'react';
import API from '../../api';

const ApplyJob = ({ jobId }) => {
    const [resume, setResume] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('resume', resume);

        try {
            await API.post(`/jobs/apply/${jobId}`, formData);
            alert('Application submitted successfully');
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Apply for Job</h2>
            <input
                type="file"
                onChange={(e) => setResume(e.target.files[0])}
                accept=".pdf"
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default ApplyJob;
