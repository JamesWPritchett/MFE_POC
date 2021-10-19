import React from 'react';

const Button = ({name, callback}) =>{
    return(
        <button onClick={callback}>{name}</button>
    );
};
export default Button;
