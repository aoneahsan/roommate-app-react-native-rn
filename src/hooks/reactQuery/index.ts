import { useRecoilValue } from 'recoil';
import axiosInstance from '@/axiosInstance';
import {
	clearAuthDataFromLocalStorage,
	IApiResponse,
	reactQueryOptions,
} from 'zaions-react-tool-kit';
import { MESSAGES } from '@/utils/messages';
import {
	MutationKey,
	QueryFilters,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
	RequestTypeEnum,
	ResponseCodeEnum,
	ResponseStatusEnum,
	apiHeaderKeys,
	zJsonParse,
} from 'zaions-tool-kit';
import { userDataRStateAtom, userTokenRStateAtom } from '@/state/user';
import { ApiPathEnum, ApiVersionsEnum } from '@/enums/backendApi';
import { getFullApiUrl } from '@/utils/helpers/apiHelpers';
import { AxiosResponse } from 'axios';
import { showErrorNotification } from 'zaions-react-ui-kit';

const useMutationRequest = <T>(
	method: RequestTypeEnum = RequestTypeEnum.post,
	mutationKey?: MutationKey,
	queriesToInvalidate?: Array<string>
) => {
	const queryClient = useQueryClient();

	const [userDataRState, setUserDataRState] = useRecoilState(userDataRStateAtom);

	const userTokenRState = useRecoilValue(userTokenRStateAtom);

	const _queriesToInvalidate = queriesToInvalidate ? [userDataRState?.id, ...queriesToInvalidate] : []

	const _mutation = useMutation({
		mutationKey: mutationKey,
		mutationFn: async ({
			apiPath,
			data,
			isAuthenticatedRequest,
			apiVersion = ApiVersionsEnum.v1,
			itemId,
		}: {
			apiPath: ApiPathEnum;
			data?: string | FormData;
			isAuthenticatedRequest?: boolean;
			apiVersion?: ApiVersionsEnum;
			itemId?: string,
		}) => {
			let authToken: string | null = null;
			const headers: Record<string, string> = {};

			if (isAuthenticatedRequest) {
				authToken = userTokenRState ?? null;

				if (authToken && authToken?.trim()?.length > 0) {
					headers[apiHeaderKeys.authToken] = authToken;
				}
			}

			if (apiPath) {
				let _res: AxiosResponse<any, any>;

				const apiUrl = getFullApiUrl({
					apiPath,
					apiVersion,
					itemId
				});

				if (method === RequestTypeEnum.post) {
					_res = await axiosInstance.post(apiUrl, data, {
						headers,
					});
				} else if (method === RequestTypeEnum.put) {
					_res = await axiosInstance.put(apiUrl, data, {
						headers,
					});
				} else if (method === RequestTypeEnum.delete) {
					_res = await axiosInstance.delete(apiUrl, {
						headers,
					});
				} else {
					throw new Error(
						'Only these three type of mutation requests are allowed, post, put and delete.'
					);
				}

				const resData = zJsonParse(_res?.data) as IApiResponse<T>;

				if (_res.status >= 400) {
					throw resData;
				} else {
					return resData;
				}
			} else {
				throw new Error('No API Url Provided');
			}
		},
		onMutate: async () => {
			if (queriesToInvalidate && _queriesToInvalidate?.length > 0) {
				await queryClient.cancelQueries(_queriesToInvalidate as QueryFilters);
			}
		},
		onSuccess: async (_data) => {
			if (queriesToInvalidate && _queriesToInvalidate?.length > 0) {
				await queryClient.invalidateQueries(_queriesToInvalidate as QueryFilters);
			}
		},
		onError: (err: { code?: ResponseCodeEnum } & Error) => {
			const errCode = [ResponseCodeEnum?.failed, ResponseCodeEnum?.serverError, ResponseCodeEnum?.notFound, ResponseCodeEnum?.tooManyRequests]
			if (err?.code && errCode?.includes(err?.code)) {
				showErrorNotification(err?.message);
			}
			console.error({ ml: 'useMutationRequest hook, onMutate function', err });
		},
		// throwOnError: true,
	});

	const _status = _mutation.data?.status;
	const _error = _mutation.error;

	checkIfUserIsUnAuthenticated(_status, _error, setUserDataRState);

	return _mutation;
};

export const usePostRequest = <T>({ mutationKey, queriesToInvalidate }: {
	mutationKey?: MutationKey,
	queriesToInvalidate?: Array<string>
}) => {
	return useMutationRequest<T>(
		RequestTypeEnum.post,
		mutationKey,
		queriesToInvalidate
	);
};

export const usePutRequest = <T>(
	{
		mutationKey,
		queriesToInvalidate
	}: {
		mutationKey?: MutationKey,
		queriesToInvalidate?: Array<string>
	} = {}
) => {
	return useMutationRequest<T>(
		RequestTypeEnum.put,
		mutationKey,
		queriesToInvalidate
	);
};

export const useDeleteRequest = (
	{
		mutationKey,
		queriesToInvalidate
	}: {
		mutationKey?: MutationKey,
		queriesToInvalidate?: Array<string>
	} = {}
) => {
	return useMutationRequest(
		RequestTypeEnum.delete,
		mutationKey,
		queriesToInvalidate
	);
};

export function useGetRequest<T>({
	url,
	queryKey,
	isAuthenticatedRequest = false,
	staleTime = reactQueryOptions.staleTime.fiveMinutes,
	itemId,
}: {
	url: ApiPathEnum;
	queryKey: Array<string>;
	isAuthenticatedRequest?: boolean;
	staleTime?: number;
	itemId?: string,
}) {
	const _url = getFullApiUrl({
		apiPath: url,
		itemId
	});

	const [userDataRState, setUserDataRState] =
		useRecoilState(userDataRStateAtom);

	const userTokenRState = useRecoilValue(userTokenRStateAtom);

	// const queryKey = getReactQueryKey(_queryKey, userDataRState);
	const _queryKey = [userDataRState?.id ?? '', ...queryKey];

	const _query = useQuery({
		queryKey: _queryKey,
		queryFn: async () => {
			let authToken: string | null = null;
			const headers: Record<string, string> = {};

			if (isAuthenticatedRequest) {
				authToken = userTokenRState ?? null;

				if (!authToken || authToken?.trim()?.length <= 0) {
					return null;
				}

				headers[apiHeaderKeys.authToken] = authToken;
			}

			if (url) {
				const _res = await axiosInstance.post(_url, JSON.stringify({}), {
					headers,
				});
				return zJsonParse(_res?.data) as IApiResponse<T>;
			} else {
				throw new Error('No API Url Provided');
			}
		},
		refetchOnReconnect: true,
		refetchOnWindowFocus: false,
		throwOnError: true,
		retry: 2,
		staleTime: staleTime,
	});

	const _status = _query.data?.status;
	const _error = _query.error;

	if (_status) {
		checkIfUserIsUnAuthenticated(_status, _error, setUserDataRState);
	}

	return _query;
}

const checkIfUserIsUnAuthenticated = (
	status: number | undefined,
	error: Error | null,
	setUserDataRState: (val: null) => void
) => {
	if (status === ResponseStatusEnum.unAuthenticated) {
		void (async () => {
			reportError(error ?? MESSAGES.general.unAuthenticated);

			await clearAuthDataAndAuthState(setUserDataRState);
		})();
	}
};

const clearAuthDataAndAuthState = async (
	setUserDataRState: (val: null) => void
) => {
	await clearAuthDataFromLocalStorage();

	setUserDataRState(null);
};
