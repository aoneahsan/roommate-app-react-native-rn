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

export const getGMPlacesLApiInstance = async () => {
	if (!googleMapsPlacesApiInstance) {
		googleMapsPlacesApiInstance =
			await googleApisLoader.importLibrary('places');
	}

	return googleMapsPlacesApiInstance;
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

		console.log({ suggestions, placesSuggestions, placesPrediction });

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
				fields: ['location', 'formattedAddress', 'displayName'],
			});

			console.log({ _firstSuggestion, place });
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
