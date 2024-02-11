"use client"
import {useEffect, useState} from "react";
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme
import {AgGridReact} from "ag-grid-react";
import Button from "@/components/button/Button";
import AddUserSlideOver from "./add-user-slide-over";
import {gql} from "@apollo/client/core";
import {useQuery} from "@apollo/client";
import SingleColumnContainer
    from "@/components/navigation/singleColumnContainer";

export default function AdminHome() {

    const [openAddUserSlideOver, setOpenAddUserSlideOver] = useState(false);
    //1- Get all users gql

    const GET_ALL_USERS = gql`query GetAllUsers {
      allusers{
        _id
        name
        userName
        email
      }
    }`

    const {
        data: allUsers,
        loading: allUsersLoading,
        error: allUsersError,
        refetch
    } = useQuery(GET_ALL_USERS)

    useEffect(() => {
        if (!allUsersLoading) {
            console.log('All users', allUsers)
            setRowData(allUsers?.allusers)
        }

    }, [allUsersLoading])

    const [rowData, setRowData] = useState<any[]>(allUsers?.allusers);

    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        {field: '_id', hide: true},
        {field: 'name'},
        {field: 'userName'},
        {field: 'email'},
    ]);


    const handleCellValueChanged = (params: any) => {
        console.log('Edited params', params)
    }

    const openAddUserModal = () => {
        console.log('Open Add User Modal')
    }

    const handleUserAdded = () => {
        refetch()
    }
    return (
        <SingleColumnContainer>
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-gray-100 sm:truncate sm:text-3xl sm:tracking-tight">
                        User Management
                    </h2>
                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0">
                    <Button
                        colorType="primary"
                        classNames="ml-auto"
                        onClick={() =>
                            setOpenAddUserSlideOver(!openAddUserSlideOver)
                        }
                    >
                        Add User
                    </Button>
                </div>
            </div>

            <div className="mt-8 ag-theme-quartz"
            >
                {!allUsersLoading &&
				    <AgGridReact rowData={rowData} columnDefs={colDefs}
				                 domLayout='autoHeight'
				                 onCellValueChanged={() => {
                                     handleCellValueChanged
                                 }}/>}
            </div>

            <AddUserSlideOver
                open={openAddUserSlideOver}
                setOpen={setOpenAddUserSlideOver}
                handleUserAdded={handleUserAdded}
            />
        </SingleColumnContainer>
    )
}
