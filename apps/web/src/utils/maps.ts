// Utility function to generate map URLs for different platforms
export const getMapUrl = (address: string, city?: string, state?: string, country?: string): string => {
	// Build the full address string
	const fullAddress = [address, city, state, country]
		.filter(Boolean)
		.join(", ");

	// Encode the address for URLs
	const encodedAddress = encodeURIComponent(fullAddress);

	// Detect platform and return appropriate map URL
	const userAgent = navigator.userAgent.toLowerCase();

	// Apple devices (iOS and macOS) use Apple Maps
	const isAppleDevice =
		userAgent.includes("iphone") ||
		userAgent.includes("ipad") ||
		userAgent.includes("ipod") ||
		userAgent.includes("mac os x");

	if (isAppleDevice) {
		return `maps:///?q=${encodedAddress}`;
	}

	// Android and other platforms use geo: URI scheme
	// This works on Android, Windows, and most modern platforms
	// Browsers will typically fall back to Google Maps if geo: isn't supported
	return `geo:0,0?q=${encodedAddress}`;
};
