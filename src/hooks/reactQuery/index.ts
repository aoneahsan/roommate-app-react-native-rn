import { useRecoilValue } from 'recoil';
import axiosInstance from '@/axiosInstance';
import {
	clearAuthDataFromLocalStorage,
	IApiResponse,
	reactQueryOptions,
	showZAlert,
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
	emptyVoidReturnFunction,
	reportCustomError,
	zJsonParse,
} from 'zaions-tool-kit';
import { userDataRStateAtom, userTokenRStateAtom } from '@/state/user';
import { ApiPathEnum, ApiVersionsEnum } from '@/enums/backendApi';
import { getFullApiUrl } from '@/utils/helpers/apiHelpers';
import { AxiosResponse } from 'axios';
import { showErrorNotification } from 'zaions-react-ui-kit';
import { ZRQGetRequestExtractEnum, ZRQUpdaterAction } from '@/types/generic';

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

/**
 * Custom hook for updating records of react-query package.
 *
 * @returns An object with the `updateRQCDataHandler` function for updating records.
 */
export const useZUpdateRQCacheData = (): {
	updateRQCDataHandler: <T>({
		key,
		data,
		id,
		updaterAction,
		extractType,
	}: {
		key: string | Array<string>;
		id?: string;
		data?: T;
		extractType?: ZRQGetRequestExtractEnum;
		updaterAction?: ZRQUpdaterAction;
	}) => unknown;
} => {
	const userDataRState = useRecoilValue(userDataRStateAtom);
	try {
		const queryClient = useQueryClient();

		/**
		 * Function to update React Query cache data.
		 *
		 * @template T - The type of the data being updated.
		 *
		 * @param {Object} params - Parameters for updating the cache.
		 * @param {string | Array<string>} params.key - The query key to identify the cache.
		 * @param {T} [params.data] - The new data to be updated in the cache.
		 * @param {string} [params.id] - The ID of the item to be updated.
		 * @param {ZRQGetRequestExtractEnum} [params.extractType=ZRQGetRequestExtractEnum.extractItems] - The extraction type for the data.
		 * @param {ZRQUpdaterAction} [params.updaterAction=ZRQUpdaterAction.replace] - The action to perform (replace, add, delete, update).
		 *
		 * @returns {unknown} - The updated data.
		 */
		const updateRQCDataHandler = <T>({
			key,
			data,
			id,
			extractType = ZRQGetRequestExtractEnum.extractData,
			updaterAction = ZRQUpdaterAction.replace,
		}: {
			key: string | Array<string>;
			id?: string;
			data?: T;
			updateHoleData?: boolean;
			extractType?: ZRQGetRequestExtractEnum;
			updaterAction?: ZRQUpdaterAction;
		}): unknown => {
			const fullKey = [userDataRState?.id, ...key];

			switch (updaterAction) {
				case ZRQUpdaterAction.updateWhole:
					return queryClient.setQueryData(fullKey, (oldData: unknown) => {
						const updatedData = structuredClone(oldData);

						switch (extractType) {
							case ZRQGetRequestExtractEnum.extractItem:
								(
									updatedData as { result: { data: { item: T } } }
								).result.data.item = data as T;
								break;

							case ZRQGetRequestExtractEnum.extractItems:
								(
									updatedData as { result: { data: { items: T } } }
								).result.data.items = data as T;
								break;

							case ZRQGetRequestExtractEnum.extractData:
								(updatedData as { result: { data: T } }).result.data =
									data as T;
								break;

							default:
								break;
						}

						return updatedData;
					});

				case ZRQUpdaterAction.replace:
					return queryClient.setQueryData(fullKey, (oldData: unknown) => {
						if (oldData) {
							if (Array.isArray(oldData)) {
								const updatedData = [...oldData];
								const index = updatedData.findIndex((el) => el?.id === id);
								if (index !== -1) updatedData[index] = data;
								return updatedData;
							}

							if (typeof oldData === 'object') {
								const updatedData = structuredClone(oldData);

								let actualData: any = [];

								switch (extractType) {
									case ZRQGetRequestExtractEnum.extractItem:
										actualData =
											(updatedData as { result: { data: { item: T } } }).result
												.data.item ?? [];
										break;

									case ZRQGetRequestExtractEnum.extractItems:
										actualData =
											(updatedData as { result: { data: { items: T } } }).result
												.data.items ?? [];
										break;

									case ZRQGetRequestExtractEnum.extractData:
										actualData =
											(updatedData as { result: { data: T } }).result.data ??
											[];
										break;

									case ZRQGetRequestExtractEnum.extractUsers:
										actualData =
											(updatedData as { result: { data: { users: T } } }).result
												.data.users ?? [];
										break;

									default:
										break;
								}

								if (
									actualData &&
									Array.isArray(actualData) &&
									actualData.length > 0
								) {
									const updatedDataItems = [...actualData];
									const index = updatedDataItems.findIndex(
										(el: unknown) => (el as { id: string })?.id === id
									);
									if (index !== -1) updatedDataItems[index] = data;
									(updatedData as { result: { data: unknown[] } }).result.data =
										updatedDataItems;

									switch (extractType) {
										case ZRQGetRequestExtractEnum.extractItem:
											(
												updatedData as { result: { data: { item: T } } }
											).result.data.item = updatedDataItems as T;
											break;

										case ZRQGetRequestExtractEnum.extractItems:
											(
												updatedData as { result: { data: { items: T } } }
											).result.data.items = updatedDataItems as T;
											break;

										case ZRQGetRequestExtractEnum.extractData:
											(updatedData as { result: { data: T } }).result.data =
												updatedDataItems as T;
											break;

										case ZRQGetRequestExtractEnum.extractUsers:
											(
												updatedData as { result: { data: { users: T } } }
											).result.data.users = updatedDataItems as T;
											break;

										default:
											break;
									}
								}

								return updatedData;
							}
						}

						return oldData;
					});

				case ZRQUpdaterAction.add:
					return queryClient.setQueryData(fullKey, (oldData: unknown) => {
						if (Array.isArray(oldData)) {
							return [data, ...oldData];
						} else if (typeof oldData === 'object') {
							const updatedData = structuredClone(oldData);

							let actualDataItems: any = [];

							switch (extractType) {
								case ZRQGetRequestExtractEnum.extractItem:
									actualDataItems =
										(updatedData as { result: { data: { item: T } } })?.result
											?.data?.item ?? [];
									break;

								case ZRQGetRequestExtractEnum.extractItems:
									actualDataItems =
										(updatedData as { result: { data: { items: T } } })?.result
											?.data?.items ?? [];
									break;

								case ZRQGetRequestExtractEnum.extractData:
									actualDataItems =
										(updatedData as { result: { data: T } })?.result?.data ??
										[];
									break;

								case ZRQGetRequestExtractEnum.extractUsers:
									actualDataItems =
										(updatedData as { result: { data: { users: T } } }).result
											.data.users ?? [];
									break;

								default:
									break;
							}

							switch (extractType) {
								case ZRQGetRequestExtractEnum.extractItem:
									(
										updatedData as { result: { data: { item: unknown[] } } }
									).result.data.item = [data, ...actualDataItems];
									break;

								case ZRQGetRequestExtractEnum.extractItems:
									(
										updatedData as { result: { data: { items: unknown[] } } }
									).result.data.items = [data, ...actualDataItems];
									break;

								case ZRQGetRequestExtractEnum.extractData:
									(updatedData as { result: { data: unknown[] } }).result.data =
										[data, ...actualDataItems];
									break;

								case ZRQGetRequestExtractEnum.extractUsers:
									(
										updatedData as { result: { data: { users: unknown[] } } }
									).result.data.users = [data, ...actualDataItems];
									break;

								default:
									break;
							}
							return updatedData;
						} else {
							return oldData;
						}
					});

				case ZRQUpdaterAction.delete:
					return queryClient.setQueryData(fullKey, (oldData: unknown) => {
						if (Array.isArray(oldData)) {
							return oldData.filter((el) => el.id !== id);
						}

						if (typeof oldData === 'object') {
							const updatedData = structuredClone(oldData);

							let actualDataItems: any = [];

							switch (extractType) {
								case ZRQGetRequestExtractEnum.extractItem:
									actualDataItems =
										(updatedData as { result: { data: { item: T } } }).result
											.data.item ?? [];
									break;

								case ZRQGetRequestExtractEnum.extractItems:
									actualDataItems =
										(updatedData as { result: { data: { items: T } } }).result
											.data.items ?? [];
									break;

								case ZRQGetRequestExtractEnum.extractData:
									actualDataItems =
										(updatedData as { result: { data: T } }).result.data ?? [];
									break;

								case ZRQGetRequestExtractEnum.extractUsers:
									actualDataItems =
										(updatedData as { result: { data: { users: T } } }).result
											.data.users ?? [];
									break;

								default:
									break;
							}

							if (Array.isArray(actualDataItems)) {
								const updatedItems = actualDataItems.filter(
									(el: unknown) => (el as { id?: string })?.id !== id
								) as T;
								switch (extractType) {
									case ZRQGetRequestExtractEnum.extractItem:
										(
											updatedData as { result: { data: { item: T } } }
										).result.data.item = updatedItems;
										break;

									case ZRQGetRequestExtractEnum.extractItems:
										(
											updatedData as { result: { data: { items: T } } }
										).result.data.items = updatedItems;
										break;

									case ZRQGetRequestExtractEnum.extractData:
										(updatedData as { result: { data: T } }).result.data =
											updatedItems;
										break;

									case ZRQGetRequestExtractEnum.extractUsers:
										(
											updatedData as { result: { data: { users: T } } }
										).result.data.users = updatedItems;
										break;

									default:
										break;
								}
							}

							return updatedData;
						}

						return oldData;
					});

				default:
					showZAlert({
						title: 'Invalid updaterAction type passed to useZUpdateRQCacheData',
					});
					return;
			}
		};

		return { updateRQCDataHandler };
	} catch (error) {
		reportCustomError(error);
		return { updateRQCDataHandler: emptyVoidReturnFunction };
	}
};
