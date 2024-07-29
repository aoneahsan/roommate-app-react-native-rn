import { Spinner } from "@radix-ui/themes";
import React from "react";
import "./styles.css";
import { ZFlex, ZRUAlignE, ZRUJustifyE, ZSpinner } from "zaions-react-ui-kit";

const FullPageLoader: React.FC = () => {
  return (
    <ZFlex
      justify={ZRUJustifyE.center}
      align={ZRUAlignE.center}
      height="100%"
      minHeight="100vh"
    >
      <ZSpinner className="spinner" size="3" />
    </ZFlex>
  );
};
export default FullPageLoader;
