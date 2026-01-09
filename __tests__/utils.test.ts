import { formatCurrency, formatDate, calculateNights, isValidEmail, isValidPhone } from '@/lib/utils';

describe('Utils - Currency Formatting', () => {
    test('formats currency correctly', () => {
        expect(formatCurrency(1000)).toBe('₹1,000');
        expect(formatCurrency(1234567)).toBe('₹12,34,567');
        expect(formatCurrency(99.99)).toBe('₹100');
    });

    test('handles zero and negative values', () => {
        expect(formatCurrency(0)).toBe('₹0');
        expect(formatCurrency(-100)).toBe('-₹100');
    });
});

describe('Utils - Date Formatting', () => {
    test('formats date correctly', () => {
        const date = new Date('2026-01-15');
        expect(formatDate(date)).toMatch(/Jan 15, 2026/);
    });

    test('calculates nights correctly', () => {
        const checkIn = new Date('2026-01-15');
        const checkOut = new Date('2026-01-18');
        expect(calculateNights(checkIn, checkOut)).toBe(3);
    });
});

describe('Utils - Validation', () => {
    test('validates email correctly', () => {
        expect(isValidEmail('test@example.com')).toBe(true);
        expect(isValidEmail('invalid-email')).toBe(false);
        expect(isValidEmail('test@')).toBe(false);
    });

    test('validates phone correctly', () => {
        expect(isValidPhone('+919876543210')).toBe(true);
        expect(isValidPhone('9876543210')).toBe(true);
        expect(isValidPhone('123')).toBe(false);
    });
});
