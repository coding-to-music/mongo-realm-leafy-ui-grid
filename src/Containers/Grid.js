import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

import GridOptions from './GridOptions';

const formatCurrency = (params) => {
    return new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(params.value);
}

const Grid = () => {
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

    const rowData = [
        {"_id":"a6c0edfd-8e57-5119-9418-f7fc5e38dd21","lastName":"Schmidt","firstName":"Loretta","consultantId":403,"age":26,"birthdate":{"year":1981,"month":5,"day":29},"profession":"Graphic Designer","address":{"street":"Bublo Junction","zip":"64421","city":"Cuetle","country":"Diego Garcia"},"contact":{"email":[{"address":"zaaniwav@laekeega.bv","type":"business"},{"address":"sozhar@jopuw.mn","type":"other"}],"phone":[{"number":"07 41 78 69 71","type":"business"}]},"crmInformation":{"segmentation":"high","lastPhysicalContactDate":{"$date":"2004-03-20T15:32:03.348Z"},"totalPhysicalContactsLastYearPeriod":9,"lastVirtualContactDate":{"$date":"2018-08-19T18:45:16.104Z"},"totalVirtualContactsLastYearPeriod":2,"totalContactsYtd":3},"portfolio":{"name":"Ju hokvar.","number":"831-05-9911","accounts":{"number":"b1fa80d6-6708-5a09-95a1-9cb56ea3747c","type":"account","balance":"-63147.13","name":"Ikkedo vivsi bu wi nuhakko."}},"consultant":{"_id":403,"lastName":"Sorelli","firstName":"Sarah","rating":"professional","location":[18.05712,52.98025]}}
    ]

    const gridOptions = Object.assign(GridOptions, {columnDefs});

    const onGridReady = (params) => {
        params.api.sizeColumnsToFit();
    }

    return (
        <div         
            style={{ height: "calc(100vh - 250px)" }}
            className="ag-theme-alpine"
        >
            <AgGridReact
                rowData={rowData}
                gridOptions={gridOptions}
                onGridReady={onGridReady}
            />
        </div>
    )
}

export default Grid;