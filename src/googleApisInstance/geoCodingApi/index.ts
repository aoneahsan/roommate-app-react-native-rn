import axiosInstance from '@/axiosInstance';
import { getCapGeoLocationApiData } from '@/capacitorApis/geoLocation';
import { ILocationLatLng } from '@/types/generic';
import { urlParams } from '@/utils/constants/generic';
import { googleApis } from '@/utils/constants/googleApis';
import ENVS from '@/utils/envKeys';

export const getPlaceDataFromLatLong = async ({
	coords,
}: {
	coords: ILocationLatLng;
}) => {
	const result = JSON.parse(
		(
			await axiosInstance.get(
				`${googleApis.geocoding.url}`
					.replace(urlParams.latlng, `${coords.lat},${coords.lng}`)
					.replace(urlParams.googleMapsApiKey, ENVS.firebase.apiKey)
			)
		).data
	);

	return result;
};

export const getMyCurrentLocationFormattedPlaceData = async () => {
	const geolocationData = await getCapGeoLocationApiData();
	console.log({ geolocationData })
	if (geolocationData.coords?.latitude && geolocationData.coords?.longitude) {
		return getPlaceDataFromLatLong({
			coords: {
				lat: geolocationData.coords?.latitude,
				lng: geolocationData.coords?.longitude,
			},
		});
	} else {
		return geolocationData;
	}
};
