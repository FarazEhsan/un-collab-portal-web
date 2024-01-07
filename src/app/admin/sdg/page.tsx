"use client";
import { useEffect, useState } from "react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { AgGridReact } from "ag-grid-react";
import Button from "@/components/button/Button";
import AddSDGSlideOver from "./add-sdg-slide-over";
import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client";
import { all } from "axios";
export default function AdminHome() {
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
    { field: "id", hide: true },
    { field: "name" },
    { field: "code" },
    { field: "shortDescription" },
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
    <div className="h-dvh p-4">
      <h3>SDG Management</h3>
      <hr />
      <br></br>
      <Button
        colorType="primary"
        classNames="ml-auto"
        onClick={() => setOpenAddSDGSlideOver(!openAddSDGSlideOver)}
      >
        Add SDG
      </Button>

      <AddSDGSlideOver
        open={openAddSDGSlideOver}
        setOpen={setOpenAddSDGSlideOver}
        handleSDGAdded={handleSDGAdded}
      />
      <div className="ag-theme-quartz w-5/12 p-4">
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
    </div>
  );
}
