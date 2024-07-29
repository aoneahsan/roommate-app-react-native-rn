import { LOCALSTORAGE_KEYS } from 'zaions-react-tool-kit';

const productInfo = {
	name: 'Room Mate',
	domain: 'zaions.com'
} as const

export const localStorageKeys = {
	...LOCALSTORAGE_KEYS,
} as const;

export const defaultValue = {
	fallbackValue: '---'
}

const constants = { localStorageKeys, productInfo, defaultValue } as const

export default constants