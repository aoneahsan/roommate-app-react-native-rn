import { CapacitorPlatformEnum } from '@/enums/capacitorApis';
import { Capacitor } from '@capacitor/core';

export const getPlatformData = () => {
	const platform = Capacitor.getPlatform();
	const isAndroid = CapacitorPlatformEnum.android === platform;
	const isIOS = CapacitorPlatformEnum.ios === platform;
	const isWeb = CapacitorPlatformEnum.web === platform;
	const isNative = !isWeb;

	return { platform, isNative, isAndroid, isIOS };
};
