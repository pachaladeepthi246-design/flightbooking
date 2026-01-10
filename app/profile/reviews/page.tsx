'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Star, Edit2, Trash2, MapPin, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Review {
    id: string;
    rating: number;
    comment: string;
    cleanliness?: number;
    service?: number;
    location?: number;
    value?: number;
    hotel: {
        name: string;
        city: string;
        images: { url: string }[];
    };
    createdAt: string;
}

export default function UserReviewsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        } else if (session?.user) {
            fetchReviews();
        }
    }, [session, status, router]);

    const fetchReviews = async () => {
        try {
            const res = await fetch('/api/reviews?userId=' + (session?.user as any)?.id);
            const data = await res.json();
            if (data.success) {
                setReviews(data.reviews);
            }
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteReview = async (reviewId: string) => {
        if (!confirm('Are you sure you want to delete this review?')) return;

        try {
            const res = await fetch(`/api/reviews/${reviewId}`, {
                method: 'DELETE',
            });
            const data = await res.json();

            if (data.success) {
                alert('Review deleted successfully');
                fetchReviews();
            } else {
                alert(data.error || 'Failed to delete review');
            }
        } catch (error) {
            alert('Failed to delete review');
        }
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-5 h-5 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                    />
                ))}
            </div>
        );
    };

    const filteredReviews = filter === 'ALL'
        ? reviews
        : reviews.filter(r => r.rating === parseInt(filter));

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
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Reviews</h1>
                    <p className="text-gray-600">Manage your hotel reviews and ratings</p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-gray-700">Filter by rating:</span>
                        {['ALL', '5', '4', '3', '2', '1'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {f === 'ALL' ? 'All' : `${f} Stars`}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Reviews List */}
                {filteredReviews.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                        <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews yet</h3>
                        <p className="text-gray-600 mb-6">
                            {filter === 'ALL'
                                ? "You haven't written any reviews yet"
                                : `No ${filter}-star reviews found`}
                        </p>
                        <button
                            onClick={() => router.push('/profile/bookings')}
                            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                        >
                            View My Bookings
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredReviews.map((review) => (
                            <div
                                key={review.id}
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Hotel Image */}
                                        {review.hotel.images?.[0] && (
                                            <img
                                                src={review.hotel.images[0].url}
                                                alt={review.hotel.name}
                                                className="w-full md:w-32 h-32 object-cover rounded-lg"
                                            />
                                        )}

                                        {/* Review Content */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                        {review.hotel.name}
                                                    </h3>
                                                    <p className="text-gray-600 flex items-center gap-2 text-sm">
                                                        <MapPin className="w-4 h-4" />
                                                        {review.hotel.city}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => router.push(`/reviews/${review.id}/edit`)}
                                                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                                                        title="Edit review"
                                                    >
                                                        <Edit2 className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteReview(review.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                        title="Delete review"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Rating */}
                                            <div className="mb-3">
                                                {renderStars(review.rating)}
                                            </div>

                                            {/* Comment */}
                                            <p className="text-gray-700 mb-4">{review.comment}</p>

                                            {/* Category Ratings */}
                                            {(review.cleanliness || review.service || review.location || review.value) && (
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                                                    {review.cleanliness && (
                                                        <div>
                                                            <p className="text-xs text-gray-600 mb-1">Cleanliness</p>
                                                            <div className="flex items-center gap-1">
                                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                                <span className="font-semibold">{review.cleanliness}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {review.service && (
                                                        <div>
                                                            <p className="text-xs text-gray-600 mb-1">Service</p>
                                                            <div className="flex items-center gap-1">
                                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                                <span className="font-semibold">{review.service}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {review.location && (
                                                        <div>
                                                            <p className="text-xs text-gray-600 mb-1">Location</p>
                                                            <div className="flex items-center gap-1">
                                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                                <span className="font-semibold">{review.location}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {review.value && (
                                                        <div>
                                                            <p className="text-xs text-gray-600 mb-1">Value</p>
                                                            <div className="flex items-center gap-1">
                                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                                <span className="font-semibold">{review.value}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Date */}
                                            <p className="text-sm text-gray-500 flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                Reviewed on {formatDate(review.createdAt, 'long')}
                                            </p>
                                        </div>
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
