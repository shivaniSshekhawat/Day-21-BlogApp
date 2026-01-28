import { type Blog } from '../types';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
    blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
    return (
        <Link to={`/blog/${blog._id}`} className="block group">
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
                <div className="p-6 flex-grow">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                        <span className="flex items-center bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full text-xs font-semibold">
                           Article
                        </span>
                        {blog.isPremium && (
                            <span className="flex items-center bg-amber-50 text-amber-700 px-2 py-1 rounded-full text-xs font-semibold">
                               Premium
                            </span>
                        )}
                        <span>•</span>
                        <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {blog.title}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                        {blog.content}
                    </p>
                </div>
                <div className="px-6 pb-6 mt-auto">
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                                    {blog.author.name.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">{blog.author.name}</p>
                            </div>
                        </div>
                        <span className="text-indigo-600 font-semibold text-sm flex items-center group-hover:translate-x-1 transition-transform">
                            Read More <ArrowRight className="w-4 h-4 ml-1" />
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
