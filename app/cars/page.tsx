'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Car,
    Calendar,
    Search,
    MapPin,
    Users,
    Hotel as HotelIcon,
    Star,
    Fuel,
    Settings,
    Shield,
} from 'lucide-react';

export default function CarsPage() {
    const [rentalType, setRentalType] = useState<'self-drive' | 'chauffeur'>('self-drive');

    const mockCars = [
        {
            id: '1',
            name: 'Maruti Swift',
            type: 'Hatchback',
            transmission: 'Manual',
            fuel: 'Petrol',
            seats: 5,
            price: 1299,
            image: '/cars/swift.jpg',
            rating: 4.5,
            features: ['AC', 'Music System', 'Power Steering'],
            available: true,
        },
        {
            id: '2',
            name: 'Honda City',
            type: 'Sedan',
            transmission: 'Automatic',
            fuel: 'Petrol',
            seats: 5,
            price: 2499,
            image: '/cars/city.jpg',
            rating: 4.7,
            features: ['AC', 'Music System', 'Sunroof', 'Cruise Control'],
            available: true,
        },
        {
            id: '3',
            name: 'Toyota Innova',
            type: 'SUV',
            transmission: 'Manual',
            fuel: 'Diesel',
            seats: 7,
            price: 3299,
            image: '/cars/innova.jpg',
            rating: 4.8,
            features: ['AC', 'Music System', 'Spacious', '7 Seater'],
            available: true,
        },
        {
            id: '4',
            name: 'Royal Enfield Classic',
            type: 'Bike',
            transmission: 'Manual',
            fuel: 'Petrol',
            seats: 2,
            price: 799,
            image: '/bikes/classic.jpg',
            rating: 4.6,
            features: ['Helmet Included', 'Fuel Efficient'],
            available: true,
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
                            <Link href="/buses" className="text-sm text-gray-600 hover:text-gray-900">Buses</Link>
                            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">Sign In</Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Search Section */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 py-12">
                <div className="container-custom">
                    <h1 className="text-4xl font-display font-bold text-white mb-8">Car & Bike Rentals</h1>

                    <div className="card-premium p-8">
                        {/* Rental Type */}
                        <div className="flex gap-4 mb-6">
                            <button
                                onClick={() => setRentalType('self-drive')}
                                className={`px-6 py-3 rounded-lg font-medium transition-colors ${rentalType === 'self-drive'
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Self Drive
                            </button>
                            <button
                                onClick={() => setRentalType('chauffeur')}
                                className={`px-6 py-3 rounded-lg font-medium transition-colors ${rentalType === 'chauffeur'
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                With Chauffeur
                            </button>
                        </div>

                        {/* Search Form */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <MapPin className="w-4 h-4 inline mr-1" />
                                    Pickup Location
                                </label>
                                <input
                                    type="text"
                                    placeholder="Mumbai"
                                    className="input"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Calendar className="w-4 h-4 inline mr-1" />
                                    Pickup Date
                                </label>
                                <input
                                    type="date"
                                    className="input"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Calendar className="w-4 h-4 inline mr-1" />
                                    Return Date
                                </label>
                                <input
                                    type="date"
                                    className="input"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Vehicle Type
                                </label>
                                <select className="input">
                                    <option>All Types</option>
                                    <option>Hatchback</option>
                                    <option>Sedan</option>
                                    <option>SUV</option>
                                    <option>Bike</option>
                                </select>
                            </div>
                            <div className="flex items-end">
                                <button className="btn-primary w-full">
                                    <Search className="w-5 h-5" />
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="container-custom py-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-display font-bold">{mockCars.length} Vehicles Available</h2>
                    <div className="flex items-center gap-4">
                        <select className="input">
                            <option>Sort by: Price (Low to High)</option>
                            <option>Sort by: Price (High to Low)</option>
                            <option>Sort by: Rating</option>
                            <option>Sort by: Popularity</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockCars.map((car) => (
                        <div key={car.id} className="card-premium overflow-hidden hover-lift">
                            {/* Image */}
                            <div className="aspect-[4/3] bg-gradient-to-br from-primary-400 to-secondary-400 relative">
                                <div className="absolute top-4 right-4">
                                    <span className="badge-success">Available</span>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="text-xl font-display font-bold text-gray-900 mb-1">
                                            {car.name}
                                        </h3>
                                        <p className="text-sm text-gray-600">{car.type}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-warning-500 text-warning-500" />
                                        <span className="font-semibold">{car.rating}</span>
                                    </div>
                                </div>

                                {/* Specs */}
                                <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b">
                                    <div className="text-center">
                                        <Settings className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                                        <p className="text-xs text-gray-600">{car.transmission}</p>
                                    </div>
                                    <div className="text-center">
                                        <Fuel className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                                        <p className="text-xs text-gray-600">{car.fuel}</p>
                                    </div>
                                    <div className="text-center">
                                        <Users className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                                        <p className="text-xs text-gray-600">{car.seats} Seats</p>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {car.features.slice(0, 3).map((feature, index) => (
                                        <span key={index} className="badge-primary text-xs">
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                {/* Price & CTA */}
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Per day</p>
                                        <p className="text-2xl font-bold text-gray-900">₹{car.price.toLocaleString()}</p>
                                    </div>
                                    <button className="btn-primary">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white py-16">
                <div className="container-custom">
                    <h2 className="text-3xl font-display font-bold text-center mb-12">Why Choose Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="font-display font-bold mb-2">Verified Vehicles</h3>
                            <p className="text-sm text-gray-600">All vehicles are verified and well-maintained</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Car className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="font-display font-bold mb-2">Wide Selection</h3>
                            <p className="text-sm text-gray-600">Choose from 1000+ cars and bikes</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Star className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="font-display font-bold mb-2">Best Prices</h3>
                            <p className="text-sm text-gray-600">Guaranteed lowest prices in the market</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="font-display font-bold mb-2">24/7 Support</h3>
                            <p className="text-sm text-gray-600">Round the clock customer support</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
