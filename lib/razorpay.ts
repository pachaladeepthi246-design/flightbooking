import Razorpay from 'razorpay';

// Initialize Razorpay instance
export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || '',
    key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

// Create order
export async function createRazorpayOrder(amount: number, currency: string = 'INR', receipt: string) {
    try {
        const order = await razorpay.orders.create({
            amount: amount * 100, // Amount in paise
            currency,
            receipt,
            payment_capture: 1,
        });
        return { success: true, order };
    } catch (error) {
        console.error('Razorpay order creation error:', error);
        return { success: false, error };
    }
}

// Verify payment signature
export function verifyRazorpaySignature(
    orderId: string,
    paymentId: string,
    signature: string
): boolean {
    const crypto = require('crypto');
    const text = `${orderId}|${paymentId}`;
    const generated_signature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
        .update(text)
        .digest('hex');

    return generated_signature === signature;
}

// Fetch payment details
export async function fetchPaymentDetails(paymentId: string) {
    try {
        const payment = await razorpay.payments.fetch(paymentId);
        return { success: true, payment };
    } catch (error) {
        console.error('Razorpay payment fetch error:', error);
        return { success: false, error };
    }
}

// Initiate refund
export async function initiateRefund(paymentId: string, amount?: number) {
    try {
        const refund = await razorpay.payments.refund(paymentId, {
            amount: amount ? amount * 100 : undefined, // Amount in paise
        });
        return { success: true, refund };
    } catch (error) {
        console.error('Razorpay refund error:', error);
        return { success: false, error };
    }
}

// Fetch refund status
export async function fetchRefundStatus(refundId: string) {
    try {
        const refund = await razorpay.refunds.fetch(refundId);
        return { success: true, refund };
    } catch (error) {
        console.error('Razorpay refund fetch error:', error);
        return { success: false, error };
    }
}
