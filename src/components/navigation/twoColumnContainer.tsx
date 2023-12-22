import React, {ReactNode} from 'react';

interface TwoColumnContainerProps {
    children: ReactNode,
    secondaryContent: ReactNode,
}
const TwoColumnContainer = ({children, secondaryContent}:TwoColumnContainerProps) => {
    return (
        <>
            <main className="dark:bg-gray-900">
                <div className="xl:pr-96">
                    <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                        {/* Main area */}
                        {children}
                    </div>
                </div>
            </main>

            <aside className="fixed inset-y-12 right-0 top-16 bottom-0 hidden w-96 overflow-y-auto border-l border-gray-200 dark:border-gray-700 px-4 py-6  sm:px-6 lg:px-8 xl:block">
                {/* Secondary column (hidden on smaller screens) */}
                {secondaryContent}
            </aside>
        </>
    );
};

export default TwoColumnContainer;
