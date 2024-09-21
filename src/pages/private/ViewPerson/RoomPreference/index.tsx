// #region ---- Core Imports ----
import React from "react";

// #endregion

// #region ---- Packages Imports ----
import { ZCard, ZDataList } from "zaions-react-ui-kit";

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

const ViewPersonRoomPreference: React.FC = () => {
  return (
    <>
      <ZCard className="w-96">
        <ZDataList
          dataList={[
            {
              className: "text-base",
              label: "Where to Live:",
              value: "Canada, ON, Toronto",
              valueProps: {
                className: "justify-end",
              },
            },
            {
              className: "text-base",
              label: "Budget:",
              value: "80 to 1000",
              valueProps: {
                className: "justify-end",
              },
            },
            {
              className: "text-base",
              label: "Place Preference:",
              value: "Entire",
              valueProps: {
                className: "justify-end",
              },
            },
            {
              className: "text-base",
              label: "Place Building Type:",
              value: "Condo",
              valueProps: {
                className: "justify-end",
              },
            },
          ]}
        />
      </ZCard>
    </>
  );
};

export default ViewPersonRoomPreference;
