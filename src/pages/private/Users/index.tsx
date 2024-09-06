// #region ---- Core Imports ----
import { ZFilterSharpOutlineIcon } from "@/assets";
import OtherUserInfoCard from "@/components/private/OtherUserInfoCard";
import React from "react";
import {
  ZBox,
  ZButton,
  ZFlex,
  ZHeading,
  ZRUAlignE,
  ZRUJustifyE,
} from "zaions-react-ui-kit";

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const Users: React.FC = () => {
  return (
    <>
      <ZBox className="md:px-2 md:py-2">
        <ZFlex
          align={ZRUAlignE.center}
          justify={ZRUJustifyE.between}
          className="maxSm:flex-col maxSm:gap-3 maxSm:*:w-full"
        >
          <ZHeading className="text-2xl font-medium tracking-wider md:text-4xl maxSm:text-center">
            Users
          </ZHeading>

          <ZButton>
            <ZFilterSharpOutlineIcon className="w-5 h-5" /> Filter
          </ZButton>
        </ZFlex>

        <ZFlex className="items-stretch gap-3 mt-3 mb-4 md:mt-5">
          <OtherUserInfoCard />
        </ZFlex>
      </ZBox>
    </>
  );
};

export default Users;
