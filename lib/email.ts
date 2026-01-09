import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
    try {
        const data = await resend.emails.send({
            from: process.env.EMAIL_FROM || 'BookingHub <noreply@bookinghub.com>',
            to,
            subject,
            html,
        });
        return { success: true, data };
    } catch (error) {
        console.error('Email sending error:', error);
        return { success: false, error };
    }
}

// Booking Confirmation Email
export function getBookingConfirmationEmail(booking: any) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
        .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Booking Confirmed!</h1>
          <p>Your booking has been successfully confirmed</p>
        </div>
        <div class="content">
          <p>Dear ${booking.userName},</p>
          <p>Thank you for booking with BookingHub! Your reservation has been confirmed.</p>
          
          <div class="booking-details">
            <h2>Booking Details</h2>
            <div class="detail-row">
              <strong>Booking ID:</strong>
              <span>${booking.id}</span>
            </div>
            <div class="detail-row">
              <strong>Property:</strong>
              <span>${booking.propertyName}</span>
            </div>
            <div class="detail-row">
              <strong>Check-in:</strong>
              <span>${booking.checkIn}</span>
            </div>
            <div class="detail-row">
              <strong>Check-out:</strong>
              <span>${booking.checkOut}</span>
            </div>
            <div class="detail-row">
              <strong>Guests:</strong>
              <span>${booking.guests}</span>
            </div>
            <div class="detail-row">
              <strong>Total Amount:</strong>
              <span><strong>₹${booking.totalAmount.toLocaleString()}</strong></span>
            </div>
          </div>

          <p>You will receive a separate email with your invoice and payment receipt.</p>
          
          <a href="${process.env.NEXTAUTH_URL}/dashboard" class="button">View Booking</a>
          
          <p>If you have any questions, please don't hesitate to contact us.</p>
          
          <div class="footer">
            <p>© 2026 BookingHub. All rights reserved.</p>
            <p>This is an automated email. Please do not reply.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Payment Receipt Email
export function getPaymentReceiptEmail(payment: any) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #22c55e; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .receipt { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
        .total { font-size: 18px; font-weight: bold; color: #22c55e; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Payment Successful</h1>
          <p>Your payment has been processed</p>
        </div>
        <div class="content">
          <p>Dear ${payment.userName},</p>
          <p>We have successfully received your payment for booking #${payment.bookingId}.</p>
          
          <div class="receipt">
            <h2>Payment Receipt</h2>
            <div class="detail-row">
              <strong>Payment ID:</strong>
              <span>${payment.id}</span>
            </div>
            <div class="detail-row">
              <strong>Date:</strong>
              <span>${new Date(payment.createdAt).toLocaleDateString()}</span>
            </div>
            <div class="detail-row">
              <strong>Payment Method:</strong>
              <span>${payment.gateway}</span>
            </div>
            <div class="detail-row">
              <strong>Base Amount:</strong>
              <span>₹${payment.baseAmount.toLocaleString()}</span>
            </div>
            <div class="detail-row">
              <strong>GST (12%):</strong>
              <span>₹${payment.gst.toLocaleString()}</span>
            </div>
            <div class="detail-row">
              <strong>Service Charge:</strong>
              <span>₹${payment.serviceCharge.toLocaleString()}</span>
            </div>
            <div class="detail-row total">
              <strong>Total Paid:</strong>
              <span>₹${payment.totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <p>This receipt is for your records. You can download the invoice from your dashboard.</p>
          
          <div class="footer">
            <p>© 2026 BookingHub. All rights reserved.</p>
            <p>For support, contact us at support@bookinghub.com</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Vendor Approval Email
export function getVendorApprovalEmail(vendor: any) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎊 Welcome to BookingHub!</h1>
          <p>Your vendor account has been approved</p>
        </div>
        <div class="content">
          <p>Dear ${vendor.businessName},</p>
          <p>Congratulations! Your vendor application has been approved. You can now start listing your properties and accepting bookings.</p>
          
          <h3>Next Steps:</h3>
          <ol>
            <li>Complete your business profile</li>
            <li>Add your first property listing</li>
            <li>Set up your availability calendar</li>
            <li>Configure your pricing</li>
          </ol>

          <p>You're currently on the <strong>FREE</strong> plan with a 14-day trial. Upgrade anytime to unlock more features!</p>
          
          <a href="${process.env.NEXTAUTH_URL}/vendor/dashboard" class="button">Go to Dashboard</a>
          
          <div class="footer">
            <p>© 2026 BookingHub. All rights reserved.</p>
            <p>Need help? Contact vendor-support@bookinghub.com</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Password Reset Email
export function getPasswordResetEmail(resetLink: string, userName: string) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #ef4444; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #ef4444; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .warning { background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔒 Password Reset Request</h1>
        </div>
        <div class="content">
          <p>Dear ${userName},</p>
          <p>We received a request to reset your password. Click the button below to create a new password:</p>
          
          <a href="${resetLink}" class="button">Reset Password</a>
          
          <div class="warning">
            <strong>⚠️ Security Notice:</strong><br>
            This link will expire in 1 hour. If you didn't request this reset, please ignore this email.
          </div>
          
          <p>For security reasons, never share this link with anyone.</p>
          
          <div class="footer">
            <p>© 2026 BookingHub. All rights reserved.</p>
            <p>If you have concerns, contact security@bookinghub.com</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
