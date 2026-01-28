import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api.ts';
import { type Blog } from '../types';
import { Calendar, User, ArrowLeft, Loader2, Lock, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';

const BlogDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await api.get(`/blogs/${id}`);
                setBlog(data);
            } catch (error) {
                console.error('Failed to fetch blog', error);
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchBlog();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
        );
    }

    if (!blog) return null;

    const canAccess = !blog.isPremium || (user && (user.isPremium || user.role === 'admin'));

    const handleUpgrade = async () => {
        try {
            const { data } = await api.post('/payments/create-checkout-session');
            window.location.href = data.url;
        } catch (error) {
            console.error('Payment failed', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <button
                onClick={() => navigate('/')}
                className="mb-8 flex items-center text-gray-600 hover:text-indigo-600 transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Feed
            </button>

            <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-64 md:h-96 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <div className="flex items-center space-x-4 mb-4">
                            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                                {blog.isPublished ? 'Published' : 'Draft'}
                            </span>
                            {blog.isPremium && (
                                <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center">
                                    <Sparkles className="w-3 h-3 mr-1" /> Premium
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
                            {blog.title}
                        </h1>
                        <div className="flex items-center space-x-6 text-white/90">
                            <div className="flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                <span className="font-medium">{blog.author.name}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 md:p-12 relative min-h-[400px]">
                    {!canAccess && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/60 backdrop-blur-md p-8 text-center rounded-b-3xl">
                            <div className="bg-indigo-600 p-4 rounded-full mb-6 shadow-xl shadow-indigo-200">
                                <Lock className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Premium Content</h2>
                            <p className="text-gray-600 mb-8 max-w-md">
                                This article is exclusive to our premium members. Upgrade today to unlock full access to all our latest stories and insights.
                            </p>
                            <button 
                                onClick={handleUpgrade}
                                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 hover:scale-105 transition-transform"
                            >
                                <Sparkles className="w-5 h-5 mr-2" />
                                Upgrade to Premium
                            </button>
                        </div>
                    )}
                    
                    <div className={`prose prose-lg max-w-none prose-indigo prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed ${!canAccess ? 'select-none blur-sm opacity-30 max-h-[300px] overflow-hidden' : ''}`}>
                        {blog.content.split('\n').map((paragraph: string, index: number) => (
                            <p key={index} className="mb-6 whitespace-pre-wrap">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </article>

            <div className="mt-12 p-8 bg-indigo-50 rounded-3xl border border-indigo-100 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-lg font-bold">
                        {blog.author.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-bold text-gray-900">{blog.author.name}</p>
                        <p className="text-sm text-gray-500">{blog.author.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
