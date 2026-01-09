import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            userId,
            bookingId,
            hotelId,
            rating,
            title,
            comment,
            cleanliness,
            service,
            location,
            value,
            images,
        } = body;

        // Validation
        if (!userId || !bookingId || !rating || !comment) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json(
                { success: false, error: 'Rating must be between 1 and 5' },
                { status: 400 }
            );
        }

        // Check if booking exists and belongs to user
        const booking = await prisma.booking.findFirst({
            where: {
                id: bookingId,
                userId,
                status: 'COMPLETED',
            },
        });

        if (!booking) {
            return NextResponse.json(
                { success: false, error: 'Booking not found or not completed' },
                { status: 404 }
            );
        }

        // Check if review already exists
        const existingReview = await prisma.review.findFirst({
            where: {
                userId,
                bookingId,
            },
        });

        if (existingReview) {
            return NextResponse.json(
                { success: false, error: 'Review already submitted for this booking' },
                { status: 400 }
            );
        }

        // Create review
        const review = await prisma.review.create({
            data: {
                userId,
                bookingId,
                hotelId: hotelId || booking.hotelId,
                rating,
                title,
                comment,
                cleanliness,
                service,
                location,
                value,
                verified: true, // Verified because it's from a real booking
            },
        });

        // Add review images if provided
        if (images && images.length > 0) {
            await prisma.reviewImage.createMany({
                data: images.map((url: string) => ({
                    reviewId: review.id,
                    url,
                })),
            });
        }

        return NextResponse.json({
            success: true,
            review,
            message: 'Review submitted successfully',
        });
    } catch (error) {
        console.error('Review submission error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to submit review' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const hotelId = searchParams.get('hotelId');
        const userId = searchParams.get('userId');
        const limit = parseInt(searchParams.get('limit') || '20');

        const where: any = {};
        if (hotelId) where.hotelId = hotelId;
        if (userId) where.userId = userId;

        const reviews = await prisma.review.findMany({
            where,
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
            take: limit,
        });

        // Calculate average ratings
        const avgRating = reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;

        const categoryAvgs = {
            cleanliness: reviews.filter(r => r.cleanliness).length > 0
                ? reviews.filter(r => r.cleanliness).reduce((sum, r) => sum + (r.cleanliness || 0), 0) / reviews.filter(r => r.cleanliness).length
                : 0,
            service: reviews.filter(r => r.service).length > 0
                ? reviews.filter(r => r.service).reduce((sum, r) => sum + (r.service || 0), 0) / reviews.filter(r => r.service).length
                : 0,
            location: reviews.filter(r => r.location).length > 0
                ? reviews.filter(r => r.location).reduce((sum, r) => sum + (r.location || 0), 0) / reviews.filter(r => r.location).length
                : 0,
            value: reviews.filter(r => r.value).length > 0
                ? reviews.filter(r => r.value).reduce((sum, r) => sum + (r.value || 0), 0) / reviews.filter(r => r.value).length
                : 0,
        };

        return NextResponse.json({
            success: true,
            reviews,
            stats: {
                totalReviews: reviews.length,
                averageRating: Math.round(avgRating * 10) / 10,
                categoryAverages: categoryAvgs,
            },
        });
    } catch (error) {
        console.error('Reviews fetch error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch reviews' },
            { status: 500 }
        );
    }
}
