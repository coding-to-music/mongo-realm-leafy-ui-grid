import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

import GridOptions from './GridOptions';
import ApolloClientWrapper from '../lib/graphql/ApolloClientWrapper';
import { createServerSideDatasource } from "../lib/graphql/gridDatasource";

const formatCurrency = (params) => {
    return new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(params.value);
}

const Grid = ({ client }) => {
    const columnDefs = [
        { field: "lastName"},
        { field: "firstName"},
        { field: "age", },
        { field: "country", valueGetter: "data.address.country"},
        { field: "segment", valueGetter: "data.crmInformation.segmentation"},
        { field: "portfolio", valueGetter: "data.portfolio.number"},
        { field: "account", valueGetter: "data.portfolio.accounts.number"},
        { field: "balance", valueGetter: "data.portfolio.accounts.balance", valueFormatter: formatCurrency }
    ]

    const gridOptions = Object.assign(GridOptions, {columnDefs});
    const datasource = createServerSideDatasource({client});

    const onGridReady = (params) => {
        params.api.sizeColumnsToFit();
        params.api.setServerSideDatasource(datasource);
    }

    return (
        <div         
            style={{ height: "calc(100vh - 250px)" }}
            className="ag-theme-alpine"
        >
            <AgGridReact
                gridOptions={gridOptions}
                onGridReady={onGridReady}
            />
        </div>
    )
}

export default ApolloClientWrapper(Grid);