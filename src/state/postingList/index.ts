import type { IPLStepOne } from '@/types/postingList';
import { atom } from 'recoil';
/**
 * This Recoil atom is used to store the selected location for the post listing process.
 * It handles the location data chosen by the user in the location selection step and 
 * maintains this state across the post listing flow.
 */
export const plStepOneRStateAtom = atom<IPLStepOne>({
    key: 'plStepOneRStateAtom_key',
    default: {}
})