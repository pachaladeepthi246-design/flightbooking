// Analytics and Tracking Utilities

// Google Analytics
export function initGA(measurementId: string): void {
    if (typeof window === 'undefined') return;

    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);

    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
        (window as any).dataLayer.push(arguments);
    }
    (window as any).gtag = gtag;

    gtag('js', new Date());
    gtag('config', measurementId);
}

// Track page view
export function trackPageView(url: string): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
            page_path: url,
        });
    }
}

// Track event
export function trackEvent(
    action: string,
    category: string,
    label?: string,
    value?: number
): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
}

// Track booking
export function trackBooking(booking: {
    id: string;
    type: string;
    amount: number;
    currency: string;
}): void {
    trackEvent('purchase', 'Booking', booking.type, booking.amount);

    // E-commerce tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'purchase', {
            transaction_id: booking.id,
            value: booking.amount,
            currency: booking.currency,
            items: [
                {
                    item_id: booking.id,
                    item_name: booking.type,
                    price: booking.amount,
                    quantity: 1,
                },
            ],
        });
    }
}

// Track search
export function trackSearch(query: string, category?: string): void {
    trackEvent('search', 'Search', query);

    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'search', {
            search_term: query,
            search_category: category,
        });
    }
}

// Track user signup
export function trackSignup(method: string): void {
    trackEvent('sign_up', 'Authentication', method);

    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'sign_up', {
            method: method,
        });
    }
}

// Track user login
export function trackLogin(method: string): void {
    trackEvent('login', 'Authentication', method);

    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'login', {
            method: method,
        });
    }
}

// Custom event tracking
export interface CustomEvent {
    name: string;
    properties?: Record<string, any>;
}

export function trackCustomEvent(event: CustomEvent): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', event.name, event.properties);
    }

    // Also send to custom analytics endpoint
    if (typeof window !== 'undefined') {
        fetch('/api/analytics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event),
        }).catch(console.error);
    }
}

// User properties
export function setUserProperties(properties: Record<string, any>): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('set', 'user_properties', properties);
    }
}

// Conversion tracking
export function trackConversion(conversionId: string, value?: number): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
            send_to: conversionId,
            value: value,
            currency: 'INR',
        });
    }
}

// Error tracking
export function trackError(error: Error, context?: Record<string, any>): void {
    trackEvent('exception', 'Error', error.message);

    // Send to Sentry if available
    if (typeof window !== 'undefined' && (window as any).Sentry) {
        (window as any).Sentry.captureException(error, { extra: context });
    }

    console.error('Tracked error:', error, context);
}

// Performance metrics
export interface PerformanceMetric {
    name: string;
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
}

export function trackPerformanceMetric(metric: PerformanceMetric): void {
    trackEvent('web_vitals', 'Performance', metric.name, metric.value);

    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', metric.name, {
            value: Math.round(metric.value),
            event_category: 'Web Vitals',
            event_label: metric.rating,
            non_interaction: true,
        });
    }
}

// Session tracking
export function startSession(): void {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('session_id', sessionId);
        sessionStorage.setItem('session_start', Date.now().toString());
    }
    trackEvent('session_start', 'Session', sessionId);
}

export function endSession(): void {
    if (typeof window !== 'undefined') {
        const sessionId = sessionStorage.getItem('session_id');
        const sessionStart = sessionStorage.getItem('session_start');

        if (sessionId && sessionStart) {
            const duration = Date.now() - parseInt(sessionStart);
            trackEvent('session_end', 'Session', sessionId, duration);
        }

        sessionStorage.removeItem('session_id');
        sessionStorage.removeItem('session_start');
    }
}

// A/B Testing
export function getVariant(experimentId: string, variants: string[]): string {
    if (typeof window === 'undefined') return variants[0];

    const key = `experiment_${experimentId}`;
    let variant = localStorage.getItem(key);

    if (!variant || !variants.includes(variant)) {
        variant = variants[Math.floor(Math.random() * variants.length)];
        localStorage.setItem(key, variant);
    }

    trackEvent('experiment_view', 'A/B Test', `${experimentId}_${variant}`);
    return variant;
}

// Heatmap tracking (for tools like Hotjar)
export function initHeatmap(siteId: string): void {
    if (typeof window === 'undefined') return;

    (window as any).hj =
        (window as any).hj ||
        function () {
            ((window as any).hj.q = (window as any).hj.q || []).push(arguments);
        };
    (window as any)._hjSettings = { hjid: siteId, hjsv: 6 };

    const script = document.createElement('script');
    script.src = `https://static.hotjar.com/c/hotjar-${siteId}.js?sv=6`;
    script.async = true;
    document.head.appendChild(script);
}
