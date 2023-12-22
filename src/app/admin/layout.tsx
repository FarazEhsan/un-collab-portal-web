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
import { FlagIcon } from "@heroicons/react/20/solid";
import { AcademicCapIcon } from "@heroicons/react/24/solid";

interface AdminLayoutProps {
    children: ReactNode
}

const AdminLayout = ({children}:AdminLayoutProps)=>{
    const navData:NavItem[]= [
        {name: 'User Management', href: '/home', icon: HomeIcon, current: true},
        {name: 'Teams', href: '#', icon: AcademicCapIcon, current: false},
        {name: 'SDG', href: '#', icon: FlagIcon, current: false},
        // {name: 'Calendar', href: '#', icon: CalendarIcon, current: false},
        // {name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false},
        // {name: 'Reports', href: '#', icon: ChartPieIcon, current: false},
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