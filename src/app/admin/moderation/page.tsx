'use client'
import React, {useState} from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import {SuppressKeyboardEventParams} from 'ag-grid-community';
import SingleColumnContainer
    from "@/components/navigation/singleColumnContainer";
import {AgGridReact} from "ag-grid-react";

const Moderation = () => {
    const [rowData, setRowData] = useState<any[]>([
        {
            _id: 1,
            type: 'Comment',
            severity: 'High',
            userName: 'user123',
            description: 'test'
        }, {
            _id: 2,
            type: 'Topic',
            severity: 'Low',
            userName: 'user123',
            description: 'test'
        },
    ]);

    const [colDefs, setColDefs] = useState([
        {field: '_id', hide: true},
        {field: 'type', filter: 'agTextColumnFilter'},
        {field: 'severity', filter: 'agTextColumnFilter'},
        {field: 'userName'},
        {field: 'description'},
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
    return (
        <SingleColumnContainer>
            <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-gray-100 sm:truncate sm:text-3xl sm:tracking-tight">
                        Moderation
                    </h2>
                </div>
            </div>

            <div className="mt-8 ag-theme-quartz"
            >
                {/*{!allUsersLoading &&*/}
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    domLayout="autoHeight"
                    // autoSizeStrategy={autoSizeStrategy}
                    // onCellValueChanged={handleCellValueChanged}
                />
                {/*}*/}
            </div>
        </SingleColumnContainer>
    );
};

export default Moderation;
