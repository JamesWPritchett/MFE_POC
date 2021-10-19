import React from "react";
import { MFEContext } from "./context";

export const useMFEContext = () => {
  const context = React.useContext(MFEContext);

  console.log("useMFEContext", context);

  if (context === undefined) {
    throw new Error(
      "MFEContext value is undefined. Make sure you're using MFEContextWrapper before using the context"
    );
  }

  return context;
};
