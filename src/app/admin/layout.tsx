"use client"
import SideNav, { NavItem } from "@/components/navigation/sidenav";
import { ReactNode } from "react";
import {

    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
} from '@heroicons/react/24/outline'

interface AdminLayoutProps {
    children: ReactNode
}

const AdminLayout = ({children}:AdminLayoutProps)=>{
    const navData:NavItem[]= [
        {name: 'Dashboardaa', href: '/home', icon: HomeIcon, current: true},
        {name: 'Team', href: '#', icon: UsersIcon, current: false},
        {name: 'Projects', href: '#', icon: FolderIcon, current: false},
        {name: 'Calendar', href: '#', icon: CalendarIcon, current: false},
        {name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false},
        {name: 'Reports', href: '#', icon: ChartPieIcon, current: false},
    ]
    return(
        <>
        <SideNav navData={navData}>
            {children}
        </SideNav>
        </>
        
    )
}

export default AdminLayout