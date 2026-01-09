'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    Users,
    Hotel,
    Calendar,
    DollarSign,
    TrendingUp,
    Settings,
    FileText,
    Shield,
    BarChart3,
    CheckCircle,
    XCircle,
    Clock,
    Search,
} from 'lucide-react';

export default function AdminDashboardPage() {
    const [activeTab, setActiveTab] = useState('overview');

    const stats = [
        { label: 'Total Revenue', value: '₹45,67,890', change: '+12.5%', icon: DollarSign, color: 'success' },
        { label: 'Total Bookings', value: '2,456', change: '+8.2%', icon: Calendar, color: 'primary' },
        { label: 'Active Vendors', value: '342', change: '+15.3%', icon: Users, color: 'secondary' },
        { label: 'Pending Approvals', value: '23', change: '-5.1%', icon: Clock, color: 'warning' },
    ];

    const recentVendors = [
        { id: '1', name: 'Luxury Beach Resort', email: 'contact@luxurybeach.com', status: 'PENDING', date: '2026-01-08' },
        { id: '2', name: 'Mountain View Hotel', email: 'info@mountainview.com', status: 'APPROVED', date: '2026-01-07' },
        { id: '3', name: 'City Center Apartments', email: 'hello@citycenter.com', status: 'PENDING', date: '2026-01-07' },
    ];

    const recentBookings = [
        { id: 'BK12345', customer: 'John Doe', property: 'Luxury Beach Resort', amount: 5999, status: 'CONFIRMED', date: '2026-01-09' },
        { id: 'BK12346', customer: 'Jane Smith', property: 'Mountain View Hotel', amount: 3499, status: 'PENDING', date: '2026-01-09' },
        { id: 'BK12347', customer: 'Mike Johnson', property: 'Heritage Palace', amount: 7999, status: 'CONFIRMED', date: '2026-01-08' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container-custom">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-display font-bold">Admin Panel</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">View Site</Link>
                            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-semibold text-primary-700">AD</span>
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
                            onClick={() => setActiveTab('vendors')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'vendors'
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <Users className="w-5 h-5" />
                            <span className="font-medium">Vendors</span>
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
                            onClick={() => setActiveTab('payments')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'payments'
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <DollarSign className="w-5 h-5" />
                            <span className="font-medium">Payments</span>
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
                            onClick={() => setActiveTab('content')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'content'
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <FileText className="w-5 h-5" />
                            <span className="font-medium">Content</span>
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
                            <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">Dashboard Overview</h1>

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
                                                <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-success-600' : 'text-error-600'
                                                    }`}>
                                                    {stat.change}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Recent Activity */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Recent Vendors */}
                                <div className="card-premium p-6">
                                    <h2 className="text-xl font-display font-bold mb-6">Recent Vendor Applications</h2>
                                    <div className="space-y-4">
                                        {recentVendors.map((vendor) => (
                                            <div key={vendor.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div className="flex-1">
                                                    <p className="font-semibold text-gray-900">{vendor.name}</p>
                                                    <p className="text-sm text-gray-600">{vendor.email}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{vendor.date}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {vendor.status === 'PENDING' ? (
                                                        <>
                                                            <button className="btn text-sm bg-success-600 text-white hover:bg-success-700">
                                                                <CheckCircle className="w-4 h-4" />
                                                            </button>
                                                            <button className="btn text-sm bg-error-600 text-white hover:bg-error-700">
                                                                <XCircle className="w-4 h-4" />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <span className="badge-success">Approved</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Bookings */}
                                <div className="card-premium p-6">
                                    <h2 className="text-xl font-display font-bold mb-6">Recent Bookings</h2>
                                    <div className="space-y-4">
                                        {recentBookings.map((booking) => (
                                            <div key={booking.id} className="p-4 bg-gray-50 rounded-lg">
                                                <div className="flex items-center justify-between mb-2">
                                                    <p className="font-semibold text-gray-900">{booking.id}</p>
                                                    <span className={`badge ${booking.status === 'CONFIRMED' ? 'badge-success' : 'badge-warning'
                                                        }`}>
                                                        {booking.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600">{booking.customer}</p>
                                                <p className="text-sm text-gray-600">{booking.property}</p>
                                                <div className="flex items-center justify-between mt-2">
                                                    <p className="text-xs text-gray-500">{booking.date}</p>
                                                    <p className="font-semibold text-gray-900">₹{booking.amount.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'vendors' && (
                        <div>
                            <div className="flex items-center justify-between mb-8">
                                <h1 className="text-3xl font-display font-bold text-gray-900">Vendor Management</h1>
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search vendors..."
                                            className="input pl-10"
                                        />
                                    </div>
                                    <select className="input">
                                        <option>All Status</option>
                                        <option>Pending</option>
                                        <option>Approved</option>
                                        <option>Rejected</option>
                                    </select>
                                </div>
                            </div>

                            <div className="card-premium p-6">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Vendor</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Plan</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Joined</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentVendors.map((vendor) => (
                                            <tr key={vendor.id} className="border-b hover:bg-gray-50">
                                                <td className="py-3 px-4 font-medium">{vendor.name}</td>
                                                <td className="py-3 px-4 text-gray-600">{vendor.email}</td>
                                                <td className="py-3 px-4"><span className="badge-primary">FREE</span></td>
                                                <td className="py-3 px-4">
                                                    <span className={`badge ${vendor.status === 'APPROVED' ? 'badge-success' : 'badge-warning'
                                                        }`}>
                                                        {vendor.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-gray-600">{vendor.date}</td>
                                                <td className="py-3 px-4">
                                                    <button className="text-primary-600 hover:text-primary-700 font-medium">View</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'analytics' && (
                        <div>
                            <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">Analytics & Reports</h1>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="card-premium p-6">
                                    <h3 className="text-lg font-display font-bold mb-4">Revenue Trend</h3>
                                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <p className="text-gray-500">Chart Placeholder</p>
                                    </div>
                                </div>
                                <div className="card-premium p-6">
                                    <h3 className="text-lg font-display font-bold mb-4">Bookings by Category</h3>
                                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <p className="text-gray-500">Chart Placeholder</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
