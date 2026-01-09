'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Hotel, Mail, Lock, User, Phone, Building, CreditCard, FileText } from 'lucide-react';

export default function VendorRegisterPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Personal Info
        name: '',
        email: '',
        phone: '',
        password: '',

        // Business Info
        businessName: '',
        businessType: '',
        category: 'HOTEL',

        // Documents
        gstNumber: '',
        panNumber: '',

        // Bank Details
        bankAccount: '',
        ifscCode: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (step < 3) {
            setStep(step + 1);
        } else {
            // Submit form
            console.log('Vendor Registration:', formData);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-mesh py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                        <Hotel className="w-7 h-7 text-primary-600" />
                    </div>
                    <span className="text-3xl font-display font-bold text-white">BookingHub</span>
                </Link>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center gap-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= s
                                    ? 'bg-white text-primary-600'
                                    : 'bg-white/20 text-white'
                                }`}>
                                {s}
                            </div>
                            {s < 3 && (
                                <div className={`w-16 h-1 rounded transition-colors ${step > s ? 'bg-white' : 'bg-white/20'
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Registration Card */}
                <div className="card-premium p-8">
                    <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                        {step === 1 && 'Personal Information'}
                        {step === 2 && 'Business Details'}
                        {step === 3 && 'Verification & Banking'}
                    </h1>
                    <p className="text-gray-600 mb-8">
                        {step === 1 && 'Create your vendor account'}
                        {step === 2 && 'Tell us about your business'}
                        {step === 3 && 'Complete your profile'}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Step 1: Personal Info */}
                        {step === 1 && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="input pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            className="input pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 98765 43210"
                                            className="input pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                            className="input pl-10"
                                            required
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Step 2: Business Info */}
                        {step === 2 && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Business Name
                                    </label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="businessName"
                                            value={formData.businessName}
                                            onChange={handleChange}
                                            placeholder="Your Hotel/Business Name"
                                            className="input pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Business Type
                                    </label>
                                    <select
                                        name="businessType"
                                        value={formData.businessType}
                                        onChange={handleChange}
                                        className="input"
                                        required
                                    >
                                        <option value="">Select business type</option>
                                        <option value="individual">Individual</option>
                                        <option value="partnership">Partnership</option>
                                        <option value="private_limited">Private Limited</option>
                                        <option value="llp">LLP</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="input"
                                        required
                                    >
                                        <option value="HOTEL">Hotel/Accommodation</option>
                                        <option value="FLIGHT">Flight Operator</option>
                                        <option value="BUS">Bus Operator</option>
                                        <option value="CAR_RENTAL">Car/Bike Rental</option>
                                        <option value="PROPERTY">Vacation Property</option>
                                        <option value="EXPERIENCE">Experience Provider</option>
                                    </select>
                                </div>
                            </>
                        )}

                        {/* Step 3: Verification & Banking */}
                        {step === 3 && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        GST Number (Optional)
                                    </label>
                                    <div className="relative">
                                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="gstNumber"
                                            value={formData.gstNumber}
                                            onChange={handleChange}
                                            placeholder="22AAAAA0000A1Z5"
                                            className="input pl-10"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Required for businesses with annual turnover &gt; ₹20 lakhs</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        PAN Number
                                    </label>
                                    <div className="relative">
                                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="panNumber"
                                            value={formData.panNumber}
                                            onChange={handleChange}
                                            placeholder="ABCDE1234F"
                                            className="input pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Bank Account Number
                                    </label>
                                    <div className="relative">
                                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="bankAccount"
                                            value={formData.bankAccount}
                                            onChange={handleChange}
                                            placeholder="1234567890"
                                            className="input pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        IFSC Code
                                    </label>
                                    <div className="relative">
                                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="ifscCode"
                                            value={formData.ifscCode}
                                            onChange={handleChange}
                                            placeholder="SBIN0001234"
                                            className="input pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                                    <h3 className="font-semibold text-primary-900 mb-2">Start with 14-Day Free Trial</h3>
                                    <p className="text-sm text-primary-700">
                                        Test all features with our FREE plan. Upgrade anytime to unlock more listings and lower commission rates.
                                    </p>
                                </div>
                            </>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex items-center gap-4 pt-4">
                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={() => setStep(step - 1)}
                                    className="btn-outline flex-1"
                                >
                                    Back
                                </button>
                            )}
                            <button
                                type="submit"
                                className="btn-primary flex-1"
                            >
                                {step < 3 ? 'Continue' : 'Complete Registration'}
                            </button>
                        </div>
                    </form>

                    {/* Login Link */}
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Already have a vendor account?{' '}
                        <Link href="/vendor/login" className="text-primary-600 hover:text-primary-700 font-semibold">
                            Sign in
                        </Link>
                    </p>
                </div>

                {/* Customer Link */}
                <div className="text-center mt-6">
                    <Link href="/signup" className="text-white/90 hover:text-white text-sm">
                        Looking to book? Create a customer account →
                    </Link>
                </div>
            </div>
        </div>
    );
}
