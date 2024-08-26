import ENVS from '@/utils/envKeys';
import { Loader } from '@googlemaps/js-api-loader';

const googleApisLoader = new Loader({
	apiKey: ENVS.firebase.apiKey,
	version: 'weekly',
	id: 'zaions-google-maps-script',
	language: 'en',
	libraries: ['places'],
});

let googleMapsPlacesApiInstance: google.maps.PlacesLibrary | null = null;

// Get the Google Maps Places API instance
export const getGMPlacesLApiInstance = async () => {
	if (!googleMapsPlacesApiInstance) {
		googleMapsPlacesApiInstance =
			await googleApisLoader.importLibrary('places');
	}

	return googleMapsPlacesApiInstance;
};

/**
 * Fetches autocomplete suggestions from the Google Places API based on the input query and request configuration.
 * 
 * @param input - The input query string for which autocomplete suggestions are to be fetched.
 * @param requestConfig - Optional configuration object for customizing the autocomplete request. 
 * 
 * @returns A promise that resolves to an array of autocomplete suggestions.
 */
export const fetchAutocompleteSuggestions = async (
	input: string,
	requestConfig?: google.maps.places.AutocompleteRequest
): Promise<google.maps.places.AutocompleteSuggestion[]> => {
	try {
		const api = await getGMPlacesLApiInstance();

		const { AutocompleteSessionToken, AutocompleteSuggestion } = api;

		const token = new AutocompleteSessionToken();
		const request = {
			input,
			language: 'en-US',
			sessionToken: token,
			...requestConfig,
		};

		const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);
		return suggestions;
	} catch (error) {
		// console.error('Error fetching autocomplete suggestions:', error);
		throw new Error('Failed to fetch autocomplete suggestions.');
	}
};

/**
 * Converts an array of autocomplete suggestions into an array of place predictions.
 * 
 * @param suggestions - An array of autocomplete suggestion objects retrieved from Google Places API.
 * 
 * @returns An array of place predictions with structured details and the corresponding `google.maps.places.Place` objects.
 * 
 */
export const convertSuggestionsToPredictions = (suggestions: any[]) => {
	return suggestions.map((el) => {
		const placePrediction = el.placePrediction;
		return {
			mainText: placePrediction?.mainText,
			distanceMeters: placePrediction?.distanceMeters,
			placeId: placePrediction?.placeId,
			secondaryText: placePrediction?.secondaryText,
			text: placePrediction?.text,
			types: placePrediction?.types,
			place: placePrediction?.toPlace(),
		};
	});
};

/**
 * Fetches detailed information for a specific place using the Google Places API.
 * 
 * @param place - The `google.maps.places.Place` object for which detailed information is to be fetched.
 * @param fields - An array of field names to be included in the response.
 * 
 * @returns A promise that resolves to the `google.maps.places.Place` object with the requested fields populated.
 * 
 */
export const fetchPlaceDetails = async (
	place: google.maps.places.Place,
	fields: string[]
): Promise<google.maps.places.Place> => {
	try {
		await place.fetchFields({ fields });
		return place;
	} catch (error) {
		// console.error('Error fetching place details:', error);
		throw new Error('Failed to fetch place details.');
	}
};

/**
 * Retrieves autocomplete suggestions and fetches detailed information for each place.
 * 
 * @param input - The input query string for which autocomplete suggestions are to be fetched.
 * @param requestConfig - Optional configuration object for customizing the autocomplete request.
 * @param fields - An array of field names to be included when fetching detailed place information.
 * 
 * @returns A promise that resolves to an object containing:
 * - `errorMessage`: Error message if any error occurs.
 * - `infoMessage`: Information message about the result, e.g., "No suggestions found."
 * - `items`: An array of `google.maps.places.Place` objects with detailed information.
 */
export const autoComplete = async (
	{
		input,
		requestConfig,
		fields = ['location', 'formattedAddress', 'displayName', 'addressComponents', 'attributions'],
	}: {
		input: string;
		requestConfig?: google.maps.places.AutocompleteRequest;
		fields?: string[];
	}
): Promise<{
	errorMessage: string;
	infoMessage: string;
	items: Array<google.maps.places.Place>;
}> => {
	let result: {
		errorMessage: string;
		infoMessage: string;
		items: Array<google.maps.places.Place>;
	} = {
		errorMessage: '',
		infoMessage: '',
		items: [],
	};

	try {
		const suggestions = await fetchAutocompleteSuggestions(input, requestConfig);

		if (!suggestions || suggestions.length === 0) {
			result.infoMessage = 'No suggestions found';
			return result;
		}

		const placesPrediction = convertSuggestionsToPredictions(suggestions);

		const detailedPlacesPromises = placesPrediction?.map(async (el) => {
			if (el?.place) {
				return fetchPlaceDetails(el.place, fields);
			}
			return null;
		});

		result.items = (await Promise.all(detailedPlacesPromises)).filter(
			(place): place is google.maps.places.Place => place !== null
		);

		if (result?.items?.length === 0) {
			result.infoMessage = 'No detailed places found';
		}
	} catch (error) {
		result.errorMessage = (error as Error).message || 'An error occurred';
	}

	return result;
};

export const autoCompleteTest = async () => {
	/**
	 * Demonstrates making a single request for Place predictions, then requests Place Details for the first result.
	 */
	async function init() {
		// @ts-ignore
		const { AutocompleteSessionToken, AutocompleteSuggestion } =
			await getGMPlacesLApiInstance();

		// Add an initial request body.
		let request = {
			input: 'zaions lahore',
			// locationRestriction: {
			// 	west: -122.44,
			// 	north: 37.8,
			// 	east: -122.39,
			// 	south: 37.78,
			// },
			// origin: { lat: 37.7893, lng: -122.4039 },
			// includedPrimaryTypes: ['restaurant'],
			language: 'en-US',
			// region: 'us',
		};

		// Create a session token.
		const token = new AutocompleteSessionToken();
		// Add the token to the request.
		// @ts-ignore
		request.sessionToken = token;
		// Fetch autocomplete suggestions.
		const { suggestions } =
			await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);

		// const title = document.getElementById('title') as HTMLElement;
		// title.appendChild(
		// 	document.createTextNode('Query predictions for "' + request.input + '":')
		// );

		let placesSuggestions: google.maps.places.Place[] = [];
		let placesPrediction: any[] = [];

		suggestions.forEach((el) => {
			placesPrediction.push({
				mainText: el.placePrediction?.mainText,
				distanceMeters: el.placePrediction?.distanceMeters,
				placeId: el.placePrediction?.placeId,
				secondaryText: el.placePrediction?.secondaryText,
				text: el.placePrediction?.text,
				types: el.placePrediction?.types,
			});

			const place = el.placePrediction?.toPlace();
			place && placesSuggestions.push(place);
		});

		// for (let suggestion of suggestions) {
		// 	const placePrediction = suggestion.placePrediction;

		// if (placePrediction) {
		// 	// Create a new list element.
		// 	const listItem = document.createElement('li');
		// 	const resultsElement = document.getElementById(
		// 		'results'
		// 	) as HTMLElement;
		// 	listItem.appendChild(
		// 		document.createTextNode(placePrediction.text.toString())
		// 	);
		// 	resultsElement.appendChild(listItem);
		// }
		// 	console.log({ placePrediction });
		// }

		const _firstSuggestion =
			suggestions && suggestions.length > 0 ? suggestions[0] : null;

		if (_firstSuggestion && _firstSuggestion.placePrediction) {
			const place = _firstSuggestion.placePrediction?.toPlace(); // Get first predicted place.
			/**
			 * fields we can fetch
			 * id, accessibilityOptions, addressComponents, adrFormatAddress, attributions, businessStatus, displayName, displayNameLanguageCode, formattedAddress, googleMapsURI, hasCurbsidePickup, hasDelivery, hasDineIn, hasTakeout, isReservable, servesBreakfast, servesLunch, servesDinner, servesBeer, servesWine, servesBrunch, servesVegetarianFood, iconBackgroundColor, svgIconMaskURI, internationalPhoneNumber, location, nationalPhoneNumber, regularOpeningHours, parkingOptions, paymentOptions, photos, plusCode, priceLevel, rating, reviews, types, userRatingCount, utcOffsetMinutes, viewport, websiteURI, editorialSummary, editorialSummaryLanguageCode, allowsDogs, hasLiveMusic, hasMenuForChildren, hasOutdoorSeating, hasRestroom, hasWiFi, isGoodForChildren, isGoodForGroups, isGoodForWatchingSports, servesCocktails, servesCoffee, servesDessert, primaryType, primaryTypeDisplayName, primaryTypeDisplayNameLanguageCode, evChargeOptions, fuelOptions
			 */
			await place.fetchFields({
				fields: ['location', 'formattedAddress', 'displayName', 'addressComponents'],
			});

			console.log({ place });
			// const placeInfo = document.getElementById('prediction') as HTMLElement;
			// placeInfo.textContent =
			// 	'First predicted place: ' +
			// 	place.displayName +
			// 	': ' +
			// 	place.formattedAddress;
		}
	}

	init();
};
