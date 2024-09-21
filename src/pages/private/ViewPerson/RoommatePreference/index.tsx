// #region ---- Core Imports ----
import React from "react";
import {
  ZCard,
  ZDataList,
  ZRUColorE,
  ZRUTextAsE,
  ZText,
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

const ViewPersonRoommatePreference: React.FC = () => {
  return (
    <>
      <ZCard className="w-96">
        <ZDataList
          dataList={[
            {
              className: "text-base",
              label: "Gender Required:",
              value: "Female only",
              valueProps: {
                className: "justify-end",
              },
            },
            {
              className: "text-base",
              label: "Age:",
              value: "25-80",
              valueProps: {
                className: "justify-end",
              },
            },
            {
              className: "text-base",
              label: "Smoke:",
              value: "unlimited",
              valueProps: {
                className: "justify-end",
              },
            },
            {
              className: "text-base",
              label: "Pets:",
              value: "unlimited",
              valueProps: {
                className: "justify-end",
              },
            },
            {
              className: "text-base",
              label: "Occupation:",
              value: "unlimited",
              valueProps: {
                className: "justify-end",
              },
            },
          ]}
        />

        <ZText as={ZRUTextAsE.p} color={ZRUColorE.gray} className="mt-4">
          Description:
        </ZText>
        <ZText as={ZRUTextAsE.p} className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
          reprehenderit aut maiores magni recusandae? Maiores cum corporis nulla
          illum error. Asperiores, minus quia minima dolorum assumenda provident
          vero autem quo? Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Autem reprehenderit aut maiores magni recusandae? Maiores cum
          corporis nulla illum error. Asperiores, minus quia minima dolorum
          assumenda provident vero autem quo?
        </ZText>
      </ZCard>
    </>
  );
};

export default ViewPersonRoommatePreference;
