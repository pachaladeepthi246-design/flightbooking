'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Download, Home, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';

function SuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [bookingId, setBookingId] = useState('');

    useEffect(() => {
        // Trigger confetti animation
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        const id = searchParams.get('bookingId');
        if (id) setBookingId(id);
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                {/* Success Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    {/* Success Icon */}
                    <div className="mb-6 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
                            <CheckCircle className="w-24 h-24 text-green-500 relative" />
                        </div>
                    </div>

                    {/* Success Message */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Booking Confirmed!
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Your payment was successful and your booking has been confirmed.
                    </p>

                    {/* Booking ID */}
                    {bookingId && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <p className="text-sm text-gray-600 mb-1">Booking ID</p>
                            <p className="text-lg font-mono font-semibold text-gray-900">{bookingId}</p>
                        </div>
                    )}

                    {/* Info Message */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                        <p className="text-sm text-blue-900">
                            <strong>What's next?</strong>
                        </p>
                        <ul className="text-sm text-blue-800 mt-2 space-y-1 list-disc list-inside">
                            <li>Confirmation email sent to your inbox</li>
                            <li>Check booking details in your dashboard</li>
                            <li>Download invoice for your records</li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={() => router.push(`/booking/${bookingId}`)}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                            <Calendar className="w-5 h-5" />
                            View Booking Details
                        </button>

                        <button
                            onClick={() => router.push('/dashboard')}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Home className="w-5 h-5" />
                            Go to Dashboard
                        </button>

                        <button
                            onClick={() => {
                                // TODO: Implement invoice download
                                alert('Invoice download will be implemented');
                            }}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 text-primary-600 hover:text-primary-700 transition-colors"
                        >
                            <Download className="w-5 h-5" />
                            Download Invoice
                        </button>
                    </div>
                </div>

                {/* Additional Info */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Need help? Contact our support team at{' '}
                    <a href="mailto:support@bookinghub.com" className="text-primary-600 hover:underline">
                        support@bookinghub.com
                    </a>
                </p>
            </div>
        </div>
    );
}

export default function BookingSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
