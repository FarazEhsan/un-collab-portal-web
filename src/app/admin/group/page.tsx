"use client";
import {useEffect, useMemo, useState} from "react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import {AgGridReact} from "ag-grid-react";
import Button from "@/components/button/Button";
import AddGroupSlideOver from "./add-group-slide-over";
import {gql} from "@apollo/client/core";
import {useQuery} from "@apollo/client";
import SingleColumnContainer
    from "@/components/navigation/singleColumnContainer";
import {
    SizeColumnsToContentStrategy,
    SizeColumnsToFitGridStrategy,
    SizeColumnsToFitProvidedWidthStrategy,
} from 'ag-grid-community';
export default function GroupManagement() {
    const [openAddGroupSlideOver, setOpenAddGroupSlideOver] = useState(false);
    //1- Get all users gql

    const GET_ALL_GROUPS = gql`
    query GetAllGroups {
      allgroups {
        _id
        name
        description
      }
    }
  `;

    const {
        data: allGroups,
        loading: allGroupsLoading,
        error: allGroupsError,
        refetch,
    } = useQuery(GET_ALL_GROUPS);

    useEffect(() => {
        if (!allGroupsLoading) {
            console.log("All Groups", allGroups);
            setRowData(JSON.parse(JSON.stringify(allGroups?.allgroups))); // Deep copy
        }
    }, [allGroupsLoading]);

    const [rowData, setRowData] = useState<any[]>(allGroups?.allgroups);

    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        {field: "_id", hide: true},
        {field: "name", editable:true},
        {field: "description"}
    ]);

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
                    colId: 'name',
                    minWidth: 150
                },
                {
                    colId: 'code',
                    minWidth: 150
                },
            ]
        };
    }, []);

    const handleCellValueChanged = (params: any) => {
        console.log("Edited params", params);
    };

    const openAddUserModal = () => {
        console.log("Open Add User Modal");
    };

    const handleGroupAdded = () => {
        refetch();
    };
    return (
        <SingleColumnContainer>
            <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-gray-100 sm:truncate sm:text-3xl sm:tracking-tight">
                        Group Management
                    </h2>
                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0">
                    <Button
                        colorType="primary"
                        classNames="ml-auto"
                        onClick={() => setOpenAddGroupSlideOver(!openAddGroupSlideOver)}
                    >
                        Add Group
                    </Button>
                </div>
            </div>


            <AddGroupSlideOver
                open={openAddGroupSlideOver}
                setOpen={setOpenAddGroupSlideOver}
                handleGroupAdded={handleGroupAdded}
            />
            <div className="ag-theme-quartz mt-8">
                {!allGroupsLoading && (
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={colDefs}
                        domLayout="autoHeight"
                        autoSizeStrategy={autoSizeStrategy}
                        onCellValueChanged={handleCellValueChanged}
                    />
                )}
            </div>
        </SingleColumnContainer>
    );
}
