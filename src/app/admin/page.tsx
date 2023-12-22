"use client"
import { useState } from "react";
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme
import { AgGridReact } from "ag-grid-react";
import Button from "@/components/button/Button";
export default function AdminHome(){
    const [rowData, setRowData] = useState<any[]>([
        {
          mission: 'Voyager',
          company: 'NASA',
          location: 'Cape Canaveral',
          date: '1977-09-05',
          rocket: 'Titan-Centaur ',
          price: 86580000,
          successful: true,
        },
        {
          mission: 'Apollo 13',
          company: 'NASA',
          location: 'Kennedy Space Center',
          date: '1970-04-11',
          rocket: 'Saturn V',
          price: 3750000,
          successful: false,
        },
        {
          mission: 'Falcon 9',
          company: 'SpaceX',
          location: 'Cape Canaveral',
          date: '2015-12-22',
          rocket: 'Falcon 9',
          price: 9750000,
          successful: true,
        },
      ]);

      // Column Definitions: Defines & controls grid columns.
      const [colDefs, setColDefs] = useState([
        { field: 'mission', editable: true },
        {field: 'company' },
        {field: 'location' },
        {field: 'date' },
        { field: 'price' },
        { field: 'successful', editable: true },
        { field: 'rocket' },
      ]);


      const handleCellValueChanged = (params: any) =>{
        console.log('Edited params', params)
      }

      const openAddUserModal = () =>{
        console.log('Open Add User Modal')
      }
    return(
        <div className="h-dvh p-4">
            <h3>User Management</h3>
            <hr/>
            <br></br>
            <Button classNames='mx-2' colorType='primary' type="button" action={openAddUserModal}> Add User</Button>
            <div className="ag-theme-quartz w-4/5 p-4"
            >
                <AgGridReact rowData={rowData} columnDefs={colDefs} domLayout='autoHeight' onCellValueChanged={() =>{handleCellValueChanged} }/>
            </div>
        </div>
    )
}