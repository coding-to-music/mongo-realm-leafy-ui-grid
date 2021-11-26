import React from "react";
import { AgGridReact } from "ag-grid-react";
import Button from "@leafygreen-ui/button";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

import GridOptions from './GridOptions';
import ApolloClientWrapper from '../lib/graphql/ApolloClientWrapper';
import { createServerSideDatasource } from "../lib/graphql/gridDatasource";
import Container from "../Components/Container";
import { useRealmApp } from "../RealmApp";

const formatCurrency = (params) => {
    return new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(params.value);
}

const Grid = ({ client }) => {
    const app = useRealmApp();

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
        <>
        <div         
            style={{ height: "calc(100vh - 250px)" }}
            className="ag-theme-alpine"
        >
            <AgGridReact
                gridOptions={gridOptions}
                onGridReady={onGridReady}
            />
        </div>
        <h4>User: {app.currentUser.id ? `${app.currentUser.id} (${app.currentUser.providerType})` : "not logged in"}</h4>
        <Button variant="primary" onClick={() => app.logOut()}>Logout</Button>
        </>
    )
}

export default ApolloClientWrapper(Grid);