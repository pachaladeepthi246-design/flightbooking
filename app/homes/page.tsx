'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Home,
    Calendar,
    Search,
    MapPin,
    Users,
    Hotel as HotelIcon,
    Star,
    Wifi,
    Utensils,
    Waves,
    Mountain,
    Heart,
    Share2,
} from 'lucide-react';

export default function HomesPage() {
    const mockHomes = [
        {
            id: '1',
            name: 'Luxury Beach Villa',
            type: 'Villa',
            location: 'Goa, India',
            bedrooms: 4,
            bathrooms: 3,
            guests: 8,
            price: 15999,
            image: '/homes/villa1.jpg',
            rating: 4.9,
            reviews: 156,
            amenities: ['Pool', 'WiFi', 'Kitchen', 'Beach Access', 'AC'],
            host: 'Superhost',
        },
        {
            id: '2',
            name: 'Mountain View Cottage',
            type: 'Cottage',
            location: 'Manali, Himachal Pradesh',
            bedrooms: 2,
            bathrooms: 2,
            guests: 4,
            price: 8999,
            image: '/homes/cottage1.jpg',
            rating: 4.8,
            reviews: 89,
            amenities: ['WiFi', 'Kitchen', 'Fireplace', 'Mountain View'],
            host: 'Superhost',
        },
        {
            id: '3',
            name: 'Heritage Haveli',
            type: 'Heritage Property',
            location: 'Jaipur, Rajasthan',
            bedrooms: 5,
            bathrooms: 4,
            guests: 10,
            price: 22999,
            image: '/homes/haveli1.jpg',
            rating: 5.0,
            reviews: 234,
            amenities: ['Pool', 'WiFi', 'Kitchen', 'Garden', 'AC', 'Parking'],
            host: 'Superhost',
        },
        {
            id: '4',
            name: 'Cozy Apartment',
            type: 'Apartment',
            location: 'Mumbai, Maharashtra',
            bedrooms: 2,
            bathrooms: 1,
            guests: 4,
            price: 4999,
            image: '/homes/apt1.jpg',
            rating: 4.6,
            reviews: 67,
            amenities: ['WiFi', 'Kitchen', 'AC', 'Gym'],
            host: 'Verified',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container-custom">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                                <HotelIcon className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-display font-bold">BookingHub</span>
                        </Link>
                        <div className="flex items-center gap-4">
                            <Link href="/hotels" className="text-sm text-gray-600 hover:text-gray-900">Hotels</Link>
                            <Link href="/flights" className="text-sm text-gray-600 hover:text-gray-900">Flights</Link>
                            <Link href="/cars" className="text-sm text-gray-600 hover:text-gray-900">Cars</Link>
                            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">Sign In</Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Search Section */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 py-12">
                <div className="container-custom">
                    <h1 className="text-4xl font-display font-bold text-white mb-2">Vacation Homes & Villas</h1>
                    <p className="text-white/90 mb-8">Find your perfect home away from home</p>

                    <div className="card-premium p-8">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <MapPin className="w-4 h-4 inline mr-1" />
                                    Where
                                </label>
                                <input
                                    type="text"
                                    placeholder="Search destinations"
                                    className="input"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Calendar className="w-4 h-4 inline mr-1" />
                                    Check-in
                                </label>
                                <input
                                    type="date"
                                    className="input"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Calendar className="w-4 h-4 inline mr-1" />
                                    Check-out
                                </label>
                                <input
                                    type="date"
                                    className="input"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Users className="w-4 h-4 inline mr-1" />
                                    Guests
                                </label>
                                <select className="input">
                                    <option>1 Guest</option>
                                    <option>2 Guests</option>
                                    <option>4 Guests</option>
                                    <option>6+ Guests</option>
                                </select>
                            </div>
                        </div>

                        <button className="btn-primary w-full mt-6">
                            <Search className="w-5 h-5" />
                            Search Homes
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white border-b sticky top-0 z-30">
                <div className="container-custom py-4">
                    <div className="flex items-center gap-4 overflow-x-auto">
                        <button className="btn-outline whitespace-nowrap">All Homes</button>
                        <button className="btn-ghost whitespace-nowrap">Villas</button>
                        <button className="btn-ghost whitespace-nowrap">Cottages</button>
                        <button className="btn-ghost whitespace-nowrap">Apartments</button>
                        <button className="btn-ghost whitespace-nowrap">Heritage</button>
                        <button className="btn-ghost whitespace-nowrap">Beachfront</button>
                        <button className="btn-ghost whitespace-nowrap">Mountain View</button>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="container-custom py-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-display font-bold">{mockHomes.length} Homes Available</h2>
                    <div className="flex items-center gap-4">
                        <select className="input">
                            <option>Sort by: Recommended</option>
                            <option>Sort by: Price (Low to High)</option>
                            <option>Sort by: Price (High to Low)</option>
                            <option>Sort by: Rating</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockHomes.map((home) => (
                        <div key={home.id} className="card-premium overflow-hidden hover-lift group">
                            {/* Image */}
                            <div className="aspect-[4/3] bg-gradient-to-br from-primary-400 to-secondary-400 relative overflow-hidden">
                                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                                    <span className="badge bg-white text-gray-900 font-semibold">
                                        {home.host}
                                    </span>
                                    <div className="flex gap-2">
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
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-display font-bold text-gray-900 mb-1">
                                            {home.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {home.location}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-warning-500 text-warning-500" />
                                        <span className="font-semibold">{home.rating}</span>
                                        <span className="text-sm text-gray-600">({home.reviews})</span>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600 mb-4">{home.type}</p>

                                {/* Property Details */}
                                <div className="flex items-center gap-4 mb-4 pb-4 border-b text-sm text-gray-600">
                                    <span>{home.bedrooms} Bedrooms</span>
                                    <span>•</span>
                                    <span>{home.bathrooms} Bathrooms</span>
                                    <span>•</span>
                                    <span>{home.guests} Guests</span>
                                </div>

                                {/* Amenities */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {home.amenities.slice(0, 4).map((amenity, index) => (
                                        <span key={index} className="badge-primary text-xs">
                                            {amenity}
                                        </span>
                                    ))}
                                    {home.amenities.length > 4 && (
                                        <span className="badge text-xs bg-gray-100 text-gray-700">
                                            +{home.amenities.length - 4}
                                        </span>
                                    )}
                                </div>

                                {/* Price & CTA */}
                                <div className="flex items-end justify-between pt-4 border-t">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Per night</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-bold text-gray-900">₹{home.price.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <Link href={`/homes/${home.id}`} className="btn-primary">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Categories */}
            <div className="bg-white py-16">
                <div className="container-custom">
                    <h2 className="text-3xl font-display font-bold text-center mb-12">Explore by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center group cursor-pointer">
                            <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <Waves className="w-10 h-10 text-primary-600" />
                            </div>
                            <h3 className="font-display font-bold">Beachfront</h3>
                        </div>
                        <div className="text-center group cursor-pointer">
                            <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <Mountain className="w-10 h-10 text-primary-600" />
                            </div>
                            <h3 className="font-display font-bold">Mountain</h3>
                        </div>
                        <div className="text-center group cursor-pointer">
                            <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <Home className="w-10 h-10 text-primary-600" />
                            </div>
                            <h3 className="font-display font-bold">Villas</h3>
                        </div>
                        <div className="text-center group cursor-pointer">
                            <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <Star className="w-10 h-10 text-primary-600" />
                            </div>
                            <h3 className="font-display font-bold">Luxury</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
