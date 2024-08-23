import { urlParams } from '../generic';

/**
 * geocoding: https://developers.google.com/maps/documentation/geocoding/requests-geocoding
 * reverse geocoding: https://developers.google.com/maps/documentation/geocoding/requests-reverse-geocoding
 */
export const googleApis = {
	geocoding: {
		url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${urlParams.latlng}&key=${urlParams.googleMapsApiKey}`,
	},
} as const;
