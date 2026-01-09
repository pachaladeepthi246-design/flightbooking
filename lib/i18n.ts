// Internationalization (i18n) Support

export type Locale = 'en' | 'hi' | 'ta' | 'te' | 'bn' | 'mr';

export const locales: Locale[] = ['en', 'hi', 'ta', 'te', 'bn', 'mr'];

export const defaultLocale: Locale = 'en';

// Translation dictionaries
const translations: Record<Locale, Record<string, string>> = {
    en: {
        // Common
        'common.search': 'Search',
        'common.book_now': 'Book Now',
        'common.view_details': 'View Details',
        'common.cancel': 'Cancel',
        'common.confirm': 'Confirm',
        'common.login': 'Login',
        'common.signup': 'Sign Up',
        'common.logout': 'Logout',

        // Homepage
        'home.title': 'Book Your Perfect Stay',
        'home.subtitle': 'Hotels, Flights, Buses & More',
        'home.search_placeholder': 'Where do you want to go?',

        // Booking
        'booking.check_in': 'Check-in',
        'booking.check_out': 'Check-out',
        'booking.guests': 'Guests',
        'booking.rooms': 'Rooms',
        'booking.total': 'Total',
        'booking.confirm_booking': 'Confirm Booking',

        // Categories
        'category.hotels': 'Hotels',
        'category.flights': 'Flights',
        'category.buses': 'Buses',
        'category.cars': 'Cars & Bikes',
        'category.homes': 'Vacation Homes',
        'category.experiences': 'Experiences',
    },
    hi: {
        // Common
        'common.search': 'खोजें',
        'common.book_now': 'अभी बुक करें',
        'common.view_details': 'विवरण देखें',
        'common.cancel': 'रद्द करें',
        'common.confirm': 'पुष्टि करें',
        'common.login': 'लॉगिन',
        'common.signup': 'साइन अप',
        'common.logout': 'लॉगआउट',

        // Homepage
        'home.title': 'अपना परफेक्ट ठहराव बुक करें',
        'home.subtitle': 'होटल, फ्लाइट, बस और अधिक',
        'home.search_placeholder': 'आप कहाँ जाना चाहते हैं?',

        // Booking
        'booking.check_in': 'चेक-इन',
        'booking.check_out': 'चेक-आउट',
        'booking.guests': 'मेहमान',
        'booking.rooms': 'कमरे',
        'booking.total': 'कुल',
        'booking.confirm_booking': 'बुकिंग की पुष्टि करें',

        // Categories
        'category.hotels': 'होटल',
        'category.flights': 'फ्लाइट',
        'category.buses': 'बस',
        'category.cars': 'कार और बाइक',
        'category.homes': 'वेकेशन होम',
        'category.experiences': 'अनुभव',
    },
    ta: {
        // Common
        'common.search': 'தேடு',
        'common.book_now': 'இப்போது பதிவு செய்',
        'common.view_details': 'விவரங்களைக் காண்க',
        'common.cancel': 'ரத்து செய்',
        'common.confirm': 'உறுதிப்படுத்து',
        'common.login': 'உள்நுழைக',
        'common.signup': 'பதிவு செய்க',
        'common.logout': 'வெளியேறு',

        // Homepage
        'home.title': 'உங்கள் சரியான தங்குமிடத்தை பதிவு செய்யுங்கள்',
        'home.subtitle': 'ஹோட்டல்கள், விமானங்கள், பேருந்துகள் மற்றும் பல',
        'home.search_placeholder': 'நீங்கள் எங்கு செல்ல விரும்புகிறீர்கள்?',

        // Booking
        'booking.check_in': 'செக்-இன்',
        'booking.check_out': 'செக்-அவுட்',
        'booking.guests': 'விருந்தினர்கள்',
        'booking.rooms': 'அறைகள்',
        'booking.total': 'மொத்தம்',
        'booking.confirm_booking': 'பதிவை உறுதிப்படுத்து',

        // Categories
        'category.hotels': 'ஹோட்டல்கள்',
        'category.flights': 'விமானங்கள்',
        'category.buses': 'பேருந்துகள்',
        'category.cars': 'கார்கள் மற்றும் பைக்குகள்',
        'category.homes': 'விடுமுறை வீடுகள்',
        'category.experiences': 'அனுபவங்கள்',
    },
    te: {
        // Common (Telugu)
        'common.search': 'వెతకండి',
        'common.book_now': 'ఇప్పుడే బుక్ చేయండి',
        'common.view_details': 'వివరాలు చూడండి',
        'common.cancel': 'రద్దు చేయండి',
        'common.confirm': 'నిర్ధారించండి',
        'common.login': 'లాగిన్',
        'common.signup': 'సైన్ అప్',
        'common.logout': 'లాగౌట్',

        // Categories
        'category.hotels': 'హోటళ్ళు',
        'category.flights': 'విమానాలు',
        'category.buses': 'బస్సులు',
        'category.cars': 'కార్లు మరియు బైక్‌లు',
        'category.homes': 'వెకేషన్ హోమ్స్',
        'category.experiences': 'అనుభవాలు',
    },
    bn: {
        // Common (Bengali)
        'common.search': 'অনুসন্ধান',
        'common.book_now': 'এখনই বুক করুন',
        'common.view_details': 'বিস্তারিত দেখুন',
        'common.cancel': 'বাতিল',
        'common.confirm': 'নিশ্চিত করুন',
        'common.login': 'লগইন',
        'common.signup': 'সাইন আপ',
        'common.logout': 'লগআউট',

        // Categories
        'category.hotels': 'হোটেল',
        'category.flights': 'ফ্লাইট',
        'category.buses': 'বাস',
        'category.cars': 'গাড়ি এবং বাইক',
        'category.homes': 'ভ্যাকেশন হোম',
        'category.experiences': 'অভিজ্ঞতা',
    },
    mr: {
        // Common (Marathi)
        'common.search': 'शोधा',
        'common.book_now': 'आता बुक करा',
        'common.view_details': 'तपशील पहा',
        'common.cancel': 'रद्द करा',
        'common.confirm': 'पुष्टी करा',
        'common.login': 'लॉगिन',
        'common.signup': 'साइन अप',
        'common.logout': 'लॉगआउट',

        // Categories
        'category.hotels': 'हॉटेल्स',
        'category.flights': 'फ्लाइट्स',
        'category.buses': 'बस',
        'category.cars': 'कार आणि बाईक',
        'category.homes': 'व्हेकेशन होम्स',
        'category.experiences': 'अनुभव',
    },
};

// Get translation
export function t(key: string, locale: Locale = defaultLocale): string {
    return translations[locale]?.[key] || translations[defaultLocale][key] || key;
}

// Get current locale from browser or cookie
export function getLocale(): Locale {
    if (typeof window === 'undefined') return defaultLocale;

    const stored = localStorage.getItem('locale');
    if (stored && locales.includes(stored as Locale)) {
        return stored as Locale;
    }

    const browserLang = navigator.language.split('-')[0];
    if (locales.includes(browserLang as Locale)) {
        return browserLang as Locale;
    }

    return defaultLocale;
}

// Set locale
export function setLocale(locale: Locale): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('locale', locale);
    window.location.reload();
}

// Format currency based on locale
export function formatCurrencyLocale(amount: number, locale: Locale = 'en'): string {
    const formatter = new Intl.NumberFormat(locale === 'en' ? 'en-IN' : `${locale}-IN`, {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return formatter.format(amount);
}

// Format date based on locale
export function formatDateLocale(date: Date, locale: Locale = 'en'): string {
    const formatter = new Intl.DateTimeFormat(locale === 'en' ? 'en-IN' : `${locale}-IN`, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return formatter.format(date);
}

// RTL support
export const rtlLocales: Locale[] = []; // Add RTL languages if needed

export function isRTL(locale: Locale): boolean {
    return rtlLocales.includes(locale);
}
