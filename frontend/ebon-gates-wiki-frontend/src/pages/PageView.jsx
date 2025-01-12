import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

const PageView = () => {
    const { id } = useParams();
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/pages/${id}`)
        .then(res => {
            setPage(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <p>Loading...</p>
    if (!page) return <p>Page not found</p>

    return (
        <div>
            <h1 className='text-3xl font-bold mb-4'>{page.title}</h1>
            <ReactMarkdown className='prose'>{page.content}</ReactMarkdown>
        </div>
    )
}

export default PageView;