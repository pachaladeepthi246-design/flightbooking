import { NextRequest } from 'next/server';
import { GET, POST } from '@/app/api/bookings/route';

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
    prisma: {
        booking: {
            findMany: jest.fn(),
            create: jest.fn(),
        },
    },
}));

describe('API - Bookings', () => {
    describe('GET /api/bookings', () => {
        it('should return bookings for a user', async () => {
            const mockBookings = [
                {
                    id: 'booking-1',
                    userId: 'user-1',
                    hotelId: 'hotel-1',
                    totalAmount: 10000,
                    status: 'CONFIRMED',
                },
            ];

            const { prisma } = require('@/lib/prisma');
            prisma.booking.findMany.mockResolvedValue(mockBookings);

            const request = new NextRequest('http://localhost:3002/api/bookings?userId=user-1');
            const response = await GET(request);
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data.success).toBe(true);
            expect(data.bookings).toHaveLength(1);
        });
    });

    describe('POST /api/bookings', () => {
        it('should create a new booking', async () => {
            const mockBooking = {
                id: 'booking-1',
                userId: 'user-1',
                hotelId: 'hotel-1',
                totalAmount: 10000,
                status: 'PENDING',
            };

            const { prisma } = require('@/lib/prisma');
            prisma.booking.create.mockResolvedValue(mockBooking);

            const request = new NextRequest('http://localhost:3002/api/bookings', {
                method: 'POST',
                body: JSON.stringify({
                    userId: 'user-1',
                    hotelId: 'hotel-1',
                    checkIn: '2026-01-15',
                    checkOut: '2026-01-18',
                    guests: 2,
                }),
            });

            const response = await POST(request);
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data.success).toBe(true);
            expect(data.booking).toBeDefined();
        });

        it('should return error for missing fields', async () => {
            const request = new NextRequest('http://localhost:3002/api/bookings', {
                method: 'POST',
                body: JSON.stringify({
                    userId: 'user-1',
                }),
            });

            const response = await POST(request);
            const data = await response.json();

            expect(response.status).toBe(400);
            expect(data.success).toBe(false);
        });
    });
});
