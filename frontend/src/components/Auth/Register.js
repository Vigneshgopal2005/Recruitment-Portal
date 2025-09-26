import React, { useState } from 'react';
import API from '../../api';
import './Login.css'
const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', form);
            alert('Registration successful');
            window.location.href = '/login';
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="user">User</option>
                <option value="hr">HR</option>
            </select>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
