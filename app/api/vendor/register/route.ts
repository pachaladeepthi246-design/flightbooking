import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { isValidEmail, isValidPhone, isValidGST, isValidPAN } from '@/lib/utils';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            // Personal Info
            name,
            email,
            password,

            // Business Info
            businessName,
            businessType,
            category,

            // Documents
            gstNumber,
            panNumber,

            // Bank Details
            bankAccount,
            ifscCode,
        } = body;

        // Validation
        if (!name || !email || !password || !businessName || !panNumber || !bankAccount || !ifscCode) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (!isValidEmail(email)) {
            return NextResponse.json(
                { success: false, error: 'Invalid email format' },
                { status: 400 }
            );
        }



        if (gstNumber && !isValidGST(gstNumber)) {
            return NextResponse.json(
                { success: false, error: 'Invalid GST number' },
                { status: 400 }
            );
        }

        if (!isValidPAN(panNumber)) {
            return NextResponse.json(
                { success: false, error: 'Invalid PAN number' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { success: false, error: 'User already exists with this email' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user and vendor in a transaction
        const result = await prisma.$transaction(async (tx) => {
            // Create user
            const user = await tx.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    role: 'VENDOR',
                },
            });

            // Create vendor
            const vendor = await tx.vendor.create({
                data: {
                    userId: user.id,
                    businessName,
                    businessType,
                    category,
                    gstNumber,
                    panNumber,
                    bankAccount,
                    ifscCode,
                    subscriptionPlan: 'FREE',
                    status: 'PENDING',
                    verified: false,
                },
            });

            return { user, vendor };
        });

        return NextResponse.json({
            success: true,
            user: {
                id: result.user.id,
                name: result.user.name,
                email: result.user.email,
                role: result.user.role,
            },
            vendor: {
                id: result.vendor.id,
                businessName: result.vendor.businessName,
                status: result.vendor.status,
                subscriptionPlan: result.vendor.subscriptionPlan,
            },
            message: 'Vendor registered successfully. Your application is under review.',
        });
    } catch (error) {
        console.error('Vendor registration error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to register vendor' },
            { status: 500 }
        );
    }
}
