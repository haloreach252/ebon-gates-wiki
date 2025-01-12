// src/pages/EditPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DualEditor from '../components/DualEditor';

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/pages/${id}`)
        setFormData({
          title: res.data.title,
          content: res.data.content,
        });
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch page")
        setLoading(false);
      }
    }

    fetchPage();
  }, [id])

  const handleTitleChange = e => {
    setFormData(prev => ({
      ...prev,
      title: e.target.value
    }));
  };

  const handleContentChange = (value) => {
    setFormData(prev => ({
      ...prev,
      content: value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitLoading(true);
    setError(null);
    try {
      await axios.put(`http://localhost:5000/api/pages/${id}`, formData, { withCredentials: true });
      setSubmitLoading(false);
      navigate(`/pages/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update page');
      setSubmitLoading(false);
    }
  };

  if (loading) return <p className="text-center">Loading page...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Page</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
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
          disabled={submitLoading}
          className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 disabled:bg-yellow-300"
        >
          {submitLoading ? 'Updating...' : 'Update Page'}
        </button>
      </form>
    </div>
  );
};

export default EditPage;
