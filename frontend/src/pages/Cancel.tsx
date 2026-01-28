import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft } from 'lucide-react';

const Cancel = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 text-center max-w-lg">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-8">
                    <XCircle className="w-10 h-10 text-red-600" />
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                    Payment Cancelled
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Your payment was not processed. No charges were made to your account. You can try again whenever you're ready.
                </p>
                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-4 px-8 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-2xl transition-all transform hover:scale-[1.02] flex items-center justify-center"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Home
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full py-4 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 transition-all transform hover:scale-[1.02]"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cancel;
