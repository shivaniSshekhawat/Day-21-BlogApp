import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { LogOut, PenSquare, Shield, Sparkles } from 'lucide-react';
import api from '../api.ts';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">BlogApp</h1>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user && !user.isPremium && user.role !== 'admin' && (
                            <button
                                onClick={async () => {
                                    try {
                                        const { data } = await api.post('/payments/create-checkout-session');
                                        window.location.href = data.url;
                                    } catch (err) {
                                        console.error('Payment error', err);
                                    }
                                }}
                                className="hidden md:flex items-center px-4 py-2 bg-amber-100 text-amber-700 rounded-xl text-sm font-bold hover:bg-amber-200 transition-colors"
                            >
                                <Sparkles className="w-4 h-4 mr-1 text-amber-600" />
                                Go Premium
                            </button>
                        )}
                        {user ? (
                            <>
                                <Link to="/create" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors">
                                    <PenSquare className="w-4 h-4 mr-1" />
                                    Write
                                </Link>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors">
                                        <Shield className="w-4 h-4 mr-1" />
                                        Admin
                                    </Link>
                                )}
                                <div className="flex items-center ml-4 space-x-4">
                                    <span className="text-sm font-semibold text-gray-700">{user.name}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-lg shadow-indigo-200"
                                    >
                                        <LogOut className="w-4 h-4 mr-1" />
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="space-x-4">
                                <Link to="/login" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Login</Link>
                                <Link to="/signup" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-colors">Sign up</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
