// #region ---- Core Imports ----
import React from "react";

// #endregion

// #region ---- Packages Imports ----
import { ZBox, ZCard, ZFlex, ZHeading } from "zaions-react-ui-kit";

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const NavigationHeader: React.FC<{
  title?: string;
  beforeBoxContent?: React.ReactNode;
  afterBoxContent?: React.ReactNode;
}> = ({ title, beforeBoxContent, afterBoxContent }) => {
  return (
    <ZCard className="mx-1 my-2">
      <ZFlex className="items-center maxMd:flex-col md:justify-between maxMd:gap-y-3 maxMd:*:w-full maxMd:text-center">
        <ZBox>{beforeBoxContent}</ZBox>

        <ZBox>
          <ZHeading className="tracking-wide">{title}</ZHeading>
        </ZBox>

        <ZBox>{afterBoxContent}</ZBox>
      </ZFlex>
    </ZCard>
  );
};

export default NavigationHeader;
