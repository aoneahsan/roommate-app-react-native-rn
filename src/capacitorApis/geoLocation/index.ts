import { GeoLocationPermissionStateEnum } from '@/enums/capacitorApis';
import { Geolocation } from '@capacitor/geolocation';
import { getPlatformData } from '../core';
import { GeoLocationResponseCodeEnum } from '@/enums/generic';
import { GetCapGeoLocationApiDataResponse } from '@/types/capacitorApis';

export const getCapGeoLocationApiData =
	async (): Promise<GetCapGeoLocationApiDataResponse> => {
		const { isNative } = getPlatformData();

		if (isNative) {
			const checkPermissionsResult = await Geolocation.checkPermissions();

			if (
				checkPermissionsResult.location ===
				GeoLocationPermissionStateEnum.denied
			) {
				const requestPermissionsResult = await Geolocation.requestPermissions({
					permissions: ['location', 'coarseLocation'],
				});

				if (
					requestPermissionsResult.location ===
					GeoLocationPermissionStateEnum.denied
				) {
					return {
						message:
							'Please provide location permission to continue with this feature.',
						code: GeoLocationResponseCodeEnum.permissionDenied,
						coords: null,
						success: false,
					};
				}
			}

			const coordinates = await Geolocation.getCurrentPosition();

			return {
				coords: coordinates.coords,
				message: 'success.',
				code: GeoLocationResponseCodeEnum.success,
				success: true,
			};
		} else {
			// Handle web geolocation
			if (navigator.geolocation) {
				return await new Promise<GetCapGeoLocationApiDataResponse>(
					(res, rej) => {
						navigator.geolocation.getCurrentPosition(
							(position) => {
								res({
									coords: position.coords,
									message: 'success.',
									code: GeoLocationResponseCodeEnum.success,
									success: true,
								});
							},
							(error) => {
								if (error.PERMISSION_DENIED === error.code) {
									rej({
										message:
											'Please provide location permission to continue with this feature.',
										code: GeoLocationResponseCodeEnum.permissionDenied,
										coords: null,
										success: false,
									});
								} else if (error.POSITION_UNAVAILABLE === error.code) {
									rej({
										message: 'Position is unavailable.',
										code: GeoLocationResponseCodeEnum.positionUnavailable,
										coords: null,
										success: false,
									});
								} else if (error.TIMEOUT === error.code) {
									rej({
										message:
											'Timeout error occurred while trying to request location info.',
										code: GeoLocationResponseCodeEnum.timeout,
										coords: null,
										success: false,
									});
								} else {
									rej({
										message:
											'Unknown error occurred while trying to request location info.',
										code: GeoLocationResponseCodeEnum.unknownError,
										coords: null,
										success: false,
									});
								}
							}
						);
					}
				);
			} else {
				return {
					coords: null,
					message: 'Geolocation is not supported by this browser.',
					code: GeoLocationResponseCodeEnum.geolocationNotSupportedByBrowser,
					success: false,
				};
			}
		}
	};
