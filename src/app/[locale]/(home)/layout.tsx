"use client"
import React, {ReactNode} from 'react';
import SideNav, {NavItem} from "@/components/navigation/sidenav";
import {
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
} from '@heroicons/react/24/outline'
import {ApolloProvider} from '@apollo/client';
import {client} from '@/utils/apolloclient'
import {useTranslations} from "next-intl";

interface HomeLayoutProps {
    children: ReactNode
}

const HomeLayout = ({children}: HomeLayoutProps) => {
    const t = useTranslations('UserNavigation');
    const navData: NavItem[] = [
        {name: t('dashboard'), href: '/', icon: HomeIcon, current: true},
        // {name: 'Team', href: '#', icon: UsersIcon, current: false},
        // {name: 'Projects', href: '#', icon: FolderIcon, current: false},
        // {name: 'Calendar', href: '#', icon: CalendarIcon, current: false},
        // {
        //     name: 'Documents',
        //     href: '#',
        //     icon: DocumentDuplicateIcon,
        //     current: false
        // },
        // {name: 'Reports', href: '#', icon: ChartPieIcon, current: false},
    ]

    return (
        <>
            <ApolloProvider client={client}>
                <SideNav navData={navData}>
                    {children}
                </SideNav>
            </ApolloProvider>
        </>
    );
};

export default HomeLayout;
