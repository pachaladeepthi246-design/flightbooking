'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, Hotel, Plane, Bus, Car, Building2, Compass, User, LogIn } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { data: session } = useSession();

    const navItems = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/hotels', label: 'Hotels', icon: Hotel },
        { href: '/flights', label: 'Flights', icon: Plane },
        { href: '/buses', label: 'Buses', icon: Bus },
        { href: '/cars', label: 'Cars', icon: Car },
        { href: '/homes', label: 'Homes', icon: Building2 },
        { href: '/experiences', label: 'Experiences', icon: Compass },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 right-4 z-50 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                aria-label="Toggle menu"
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-gray-900" />
                ) : (
                    <Menu className="w-6 h-6 text-gray-900" />
                )}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                            BookingHub
                        </h2>
                        {session?.user && (
                            <div className="mt-4 flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white text-lg font-bold">
                                    {session.user.name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{session.user.name}</p>
                                    <p className="text-sm text-gray-600">{session.user.email}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.href)
                                                ? 'bg-primary-600 text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="font-medium">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Divider */}
                        <div className="my-4 border-t border-gray-200" />

                        {/* User Menu */}
                        {session?.user ? (
                            <div className="space-y-2">
                                <Link
                                    href="/dashboard"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    <User className="w-5 h-5" />
                                    <span className="font-medium">Dashboard</span>
                                </Link>
                                <Link
                                    href="/profile"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    <User className="w-5 h-5" />
                                    <span className="font-medium">Profile</span>
                                </Link>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        signOut({ callbackUrl: '/' });
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <LogIn className="w-5 h-5" />
                                    <span className="font-medium">Sign Out</span>
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    <LogIn className="w-5 h-5" />
                                    <span className="font-medium">Sign In</span>
                                </Link>
                                <Link
                                    href="/signup"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                                >
                                    <User className="w-5 h-5" />
                                    <span className="font-medium">Sign Up</span>
                                </Link>
                            </div>
                        )}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex gap-4 text-sm text-gray-600">
                            <Link href="/terms" onClick={() => setIsOpen(false)} className="hover:text-primary-600">
                                Terms
                            </Link>
                            <Link href="/privacy" onClick={() => setIsOpen(false)} className="hover:text-primary-600">
                                Privacy
                            </Link>
                            <Link href="/help" onClick={() => setIsOpen(false)} className="hover:text-primary-600">
                                Help
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
