import React from "react";
import { useMFEContext } from "context-library";

const Tile = () => {
  const { userName, setUserName, isLoggedIn, setIsLoggedIn } = useMFEContext();

  return (
    <div style={{"border": "1px solid black"}}>
      <p style={{fontSize: '15px', color: 'red'}}>userName from MFE-Dynamic: {userName}</p>
      <p>isLoggedIn from MFE-Dynamic: {isLoggedIn.toString()}</p>
      <input onChange={(e) => setUserName(e.target.value)} value={userName}/>
      <button onClick={() => {
        setIsLoggedIn(!isLoggedIn);
       }}>Toggle Logged In</button>
    </div>
  );
};

export default Tile;
