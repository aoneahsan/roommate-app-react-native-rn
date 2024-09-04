import { convertMBToFileSize } from '@/utils/helpers';
import { atom } from 'recoil';

// NOTE: this is just for this project, just to showcase that i have handled the backend API error validation as well, in real world project this will be redundant
export const formValidationRStateAtom = atom<{
	frontendFormValidationIsEnabled: boolean;
}>({
	key: 'formValidationRStateAtom_key',
	default: {
		frontendFormValidationIsEnabled: true,
	},
});

export const fileSettingRStateAtom = atom<{
	size: number
}>({
	key: 'fileSettingRStateAtom_key',
	default: {
		size: convertMBToFileSize(3), // 3MB
	},
});