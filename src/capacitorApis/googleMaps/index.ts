import ENVS from '@/utils/envKeys';
import { GoogleMap } from '@capacitor/google-maps';
import { GoogleMapConfig } from '@capacitor/google-maps/dist/typings/definitions';
import { getCapGeoLocationApiData } from '../geoLocation';
import { GetCapGeoLocationApiDataResponse } from '@/types/capacitorApis';

const apiKey = ENVS.firebase.apiKey;

const mapRef = document.getElementById('map');

export const setupCapGoogleMap = async ({
	mapEl,
	mapId,
	center = {
		// The initial position to be rendered by the map
		lat: 33.6,
		lng: -117.9,
	},
	zoom = 8,
	mapConfig,
	setMapCenterToMyCurrentLocation = false,
	addMarkerAtMyCurrentLocation = false,
}: {
	mapEl: HTMLElement;
	mapId: string;
	center?: {
		lat: number;
		lng: number;
	};
	zoom?: number;
	mapConfig?: GoogleMapConfig;
	setMapCenterToMyCurrentLocation?: boolean;
	addMarkerAtMyCurrentLocation?: boolean;
}) => {
	let geoLocationData: GetCapGeoLocationApiDataResponse | null = null;
	if (setMapCenterToMyCurrentLocation || addMarkerAtMyCurrentLocation) {
		geoLocationData = await getCapGeoLocationApiData();
	}
	const _mapConfig: GoogleMapConfig = {
		...mapConfig,
		center,
		zoom, // The initial zoom level to be rendered by the map
	};

	let myCurrentLocationCoords: { lat: number; lng: number } | null = null;
	if (
		setMapCenterToMyCurrentLocation &&
		geoLocationData?.coords?.latitude &&
		geoLocationData?.coords?.longitude
	) {
		myCurrentLocationCoords = {
			lat: geoLocationData?.coords?.latitude,
			lng: geoLocationData?.coords?.longitude,
		};
		_mapConfig.center = myCurrentLocationCoords;
	}

	const _map = await GoogleMap.create({
		id: mapId, // Unique identifier for this map instance
		element: mapEl, // reference to the capacitor-google-map element
		apiKey: apiKey, // Your Google Maps API Key
		config: _mapConfig,
	});

	if (addMarkerAtMyCurrentLocation && myCurrentLocationCoords) {
		await addMarkerToCapGoogleMap({
			capGoogleMap: _map,
			coordinate: myCurrentLocationCoords,
		});
	}

	return _map;
};

export const addMarkerToCapGoogleMap = async ({
	capGoogleMap,
	coordinate,
}: {
	capGoogleMap: GoogleMap;
	coordinate: { lat: number; lng: number };
}) => {
	// Add a marker to the map
	const markerId = await capGoogleMap.addMarker({
		coordinate,
	});

	return markerId;
};
