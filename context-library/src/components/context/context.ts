import React from "react";
import { MFEContextValue } from "./context.type";

export const MFEContext: React.Context<MFEContextValue> = React.createContext({
  userName: "none",
  setUserName: (state: any) => {}, // noop default callback
  isLoggedIn: false,
  setIsLoggedIn: (state: any) => {}, // noop default callback
} as MFEContextValue);
