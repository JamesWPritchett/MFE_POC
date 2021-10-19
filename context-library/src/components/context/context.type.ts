import { Dispatch, SetStateAction } from "react";

export type MFEContextValue = {
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};
