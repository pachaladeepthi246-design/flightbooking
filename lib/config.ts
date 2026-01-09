export const siteConfig = {
    name: "BookingHub",
    description: "Ultimate all-in-one booking platform for hotels, flights, buses, car rentals, and more",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

    // Commission Rates (%)
    commissionRates: {
        HOTEL: 20,
        FLIGHT: 5,
        BUS: 10,
        CAR_RENTAL: 18,
        PROPERTY: 22,
        EXPERIENCE: 25,
        PACKAGE: 15,
    },

    // Subscription Plans
    subscriptionPlans: {
        FREE: {
            name: "Free Trial",
            price: 0,
            duration: 14, // days
            maxListings: 0,
            commission: 25,
            features: [
                "14-day trial",
                "Test all features",
                "Limited support",
            ],
        },
        BASIC: {
            name: "Basic",
            price: 499,
            duration: 30, // days
            maxListings: 10,
            commission: 25,
            features: [
                "Up to 10 listings",
                "Basic analytics",
                "Email support",
                "25% commission",
            ],
        },
        PRO: {
            name: "Pro",
            price: 2499,
            duration: 30,
            maxListings: 100,
            commission: 20,
            features: [
                "Up to 100 listings",
                "Advanced analytics",
                "Priority support",
                "20% commission",
                "Featured listings",
                "Promotions tools",
            ],
        },
        ENTERPRISE: {
            name: "Enterprise",
            price: 9999,
            duration: 30,
            maxListings: -1, // unlimited
            commission: 15,
            features: [
                "Unlimited listings",
                "Full analytics suite",
                "Dedicated account manager",
                "15% commission",
                "API access",
                "White-label option",
                "Custom integrations",
            ],
        },
    },

    // Fees
    fees: {
        convenience: 99, // ₹99
        gst: 12, // 12%
        serviceCharge: 10, // 10%
        cancellation: {
            min: 99,
            max: 299,
        },
        dateChange: 199,
    },

    // Cancellation Policies
    cancellationPolicies: {
        FLEXIBLE: {
            name: "Flexible",
            description: "Full refund if cancelled 24 hours before check-in",
            refundPercentage: {
                "24h+": 100,
                "24h-": 0,
            },
        },
        MODERATE: {
            name: "Moderate",
            description: "50% refund if cancelled 5 days before check-in",
            refundPercentage: {
                "5d+": 100,
                "5d-24h": 50,
                "24h-": 0,
            },
        },
        STRICT: {
            name: "Strict",
            description: "No refund for cancellations",
            refundPercentage: {
                any: 0,
            },
        },
    },

    // Payout Schedule
    payoutSchedule: {
        standard: 30, // Net-30 days
        instant: {
            enabled: true,
            fee: 2, // 2% fee
        },
    },

    // TDS
    tds: {
        rate: 1, // 1% for vendors without GST
    },

    // Search Defaults
    searchDefaults: {
        radius: 10, // km
        maxResults: 50,
        cacheTime: 3600, // 1 hour in seconds
    },

    // Booking Defaults
    bookingDefaults: {
        checkInTime: "14:00",
        checkOutTime: "11:00",
        minAdvanceBooking: 0, // days
        maxAdvanceBooking: 365, // days
    },

    // Rating
    rating: {
        min: 1,
        max: 5,
        categories: ["cleanliness", "service", "location", "value"],
    },

    // Image Upload
    imageUpload: {
        maxSize: 5 * 1024 * 1024, // 5MB
        maxCount: 20,
        allowedTypes: ["image/jpeg", "image/png", "image/webp"],
    },

    // Contact
    contact: {
        email: "support@bookinghub.com",
        phone: "+91-1234567890",
        address: "123 Business Street, Mumbai, India",
    },

    // Social Links
    social: {
        facebook: "https://facebook.com/bookinghub",
        twitter: "https://twitter.com/bookinghub",
        instagram: "https://instagram.com/bookinghub",
        linkedin: "https://linkedin.com/company/bookinghub",
    },
};

export type SiteConfig = typeof siteConfig;
