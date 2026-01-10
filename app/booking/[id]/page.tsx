'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { formatCurrency, formatDate, formatTime } from '@/lib/utils';
import { Calendar, MapPin, Users, CreditCard, Download, Share2, Mail } from 'lucide-react';

interface Booking {
    id: string;
    bookingId: string;
    status: string;
    totalAmount: number;
    checkIn: string;
    checkOut: string;
    guests: number;
    hotel: {
        name: string;
        address: string;
        city: string;
        images: { url: string }[];
    };
    room: {
        name: string;
        type: string;
    };
    user: {
        name: string;
        email: string;
        phone?: string;
    };
    payment?: {
        status: string;
        method: string;
        transactionId: string;
    };
    createdAt: string;
}

export default function BookingDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [booking, setBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBooking();
    }, [params.id]);

    const fetchBooking = async () => {
        try {
            const res = await fetch(`/api/bookings/${params.id}`);
            const data = await res.json();

            if (data.success) {
                setBooking(data.booking);
            } else {
                setError(data.error || 'Booking not found');
            }
        } catch (err) {
            setError('Failed to load booking details');
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadInvoice = () => {
        // TODO: Implement PDF generation
        alert('Invoice download will be implemented');
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `Booking ${booking?.bookingId}`,
                text: `My booking at ${booking?.hotel.name}`,
                url: window.location.href,
            });
        }
    };

    const handleCancelBooking = async () => {
        if (!confirm('Are you sure you want to cancel this booking?')) return;

        try {
            const res = await fetch(`/api/bookings/${params.id}/cancel`, {
                method: 'POST',
            });
            const data = await res.json();

            if (data.success) {
                alert('Booking cancelled successfully');
                fetchBooking();
            } else {
                alert(data.error || 'Failed to cancel booking');
            }
        } catch (err) {
            alert('Failed to cancel booking');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (error || !booking) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Not Found</h1>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const statusColors = {
        PENDING: 'bg-yellow-100 text-yellow-800',
        CONFIRMED: 'bg-green-100 text-green-800',
        CANCELLED: 'bg-red-100 text-red-800',
        COMPLETED: 'bg-blue-100 text-blue-800',
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Booking Details</h1>
                            <p className="text-gray-600">Booking ID: {booking.bookingId}</p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColors[booking.status as keyof typeof statusColors]}`}>
                            {booking.status}
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleDownloadInvoice}
                            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                        >
                            <Download className="w-4 h-4" />
                            Download Invoice
                        </button>
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <Share2 className="w-4 h-4" />
                            Share
                        </button>
                        {booking.status === 'CONFIRMED' && (
                            <button
                                onClick={handleCancelBooking}
                                className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                            >
                                Cancel Booking
                            </button>
                        )}
                    </div>
                </div>

                {/* Hotel Details */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Hotel Information</h2>
                    <div className="flex gap-4">
                        {booking.hotel.images?.[0] && (
                            <img
                                src={booking.hotel.images[0].url}
                                alt={booking.hotel.name}
                                className="w-32 h-32 object-cover rounded-lg"
                            />
                        )}
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">{booking.hotel.name}</h3>
                            <p className="text-gray-600 flex items-center gap-2 mt-2">
                                <MapPin className="w-4 h-4" />
                                {booking.hotel.address}, {booking.hotel.city}
                            </p>
                            <p className="text-gray-700 mt-2">
                                <span className="font-semibold">Room:</span> {booking.room.name} ({booking.room.type})
                            </p>
                        </div>
                    </div>
                </div>

                {/* Booking Details */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Booking Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-primary-600" />
                            <div>
                                <p className="text-sm text-gray-600">Check-in</p>
                                <p className="font-semibold">{formatDate(booking.checkIn, 'long')}</p>
                                <p className="text-sm text-gray-600">{formatTime(booking.checkIn)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-primary-600" />
                            <div>
                                <p className="text-sm text-gray-600">Check-out</p>
                                <p className="font-semibold">{formatDate(booking.checkOut, 'long')}</p>
                                <p className="text-sm text-gray-600">{formatTime(booking.checkOut)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-primary-600" />
                            <div>
                                <p className="text-sm text-gray-600">Guests</p>
                                <p className="font-semibold">{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <CreditCard className="w-5 h-5 text-primary-600" />
                            <div>
                                <p className="text-sm text-gray-600">Total Amount</p>
                                <p className="font-semibold text-lg">{formatCurrency(booking.totalAmount)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Guest Details */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Guest Information</h2>
                    <div className="space-y-2">
                        <p><span className="font-semibold">Name:</span> {booking.user.name}</p>
                        <p className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {booking.user.email}
                        </p>
                        {booking.user.phone && (
                            <p><span className="font-semibold">Phone:</span> {booking.user.phone}</p>
                        )}
                    </div>
                </div>

                {/* Payment Details */}
                {booking.payment && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Information</h2>
                        <div className="space-y-2">
                            <p><span className="font-semibold">Status:</span> {booking.payment.status}</p>
                            <p><span className="font-semibold">Method:</span> {booking.payment.method}</p>
                            <p><span className="font-semibold">Transaction ID:</span> {booking.payment.transactionId}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
