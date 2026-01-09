import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateTotalAmount, generateBookingId } from '@/lib/utils';
import { siteConfig } from '@/lib/config';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            userId,
            hotelId,
            roomId,
            checkIn,
            checkOut,
            guests,
            rooms,
            specialRequests,
        } = body;

        // Validate required fields
        if (!userId || !hotelId || !roomId || !checkIn || !checkOut) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Get room details
        const room = await prisma.room.findUnique({
            where: { id: roomId },
            include: {
                hotel: {
                    include: {
                        vendor: true,
                    },
                },
            },
        });

        if (!room) {
            return NextResponse.json(
                { success: false, error: 'Room not found' },
                { status: 404 }
            );
        }

        // Calculate pricing
        const baseAmount = room.basePrice * (rooms || 1);
        const pricing = calculateTotalAmount(baseAmount);

        // Calculate commission
        const commissionRate = siteConfig.commissionRates.HOTEL;
        const commission = (pricing.total * commissionRate) / 100;

        // Create booking
        const booking = await prisma.booking.create({
            data: {
                userId,
                vendorId: room.hotel.vendorId,
                hotelId,
                roomId,
                bookingType: 'HOTEL',
                checkIn: new Date(checkIn),
                checkOut: new Date(checkOut),
                guests: guests || 1,
                rooms: rooms || 1,
                baseAmount: pricing.baseAmount,
                taxAmount: pricing.gst,
                serviceCharge: pricing.serviceCharge,
                convenienceFee: pricing.convenienceFee,
                totalAmount: pricing.total,
                commission,
                commissionRate,
                status: 'PENDING',
                paymentStatus: 'PENDING',
                cancellationPolicy: 'MODERATE',
                specialRequests: specialRequests || null,
            },
            include: {
                hotel: {
                    select: {
                        name: true,
                        address: true,
                        city: true,
                    },
                },
                room: {
                    select: {
                        name: true,
                        roomType: true,
                    },
                },
            },
        });

        return NextResponse.json({
            success: true,
            booking: {
                id: booking.id,
                bookingId: generateBookingId(),
                hotel: booking.hotel,
                room: booking.room,
                checkIn: booking.checkIn,
                checkOut: booking.checkOut,
                guests: booking.guests,
                rooms: booking.rooms,
                pricing: {
                    baseAmount: booking.baseAmount,
                    gst: booking.taxAmount,
                    serviceCharge: booking.serviceCharge,
                    convenienceFee: booking.convenienceFee,
                    total: booking.totalAmount,
                },
                status: booking.status,
            },
        });
    } catch (error) {
        console.error('Booking creation error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create booking' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const userId = searchParams.get('userId');
        const vendorId = searchParams.get('vendorId');

        if (!userId && !vendorId) {
            return NextResponse.json(
                { success: false, error: 'userId or vendorId required' },
                { status: 400 }
            );
        }

        const where: any = {};
        if (userId) where.userId = userId;
        if (vendorId) where.vendorId = vendorId;

        const bookings = await prisma.booking.findMany({
            where,
            include: {
                hotel: {
                    select: {
                        name: true,
                        city: true,
                    },
                },
                room: {
                    select: {
                        name: true,
                    },
                },
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                payment: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json({
            success: true,
            bookings,
        });
    } catch (error) {
        console.error('Bookings fetch error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch bookings' },
            { status: 500 }
        );
    }
}
