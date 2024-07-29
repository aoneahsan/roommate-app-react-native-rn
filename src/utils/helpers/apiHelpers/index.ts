import { ApiPathEnum, ApiVersionsEnum } from '@/enums/backendApi';
import ENVS from '@/utils/envKeys';

export const getFullApiUrl = (
	{
		apiPath,
		apiVersion = ApiVersionsEnum.v1,
		itemId
	}: {
		apiPath: ApiPathEnum,
		apiVersion?: ApiVersionsEnum
		itemId?: string,
	}
) => {
	let _url: string;
	if (ENVS.useLocalApis) {
		_url = `${ENVS.localApisCommonPath}/${apiPath}`;
	} else {
		_url = `https://${apiPath}${apiVersion}`;
	}

	if (itemId) {
		_url = `${_url}/${itemId}`
	}

	return _url;
};
