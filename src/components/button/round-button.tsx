import React from 'react';

interface RoundButtonProps {
    children: React.ReactNode,
    classNames?: string,
    profileURL?: string,
}

const RoundButton = ({children, classNames,profileURL}: RoundButtonProps) => {
    return (
        <a
            type="button"
            className={`${classNames} rounded-full p-2 text-white shadow-sm 
            focus-visible:outline focus-visible:outline-2 
            focus-visible:outline-offset-2
            `}
            href={profileURL}
            target='_blank'
        >
            {children}
        </a>
    );
};

export default RoundButton;
