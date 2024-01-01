"use client"
import React, {ReactNode} from 'react';
import SideNav, { NavItem } from "@/components/navigation/sidenav";
import {

    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
} from '@heroicons/react/24/outline'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

interface HomeLayoutProps {
    children: ReactNode
}
export const client = new ApolloClient({
    uri: "http://localhost:8080/graphql", // replace with your server's URI
    cache: new InMemoryCache(),
  });
const HomeLayout = ({children}:HomeLayoutProps) => {
    const navData:NavItem[]= [
        {name: 'Dashboard', href: '/home', icon: HomeIcon, current: true},
        {name: 'Team', href: '#', icon: UsersIcon, current: false},
        {name: 'Projects', href: '#', icon: FolderIcon, current: false},
        {name: 'Calendar', href: '#', icon: CalendarIcon, current: false},
        {name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false},
        {name: 'Reports', href: '#', icon: ChartPieIcon, current: false},
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
