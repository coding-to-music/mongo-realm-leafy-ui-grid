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

const formatNumber = (value) => {
    return new Intl.NumberFormat('de-DE').format(value);
}


const Grid = ({ client }) => {
    const app = useRealmApp();

    const columnDefs = [
        { 
            field: "customer",
            colId: "_id",
            valueGetter: "data._id",
            type: "dimension"
        },
        { field: "lastName" },
        { field: "firstName" },
        { field: "age", type: "dimension" },
        { field: "country", type: "dimension", valueGetter: "data.address.country"},
        { field: "segment", type: "dimension", valueGetter: "data.crmInformation.segmentation"},
        { field: "account", valueGetter: "data.accounts.number", hide: true},
        { 
            field: "balance", 
            colId: "accounts.balance",
            valueGetter: "data.accounts.balance", 
            valueFormatter: formatCurrency,
            type: "valueColumn",
            cellClassRules: {
                "rag-red": params => params.value <= 0,
                "rag-green": params => params.value > 0
            }
        }
    ]

    const gridOptions = Object.assign(GridOptions, {columnDefs});
    const datasource = createServerSideDatasource({client});

    const [totalRows, setTotalRows] = React.useState(0);

    const onGridReady = (params) => {
        params.api.sizeColumnsToFit();
        params.api.setServerSideDatasource(datasource);
    }

    const onModelUpdate = (params) => {
        setTotalRows(params.api.getDisplayedRowCount());
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
                onModelUpdated={onModelUpdate}
            />
        </div>
        <h4>{`Total Results: ${formatNumber(totalRows)}`}</h4>
        <h4>User: {app.currentUser.id ? `${app.currentUser.id} (${app.currentUser.providerType})` : "not logged in"}</h4>
        <Button variant="primary" onClick={() => app.logOut()}>Logout</Button>
        </>
    )
}

export default ApolloClientWrapper(Grid);