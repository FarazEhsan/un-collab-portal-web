import React, {MouseEventHandler} from 'react';

interface ButtonProps {
    children: React.ReactNode,
    colorType?: string,
    classNames?: string,
    onClick?: MouseEventHandler,
    type?: 'button' | 'submit' | 'reset';
    action?: (event:any) => void
}

let colorConfig = 'bg-custom-blue text-white hover:bg-custom-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-teal';


const Button = ({children, colorType = 'primary', classNames, onClick, type, action}: ButtonProps) => {
    switch (colorType) {
        case 'primary':
            colorConfig = 'bg-custom-blue text-white hover:bg-custom-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-teal';
            break;
        case 'secondary':
            colorConfig = 'bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-500 dark:hover:bg-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-0';
            break;
        case 'danger':
            colorConfig = 'bg-red-100 text-red-800 hover:bg-red-200 focus-visible:outline-0';
            break;
        case 'warning':
            colorConfig = 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 focus-visible:outline-0';
            break;
        case 'link':
            colorConfig = 'text-custom-blue hover:text-custom-teal focus-visible:outline-0';
            break;
    }
    return (
        <button
            type="submit"
            onClick={onClick}
            className={`rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm ${colorConfig} ${classNames}`}
        >
            {children}
        </button>
    );
};

export default Button;
