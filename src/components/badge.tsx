import React from 'react';

interface BadgeProps {
    text: string,
    classNames?: string,
}

const Badge = ({text, classNames}: BadgeProps) => {
    return (
        <span
            className={`inline-flex items-center rounded-md bg-gray-50 dark:bg-gray-600 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 ring-1 ring-inset ring-gray-500/10 ${classNames}`}>
        {text}
      </span>
    );
};

export default Badge;
