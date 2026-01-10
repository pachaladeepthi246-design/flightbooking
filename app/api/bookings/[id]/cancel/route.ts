import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateRefundAmount } from '@/lib/utils';

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        // Fetch booking
        const booking = await prisma.booking.findUnique({
            where: { id },
            include: {
                hotel: true,
                payment: true,
            },
        });

        if (!booking) {
            return NextResponse.json(
                { success: false, error: 'Booking not found' },
                { status: 404 }
            );
        }

        if (booking.status === 'CANCELLED') {
            return NextResponse.json(
                { success: false, error: 'Booking already cancelled' },
                { status: 400 }
            );
        }

        if (booking.status === 'COMPLETED') {
            return NextResponse.json(
                { success: false, error: 'Cannot cancel completed booking' },
                { status: 400 }
            );
        }

        // Calculate refund amount based on cancellation policy (default: MODERATE)
        const refundAmount = calculateRefundAmount(
            booking.totalAmount,
            new Date(booking.checkIn),
            new Date(),
            'MODERATE' // Default policy since field doesn't exist in schema
        );

        // Update booking status
        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: {
                status: 'CANCELLED',
            },
        });

        // TODO: Process refund if applicable
        // TODO: Send cancellation email

        return NextResponse.json({
            success: true,
            booking: updatedBooking,
            refundAmount,
            message: refundAmount > 0
                ? `Booking cancelled. Refund of ${refundAmount} will be processed in 5-7 business days.`
                : 'Booking cancelled. No refund applicable as per cancellation policy.',
        });
    } catch (error) {
        console.error('Booking cancellation error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to cancel booking' },
            { status: 500 }
        );
    }
}
