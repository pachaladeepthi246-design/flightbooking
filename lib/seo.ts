import { Metadata } from 'next';

interface SEOConfig {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'product';
}

const siteConfig = {
    name: 'BookingHub',
    description: 'Your ultimate all-in-one booking platform for hotels, flights, buses, car rentals, vacation homes, and experiences across India and worldwide.',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://bookinghub.com',
    ogImage: '/og-image.jpg',
    twitterHandle: '@bookinghub',
};

export function generateMetadata({
    title,
    description,
    keywords = [],
    image,
    url,
    type = 'website',
}: SEOConfig): Metadata {
    const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
    const fullDescription = description || siteConfig.description;
    const fullUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
    const ogImage = image || siteConfig.ogImage;

    return {
        title: fullTitle,
        description: fullDescription,
        keywords: [
            'booking platform',
            'hotel booking',
            'flight booking',
            'bus booking',
            'car rental',
            'vacation homes',
            'experiences',
            'travel booking',
            'India travel',
            ...keywords,
        ],
        authors: [{ name: siteConfig.name }],
        creator: siteConfig.name,
        publisher: siteConfig.name,
        metadataBase: new URL(siteConfig.url),
        alternates: {
            canonical: fullUrl,
        },
        openGraph: {
            type,
            locale: 'en_IN',
            url: fullUrl,
            title: fullTitle,
            description: fullDescription,
            siteName: siteConfig.name,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: fullTitle,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description: fullDescription,
            images: [ogImage],
            creator: siteConfig.twitterHandle,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        icons: {
            icon: '/favicon.ico',
            shortcut: '/favicon-16x16.png',
            apple: '/apple-touch-icon.png',
        },
        manifest: '/site.webmanifest',
    };
}

// Generate JSON-LD structured data
export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`,
        sameAs: [
            'https://facebook.com/bookinghub',
            'https://twitter.com/bookinghub',
            'https://instagram.com/bookinghub',
            'https://linkedin.com/company/bookinghub',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91-1234567890',
            contactType: 'Customer Service',
            areaServed: 'IN',
            availableLanguage: ['en', 'hi'],
        },
    };
}

export function generateHotelSchema(hotel: any) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Hotel',
        name: hotel.name,
        description: hotel.description,
        image: hotel.images,
        address: {
            '@type': 'PostalAddress',
            streetAddress: hotel.address,
            addressLocality: hotel.city,
            addressRegion: hotel.state,
            postalCode: hotel.zipCode,
            addressCountry: 'IN',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: hotel.latitude,
            longitude: hotel.longitude,
        },
        starRating: {
            '@type': 'Rating',
            ratingValue: hotel.starRating,
        },
        aggregateRating: hotel.averageRating
            ? {
                '@type': 'AggregateRating',
                ratingValue: hotel.averageRating,
                reviewCount: hotel.reviewCount,
            }
            : undefined,
        priceRange: hotel.priceRange,
        telephone: hotel.phone,
        url: `${siteConfig.url}/hotels/${hotel.id}`,
    };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${siteConfig.url}${item.url}`,
        })),
    };
}

export function generateProductSchema(product: any) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.images,
        offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'INR',
            availability: product.available
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            url: `${siteConfig.url}${product.url}`,
        },
        aggregateRating: product.rating
            ? {
                '@type': 'AggregateRating',
                ratingValue: product.rating,
                reviewCount: product.reviewCount,
            }
            : undefined,
    };
}

// Generate sitemap entries
export interface SitemapEntry {
    url: string;
    lastModified?: Date;
    changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
}

export function generateSitemapEntries(): SitemapEntry[] {
    return [
        {
            url: '/',
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: '/hotels',
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: '/flights',
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: '/buses',
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: '/cars',
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: '/homes',
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: '/experiences',
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: '/login',
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: '/signup',
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];
}
