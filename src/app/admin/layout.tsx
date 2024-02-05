"use client";
import SideNav, {NavItem} from "@/components/navigation/sidenav";
import {ReactNode} from "react";
import {HomeIcon,} from "@heroicons/react/24/outline";
import {FlagIcon} from "@heroicons/react/20/solid";
import {AcademicCapIcon} from "@heroicons/react/24/solid";
import {ApolloProvider} from "@apollo/client";
import {client} from '../../utils/apolloclient'
import { withRole } from "@/hoc/role-hoc";

interface AdminLayoutProps {
    children: ReactNode;
}


const AdminLayout = ({children}: AdminLayoutProps) => {
    const navData: NavItem[] = [
        {
            name: "User Management",
            href: "/admin",
            icon: HomeIcon,
            current: true
        },
        {name: "SDG", href: "/admin/sdg", icon: FlagIcon, current: false},
        {
            name: "Group",
            href: "/admin/group",
            icon: AcademicCapIcon,
            current: false
        },

        // {name: 'Calendar', href: '#', icon: CalendarIcon, current: false},
        // {name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false},
        // {name: 'Reports', href: '#', icon: ChartPieIcon, current: false},
    ];
    return (
        <ApolloProvider client={client}>
            <SideNav navData={navData}>{children}</SideNav>
        </ApolloProvider>
    );
};

export default withRole(AdminLayout, ['admin']);
