'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    Hotel,
    Calendar,
    MessageSquare,
    Star,
    TrendingUp,
    DollarSign,
    Users,
    Settings,
    Plus,
    Eye,
    Edit,
    Trash2,
    BarChart3,
} from 'lucide-react';

export default function VendorDashboardPage() {
    const [activeTab, setActiveTab] = useState('overview');

    const stats = [
        { label: 'Total Bookings', value: '156', change: '+12%', icon: Calendar, color: 'primary' },
        { label: 'Revenue (This Month)', value: '₹2,45,000', change: '+8%', icon: DollarSign, color: 'success' },
        { label: 'Pending Payouts', value: '₹45,000', change: '', icon: TrendingUp, color: 'warning' },
        { label: 'Average Rating', value: '4.8', change: '+0.2', icon: Star, color: 'secondary' },
    ];

    const recentBookings = [
        { id: 'BK12345', guest: 'John Doe', property: 'Luxury Beach Resort', checkIn: '2026-01-15', amount: 5999, status: 'Confirmed' },
        { id: 'BK12346', guest: 'Jane Smith', property: 'Mountain View Hotel', checkIn: '2026-01-18', amount: 3499, status: 'Pending' },
        { id: 'BK12347', guest: 'Mike Johnson', property: 'Heritage Palace', checkIn: '2026-01-20', amount: 7999, status: 'Confirmed' },
    ];

    const properties = [
        { id: '1', name: 'Luxury Beach Resort & Spa', status: 'Active', bookings: 45, rating: 4.8, revenue: '₹1,25,000' },
        { id: '2', name: 'Mountain View Hotel', status: 'Active', bookings: 32, rating: 4.6, revenue: '₹85,000' },
        { id: '3', name: 'Heritage Palace Hotel', status: 'Active', bookings: 28, rating: 4.9, revenue: '₹1,15,000' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container-custom">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                                <Hotel className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-display font-bold">BookingHub</span>
                            <span className="text-sm text-gray-500 ml-2">Vendor Dashboard</span>
                        </Link>
                        <div className="flex items-center gap-4">
                            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">View Site</Link>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-semibold text-primary-700">JD</span>
                                </div>
                                <span className="text-sm font-medium">John Doe</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white min-h-screen border-r">
                    <nav className="p-4 space-y-2">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'overview'
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <LayoutDashboard className="w-5 h-5" />
                            <span className="font-medium">Overview</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('properties')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'properties'
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <Hotel className="w-5 h-5" />
                            <span className="font-medium">Properties</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('bookings')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'bookings'
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <Calendar className="w-5 h-5" />
                            <span className="font-medium">Bookings</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('messages')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'messages'
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <MessageSquare className="w-5 h-5" />
                            <span className="font-medium">Messages</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'reviews'
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <Star className="w-5 h-5" />
                            <span className="font-medium">Reviews</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('analytics')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'analytics'
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <BarChart3 className="w-5 h-5" />
                            <span className="font-medium">Analytics</span>
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
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    {activeTab === 'overview' && (
                        <div>
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Dashboard Overview</h1>
                                    <p className="text-gray-600">Welcome back! Here's what's happening with your properties.</p>
                                </div>
                                <Link href="/vendor/properties/new" className="btn-primary">
                                    <Plus className="w-5 h-5" />
                                    Add Property
                                </Link>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {stats.map((stat, index) => {
                                    const Icon = stat.icon;
                                    return (
                                        <div key={index} className="card-premium p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                                                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                                                </div>
                                                {stat.change && (
                                                    <span className="text-sm font-semibold text-success-600">{stat.change}</span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Recent Bookings */}
                            <div className="card-premium p-6 mb-8">
                                <h2 className="text-xl font-display font-bold mb-6">Recent Bookings</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Booking ID</th>
                                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Guest</th>
                                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Property</th>
                                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Check-in</th>
                                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentBookings.map((booking) => (
                                                <tr key={booking.id} className="border-b hover:bg-gray-50">
                                                    <td className="py-3 px-4 font-medium text-primary-600">{booking.id}</td>
                                                    <td className="py-3 px-4">{booking.guest}</td>
                                                    <td className="py-3 px-4">{booking.property}</td>
                                                    <td className="py-3 px-4">{booking.checkIn}</td>
                                                    <td className="py-3 px-4 font-semibold">₹{booking.amount.toLocaleString()}</td>
                                                    <td className="py-3 px-4">
                                                        <span className={`badge ${booking.status === 'Confirmed' ? 'badge-success' : 'badge-warning'
                                                            }`}>
                                                            {booking.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'properties' && (
                        <div>
                            <div className="flex items-center justify-between mb-8">
                                <h1 className="text-3xl font-display font-bold text-gray-900">My Properties</h1>
                                <Link href="/vendor/properties/new" className="btn-primary">
                                    <Plus className="w-5 h-5" />
                                    Add Property
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {properties.map((property) => (
                                    <div key={property.id} className="card-premium p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-xl font-display font-bold text-gray-900">{property.name}</h3>
                                                    <span className="badge-success">{property.status}</span>
                                                </div>
                                                <div className="grid grid-cols-4 gap-6 mt-4">
                                                    <div>
                                                        <p className="text-sm text-gray-600 mb-1">Bookings</p>
                                                        <p className="text-2xl font-bold text-gray-900">{property.bookings}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600 mb-1">Rating</p>
                                                        <div className="flex items-center gap-1">
                                                            <Star className="w-5 h-5 fill-warning-500 text-warning-500" />
                                                            <p className="text-2xl font-bold text-gray-900">{property.rating}</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600 mb-1">Revenue</p>
                                                        <p className="text-2xl font-bold text-gray-900">{property.revenue}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button className="btn-ghost">
                                                    <Eye className="w-5 h-5" />
                                                </button>
                                                <button className="btn-ghost">
                                                    <Edit className="w-5 h-5" />
                                                </button>
                                                <button className="btn-ghost text-error-600">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'bookings' && (
                        <div>
                            <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">All Bookings</h1>
                            <div className="card-premium p-6">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Booking ID</th>
                                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Guest</th>
                                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Property</th>
                                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Check-in</th>
                                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Check-out</th>
                                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentBookings.map((booking) => (
                                                <tr key={booking.id} className="border-b hover:bg-gray-50">
                                                    <td className="py-3 px-4 font-medium text-primary-600">{booking.id}</td>
                                                    <td className="py-3 px-4">{booking.guest}</td>
                                                    <td className="py-3 px-4">{booking.property}</td>
                                                    <td className="py-3 px-4">{booking.checkIn}</td>
                                                    <td className="py-3 px-4">2026-01-17</td>
                                                    <td className="py-3 px-4 font-semibold">₹{booking.amount.toLocaleString()}</td>
                                                    <td className="py-3 px-4">
                                                        <span className={`badge ${booking.status === 'Confirmed' ? 'badge-success' : 'badge-warning'
                                                            }`}>
                                                            {booking.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <button className="text-primary-600 hover:text-primary-700 font-medium">View</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
