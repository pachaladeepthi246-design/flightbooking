'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Application error:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                {/* Error Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
                        <AlertTriangle className="w-24 h-24 text-red-500 relative" />
                    </div>
                </div>

                {/* Error Message */}
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Something Went Wrong
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    We encountered an unexpected error. Don't worry, our team has been notified.
                </p>

                {/* Error Details (Development) */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 text-left">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Details:</h3>
                        <pre className="text-sm text-red-600 overflow-auto max-h-40 bg-red-50 p-4 rounded">
                            {error.message}
                        </pre>
                        {error.digest && (
                            <p className="text-sm text-gray-600 mt-2">
                                Error ID: <code className="bg-gray-100 px-2 py-1 rounded">{error.digest}</code>
                            </p>
                        )}
                    </div>
                )}

                {/* Suggestions */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        What you can try:
                    </h3>
                    <ul className="text-left space-y-3 text-gray-700">
                        <li className="flex items-start gap-3">
                            <span className="text-red-600 font-bold">•</span>
                            <span>Refresh the page to try again</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-600 font-bold">•</span>
                            <span>Clear your browser cache and cookies</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-600 font-bold">•</span>
                            <span>Check your internet connection</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-600 font-bold">•</span>
                            <span>Contact support if the problem persists</span>
                        </li>
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold"
                    >
                        <RefreshCw className="w-5 h-5" />
                        Try Again
                    </button>

                    <button
                        onClick={() => window.location.href = '/'}
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                    >
                        <Home className="w-5 h-5" />
                        Go Home
                    </button>
                </div>

                {/* Support Contact */}
                <div className="mt-12 text-gray-600">
                    <p className="text-sm">
                        Need help?{' '}
                        <a href="mailto:support@bookinghub.com" className="text-primary-600 hover:underline font-semibold">
                            Contact Support
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
