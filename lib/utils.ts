import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = "INR"): string {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount)
}

export function formatDate(date: Date | string, format: "short" | "long" | "full" = "short"): string {
    const d = typeof date === "string" ? new Date(date) : date

    const options: Intl.DateTimeFormatOptions = {
        short: { month: "short", day: "numeric", year: "numeric" },
        long: { month: "long", day: "numeric", year: "numeric" },
        full: { weekday: "long", month: "long", day: "numeric", year: "numeric" },
    }[format]

    return new Intl.DateTimeFormat("en-IN", options).format(d)
}

export function formatTime(date: Date | string): string {
    const d = typeof date === "string" ? new Date(date) : date
    return new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).format(d)
}

export function calculateNights(checkIn: Date, checkOut: Date): number {
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function calculateCommission(amount: number, rate: number): number {
    return (amount * rate) / 100
}

export function calculateGST(amount: number, rate: number = 12): number {
    return (amount * rate) / 100
}

export function calculateServiceCharge(amount: number, rate: number = 10): number {
    return (amount * rate) / 100
}

export function calculateTotalAmount(
    baseAmount: number,
    options: {
        gstRate?: number
        serviceChargeRate?: number
        convenienceFee?: number
    } = {}
): {
    baseAmount: number
    gst: number
    serviceCharge: number
    convenienceFee: number
    total: number
} {
    const gst = calculateGST(baseAmount, options.gstRate || 12)
    const serviceCharge = calculateServiceCharge(baseAmount, options.serviceChargeRate || 10)
    const convenienceFee = options.convenienceFee || 99

    return {
        baseAmount,
        gst,
        serviceCharge,
        convenienceFee,
        total: baseAmount + gst + serviceCharge + convenienceFee,
    }
}

export function generateBookingId(): string {
    const prefix = "BK"
    const timestamp = Date.now().toString(36).toUpperCase()
    const random = Math.random().toString(36).substring(2, 6).toUpperCase()
    return `${prefix}${timestamp}${random}`
}

export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "")
}

export function truncate(text: string, length: number): string {
    if (text.length <= length) return text
    return text.substring(0, length) + "..."
}

export function getInitials(name: string): string {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
}

export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            timeout = null
            func(...args)
        }

        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message
    if (typeof error === "string") return error
    return "An unknown error occurred"
}

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
    const phoneRegex = /^[6-9]\d{9}$/
    return phoneRegex.test(phone.replace(/\s+/g, ""))
}

export function isValidGST(gst: string): boolean {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    return gstRegex.test(gst)
}

export function isValidPAN(pan: string): boolean {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
    return panRegex.test(pan)
}

export function calculateRefundAmount(
    totalAmount: number,
    checkInDate: Date,
    cancellationDate: Date,
    policy: "FLEXIBLE" | "MODERATE" | "STRICT"
): number {
    const hoursUntilCheckIn = (checkInDate.getTime() - cancellationDate.getTime()) / (1000 * 60 * 60)

    if (policy === "FLEXIBLE") {
        return hoursUntilCheckIn >= 24 ? totalAmount : 0
    }

    if (policy === "MODERATE") {
        if (hoursUntilCheckIn >= 120) return totalAmount // 5 days
        if (hoursUntilCheckIn >= 24) return totalAmount * 0.5
        return 0
    }

    // STRICT
    return 0
}

export function getStarRating(rating: number): string {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return "★".repeat(fullStars) + (hasHalfStar ? "½" : "") + "☆".repeat(emptyStars)
}

export function calculateAverageRating(ratings: number[]): number {
    if (ratings.length === 0) return 0
    const sum = ratings.reduce((acc, rating) => acc + rating, 0)
    return Math.round((sum / ratings.length) * 10) / 10
}

export function getDaysDifference(date1: Date, date2: Date): number {
    const diffTime = Math.abs(date2.getTime() - date1.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function addDays(date: Date, days: number): Date {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
}

export function isSameDay(date1: Date, date2: Date): boolean {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    )
}

export function isDateInRange(date: Date, start: Date, end: Date): boolean {
    return date >= start && date <= end
}
