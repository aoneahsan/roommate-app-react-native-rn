import { FormFieldsEnum } from "@/utils/enums/formFieldsEnum";
import { atom, selector } from "recoil";
import {
  ZFilterAndPaginateData,
  ZFilterOptions,
  ZPaginationInfoI,
} from "zaions-react-tool-kit";
import { isZNonEmptyString } from "zaions-tool-kit";
import { IUser } from "zaions-tool-kit/dist/roommate";

export const userDataRStateAtom = atom<Partial<IUser> | null>({
  key: "userDataRStateAtom_key",
  default: {},
});

export const userTokenRStateAtom = atom<string | undefined>({
  key: "userTokenRStateAtom_key",
  default: "",
});

export const userIsAuthenticatedRStateSelector = selector<boolean>({
  key: "userIsAuthenticated_key",
  get: ({ get }) => {
    try {
      const userData = get(userDataRStateAtom);

      if (userData && userData.id && userData?.email) {
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  },
});

export const ZUsersRStateAtom = atom<{
  users: Array<IUser>;
  filters: ZFilterOptions;
}>({
  key: "ZUsersRStateAtom_key",
  default: {
    users: [],
    filters: {
      itemPerPage: 3,
      currentPage: 1,
    },
  },
});

export const ZUsersRStateSelector = selector<{
  data: IUser[];
  paginationInfo: ZPaginationInfoI;
}>({
  key: "ZUsersRStateSelector_key",
  get: ({ get }) => {
    const users = get(ZUsersRStateAtom)?.users;
    const filters = get(ZUsersRStateAtom)?.filters;
    let usersData = [...users];

    const { _data, _paginationInfo } = ZFilterAndPaginateData({
      data: usersData,
      filters,
      searchKey: [FormFieldsEnum.name],
    });

    if (_data !== null) {
      usersData = _data;
    }

    return { data: usersData, paginationInfo: _paginationInfo };
  },
});

export const ZIsUserLoggedIn = selector<boolean>({
  key: "ZIsUserLoggedIn_key",
  get: ({ get }) => {
    const user = get(userDataRStateAtom);
    const token = get(userTokenRStateAtom);

    return isZNonEmptyString(user?.id) && isZNonEmptyString(token);
  },
});
