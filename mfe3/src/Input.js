import React from "react";
import { useMFEContext } from "context-library";

const Input = () => {
  const { userName, setUserName, isLoggedIn, setIsLoggedIn } = useMFEContext();

  return (
    <div>
      <p>userName from MFE3: {userName}</p>
      <p>isLoggedIn from MFE3: {isLoggedIn.toString()}</p>
      <input onChange={(e) => setUserName(e.target.value)} value={userName}/>
      <button onClick={() => {
        setIsLoggedIn(!isLoggedIn);
       }}>Toggle Logged In</button>
    </div>
  );
};

export default Input;
