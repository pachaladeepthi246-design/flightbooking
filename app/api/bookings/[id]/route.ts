import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const booking = await prisma.booking.findUnique({
            where: { id },
            include: {
                hotel: {
                    include: {
                        images: {
                            orderBy: { order: 'asc' },
                            take: 5,
                        },
                    },
                },
                room: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                payment: true,
            },
        });

        if (!booking) {
            return NextResponse.json(
                { success: false, error: 'Booking not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            booking,
        });
    } catch (error) {
        console.error('Booking fetch error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch booking' },
            { status: 500 }
        );
    }
}
