// Google Maps & Places API Integration Utilities

interface PlaceResult {
    placeId: string;
    name: string;
    address: string;
    location: {
        lat: number;
        lng: number;
    };
    rating?: number;
    photos?: string[];
    phoneNumber?: string;
    website?: string;
    priceLevel?: number;
}

// Initialize Google Maps
export function loadGoogleMaps(): Promise<void> {
    return new Promise((resolve, reject) => {
        if (typeof window === 'undefined') {
            reject(new Error('Google Maps can only be loaded in browser'));
            return;
        }

        if (window.google && window.google.maps) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Google Maps'));
        document.head.appendChild(script);
    });
}

// Search for places
export async function searchPlaces(
    query: string,
    location?: { lat: number; lng: number },
    radius: number = 5000
): Promise<PlaceResult[]> {
    await loadGoogleMaps();

    return new Promise((resolve, reject) => {
        const service = new google.maps.places.PlacesService(
            document.createElement('div')
        );

        const request: google.maps.places.TextSearchRequest = {
            query,
            ...(location && { location: new google.maps.LatLng(location.lat, location.lng) }),
            radius,
        };

        service.textSearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                const places: PlaceResult[] = results.map((place) => ({
                    placeId: place.place_id || '',
                    name: place.name || '',
                    address: place.formatted_address || '',
                    location: {
                        lat: place.geometry?.location?.lat() || 0,
                        lng: place.geometry?.location?.lng() || 0,
                    },
                    rating: place.rating,
                    photos: place.photos?.map((photo) => photo.getUrl({ maxWidth: 400 })),
                    priceLevel: place.price_level,
                }));
                resolve(places);
            } else {
                reject(new Error(`Places search failed: ${status}`));
            }
        });
    });
}

// Get place details
export async function getPlaceDetails(placeId: string): Promise<PlaceResult | null> {
    await loadGoogleMaps();

    return new Promise((resolve, reject) => {
        const service = new google.maps.places.PlacesService(
            document.createElement('div')
        );

        service.getDetails({ placeId }, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place) {
                resolve({
                    placeId: place.place_id || '',
                    name: place.name || '',
                    address: place.formatted_address || '',
                    location: {
                        lat: place.geometry?.location?.lat() || 0,
                        lng: place.geometry?.location?.lng() || 0,
                    },
                    rating: place.rating,
                    photos: place.photos?.map((photo) => photo.getUrl({ maxWidth: 800 })),
                    phoneNumber: place.formatted_phone_number,
                    website: place.website,
                    priceLevel: place.price_level,
                });
            } else {
                reject(new Error(`Place details failed: ${status}`));
            }
        });
    });
}

// Autocomplete search
export async function autocompleteSearch(
    input: string,
    types: string[] = ['establishment']
): Promise<google.maps.places.AutocompletePrediction[]> {
    await loadGoogleMaps();

    return new Promise((resolve, reject) => {
        const service = new google.maps.places.AutocompleteService();

        service.getPlacePredictions(
            {
                input,
                types,
            },
            (predictions, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
                    resolve(predictions);
                } else {
                    reject(new Error(`Autocomplete failed: ${status}`));
                }
            }
        );
    });
}

// Geocode address to coordinates
export async function geocodeAddress(
    address: string
): Promise<{ lat: number; lng: number } | null> {
    await loadGoogleMaps();

    return new Promise((resolve, reject) => {
        const geocoder = new google.maps.Geocoder();

        geocoder.geocode({ address }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
                resolve({
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng(),
                });
            } else {
                reject(new Error(`Geocoding failed: ${status}`));
            }
        });
    });
}

// Reverse geocode coordinates to address
export async function reverseGeocode(
    lat: number,
    lng: number
): Promise<string | null> {
    await loadGoogleMaps();

    return new Promise((resolve, reject) => {
        const geocoder = new google.maps.Geocoder();
        const latlng = new google.maps.LatLng(lat, lng);

        geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
                resolve(results[0].formatted_address);
            } else {
                reject(new Error(`Reverse geocoding failed: ${status}`));
            }
        });
    });
}

// Calculate distance between two points
export function calculateDistance(
    point1: { lat: number; lng: number },
    point2: { lat: number; lng: number }
): number {
    const R = 6371; // Earth's radius in km
    const dLat = ((point2.lat - point1.lat) * Math.PI) / 180;
    const dLng = ((point2.lng - point1.lng) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((point1.lat * Math.PI) / 180) *
        Math.cos((point2.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

// Get user's current location
export function getCurrentLocation(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => {
                reject(error);
            }
        );
    });
}
