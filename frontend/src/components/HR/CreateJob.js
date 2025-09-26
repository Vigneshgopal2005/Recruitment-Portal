import React, { useState } from 'react';
import API from '../../api';

const CreateJob = ({ onJobCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleCreateJob = async () => {
        if (!title || !description) {
            alert('Please provide both a title and description.');
            return;
        }

        try {
            await API.post('/jobs/create', { title, description });
            alert('Job created successfully!');
            setTitle(''); // Reset form fields
            setDescription('');
            onJobCreated(); // Notify parent component to refresh the job list
        } catch (error) {
            console.error('Error creating job:', error);
            alert('Failed to create job. Please try again.');
        }
    };

    return (
        <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <h2>Create New Job</h2>
            <input
                type="text"
                placeholder="Job Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ display: 'block', marginBottom: '10px', padding: '5px', width: '100%' }}
            />
            <textarea
                placeholder="Job Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ display: 'block', marginBottom: '10px', padding: '5px', width: '100%', height: '100px' }}
            />
            <button
                style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
                onClick={handleCreateJob}
            >
                Create Job
            </button>
        </div>
    );
};

export default CreateJob;
