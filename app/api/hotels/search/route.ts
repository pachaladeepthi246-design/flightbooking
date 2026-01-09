import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const city = searchParams.get('city');
        const checkIn = searchParams.get('checkIn');
        const checkOut = searchParams.get('checkOut');
        const guests = parseInt(searchParams.get('guests') || '1');
        const minPrice = parseFloat(searchParams.get('minPrice') || '0');
        const maxPrice = parseFloat(searchParams.get('maxPrice') || '100000');
        const starRating = searchParams.get('starRating');
        const amenities = searchParams.get('amenities')?.split(',').filter(Boolean) || [];

        // Build query
        const where: any = {
            status: 'ACTIVE',
        };

        if (city) {
            where.city = {
                contains: city,
                mode: 'insensitive',
            };
        }

        if (starRating) {
            where.starRating = parseInt(starRating);
        }

        // Get hotels with rooms
        const hotels = await prisma.hotel.findMany({
            where,
            include: {
                rooms: {
                    where: {
                        status: 'ACTIVE',
                        basePrice: {
                            gte: minPrice,
                            lte: maxPrice,
                        },
                    },
                    take: 1,
                    orderBy: {
                        basePrice: 'asc',
                    },
                },
                images: {
                    where: {
                        isCover: true,
                    },
                    take: 1,
                },
                amenities: true,
                reviews: {
                    select: {
                        rating: true,
                    },
                },
                vendor: {
                    select: {
                        businessName: true,
                        verified: true,
                    },
                },
            },
            take: 50,
        });

        // Calculate average ratings and filter
        const hotelsWithRatings = hotels.map(hotel => {
            const ratings = hotel.reviews.map(r => r.rating);
            const avgRating = ratings.length > 0
                ? ratings.reduce((a, b) => a + b, 0) / ratings.length
                : 0;

            return {
                id: hotel.id,
                name: hotel.name,
                description: hotel.description,
                city: hotel.city,
                state: hotel.state,
                address: hotel.address,
                starRating: hotel.starRating,
                rating: Math.round(avgRating * 10) / 10,
                reviewCount: ratings.length,
                image: hotel.images[0]?.url || null,
                amenities: hotel.amenities.map(a => a.name),
                minPrice: hotel.rooms[0]?.basePrice || 0,
                vendor: hotel.vendor,
                checkInTime: hotel.checkInTime,
                checkOutTime: hotel.checkOutTime,
            };
        }).filter(hotel => hotel.minPrice > 0);

        return NextResponse.json({
            success: true,
            count: hotelsWithRatings.length,
            hotels: hotelsWithRatings,
        });
    } catch (error) {
        console.error('Hotel search error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to search hotels' },
            { status: 500 }
        );
    }
}
