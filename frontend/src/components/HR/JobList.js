import React, { useEffect, useState } from 'react';
import API from '../../api';

const JobList = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { data } = await API.get('/jobs');
                setJobs(data);
            } catch (error) {
                alert(error.response.data.message);
            }
        };
        fetchJobs();
    }, []);

    return (
        <div>
            <h2>Job List</h2>
            {jobs.map((job) => (
                <div key={job._id}>
                    <h3>{job.title}</h3>
                    <p>{job.description}</p>
                </div>
            ))}
        </div>
    );
};

export default JobList;
