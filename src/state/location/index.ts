import type { ISearchLocation } from '@/types/postingList';
import { atom } from 'recoil';
// 
export const locationRStateAtom = atom<ISearchLocation>({
    key: 'locationRStateAtom_key',
    default: {}
})

