// #region ---- Core Imports ----
import React, { useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import {
  ZBox,
  ZCard,
  ZFlex,
  ZHeading,
  ZRUAlignE,
  ZRUHeadingAsE,
  ZRUJustifyE,
  ZSpinner,
  ZText,
} from "zaions-react-ui-kit";

// #endregion

// #region ---- Custom Imports ----
import { useGetRequest } from "@/hooks/reactQuery";
import { reactQueryKeys } from "@/utils/constants/reactQuery";

// #endregion

// #region ---- Types Imports ----
import { IDashboard } from "@/types/dashboard";
import { ApiPathEnum } from "zaions-tool-kit";

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import {
  ZCoinsOutlineIcon,
  ZGroupOutlineIcon,
  ZHandCoinsOutlineIcon,
  ZInboxOutOutlineIcon,
} from "@/assets";

// #endregion

const Dashboard: React.FC = () => {
  const { data: dashboardData, isFetching: isDashboardDataFetching } =
    useGetRequest<IDashboard>({
      url: ApiPathEnum.getDashboardData,
      queryKey: [reactQueryKeys.dashboardData],
      isAuthenticatedRequest: true,
    });

  const coinCards = useMemo(
    () => [
      {
        icon: ZHandCoinsOutlineIcon,
        title: "Total Coins Issued",
        amount: Math.ceil(dashboardData?.result?.data?.coinsIssued ?? 0),
      },
      {
        icon: ZInboxOutOutlineIcon,
        title: "Total Coins Withdrawn",
        amount: Math.ceil(dashboardData?.result?.data?.coinsWithDrawn ?? 0),
      },
      {
        icon: ZCoinsOutlineIcon,
        title: "Total Coins in System",
        amount: Math.ceil(dashboardData?.result?.data?.coinsInSystem ?? 0),
      },
    ],
    [dashboardData]
  );

  const userCards = useMemo(
    () => [
      {
        icon: ZGroupOutlineIcon,
        title: "Total Users",
        amount: Math.ceil(dashboardData?.result?.data?.totalUsersCount ?? 0),
      },

      {
        icon: ZGroupOutlineIcon,
        title: "Total Active Users",
        amount: Math.ceil(dashboardData?.result?.data?.activeUsersCount ?? 0),
      },

      {
        icon: ZGroupOutlineIcon,
        title: "Total Inactive Users",
        amount: Math.ceil(dashboardData?.result?.data?.inActiveUsersCount ?? 0),
      },
    ],
    [dashboardData]
  );

  return (
    <ZBox className="px-2 py-2">
      {/* Coins */}
      <ZFlex align={ZRUAlignE.center} justify={ZRUJustifyE.between}>
        <ZHeading className="text-4xl font-medium tracking-wider">
          Coins
        </ZHeading>
      </ZFlex>

      <ZFlex align={ZRUAlignE.start} className="gap-4 mt-5">
        {coinCards?.map((el, i) => {
          return (
            <ZCard key={i} className="flex-1 py-5">
              <ZFlex
                align={ZRUAlignE.stretch}
                justify={ZRUJustifyE.between}
                className="gap-3 p-2"
              >
                <ZBox>
                  <ZText className="text-sm">{el?.title}</ZText>
                  {isDashboardDataFetching ? (
                    <ZSpinner size="3" className="mt-3" />
                  ) : (
                    <ZHeading
                      as={ZRUHeadingAsE.h4}
                      size="2"
                      className="pt-1 text-3xl font-normal"
                    >
                      {el?.amount}
                    </ZHeading>
                  )}
                </ZBox>
                <el.icon className="w-16 h-16" />
              </ZFlex>
            </ZCard>
          );
        })}
      </ZFlex>

      {/* Users */}
      <ZFlex
        align={ZRUAlignE.center}
        justify={ZRUJustifyE.between}
        className="mt-10"
      >
        <ZHeading className="text-4xl font-medium tracking-wider">
          Users
        </ZHeading>
      </ZFlex>

      <ZFlex align={ZRUAlignE.start} className="gap-4 mt-5">
        {userCards?.map((el, i) => {
          return (
            <ZCard key={i} className="flex-1 py-5">
              <ZFlex
                align={ZRUAlignE.stretch}
                justify={ZRUJustifyE.between}
                className="gap-3 p-2"
              >
                <ZBox>
                  <ZText className="text-sm">{el?.title}</ZText>
                  {isDashboardDataFetching ? (
                    <ZSpinner size="3" className="mt-3" />
                  ) : (
                    <ZHeading
                      as={ZRUHeadingAsE.h4}
                      size="2"
                      className="pt-1 text-3xl font-normal"
                    >
                      {el?.amount}
                    </ZHeading>
                  )}
                </ZBox>
                <el.icon className="w-16 h-16" />
              </ZFlex>
            </ZCard>
          );
        })}
      </ZFlex>
    </ZBox>
  );
};

export default Dashboard;
