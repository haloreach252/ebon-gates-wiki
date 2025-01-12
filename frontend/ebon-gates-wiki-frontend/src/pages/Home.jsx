import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchPages } from '../store/slices/pagesSlice';
import { Link } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const { items: pages, loading, error } = useSelector(state => state.pages);

    useEffect(() => {
        dispatch(fetchPages());
    }, [dispatch]);

    if (loading) return <p className="text-center">Loading pages...</p>
    if (error) return <p className="text-center text-red-500">Error: {error}</p>

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Wiki Pages</h1>
            {pages.length === 0 ? (
                <p>No pages available. Start by creating a new page!</p>
            ) : (
                <ul className="space-y-2">
                    {pages.map(page => (
                        <li key={page.id}>
                            <Link to={`/pages/${page.id}`} className="text-blue-500 hover:underline">
                                {page.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Home;