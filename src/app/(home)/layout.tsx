import React, {ReactNode} from 'react';
import SideNav from "@/components/navigation/sidenav";


interface HomeLayoutProps {
    children: ReactNode
}
const HomeLayout = ({children}:HomeLayoutProps) => {
    return (
        <>
        <SideNav>
            {children}
        </SideNav>
        </>
    );
};

export default HomeLayout;
