import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { performLogout } from '../store/slices/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);

    const handleLogout = async () => {
        await dispatch(performLogout());
        navigate('/login');
    }

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-xl font-bold">
                    Game Wiki
                </Link>
                <div className="flex space-x-4">
                {user ? (
                    <>
                    <Link to="/create" className="text-gray-300 hover:text-white">
                        Create Page
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="text-gray-300 hover:text-white"
                    >
                        Logout
                    </button>
                    </>
                ) : (
                    <>
                    <Link to="/login" className="text-gray-300 hover:text-white">
                        Login
                    </Link>
                    <Link to="/register" className="text-gray-300 hover:text-white">
                        Register
                    </Link>
                    </>
                )}
                </div>
            </div>
        </nav>
    )
};

export default Navbar;