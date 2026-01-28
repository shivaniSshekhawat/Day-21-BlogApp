import { useEffect, useState } from 'react';
import api from '../api.ts';
import { type Blog } from '../types';
import BlogCard from '../components/BlogCard.tsx';
import { Loader2 } from 'lucide-react';

const Home = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await api.get('/blogs');
                setBlogs(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="text-center py-12 bg-white rounded-3xl shadow-sm border border-gray-100 mb-8 bg-[url('https://images.unsplash.com/photo-1519681393798-2f77f37d25e6?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>
                 <div className="relative z-10 p-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Latest Stories</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover insights, tutorials, and stories from our community of writers.
                    </p>
                 </div>
            </div>
            
            {blogs.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    No stories published yet. Submit your own and wait for admin approval!
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
