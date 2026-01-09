'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Bus,
    Calendar,
    Search,
    MapPin,
    Clock,
    Wifi,
    Zap,
    Hotel as HotelIcon,
    Star,
} from 'lucide-react';

export default function BusesPage() {
    const mockBuses = [
        {
            id: '1',
            operator: 'VRL Travels',
            busType: 'AC Sleeper',
            from: 'Mumbai',
            to: 'Bangalore',
            departure: '20:00',
            arrival: '10:00',
            duration: '14h',
            price: 1299,
            rating: 4.5,
            seatsAvailable: 12,
            amenities: ['AC', 'WiFi', 'Charging Point', 'Water Bottle'],
        },
        {
            id: '2',
            operator: 'SRS Travels',
            busType: 'Volvo Multi-Axle',
            from: 'Mumbai',
            to: 'Bangalore',
            departure: '21:30',
            arrival: '11:30',
            duration: '14h',
            price: 1499,
            rating: 4.7,
            seatsAvailable: 8,
            amenities: ['AC', 'WiFi', 'Charging Point', 'Blanket', 'Reading Light'],
        },
        {
            id: '3',
            operator: 'RedBus Express',
            busType: 'AC Seater',
            from: 'Mumbai',
            to: 'Bangalore',
            departure: '19:00',
            arrival: '09:00',
            duration: '14h',
            price: 999,
            rating: 4.3,
            seatsAvailable: 20,
            amenities: ['AC', 'Charging Point', 'Water Bottle'],
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
                            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">Sign In</Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Search Section */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 py-12">
                <div className="container-custom">
                    <h1 className="text-4xl font-display font-bold text-white mb-8">Search Buses</h1>

                    <div className="card-premium p-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <MapPin className="w-4 h-4 inline mr-1" />
                                    From
                                </label>
                                <input
                                    type="text"
                                    placeholder="Mumbai"
                                    className="input"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <MapPin className="w-4 h-4 inline mr-1" />
                                    To
                                </label>
                                <input
                                    type="text"
                                    placeholder="Bangalore"
                                    className="input"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Calendar className="w-4 h-4 inline mr-1" />
                                    Date
                                </label>
                                <input
                                    type="date"
                                    className="input"
                                />
                            </div>
                            <div className="flex items-end">
                                <button className="btn-primary w-full">
                                    <Search className="w-5 h-5" />
                                    Search Buses
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="container-custom py-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-display font-bold">{mockBuses.length} Buses Found</h2>
                    <div className="flex items-center gap-4">
                        <select className="input">
                            <option>Sort by: Departure Time</option>
                            <option>Sort by: Price (Low to High)</option>
                            <option>Sort by: Rating</option>
                            <option>Sort by: Duration</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-4">
                    {mockBuses.map((bus) => (
                        <div key={bus.id} className="card-premium p-6 hover-lift">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-8 flex-1">
                                    {/* Operator */}
                                    <div className="w-32">
                                        <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center mb-2">
                                            <Bus className="w-8 h-8 text-white" />
                                        </div>
                                        <p className="text-sm font-semibold">{bus.operator}</p>
                                        <p className="text-xs text-gray-600">{bus.busType}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Star className="w-3 h-3 fill-warning-500 text-warning-500" />
                                            <span className="text-xs font-medium">{bus.rating}</span>
                                        </div>
                                    </div>

                                    {/* Journey Details */}
                                    <div className="flex items-center gap-6 flex-1">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold">{bus.departure}</p>
                                            <p className="text-sm text-gray-600">{bus.from}</p>
                                        </div>

                                        <div className="flex-1 text-center">
                                            <p className="text-sm text-gray-600 mb-1">{bus.duration}</p>
                                            <div className="h-px bg-gray-300 w-full"></div>
                                            <p className="text-xs text-gray-500 mt-1">{bus.seatsAvailable} seats left</p>
                                        </div>

                                        <div className="text-center">
                                            <p className="text-2xl font-bold">{bus.arrival}</p>
                                            <p className="text-sm text-gray-600">{bus.to}</p>
                                        </div>
                                    </div>

                                    {/* Amenities */}
                                    <div className="flex flex-wrap gap-2 max-w-xs">
                                        {bus.amenities.slice(0, 3).map((amenity, index) => (
                                            <span key={index} className="badge-primary text-xs">
                                                {amenity}
                                            </span>
                                        ))}
                                        {bus.amenities.length > 3 && (
                                            <span className="badge text-xs bg-gray-100 text-gray-700">
                                                +{bus.amenities.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Price & CTA */}
                                <div className="text-right ml-8">
                                    <p className="text-sm text-gray-600 mb-1">Starting from</p>
                                    <p className="text-3xl font-bold text-gray-900 mb-4">₹{bus.price.toLocaleString()}</p>
                                    <button className="btn-primary">
                                        View Seats
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
