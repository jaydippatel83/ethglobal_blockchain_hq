import React from 'react';

const ButtonComponent = ({ text, onClick }) => {
    return (
        <button onClick={onClick} className="
        bg-greenCustom text-black 
          font-bold p-2 
          rounded-lg 
          shadow-[0px_4px_0px_rgba(0,0,0,1)] 
          border border-black 
        ">
            {text}
        </button>
    );
};

export default ButtonComponent;