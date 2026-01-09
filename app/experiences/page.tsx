'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Compass,
    Calendar,
    Search,
    MapPin,
    Users,
    Hotel as HotelIcon,
    Star,
    Clock,
    Ticket,
    Camera,
    Utensils,
    Music,
} from 'lucide-react';

export default function ExperiencesPage() {
    const mockExperiences = [
        {
            id: '1',
            name: 'Scuba Diving Adventure',
            category: 'Water Sports',
            location: 'Goa',
            duration: '3 hours',
            price: 2999,
            image: '/experiences/scuba.jpg',
            rating: 4.8,
            reviews: 234,
            groupSize: '1-6 people',
            includes: ['Equipment', 'Instructor', 'Photos'],
        },
        {
            id: '2',
            name: 'Taj Mahal Sunrise Tour',
            category: 'Cultural',
            location: 'Agra',
            duration: '5 hours',
            price: 1499,
            image: '/experiences/taj.jpg',
            rating: 4.9,
            reviews: 567,
            groupSize: '1-15 people',
            includes: ['Guide', 'Transport', 'Breakfast'],
        },
        {
            id: '3',
            name: 'Paragliding Experience',
            category: 'Adventure',
            location: 'Bir Billing',
            duration: '30 minutes',
            price: 3499,
            image: '/experiences/paragliding.jpg',
            rating: 5.0,
            reviews: 189,
            groupSize: '1 person',
            includes: ['Equipment', 'Pilot', 'Video'],
        },
        {
            id: '4',
            name: 'Street Food Tour',
            category: 'Food & Drink',
            location: 'Delhi',
            duration: '4 hours',
            price: 999,
            image: '/experiences/food.jpg',
            rating: 4.7,
            reviews: 345,
            groupSize: '2-10 people',
            includes: ['Guide', 'Food Tastings', 'Water'],
        },
        {
            id: '5',
            name: 'Yoga & Meditation Retreat',
            category: 'Wellness',
            location: 'Rishikesh',
            duration: 'Full day',
            price: 2499,
            image: '/experiences/yoga.jpg',
            rating: 4.9,
            reviews: 156,
            groupSize: '1-20 people',
            includes: ['Instructor', 'Meals', 'Materials'],
        },
        {
            id: '6',
            name: 'Wildlife Safari',
            category: 'Nature',
            location: 'Jim Corbett',
            duration: '6 hours',
            price: 4999,
            image: '/experiences/safari.jpg',
            rating: 4.8,
            reviews: 278,
            groupSize: '1-6 people',
            includes: ['Vehicle', 'Guide', 'Permits'],
        },
    ];

    const categories = [
        { name: 'All', icon: Compass },
        { name: 'Adventure', icon: Compass },
        { name: 'Cultural', icon: Camera },
        { name: 'Food & Drink', icon: Utensils },
        { name: 'Wellness', icon: Star },
        { name: 'Nature', icon: MapPin },
        { name: 'Entertainment', icon: Music },
    ];

    const [selectedCategory, setSelectedCategory] = useState('All');

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
                            <Link href="/homes" className="text-sm text-gray-600 hover:text-gray-900">Homes</Link>
                            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">Sign In</Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16">
                <div className="container-custom text-center">
                    <h1 className="text-5xl font-display font-bold text-white mb-4">
                        Discover Unique Experiences
                    </h1>
                    <p className="text-xl text-white/90 mb-8">
                        Book unforgettable activities hosted by local experts
                    </p>

                    <div className="max-w-3xl mx-auto card-premium p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-2">
                                <input
                                    type="text"
                                    placeholder="What do you want to do?"
                                    className="input"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Where?"
                                    className="input"
                                />
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
            </div>

            {/* Categories */}
            <div className="bg-white border-b sticky top-0 z-30">
                <div className="container-custom py-4">
                    <div className="flex items-center gap-4 overflow-x-auto">
                        {categories.map((category) => {
                            const Icon = category.icon;
                            return (
                                <button
                                    key={category.name}
                                    onClick={() => setSelectedCategory(category.name)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${selectedCategory === category.name
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {category.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Experiences Grid */}
            <div className="container-custom py-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-display font-bold">{mockExperiences.length} Experiences</h2>
                    <select className="input">
                        <option>Sort by: Recommended</option>
                        <option>Sort by: Price (Low to High)</option>
                        <option>Sort by: Price (High to Low)</option>
                        <option>Sort by: Rating</option>
                        <option>Sort by: Duration</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockExperiences.map((experience) => (
                        <div key={experience.id} className="card-premium overflow-hidden hover-lift group">
                            {/* Image */}
                            <div className="aspect-[4/3] bg-gradient-to-br from-primary-400 to-secondary-400 relative overflow-hidden">
                                <div className="absolute top-4 left-4">
                                    <span className="badge bg-white text-gray-900 font-semibold">
                                        {experience.category}
                                    </span>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="flex items-center gap-2 text-white">
                                        <MapPin className="w-4 h-4" />
                                        <span className="font-semibold">{experience.location}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-xl font-display font-bold text-gray-900 flex-1">
                                        {experience.name}
                                    </h3>
                                    <div className="flex items-center gap-1 ml-2">
                                        <Star className="w-4 h-4 fill-warning-500 text-warning-500" />
                                        <span className="font-semibold">{experience.rating}</span>
                                        <span className="text-sm text-gray-600">({experience.reviews})</span>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {experience.duration}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        {experience.groupSize}
                                    </div>
                                </div>

                                {/* Includes */}
                                <div className="mb-4 pb-4 border-b">
                                    <p className="text-sm font-semibold text-gray-700 mb-2">Includes:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {experience.includes.map((item, index) => (
                                            <span key={index} className="badge-primary text-xs">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Price & CTA */}
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">From</p>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl font-bold text-gray-900">₹{experience.price.toLocaleString()}</span>
                                            <span className="text-sm text-gray-600">/ person</span>
                                        </div>
                                    </div>
                                    <Link href={`/experiences/${experience.id}`} className="btn-primary">
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Why Book With Us */}
            <div className="bg-white py-16">
                <div className="container-custom">
                    <h2 className="text-3xl font-display font-bold text-center mb-12">Why Book With Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Star className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="font-display font-bold mb-2">Expert Hosts</h3>
                            <p className="text-sm text-gray-600">Verified local experts and professionals</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Ticket className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="font-display font-bold mb-2">Instant Booking</h3>
                            <p className="text-sm text-gray-600">Book instantly with confirmation</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="font-display font-bold mb-2">Flexible Cancellation</h3>
                            <p className="text-sm text-gray-600">Free cancellation up to 24 hours</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="font-display font-bold mb-2">Small Groups</h3>
                            <p className="text-sm text-gray-600">Intimate experiences with small groups</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
