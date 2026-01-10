'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Users, Eye, XCircle, Star, Filter } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

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
        city: string;
        images: { url: string }[];
    };
    room: {
        name: string;
    };
    createdAt: string;
}

export default function UserBookingsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        } else if (session?.user) {
            fetchBookings();
        }
    }, [session, status, router, filter]);

    const fetchBookings = async () => {
        try {
            const res = await fetch(`/api/bookings?status=${filter}`);
            const data = await res.json();
            if (data.success) {
                setBookings(data.bookings);
            }
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId: string) => {
        if (!confirm('Are you sure you want to cancel this booking?')) return;

        try {
            const res = await fetch(`/api/bookings/${bookingId}/cancel`, {
                method: 'POST',
            });
            const data = await res.json();

            if (data.success) {
                alert('Booking cancelled successfully');
                fetchBookings();
            } else {
                alert(data.error || 'Failed to cancel booking');
            }
        } catch (error) {
            alert('Failed to cancel booking');
        }
    };

    const statusColors = {
        PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        CONFIRMED: 'bg-green-100 text-green-800 border-green-200',
        CANCELLED: 'bg-red-100 text-red-800 border-red-200',
        COMPLETED: 'bg-blue-100 text-blue-800 border-blue-200',
    };

    const filters = ['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];

    if (status === 'loading' || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
                    <p className="text-gray-600">Manage and track all your bookings</p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                    <div className="flex items-center gap-2 flex-wrap">
                        <Filter className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-semibold text-gray-700">Filter:</span>
                        {filters.map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bookings List */}
                {bookings.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
                        <p className="text-gray-600 mb-6">
                            {filter === 'ALL'
                                ? "You haven't made any bookings yet"
                                : `No ${filter.toLowerCase()} bookings`}
                        </p>
                        <button
                            onClick={() => router.push('/hotels')}
                            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                        >
                            Explore Hotels
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Hotel Image */}
                                        {booking.hotel.images?.[0] && (
                                            <img
                                                src={booking.hotel.images[0].url}
                                                alt={booking.hotel.name}
                                                className="w-full md:w-48 h-48 object-cover rounded-lg"
                                            />
                                        )}

                                        {/* Booking Details */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                        {booking.hotel.name}
                                                    </h3>
                                                    <p className="text-gray-600 flex items-center gap-2">
                                                        <MapPin className="w-4 h-4" />
                                                        {booking.hotel.city}
                                                    </p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[booking.status as keyof typeof statusColors]}`}>
                                                    {booking.status}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                <div>
                                                    <p className="text-sm text-gray-600">Check-in</p>
                                                    <p className="font-semibold">{formatDate(booking.checkIn)}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">Check-out</p>
                                                    <p className="font-semibold">{formatDate(booking.checkOut)}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">Guests</p>
                                                    <p className="font-semibold flex items-center gap-1">
                                                        <Users className="w-4 h-4" />
                                                        {booking.guests}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm text-gray-600">Booking ID</p>
                                                    <p className="font-mono text-sm font-semibold">{booking.bookingId}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-600">Total Amount</p>
                                                    <p className="text-2xl font-bold text-primary-600">
                                                        {formatCurrency(booking.totalAmount)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                                        <button
                                            onClick={() => router.push(`/booking/${booking.id}`)}
                                            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View Details
                                        </button>

                                        {booking.status === 'CONFIRMED' && (
                                            <button
                                                onClick={() => handleCancelBooking(booking.id)}
                                                className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                                            >
                                                <XCircle className="w-4 h-4" />
                                                Cancel
                                            </button>
                                        )}

                                        {booking.status === 'COMPLETED' && (
                                            <button
                                                onClick={() => router.push(`/booking/${booking.id}/review`)}
                                                className="flex items-center gap-2 px-4 py-2 border border-primary-300 text-primary-600 rounded-lg hover:bg-primary-50"
                                            >
                                                <Star className="w-4 h-4" />
                                                Write Review
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
