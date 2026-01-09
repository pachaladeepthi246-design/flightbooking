'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Hotel,
    Plane,
    Bus,
    Car,
    Home,
    Compass,
    Package,
    Search,
    Calendar,
    Users,
    MapPin,
    Star,
    TrendingUp,
    Shield,
    Clock,
    Award,
    ChevronRight,
    Menu,
    X
} from 'lucide-react';

export default function HomePage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('hotels');

    const categories = [
        { id: 'hotels', name: 'Hotels', icon: Hotel },
        { id: 'flights', name: 'Flights', icon: Plane },
        { id: 'buses', name: 'Buses', icon: Bus },
        { id: 'cars', name: 'Car Rentals', icon: Car },
        { id: 'homes', name: 'Vacation Homes', icon: Home },
        { id: 'experiences', name: 'Experiences', icon: Compass },
        { id: 'packages', name: 'Packages', icon: Package },
    ];

    const features = [
        {
            icon: TrendingUp,
            title: 'Best Prices',
            description: 'Guaranteed lowest prices with price match promise',
        },
        {
            icon: Shield,
            title: 'Secure Booking',
            description: 'PCI DSS compliant with 100% secure payments',
        },
        {
            icon: Clock,
            title: '24/7 Support',
            description: 'Round the clock customer support for all bookings',
        },
        {
            icon: Award,
            title: 'Verified Reviews',
            description: 'Authentic reviews from verified bookings only',
        },
    ];

    const popularDestinations = [
        { name: 'Goa', image: '/destinations/goa.jpg', deals: '150+ hotels' },
        { name: 'Kerala', image: '/destinations/kerala.jpg', deals: '200+ properties' },
        { name: 'Rajasthan', image: '/destinations/rajasthan.jpg', deals: '180+ hotels' },
        { name: 'Himachal', image: '/destinations/himachal.jpg', deals: '120+ resorts' },
    ];

    return (
        <div className="min-h-screen bg-gradient-mesh">
            {/* Navigation */}
            <nav className="glass border-b border-white/20 sticky top-0 z-50">
                <div className="container-custom">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                                <Hotel className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-display font-bold text-white">BookingHub</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            <Link href="/hotels" className="text-white/90 hover:text-white transition-colors">Hotels</Link>
                            <Link href="/flights" className="text-white/90 hover:text-white transition-colors">Flights</Link>
                            <Link href="/buses" className="text-white/90 hover:text-white transition-colors">Buses</Link>
                            <Link href="/vendor" className="text-white/90 hover:text-white transition-colors">List Property</Link>
                        </div>

                        {/* Auth Buttons */}
                        <div className="hidden md:flex items-center gap-4">
                            <Link href="/login" className="text-white/90 hover:text-white transition-colors">Sign In</Link>
                            <Link href="/signup" className="btn-primary">Get Started</Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden text-white p-2"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden glass-dark border-t border-white/20 animate-slide-down">
                        <div className="container-custom py-4 space-y-4">
                            <Link href="/hotels" className="block text-white/90 hover:text-white py-2">Hotels</Link>
                            <Link href="/flights" className="block text-white/90 hover:text-white py-2">Flights</Link>
                            <Link href="/buses" className="block text-white/90 hover:text-white py-2">Buses</Link>
                            <Link href="/vendor" className="block text-white/90 hover:text-white py-2">List Property</Link>
                            <div className="pt-4 border-t border-white/20 space-y-2">
                                <Link href="/login" className="block btn-outline w-full text-center">Sign In</Link>
                                <Link href="/signup" className="block btn-primary w-full text-center">Get Started</Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="section pt-32 pb-20">
                <div className="container-custom">
                    <div className="text-center max-w-4xl mx-auto mb-12 animate-fade-in">
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
                            Your Ultimate
                            <span className="block text-gradient-accent">Booking Platform</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 mb-8">
                            Hotels • Flights • Buses • Car Rentals • Vacation Homes • Experiences
                        </p>
                        <p className="text-lg text-white/80 max-w-2xl mx-auto">
                            Book everything you need for your perfect trip in one place. Best prices guaranteed with 100% secure payments.
                        </p>
                    </div>

                    {/* Search Box */}
                    <div className="max-w-5xl mx-auto animate-slide-up">
                        <div className="card-premium p-8">
                            {/* Category Tabs */}
                            <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-gray-200">
                                {categories.map((category) => {
                                    const Icon = category.icon;
                                    return (
                                        <button
                                            key={category.id}
                                            onClick={() => setActiveTab(category.id)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === category.id
                                                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span className="font-medium">{category.name}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Search Form */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="md:col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <MapPin className="w-4 h-4 inline mr-1" />
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Where are you going?"
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
                                        <option>3 Guests</option>
                                        <option>4+ Guests</option>
                                    </select>
                                </div>
                            </div>

                            <button className="btn-primary w-full mt-6 text-lg">
                                <Search className="w-5 h-5" />
                                Search {categories.find(c => c.id === activeTab)?.name}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="section bg-white/10 backdrop-blur-lg">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="text-center animate-slide-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-8 h-8 text-primary-600" />
                                    </div>
                                    <h3 className="text-xl font-display font-bold text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-white/80">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Popular Destinations */}
            <section className="section">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                            Popular Destinations
                        </h2>
                        <p className="text-xl text-white/80">
                            Explore the most loved travel destinations
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {popularDestinations.map((destination, index) => (
                            <div
                                key={index}
                                className="group card-premium overflow-hidden hover-lift cursor-pointer"
                            >
                                <div className="aspect-[4/3] bg-gradient-to-br from-primary-400 to-secondary-400 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <h3 className="text-2xl font-display font-bold mb-1">{destination.name}</h3>
                                        <p className="text-white/90">{destination.deals}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-gradient-to-r from-primary-600 to-secondary-600">
                <div className="container-custom text-center">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        List Your Property
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Join thousands of vendors earning with BookingHub. Start with a 14-day free trial.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/vendor/register" className="btn bg-white text-primary-600 hover:bg-gray-100">
                            Register as Vendor
                            <ChevronRight className="w-5 h-5" />
                        </Link>
                        <Link href="/vendor" className="btn border-2 border-white text-white hover:bg-white/10">
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                                    <Hotel className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-2xl font-display font-bold">BookingHub</span>
                            </div>
                            <p className="text-gray-400">
                                Your ultimate all-in-one booking platform for all travel needs.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-display font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="/hotels" className="hover:text-white transition-colors">Hotels</Link></li>
                                <li><Link href="/flights" className="hover:text-white transition-colors">Flights</Link></li>
                                <li><Link href="/buses" className="hover:text-white transition-colors">Buses</Link></li>
                                <li><Link href="/cars" className="hover:text-white transition-colors">Car Rentals</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-display font-bold mb-4">For Vendors</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="/vendor/register" className="hover:text-white transition-colors">Register</Link></li>
                                <li><Link href="/vendor/login" className="hover:text-white transition-colors">Vendor Login</Link></li>
                                <li><Link href="/vendor/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                                <li><Link href="/vendor/support" className="hover:text-white transition-colors">Support</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-display font-bold mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                        <p>&copy; 2026 BookingHub. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
