import React, { FC, useState } from "react";
import { MFEContext } from "./context";

export interface MFEContextWrapperProps {}

const MFEContextWrapper: FC<MFEContextWrapperProps> = ({ children }) => {
  const [userName, setUserName] = useState("none");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <MFEContext.Provider
      value={{ userName, setUserName, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </MFEContext.Provider>
  );
};

export default MFEContextWrapper;
