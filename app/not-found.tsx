'use client';

import { useRouter } from 'next/navigation';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-purple-50 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                {/* 404 Animation */}
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 animate-pulse">
                        404
                    </h1>
                </div>

                {/* Error Message */}
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Page Not Found
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                    Oops! The page you're looking for seems to have taken a vacation.
                </p>

                {/* Suggestions */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Here's what you can do:
                    </h3>
                    <ul className="text-left space-y-3 text-gray-700">
                        <li className="flex items-start gap-3">
                            <span className="text-primary-600 font-bold">•</span>
                            <span>Check the URL for typos</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-primary-600 font-bold">•</span>
                            <span>Go back to the previous page</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-primary-600 font-bold">•</span>
                            <span>Visit our homepage</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-primary-600 font-bold">•</span>
                            <span>Search for what you need</span>
                        </li>
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-primary-600 text-primary-600 rounded-xl hover:bg-primary-50 transition-colors font-semibold"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </button>

                    <button
                        onClick={() => router.push('/')}
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold"
                    >
                        <Home className="w-5 h-5" />
                        Go Home
                    </button>

                    <button
                        onClick={() => router.push('/hotels')}
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-colors font-semibold"
                    >
                        <Search className="w-5 h-5" />
                        Explore Hotels
                    </button>
                </div>

                {/* Decorative Elements */}
                <div className="mt-12 text-gray-400">
                    <p className="text-sm">
                        Lost? Contact us at{' '}
                        <a href="mailto:support@bookinghub.com" className="text-primary-600 hover:underline">
                            support@bookinghub.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
