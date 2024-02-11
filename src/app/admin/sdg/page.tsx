"use client";
import {useEffect, useState} from "react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import {AgGridReact} from "ag-grid-react";
import Button from "@/components/button/Button";
import AddSDGSlideOver from "./add-sdg-slide-over";
import {gql} from "@apollo/client/core";
import {useQuery} from "@apollo/client";
import SingleColumnContainer
    from "@/components/navigation/singleColumnContainer";

export default function SDFManagement() {
    const [openAddSDGSlideOver, setOpenAddSDGSlideOver] = useState(false);
    //1- Get all users gql

    const GET_ALL_SDGs = gql`
    query GetAllSDGs {
      allsdgs {
        id
        name
        code
        shortDescription
      }
    }
  `;

    const {
        data: allSDGs,
        loading: allSDGsLoading,
        error: allSDGsError,
        refetch,
    } = useQuery(GET_ALL_SDGs);

    useEffect(() => {
        if (!allSDGsLoading) {
            console.log("All SDGs", allSDGs);
            setRowData(allSDGs?.allsdgs);
        }
    }, [allSDGsLoading]);

    const [rowData, setRowData] = useState<any[]>(allSDGs?.allsdgs);

    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        {field: "id", hide: true},
        {field: "name"},
        {field: "code"},
        {field: "shortDescription"},
    ]);

    const handleCellValueChanged = (params: any) => {
        console.log("Edited params", params);
    };

    const openAddUserModal = () => {
        console.log("Open Add User Modal");
    };

    const handleSDGAdded = () => {
        refetch();
    };
    return (
        <SingleColumnContainer>
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-gray-100 sm:truncate sm:text-3xl sm:tracking-tight">
                        SDG Management
                    </h2>
                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0">
                    <Button
                        colorType="primary"
                        classNames="ml-auto"
                        onClick={() => setOpenAddSDGSlideOver(!openAddSDGSlideOver)}
                    >
                        Add SDG
                    </Button>
                </div>
            </div>


            <AddSDGSlideOver
                open={openAddSDGSlideOver}
                setOpen={setOpenAddSDGSlideOver}
                handleSDGAdded={handleSDGAdded}
            />
            <div className="ag-theme-quartz mt-8">
                {!allSDGsLoading && (
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={colDefs}
                        domLayout="autoHeight"
                        onCellValueChanged={() => {
                            handleCellValueChanged;
                        }}
                    />
                )}
            </div>
        </SingleColumnContainer>
    );
}
