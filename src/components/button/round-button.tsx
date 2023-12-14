import React from 'react';

interface RoundButtonProps {
    children: React.ReactNode,
    classNames?: string,
}

const RoundButton = ({children, classNames}: RoundButtonProps) => {
    return (
        <button
            type="button"
            className={`rounded-full bg-indigo-600 p-2 text-white shadow-sm 
            hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
            focus-visible:outline-offset-2 focus-visible:outline-indigo-600 
            ${classNames}`}
        >
            {children}
        </button>
    );
};

export default RoundButton;
