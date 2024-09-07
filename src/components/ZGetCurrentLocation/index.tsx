// #region ---- Core Imports ----
import React, { useState } from "react";

// #endregion

// #region ---- Packages Imports ----
import { ZButton } from "zaions-react-ui-kit";

// #endregion

// #region ---- Custom Imports ----
import { getMyCurrentLocationFormattedPlaceData } from "@/googleApisInstance/geoCodingApi";

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZLocationOutlineIcon } from "@/assets";
import { reportCustomError } from "zaions-tool-kit";

// #endregion

const ZGetCurrentLocation: React.FC<{
  loading?: boolean;
  disabled?: boolean;
  onClick?: (place: any) => void;
}> = ({ loading, disabled, onClick }) => {
  const [processing, setProcessing] = useState<boolean>(false);

  const handleOnClick = async () => {
    try {
      setProcessing(() => true);
      const currentLocation = await getMyCurrentLocationFormattedPlaceData();

      if (onClick) {
        onClick(currentLocation?.results[0]);
      }

      setProcessing(() => false);
    } catch (error) {
      setProcessing(() => false);
      reportCustomError(error);
    }
  };

  return (
    <ZButton
      type="button"
      loading={loading || processing}
      disabled={disabled || processing}
      onClick={handleOnClick}
      className="maxMd:w-full"
    >
      <ZLocationOutlineIcon className="w-5 h-5" /> Get Current Location
    </ZButton>
  );
};

export default ZGetCurrentLocation;
