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

const ViewPersonMyLifeStyle: React.FC = () => {
  return (
    <>
      <ZCard className="w-96">
        <ZDataList
          dataList={[
            {
              className: "text-base",
              label: "Cleanliness:",
              value: "Clean",
              valueProps: {
                className: "justify-end",
              },
            },
            {
              className: "text-base",
              label: "Overnight Guests:",
              value: "Occasionally",
              valueProps: {
                className: "justify-end",
              },
            },
            {
              className: "text-base",
              label: "Party Hobbies:",
              value: "no",
              valueProps: {
                className: "justify-end",
              },
            },
            {
              className: "text-base",
              label: "Get Up:",
              value: "8 am-9 am",
              valueProps: {
                className: "justify-end",
              },
            },
            {
              className: "text-base",
              label: "Go to Bed:",
              value: "11 pm-12am",
              valueProps: {
                className: "justify-end",
              },
            },
            {
              className: "text-base",
              label: "Food Preference:",
              value: "Vegetarian",
              valueProps: {
                className: "justify-end",
              },
            },
            {
              className: "text-base",
              label: "Smokers:",
              value: "no",
              valueProps: {
                className: "justify-end",
              },
            },
            {
              className: "text-base",
              label: "Work Schedule:",
              value: "daytime",
              valueProps: {
                className: "justify-end",
              },
            },
            {
              className: "text-base",
              label: "Occupation:",
              value: "Student",
              valueProps: {
                className: "justify-end",
              },
            },
            {
              className: "text-base",
              label: "Pets:",
              value: "1",
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

export default ViewPersonMyLifeStyle;
