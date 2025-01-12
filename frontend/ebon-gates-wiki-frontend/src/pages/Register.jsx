import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = e => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await axios.post('http://localhost:5000/api/auth/register', formData);
            setLoading(false);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            setLoading(false);
        }
    };

    return (
        <div className='max-w-md mx-auto'>
            <h2 className='text-2xl font-bold mb-4'>Register</h2>
            {error && <p className='text-red-500 mb-4'>{error}</p>}
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className='block text-gray-700'>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
                    />
                </div>
                <div>
                    <label className='block text-gray-700'>Password</label>
                    <input
                        type='password'
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
                    />
                </div>
                <button
                    type='submit'
                    disabled={loading}
                    className='w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 disabled:bg-green-300'
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            <p className="mt-4 text-center">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-500 hover:underline">
                Login here
                </Link>
            </p>
        </div>
    )
}

export default Register;