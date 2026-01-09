'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Plane,
    Calendar,
    Users,
    Search,
    ArrowRight,
    Clock,
    Briefcase,
    Hotel as HotelIcon,
} from 'lucide-react';

export default function FlightsPage() {
    const [tripType, setTripType] = useState<'one-way' | 'round-trip' | 'multi-city'>('round-trip');

    const mockFlights = [
        {
            id: '1',
            airline: 'Air India',
            flightNumber: 'AI 860',
            from: 'DEL',
            to: 'BOM',
            departure: '06:00',
            arrival: '08:15',
            duration: '2h 15m',
            stops: 'Nonstop',
            price: 4599,
            class: 'Economy',
        },
        {
            id: '2',
            airline: 'IndiGo',
            flightNumber: '6E 2134',
            from: 'DEL',
            to: 'BOM',
            departure: '09:30',
            arrival: '11:50',
            duration: '2h 20m',
            stops: 'Nonstop',
            price: 3899,
            class: 'Economy',
        },
        {
            id: '3',
            airline: 'Vistara',
            flightNumber: 'UK 995',
            from: 'DEL',
            to: 'BOM',
            departure: '14:15',
            arrival: '16:35',
            duration: '2h 20m',
            stops: 'Nonstop',
            price: 5299,
            class: 'Economy',
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
                            <Link href="/buses" className="text-sm text-gray-600 hover:text-gray-900">Buses</Link>
                            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">Sign In</Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Search Section */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 py-12">
                <div className="container-custom">
                    <h1 className="text-4xl font-display font-bold text-white mb-8">Search Flights</h1>

                    <div className="card-premium p-8">
                        {/* Trip Type */}
                        <div className="flex gap-4 mb-6">
                            <button
                                onClick={() => setTripType('one-way')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${tripType === 'one-way'
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                One Way
                            </button>
                            <button
                                onClick={() => setTripType('round-trip')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${tripType === 'round-trip'
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Round Trip
                            </button>
                            <button
                                onClick={() => setTripType('multi-city')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${tripType === 'multi-city'
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Multi City
                            </button>
                        </div>

                        {/* Search Form */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                                <input
                                    type="text"
                                    placeholder="Delhi (DEL)"
                                    className="input"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                                <input
                                    type="text"
                                    placeholder="Mumbai (BOM)"
                                    className="input"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Departure</label>
                                <input
                                    type="date"
                                    className="input"
                                />
                            </div>
                            {tripType === 'round-trip' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Return</label>
                                    <input
                                        type="date"
                                        className="input"
                                    />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
                                <select className="input">
                                    <option>1 Passenger</option>
                                    <option>2 Passengers</option>
                                    <option>3 Passengers</option>
                                    <option>4+ Passengers</option>
                                </select>
                            </div>
                        </div>

                        <button className="btn-primary w-full mt-6">
                            <Search className="w-5 h-5" />
                            Search Flights
                        </button>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="container-custom py-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-display font-bold">Available Flights</h2>
                    <div className="flex items-center gap-4">
                        <select className="input">
                            <option>Sort by: Cheapest</option>
                            <option>Sort by: Fastest</option>
                            <option>Sort by: Earliest</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-4">
                    {mockFlights.map((flight) => (
                        <div key={flight.id} className="card-premium p-6 hover-lift">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-8 flex-1">
                                    {/* Airline */}
                                    <div className="w-24">
                                        <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center mb-2">
                                            <Plane className="w-8 h-8 text-white" />
                                        </div>
                                        <p className="text-sm font-semibold">{flight.airline}</p>
                                        <p className="text-xs text-gray-600">{flight.flightNumber}</p>
                                    </div>

                                    {/* Flight Details */}
                                    <div className="flex items-center gap-6 flex-1">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold">{flight.departure}</p>
                                            <p className="text-sm text-gray-600">{flight.from}</p>
                                        </div>

                                        <div className="flex-1 text-center">
                                            <p className="text-sm text-gray-600 mb-1">{flight.duration}</p>
                                            <div className="relative">
                                                <div className="h-px bg-gray-300 w-full"></div>
                                                <Plane className="w-4 h-4 text-primary-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white" />
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">{flight.stops}</p>
                                        </div>

                                        <div className="text-center">
                                            <p className="text-2xl font-bold">{flight.arrival}</p>
                                            <p className="text-sm text-gray-600">{flight.to}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Price & CTA */}
                                <div className="text-right ml-8">
                                    <p className="text-3xl font-bold text-gray-900 mb-1">₹{flight.price.toLocaleString()}</p>
                                    <p className="text-sm text-gray-600 mb-4">{flight.class}</p>
                                    <button className="btn-primary">
                                        Book Now
                                        <ArrowRight className="w-4 h-4" />
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
