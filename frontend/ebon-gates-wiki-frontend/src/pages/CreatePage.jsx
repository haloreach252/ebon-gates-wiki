import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import DualEditor from '../components/DualEditor';

const CreatePage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleTitleChange = e => {
        setFormData(prev => ({
            ...prev,
            title: e.target.value
        }))
    }

    const handleContentChange = (value) => {
        setFormData(prev => ({
            ...prev,
            content: value
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError(null)

        try {
            await axios.post('http://localhost:5000/api/pages', formData, { withCredentials: true });
            setLoading(false);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create page');
            setLoading(false);
        }
    }

    return (
        <div className='max-w-2xl mx-auto'>
            <h2 className='text-2xl font-bold mb-4'>Create New Page</h2>
            {error && <p className='text-red-500 mb-4'>{error}</p>}
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleTitleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Content</label>
                    <DualEditor
                        initialContent={formData.content}
                        onContentChange={handleContentChange}
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 disabled:bg-purple-300"
                >
                    {loading ? 'Creating...' : 'Create Page'}
                </button>
            </form>
        </div>
    )
}

export default CreatePage;