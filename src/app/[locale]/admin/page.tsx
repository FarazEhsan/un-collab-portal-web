"use client"
import {useEffect, useMemo, useState} from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import {AgGridReact} from "ag-grid-react";
import Button from "@/components/button/Button";
import AddUserSlideOver from "./add-user-slide-over";
import {gql} from "@apollo/client/core";
import {useQuery} from "@apollo/client";
import SingleColumnContainer
    from "@/components/navigation/singleColumnContainer";
import {
    SizeColumnsToContentStrategy,
    SizeColumnsToFitGridStrategy,
    SizeColumnsToFitProvidedWidthStrategy,
    SuppressKeyboardEventParams
} from 'ag-grid-community';

const GET_ALL_USERS = gql`query GetAllUsers {
      allusers{
        _id
        name
        userName
        email
      }
    }`

export default function AdminHome() {
    const {
        data: allUsers,
        loading: allUsersLoading,
        error: allUsersError,
        refetch
    } = useQuery(GET_ALL_USERS)

    const [openAddUserSlideOver, setOpenAddUserSlideOver] = useState(false);
    const [rowData, setRowData] = useState<any[]>(allUsers?.allusers);
    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        {field: '_id', hide: true},
        {field: 'name', editable: true},
        {field: 'userName', editable: true},
        {field: 'email', editable: true},
        {field: 'edit'},
        {
            field: 'deactivate',
            cellRenderer: 'agCheckboxCellRenderer',
            cellRendererParams: {
                disabled: false,
            },
            suppressKeyboardEvent: (
                params: SuppressKeyboardEventParams<any, boolean>
            ) => params.event.key === ' ',
        },
    ]);

    useEffect(() => {
        if (!allUsersLoading) {
            console.log('All users', allUsers)
            setRowData(JSON.parse(JSON.stringify(allUsers?.allusers)))
        }

    }, [allUsersLoading])

    const autoSizeStrategy = useMemo<
        | SizeColumnsToFitGridStrategy
        | SizeColumnsToFitProvidedWidthStrategy
        | SizeColumnsToContentStrategy
    >(() => {
        return {
            type: 'fitGridWidth',
            defaultMinWidth: 150,
            columnLimits: [
                {
                    colId: 'email',
                    minWidth: 250
                },
                {
                    colId: 'edit',
                    minWidth: 75
                },
                {
                    colId: 'deactivate',
                    minWidth: 100
                }
            ]
        };
    }, []);

    const handleCellValueChanged = (params: any) => {
        console.log("Edited params", params);
    };

    const openAddUserModal = () => {
        console.log('Open Add User Modal')
    }

    const handleUserAdded = () => {
        refetch()
    }

    return (
        <SingleColumnContainer>
            <div className="flex items-center justify-between">
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
					<AgGridReact
						rowData={rowData}
						columnDefs={colDefs}
						domLayout="autoHeight"
						autoSizeStrategy={autoSizeStrategy}
						onCellValueChanged={handleCellValueChanged}
					/>}
            </div>

            <AddUserSlideOver
                open={openAddUserSlideOver}
                setOpen={setOpenAddUserSlideOver}
                handleUserAdded={handleUserAdded}
            />
        </SingleColumnContainer>
    )
}
