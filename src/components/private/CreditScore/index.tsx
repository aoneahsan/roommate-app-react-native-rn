// #region ---- Core Imports ----
import React, { useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import { ZClassNames } from "zaions-react-tool-kit";
import { ZBox, ZRUTextSizeT, ZText } from "zaions-react-ui-kit";
import { useThemeContext } from "@radix-ui/themes";

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
interface CreditScoreProps {
  scorePercentage?: number;
  textSize?: ZRUTextSizeT;
  classNames?: string;
}

// #endregion

const CreditScore: React.FC<CreditScoreProps> = ({
  scorePercentage = 0,
  textSize,
  classNames = "",
}) => {
  const radixThemeContext = useThemeContext();
  const isDarkMode = useMemo(
    () => radixThemeContext.appearance === "dark",
    [radixThemeContext.appearance]
  );

  // Calculate width percentage for the progress bar
  const progressWidth = `${Math.min(Math.max(scorePercentage, 0), 100)}%`;

  return (
    <ZBox className={classNames}>
      <ZBox
        className={ZClassNames(
          "relative flex items-center w-full h-8 overflow-hidden rounded-full shadow-[0rem_0rem_.6rem]",
          {
            "bg-slateDark2 shadow-slateDark5": isDarkMode,
            "bg-slate1 shadow-slate5": !isDarkMode,
          }
        )}
      >
        <ZBox
          style={{ width: progressWidth }}
          className={ZClassNames(
            "absolute flex items-center justify-center top-0 left-0 shadow-sm z-10 h-full rounded-full",
            {
              "bg-grass10": isDarkMode,
              "bg-grassDark10": !isDarkMode,
            }
          )}
        >
          <ZText size={textSize} show={scorePercentage > 0}>
            {scorePercentage}%
          </ZText>
        </ZBox>
      </ZBox>
    </ZBox>
  );
};

export default CreditScore;
