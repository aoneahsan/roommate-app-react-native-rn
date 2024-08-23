import { GeoLocationResponseCodeEnum } from '@/enums/generic';

export type GetCapGeoLocationApiDataResponse = {
	coords: Partial<GeolocationCoordinates> | null;
	message: string;
	code: GeoLocationResponseCodeEnum;
	success: boolean;
};
