import { atom } from "recoil";
import { ZSidebarI } from "zaions-react-ui-kit";

export const ZSidebarRStateAtom = atom<ZSidebarI>({
    key: 'ZSidebarRStateAtom_Key',
    default: {
        isOpen: true,
        shouldBackdropClose: true
    }
});