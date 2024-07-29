// #region ---- Core Imports ----
import React from "react";

// #endregion

// #region ---- Packages Imports ----
import { useRecoilValue } from "recoil";
import { ZButton } from "zaions-react-ui-kit";

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

const NotFound404Page: React.FC = () => {
  return (
    <div className="w-full lg:pt-[4rem] maxLg:pt-[2rem] pb-[2rem] h-screen bg-secondary text-center flex items-center justify-center flex-col">
      {/* <Z404Svg className='w-[10rem] h-[10rem] text-primary' /> */}
      <h3 className="text-primary mt-9 text-[1.8rem] font-black font-mont-heavy">
        Page Not Fount
      </h3>

      <ZButton className="uppercase mt-9">Go to Home</ZButton>
    </div>
  );
};

export default NotFound404Page;
