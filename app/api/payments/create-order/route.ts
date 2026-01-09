import { NextRequest, NextResponse } from 'next/server';
import { createRazorpayOrder } from '@/lib/razorpay';
import { generateBookingId } from '@/lib/utils';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { bookingId, amount } = body;

        if (!bookingId || !amount) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create Razorpay order
        const receipt = `${bookingId}_${Date.now()}`;
        const result = await createRazorpayOrder(amount, 'INR', receipt);

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: 'Failed to create payment order' },
                { status: 500 }
            );
        }

        if (!result.order) {
            return NextResponse.json(
                { success: false, error: 'Failed to create payment order' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            orderId: result.order.id,
            amount: result.order.amount,
            currency: result.order.currency,
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        });
    } catch (error) {
        console.error('Payment order creation error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create payment order' },
            { status: 500 }
        );
    }
}
