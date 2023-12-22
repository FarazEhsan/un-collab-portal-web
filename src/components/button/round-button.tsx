import React from 'react';

interface RoundButtonProps {
    children: React.ReactNode,
    classNames?: string,
}

const RoundButton = ({children, classNames}: RoundButtonProps) => {
    return (
        <button
            type="button"
            className={`${classNames} rounded-full p-2 text-white shadow-sm 
            focus-visible:outline focus-visible:outline-2 
            focus-visible:outline-offset-2
            `}
        >
            {children}
        </button>
    );
};

export default RoundButton;
