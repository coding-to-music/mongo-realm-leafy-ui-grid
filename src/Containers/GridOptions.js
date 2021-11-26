const columnTypes = {
    valueColumn: {
        width: 150
    }
};

const defaultColDef = {
    sortable: false,
    resizable: true
}

const rowSelection = "single";
const rowModelType = "serverSide";
const serverSideStoreType = "partial";
const cacheBlockSize = 20;

export default {
    columnTypes,
    defaultColDef,
    rowSelection,
    rowModelType,
    serverSideStoreType,
    cacheBlockSize
}