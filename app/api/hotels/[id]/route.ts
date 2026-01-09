import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const hotel = await prisma.hotel.findUnique({
            where: { id: params.id },
            include: {
                rooms: {
                    where: { status: 'ACTIVE' },
                    include: {
                        amenities: true,
                        images: true,
                    },
                },
                images: {
                    orderBy: { order: 'asc' },
                },
                amenities: true,
                reviews: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                image: true,
                            },
                        },
                        images: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                    take: 20,
                },
                vendor: {
                    select: {
                        businessName: true,
                        verified: true,
                    },
                },
            },
        });

        if (!hotel) {
            return NextResponse.json(
                { success: false, error: 'Hotel not found' },
                { status: 404 }
            );
        }

        // Calculate average ratings
        const ratings = hotel.reviews.map(r => r.rating);
        const avgRating = ratings.length > 0
            ? ratings.reduce((a, b) => a + b, 0) / ratings.length
            : 0;

        const categoryRatings = {
            cleanliness: hotel.reviews.filter(r => r.cleanliness).map(r => r.cleanliness!),
            service: hotel.reviews.filter(r => r.service).map(r => r.service!),
            location: hotel.reviews.filter(r => r.location).map(r => r.location!),
            value: hotel.reviews.filter(r => r.value).map(r => r.value!),
        };

        const avgCategoryRatings = {
            cleanliness: categoryRatings.cleanliness.length > 0
                ? categoryRatings.cleanliness.reduce((a, b) => a + b, 0) / categoryRatings.cleanliness.length
                : 0,
            service: categoryRatings.service.length > 0
                ? categoryRatings.service.reduce((a, b) => a + b, 0) / categoryRatings.service.length
                : 0,
            location: categoryRatings.location.length > 0
                ? categoryRatings.location.reduce((a, b) => a + b, 0) / categoryRatings.location.length
                : 0,
            value: categoryRatings.value.length > 0
                ? categoryRatings.value.reduce((a, b) => a + b, 0) / categoryRatings.value.length
                : 0,
        };

        return NextResponse.json({
            success: true,
            hotel: {
                ...hotel,
                rating: Math.round(avgRating * 10) / 10,
                reviewCount: ratings.length,
                categoryRatings: avgCategoryRatings,
            },
        });
    } catch (error) {
        console.error('Hotel details error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch hotel details' },
            { status: 500 }
        );
    }
}
