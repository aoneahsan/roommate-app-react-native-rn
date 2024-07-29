// #region ---- Core Imports ----
import React, { useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import {
  ZBox,
  ZRSelect,
  ZRSelectI,
  ZRUSelectValueI,
  ZSelect,
} from "zaions-react-ui-kit";

// #endregion

// #region ---- Custom Imports ----
import { ApiPathEnum } from "@/enums/backendApi";
import { useGetRequest } from "@/hooks/reactQuery";
import { reactQueryKeys } from "@/utils/constants/reactQuery";

// #endregion

// #region ---- Types Imports ----
import { IGame } from "@/types/game";
import { ZClassNames } from "zaions-react-tool-kit";

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const ZGameSelector: React.FC<{
  onValueChange?(value: string): void;
  onOpenChange?(open: boolean): void;
  value?: string;
  name?: string;
  errorMessage?: string;
  isTouched?: boolean;
  className?: string;
  required?: boolean;
  loading?: boolean;
}> = (props) => {
  const { data: allGamesData, isFetching: isGamesDataFetching } = useGetRequest<
    Array<IGame>
  >({
    url: ApiPathEnum.listGames,
    queryKey: [reactQueryKeys.game.getAll],
    isAuthenticatedRequest: true,
  });

  const _gamesData: Array<ZRUSelectValueI> = useMemo(
    () =>
      (allGamesData?.result?.data ?? [])?.map((el) => ({
        label: el?.title!,
        value: el?.id!,
      })),
    [allGamesData]
  );

  return (
    <ZBox
      className={ZClassNames(props?.className, "w-full", {
        "opacity-80": isGamesDataFetching || props?.loading,
      })}
    >
      <ZSelect
        {...props}
        className="*:w-full"
        size="3"
        trigger={{
          placeholder:
            isGamesDataFetching || props?.loading
              ? "Fetching game, please wait..."
              : "Select Game",
        }}
        label="Select game"
        labelClassName="text-base"
        options={_gamesData}
        disabled={isGamesDataFetching || props?.loading}
      />
    </ZBox>
  );
};

export default ZGameSelector;
