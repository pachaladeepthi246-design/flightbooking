'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    User,
    Calendar,
    Heart,
    Star,
    Settings,
    LogOut,
    Hotel as HotelIcon,
    MapPin,
    CreditCard,
    Bell,
    Gift,
} from 'lucide-react';

export default function UserDashboardPage() {
    const [activeTab, setActiveTab] = useState('bookings');

    const upcomingBookings = [
        {
            id: 'BK12345',
            type: 'Hotel',
            name: 'Luxury Beach Resort',
            location: 'Goa, India',
            checkIn: '2026-01-15',
            checkOut: '2026-01-18',
            amount: 15999,
            status: 'CONFIRMED',
        },
        {
            id: 'BK12346',
            type: 'Flight',
            name: 'Air India AI 860',
            location: 'DEL → BOM',
            checkIn: '2026-01-20',
            checkOut: '2026-01-20',
            amount: 4599,
            status: 'CONFIRMED',
        },
    ];

    const pastBookings = [
        {
            id: 'BK12340',
            type: 'Hotel',
            name: 'Mountain View Hotel',
            location: 'Manali, HP',
            checkIn: '2025-12-20',
            checkOut: '2025-12-23',
            amount: 8999,
            status: 'COMPLETED',
        },
    ];

    const savedItems = [
        {
            id: '1',
            type: 'Hotel',
            name: 'Heritage Haveli',
            location: 'Jaipur, Rajasthan',
            price: 22999,
            rating: 5.0,
        },
        {
            id: '2',
            type: 'Experience',
            name: 'Scuba Diving Adventure',
            location: 'Goa',
            price: 2999,
            rating: 4.8,
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
                            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">Home</Link>
                            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-semibold text-primary-700">JD</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white min-h-screen border-r">
                    <div className="p-6">
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-2xl font-bold text-white">JD</span>
                            </div>
                            <h2 className="font-display font-bold text-gray-900">John Doe</h2>
                            <p className="text-sm text-gray-600">john@example.com</p>
                        </div>

                        <nav className="space-y-2">
                            <button
                                onClick={() => setActiveTab('bookings')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'bookings'
                                        ? 'bg-primary-50 text-primary-700'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <Calendar className="w-5 h-5" />
                                <span className="font-medium">My Bookings</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('saved')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'saved'
                                        ? 'bg-primary-50 text-primary-700'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <Heart className="w-5 h-5" />
                                <span className="font-medium">Saved Items</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('reviews')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'reviews'
                                        ? 'bg-primary-50 text-primary-700'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <Star className="w-5 h-5" />
                                <span className="font-medium">My Reviews</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('rewards')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'rewards'
                                        ? 'bg-primary-50 text-primary-700'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <Gift className="w-5 h-5" />
                                <span className="font-medium">Rewards</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'profile'
                                        ? 'bg-primary-50 text-primary-700'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <User className="w-5 h-5" />
                                <span className="font-medium">Profile</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'settings'
                                        ? 'bg-primary-50 text-primary-700'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <Settings className="w-5 h-5" />
                                <span className="font-medium">Settings</span>
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-error-600 hover:bg-error-50 transition-colors">
                                <LogOut className="w-5 h-5" />
                                <span className="font-medium">Logout</span>
                            </button>
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    {activeTab === 'bookings' && (
                        <div>
                            <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">My Bookings</h1>

                            {/* Upcoming Bookings */}
                            <div className="mb-8">
                                <h2 className="text-xl font-display font-bold mb-4">Upcoming Trips</h2>
                                <div className="space-y-4">
                                    {upcomingBookings.map((booking) => (
                                        <div key={booking.id} className="card-premium p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="badge-primary">{booking.type}</span>
                                                        <span className="badge-success">{booking.status}</span>
                                                    </div>
                                                    <h3 className="text-xl font-display font-bold text-gray-900 mb-1">
                                                        {booking.name}
                                                    </h3>
                                                    <p className="text-gray-600 flex items-center gap-1 mb-3">
                                                        <MapPin className="w-4 h-4" />
                                                        {booking.location}
                                                    </p>
                                                    <div className="flex items-center gap-6 text-sm text-gray-600">
                                                        <div>
                                                            <p className="text-xs text-gray-500">Check-in</p>
                                                            <p className="font-semibold">{booking.checkIn}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-500">Check-out</p>
                                                            <p className="font-semibold">{booking.checkOut}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-500">Booking ID</p>
                                                            <p className="font-semibold">{booking.id}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-gray-900 mb-4">
                                                        ₹{booking.amount.toLocaleString()}
                                                    </p>
                                                    <div className="flex gap-2">
                                                        <button className="btn-outline text-sm">View Details</button>
                                                        <button className="btn-primary text-sm">Manage</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Past Bookings */}
                            <div>
                                <h2 className="text-xl font-display font-bold mb-4">Past Trips</h2>
                                <div className="space-y-4">
                                    {pastBookings.map((booking) => (
                                        <div key={booking.id} className="card-premium p-6 opacity-75">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="badge-primary">{booking.type}</span>
                                                        <span className="badge bg-gray-100 text-gray-700">{booking.status}</span>
                                                    </div>
                                                    <h3 className="text-xl font-display font-bold text-gray-900 mb-1">
                                                        {booking.name}
                                                    </h3>
                                                    <p className="text-gray-600 flex items-center gap-1">
                                                        <MapPin className="w-4 h-4" />
                                                        {booking.location}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xl font-bold text-gray-900 mb-4">
                                                        ₹{booking.amount.toLocaleString()}
                                                    </p>
                                                    <button className="btn-outline text-sm">Book Again</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'saved' && (
                        <div>
                            <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">Saved Items</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {savedItems.map((item) => (
                                    <div key={item.id} className="card-premium overflow-hidden">
                                        <div className="aspect-[4/3] bg-gradient-to-br from-primary-400 to-secondary-400"></div>
                                        <div className="p-4">
                                            <span className="badge-primary text-xs mb-2">{item.type}</span>
                                            <h3 className="font-display font-bold text-gray-900 mb-1">{item.name}</h3>
                                            <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                {item.location}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 fill-warning-500 text-warning-500" />
                                                    <span className="font-semibold">{item.rating}</span>
                                                </div>
                                                <p className="font-bold text-gray-900">₹{item.price.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'profile' && (
                        <div>
                            <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">My Profile</h1>
                            <div className="card-premium p-8 max-w-2xl">
                                <form className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        <input type="text" defaultValue="John Doe" className="input" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input type="email" defaultValue="john@example.com" className="input" disabled />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                        <input type="tel" defaultValue="+91 98765 43210" className="input" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                                        <input type="date" className="input" />
                                    </div>
                                    <button type="submit" className="btn-primary">Save Changes</button>
                                </form>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
