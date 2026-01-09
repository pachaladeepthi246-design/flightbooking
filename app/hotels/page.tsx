'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Search,
    MapPin,
    Calendar,
    Users,
    SlidersHorizontal,
    Star,
    Wifi,
    Car,
    Utensils,
    Waves,
    Dumbbell,
    Heart,
    Share2,
    ChevronLeft,
    Hotel as HotelIcon,
    X
} from 'lucide-react';

// Mock data - replace with real API calls
const mockHotels = [
    {
        id: '1',
        name: 'Luxury Beach Resort & Spa',
        location: 'Goa, India',
        rating: 4.8,
        reviews: 1234,
        price: 5999,
        image: '/hotels/hotel1.jpg',
        amenities: ['Pool', 'Wifi', 'Parking', 'Restaurant', 'Gym'],
        distance: '2.5 km from beach',
    },
    {
        id: '2',
        name: 'Mountain View Hotel',
        location: 'Manali, Himachal Pradesh',
        rating: 4.6,
        reviews: 856,
        price: 3499,
        image: '/hotels/hotel2.jpg',
        amenities: ['Wifi', 'Parking', 'Restaurant', 'Room Service'],
        distance: '1 km from Mall Road',
    },
    {
        id: '3',
        name: 'Heritage Palace Hotel',
        location: 'Jaipur, Rajasthan',
        rating: 4.9,
        reviews: 2103,
        price: 7999,
        image: '/hotels/hotel3.jpg',
        amenities: ['Pool', 'Wifi', 'Parking', 'Restaurant', 'Gym', 'Spa'],
        distance: '500m from City Palace',
    },
    {
        id: '4',
        name: 'Business Suites Downtown',
        location: 'Mumbai, Maharashtra',
        rating: 4.5,
        reviews: 678,
        price: 4299,
        image: '/hotels/hotel4.jpg',
        amenities: ['Wifi', 'Parking', 'Restaurant', 'Gym', 'Conference'],
        distance: '3 km from Gateway of India',
    },
];

export default function HotelsPage() {
    const [showFilters, setShowFilters] = useState(false);
    const [priceRange, setPriceRange] = useState([500, 50000]);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

    const amenitiesList = ['Pool', 'Wifi', 'Parking', 'Restaurant', 'Gym', 'Spa', 'AC', 'Breakfast'];

    const toggleAmenity = (amenity: string) => {
        setSelectedAmenities(prev =>
            prev.includes(amenity)
                ? prev.filter(a => a !== amenity)
                : [...prev, amenity]
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-40">
                <div className="container-custom">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                                <HotelIcon className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-display font-bold">BookingHub</span>
                        </Link>
                        <div className="flex items-center gap-4">
                            <Link href="/vendor" className="text-sm text-gray-600 hover:text-gray-900">List Property</Link>
                            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">Sign In</Link>
                            <Link href="/signup" className="btn-primary text-sm">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Search Bar */}
            <div className="bg-white border-b sticky top-16 z-30">
                <div className="container-custom py-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                        <div className="md:col-span-2">
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Where are you going?"
                                    className="input pl-10"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="date"
                                    className="input pl-10"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="date"
                                    className="input pl-10"
                                />
                            </div>
                        </div>
                        <div>
                            <button className="btn-primary w-full">
                                <Search className="w-5 h-5" />
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-custom py-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                            Hotels in Goa
                        </h1>
                        <p className="text-gray-600">{mockHotels.length} properties found</p>
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="btn-outline md:hidden"
                    >
                        <SlidersHorizontal className="w-5 h-5" />
                        Filters
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
                        <div className="card-premium p-6 sticky top-32">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-display font-bold">Filters</h2>
                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="lg:hidden text-gray-500 hover:text-gray-700"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6 pb-6 border-b">
                                <h3 className="font-semibold mb-4">Price Range</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span>₹{priceRange[0]}</span>
                                        <span>₹{priceRange[1]}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="500"
                                        max="50000"
                                        step="500"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            {/* Star Rating */}
                            <div className="mb-6 pb-6 border-b">
                                <h3 className="font-semibold mb-4">Star Rating</h3>
                                <div className="space-y-2">
                                    {[5, 4, 3, 2, 1].map((rating) => (
                                        <label key={rating} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedRating === rating}
                                                onChange={() => setSelectedRating(selectedRating === rating ? null : rating)}
                                                className="rounded"
                                            />
                                            <div className="flex items-center gap-1">
                                                {Array.from({ length: rating }).map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 fill-warning-500 text-warning-500" />
                                                ))}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Amenities */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-4">Amenities</h3>
                                <div className="space-y-2">
                                    {amenitiesList.map((amenity) => (
                                        <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedAmenities.includes(amenity)}
                                                onChange={() => toggleAmenity(amenity)}
                                                className="rounded"
                                            />
                                            <span className="text-sm">{amenity}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button className="btn-primary w-full">Apply Filters</button>
                        </div>
                    </div>

                    {/* Hotel Listings */}
                    <div className="lg:col-span-3 space-y-6">
                        {mockHotels.map((hotel) => (
                            <div key={hotel.id} className="card-premium overflow-hidden hover-lift">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Image */}
                                    <div className="md:col-span-1">
                                        <div className="aspect-[4/3] bg-gradient-to-br from-primary-400 to-secondary-400 relative">
                                            <div className="absolute top-4 right-4 flex gap-2">
                                                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                                    <Heart className="w-5 h-5 text-gray-700" />
                                                </button>
                                                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                                    <Share2 className="w-5 h-5 text-gray-700" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="md:col-span-2 p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="text-2xl font-display font-bold text-gray-900 mb-1">
                                                    {hotel.name}
                                                </h3>
                                                <p className="text-gray-600 flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    {hotel.location}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-5 h-5 fill-warning-500 text-warning-500" />
                                                        <span className="font-bold text-lg">{hotel.rating}</span>
                                                    </div>
                                                    <span className="text-sm text-gray-600">({hotel.reviews} reviews)</span>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-600 mb-4">{hotel.distance}</p>

                                        {/* Amenities */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {hotel.amenities.slice(0, 5).map((amenity, index) => (
                                                <span key={index} className="badge-primary text-xs">
                                                    {amenity}
                                                </span>
                                            ))}
                                            {hotel.amenities.length > 5 && (
                                                <span className="badge text-xs bg-gray-100 text-gray-700">
                                                    +{hotel.amenities.length - 5} more
                                                </span>
                                            )}
                                        </div>

                                        {/* Price and CTA */}
                                        <div className="flex items-end justify-between pt-4 border-t">
                                            <div>
                                                <p className="text-sm text-gray-600 mb-1">Starting from</p>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-3xl font-bold text-gray-900">₹{hotel.price.toLocaleString()}</span>
                                                    <span className="text-gray-600">/ night</span>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">+ ₹{Math.round(hotel.price * 0.22).toLocaleString()} taxes & fees</p>
                                            </div>
                                            <Link href={`/hotels/${hotel.id}`} className="btn-primary">
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Pagination */}
                        <div className="flex items-center justify-center gap-2 pt-8">
                            <button className="btn-outline">
                                <ChevronLeft className="w-5 h-5" />
                                Previous
                            </button>
                            <button className="btn bg-primary-600 text-white">1</button>
                            <button className="btn-ghost">2</button>
                            <button className="btn-ghost">3</button>
                            <button className="btn-outline">
                                Next
                                <ChevronLeft className="w-5 h-5 rotate-180" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
