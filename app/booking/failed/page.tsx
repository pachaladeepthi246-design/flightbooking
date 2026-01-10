'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { XCircle, RefreshCw, Home, HelpCircle } from 'lucide-react';

export default function BookingFailedPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const error = searchParams.get('error') || 'Payment processing failed';

    const commonIssues = [
        'Insufficient funds in your account',
        'Card declined by your bank',
        'Incorrect card details entered',
        'Network connection interrupted',
        'Payment gateway timeout',
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                {/* Error Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    {/* Error Icon */}
                    <div className="mb-6 flex justify-center">
                        <XCircle className="w-24 h-24 text-red-500" />
                    </div>

                    {/* Error Message */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Payment Failed
                    </h1>
                    <p className="text-gray-600 mb-6">
                        We couldn't process your payment. Please try again.
                    </p>

                    {/* Error Details */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-sm text-red-900 font-semibold mb-1">Error Details:</p>
                        <p className="text-sm text-red-800">{error}</p>
                    </div>

                    {/* Common Issues */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                        <p className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <HelpCircle className="w-4 h-4" />
                            Common Issues:
                        </p>
                        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                            {commonIssues.map((issue, index) => (
                                <li key={index}>{issue}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={() => router.back()}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                            <RefreshCw className="w-5 h-5" />
                            Try Again
                        </button>

                        <button
                            onClick={() => router.push('/dashboard')}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Home className="w-5 h-5" />
                            Go to Dashboard
                        </button>
                    </div>

                    {/* Help Text */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                            Still having issues?{' '}
                            <a href="mailto:support@bookinghub.com" className="text-primary-600 hover:underline font-semibold">
                                Contact Support
                            </a>
                        </p>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <p className="text-sm text-blue-900">
                        <strong>💡 Tip:</strong> Make sure your card is enabled for online transactions and has sufficient balance.
                    </p>
                </div>
            </div>
        </div>
    );
}
