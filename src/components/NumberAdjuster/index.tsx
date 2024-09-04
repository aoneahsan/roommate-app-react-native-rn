// #region ---- Core Imports ----
import { ZAddIcon, ZRemoveIcon } from "@/assets";
import React, { useCallback, useState } from "react";
import {
  ZButton,
  ZFlex,
  ZIconButton,
  ZRUAlignE,
  ZRUJustifyE,
  ZRUVariantE,
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

interface NumberAdjusterProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const NumberAdjuster: React.FC<NumberAdjusterProps> = ({
  value = 0,
  onChange,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
}) => {
  const [_value, setValue] = useState<number>(value);
  // Handler for decreasing the number
  const handleDecrease = useCallback(() => {
    const newValue = Math.max(_value - step, min); // Ensure it doesn't go below min
    setValue(() => newValue);
    if (onChange) {
      onChange(newValue);
    }
  }, [onChange, _value]);

  // Handler for increasing the number
  const handleIncrease = useCallback(() => {
    const newValue = Math.min(_value + step, max); // Ensure it doesn't exceed max
    setValue(() => newValue);
    if (onChange) {
      onChange(newValue);
    }
  }, [onChange, _value]);

  return (
    <ZFlex
      align={ZRUAlignE.center}
      justify={ZRUJustifyE.between}
      className="space-x-4 w-max"
    >
      <ZIconButton
        className="cursor-pointer"
        onClick={handleDecrease}
        aria-label="Decrease"
        variant={ZRUVariantE.outline}
      >
        <ZRemoveIcon className="w-5 h-5" />
      </ZIconButton>
      <ZText className="text-lg font-semibold">{_value}</ZText>
      <ZIconButton
        className="cursor-pointer"
        onClick={handleIncrease}
        aria-label="Increase"
        variant={ZRUVariantE.outline}
      >
        <ZAddIcon className="w-5 h-5" />
      </ZIconButton>
    </ZFlex>
  );
};

export default NumberAdjuster;
