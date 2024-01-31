import React, {ReactNode} from 'react';

interface SingleColumnContainerProps {
    children: ReactNode
}

const SingleColumnContainer = ({children}: SingleColumnContainerProps) => {
    return (
        <main className='dark:bg-gray-950 bg-gray-50'>
            <div>
                <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                    {/* Main area */}
                    {children}
                </div>
            </div>
        </main>
    );
};

export default SingleColumnContainer;
