import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, PartyPopper } from 'lucide-react';

const Success = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        // In a real app, you would verify the session on the backend here
        // For this demo, we'll assume the webhook will handle it, or we just show success
        if (!sessionId) {
            navigate('/');
        }
    }, [sessionId, navigate]);

    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 text-center max-w-lg">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-8">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 flex items-center justify-center">
                    Payment Successful! <PartyPopper className="ml-3 text-amber-500" />
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Thank you for your purchase! Your account has been upgraded to Premium status. You now have unlimited access to all exclusive stories and insights.
                </p>
                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-4 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 transition-all transform hover:scale-[1.02]"
                    >
                        Go to Dashboard
                    </button>
                    <p className="text-sm text-gray-400">
                        A confirmation email has been sent to your registered address.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Success;
