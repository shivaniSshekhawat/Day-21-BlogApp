import { useEffect, useState } from 'react';
import api from '../api.ts';
import { type Blog } from '../types';
import { Check, Trash2, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            const { data } = await api.get('/blogs/admin');
            setBlogs(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handlePublish = async (id: string) => {
        try {
            await api.put(`/blogs/${id}/publish`);
            toast.success('Blog published successfully!');
            fetchBlogs(); // Refresh
        } catch (error) {
            console.error('Failed to publish', error);
            toast.error('Failed to publish blog.');
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await api.delete(`/blogs/${id}`);
                toast.success('Blog deleted successfully!');
                fetchBlogs(); // Refresh
            } catch (error) {
                console.error('Failed to delete', error);
                toast.error('Failed to delete blog.');
            }
        }
    };

    if (loading) return (
         <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
         </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                     <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                     <p className="text-gray-500 mt-1">Manage contributions and content</p>
                </div>
                <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl font-semibold">
                    Total Posts: {blogs.length}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Author</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {blogs.map((blog) => (
                                <tr key={blog._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{blog.author.name}</div>
                                        <div className="text-xs text-gray-400">{blog.author.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {blog.isPublished ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <Check className="w-3 h-3 mr-1" /> Published
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                <Clock className="w-3 h-3 mr-1" /> Draft
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                        {!blog.isPublished && (
                                            <button
                                                onClick={() => handlePublish(blog._id)}
                                                className="text-indigo-600 hover:text-indigo-900 inline-flex items-center transition-colors"
                                                title="Publish"
                                            >
                                                <Check className="w-4 h-4 mr-1" /> Publish
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(blog._id)}
                                            className="text-red-600 hover:text-red-900 inline-flex items-center transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {blogs.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No blogs found in the system.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
