// #region ---- Core Imports ----
import React from "react";

// #endregion

// #region ---- Packages Imports ----
import { ZInput, ZInputSlot } from "zaions-react-ui-kit";

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----
import { ZMagnifyingGlassOutlineIcon } from "@/assets";

// #endregion

const ZSearch: React.FC<{
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}> = ({ onChange, disabled }) => {
  return (
    <ZInput disabled={disabled} placeholder="Search..." onChange={onChange}>
      <ZInputSlot>
        <ZMagnifyingGlassOutlineIcon className="w-6 h-6" />
      </ZInputSlot>
    </ZInput>
  );
};

export default ZSearch;
