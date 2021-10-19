import React from "react";
import { useMFEContext } from "context-library";

export const ContextTester = () => {
  const { userName, setUserName, isLoggedIn, setIsLoggedIn } = useMFEContext();

  return (
    <div>
      <p>userName from MFE Host: {userName}</p>
      <p>isLoggedIn from MFE Host: {isLoggedIn.toString()}</p>
    </div>
  );
};
