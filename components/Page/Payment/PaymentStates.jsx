import Link from 'next/link';

export function PaymentLoadingState() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm text-gray-500">Verifying payment...</p>
            </div>
        </div>
    );
}

export function PaymentErrorState({ message }) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border border-gray-100 w-full max-w-md p-8 text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Something went wrong
                </h2>
                <p className="text-sm text-gray-500 mb-6">{message}</p>
                <Link
                    href="/dashboard"
                    className="inline-block bg-gray-900 text-white text-sm font-medium py-2.5 px-6 rounded-xl hover:bg-gray-800 transition-colors"
                >
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
}