const columnTypes = {
    dimension: {
        enableRowGroup: true,
        enablePivot: true
    },
    valueColumn: {
        width: 300,
        aggFunc: "sum",
        cellClass: "number",
        enableValue: true,
        allowedAggFuncs: ['avg', 'sum', 'min', 'max', 'count']
    }
};

const sideBar = {
    toolPanels: [
        {
            id: "columns",
            labelDefault: "Columns",
            toolPanel: "agColumnsToolPanel"
        }
    ]
}

const defaultColDef = {
    sortable: false,
    resizable: true
}

const rowSelection = "single";
const rowModelType = "serverSide";
const serverSideStoreType = "partial";
const cacheBlockSize = 200;

export default {
    columnTypes,
    defaultColDef,
    rowSelection,
    rowModelType,
    serverSideStoreType,
    cacheBlockSize,
    //sideBar
}