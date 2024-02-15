"use client"
import {useCallback, useEffect, useMemo, useState} from "react";
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
    let rowImmutableStore;

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

    const onGridReady = useCallback((params:any) => {
        console.log(allUsers)
        if (allUsers && !allUsersLoading) {
            rowImmutableStore = allUsers?.allusers;
            setRowData(allUsers?.allusers)
        }
    }, []);

    // useEffect(() => {
    //     if (!allUsersLoading) {
    //         console.log('All users', allUsers)
    //         rowImmutableStore = allUsers?.allusers;
    //         setRowData(allUsers?.allusers)
    //     }
    //
    // }, [allUsersLoading])

    const [rowData, setRowData] = useState<any[]>(allUsers?.allusers);
    const getRowId = useMemo(() => {
        return (params:any) => params.data.id;
    }, []);
    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        {field: '_id', hide: true},
        {
            headerName: 'Name',
            editable: true,
            valueGetter: (params:any) => {
                return params.data.name;
            },
            valueSetter: (params:any) => {
                const newVal = params.newValue;
                const newObj = {...params.data}
                console.log(newVal, params.data.name)
                const valueChanged = params.data.name !== newVal;
                if (valueChanged) {
                    newObj.name = newVal;
                    params.data = {...params.data, name: newVal};
                    console.log('params.data',params.data)
                }
                return valueChanged;
            },
        },
        {field: 'userName', editable: true},
        {field: 'email', editable: true},
        {field: 'edit'},
        {
            field: 'deactivate',
            cellRenderer: 'agCheckboxCellRenderer',
            cellEditor: 'agCheckboxCellEditor',
            editable: true,
            suppressKeyboardEvent: (params:any) => params.event.key === ' ',
        },
    ]);

    const autoSizeStrategy = {
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


    const onCellValueChanged = useCallback((event:any) => {
        console.log('Data after change is', event.data);
    }, []);

    const openAddUserModal = () => {
        console.log('Open Add User Modal')
    }

    const handleUserAdded = () => {
        refetch()
    }



    const onCellEditRequest = useCallback(
        (event:any) => {
            const data = event.data;
            const field = event.colDef.field;
            const newValue = event.newValue;
            const oldItem = rowImmutableStore.find((row:any) => row.id === data.id);
            if (!oldItem || !field) {
                return;
            }
            const newItem = { ...oldItem };
            newItem[field] = newValue;
            console.log('onCellEditRequest, updating ' + field + ' to ' + newValue);
            rowImmutableStore = rowImmutableStore.map((oldItem) =>
                oldItem.id == newItem.id ? newItem : oldItem
            );
            setRowData(rowImmutableStore);
        },
        [rowImmutableStore]
    );

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
					             getRowId={getRowId}
					             readOnlyEdit={true}
					             autoSizeStrategy={autoSizeStrategy}
					             onCellEditRequest={onCellEditRequest}
					             onGridReady={onGridReady}
					             onCellValueChanged={onCellValueChanged}/>}
            </div>

            <AddUserSlideOver
                open={openAddUserSlideOver}
                setOpen={setOpenAddUserSlideOver}
                handleUserAdded={handleUserAdded}
            />
        </SingleColumnContainer>
    )
}
