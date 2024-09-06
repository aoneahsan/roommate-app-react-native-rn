// #region ---- Core Imports ----
import React, { useMemo } from "react";

// #endregion

// #region ---- Packages Imports ----
import * as Progress from "@radix-ui/react-progress";
import { useThemeContext } from "@radix-ui/themes";
import { grass, grassDark, slate, slateDark } from "@radix-ui/colors";
import { ZBox, ZText } from "zaions-react-ui-kit";

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

type CircularProgressProps = {
  size?: number;
  strokeWidth?: number;
  progress: number; // Value between 0 and 100
};

const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 100,
  strokeWidth = 9,
  progress,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const radixThemeContext = useThemeContext();
  const isDarkMode = useMemo(
    () => radixThemeContext.appearance === "dark",
    [radixThemeContext.appearance]
  );

  return (
    <ZBox className="relative w-max h-max">
      <Progress.Root>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          <circle
            stroke={isDarkMode ? slateDark.slate8 : slate.slate8}
            fill="none"
            strokeWidth={strokeWidth}
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            stroke={isDarkMode ? grass?.grass10 : grassDark?.grass10}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            r={radius}
            cx={size / 2}
            cy={size / 2}
            className="transition-[stroke-dashoffset] duration-350 origin-center"
          />
        </svg>
        <Progress.Indicator
          asChild
          className="absolute inset-0 flex items-center justify-center"
          style={{
            fontSize: size * 0.2,
          }}
        >
          <ZText>{Math.round(progress)}%</ZText>
        </Progress.Indicator>
      </Progress.Root>
    </ZBox>
  );
};

export default CircularProgress;
