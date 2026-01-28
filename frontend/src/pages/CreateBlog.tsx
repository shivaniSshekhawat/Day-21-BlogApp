import { useState } from 'react';
import api from '../api.ts';
import { useNavigate } from 'react-router-dom';
import { PenTool, Info } from 'lucide-react';
import toast from 'react-hot-toast';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPremium, setIsPremium] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/blogs', { title, content, isPremium });
            toast.success('Story submitted! An admin will review and publish it soon.', {
                duration: 5000,
            });
            navigate('/');
        } catch (error) {
            console.error('Failed to create blog', error);
            toast.error('Failed to submit story. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12">
                <div className="flex items-center space-x-4 mb-8">
                     <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                        <PenTool className="w-6 h-6 text-indigo-600" />
                     </div>
                     <div>
                        <h1 className="text-2xl font-bold text-gray-900">Write a New Story</h1>
                        <p className="text-gray-500">Share your thoughts with the world</p>
                     </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <input
                            type="text"
                            placeholder="Enter your title..."
                            className="w-full text-4xl font-bold text-gray-900 placeholder-gray-300 border-none focus:ring-0 px-0 outline-none"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <textarea
                            placeholder="Tell your story..."
                            rows={12}
                            className="w-full text-lg text-gray-700 placeholder-gray-300 border-none focus:ring-0 px-0 outline-none resize-none leading-relaxed"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="flex items-center space-x-2 pb-6">
                        <input
                            id="premium-toggle"
                            type="checkbox"
                            checked={isPremium}
                            onChange={(e) => setIsPremium(e.target.checked)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                        />
                        <label htmlFor="premium-toggle" className="text-sm font-medium text-gray-700 cursor-pointer flex items-center">
                            Mark as Premium Content
                        </label>
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                        <div className="flex items-center text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-lg">
                            <Info className="w-4 h-4 mr-2" />
                            Only an admin can publish your story after review.
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Submitting...' : 'Submit for Review'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBlog;
