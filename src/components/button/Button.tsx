import React from 'react';

interface ButtonProps {
    children: React.ReactNode,
    colorType?: string,
    classNames?: string,
}

let colorConfig = 'bg-custom-blue text-white hover:bg-custom-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400';


const Button = ({children, colorType, classNames}: ButtonProps) => {
    switch (colorType) {
        case 'primary':
           colorConfig = 'bg-custom-blue text-white hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400';
            break;
        case 'secondary':
            colorConfig = 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50';
            break;
        case 'danger':
            colorConfig = 'bg-red-100 text-red-800 hover:bg-red-200';
            break;
        case 'warning':
            colorConfig = 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
            break;
    }
    return (
        <button
            type="button"
            className={`rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm ${colorConfig} ${classNames}`}
        >
            {children}
        </button>
    );
};

export default Button;
