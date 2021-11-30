import { gql } from "@apollo/client";

export const createServerSideDatasource = ({ client }) => {
    return {
        getRows: (params) => {
            console.log(params);
            //console.log(params.columnApi.getAllDisplayedColumns().map(col => col.getColId()).filter(colName => colName !== "ag-Grid-AutoColumn"));
            console.log(params.columnApi.getAllDisplayedColumns());
            const { startRow, endRow } = params.request;

            const query = { 
                query: gql`
                    query getGridData($queryModelInput:GridQueryModel) {
                        getGridData(input: $queryModelInput) {
                            lastRow
                            rows {
                                _id
                                lastName
                                firstName
                                age
                                address {
                                    country
                                }
                                crmInformation {
                                    segmentation
                                }
                                accounts {
                                number
                                balance
                            }
                        }
                    }
                }
                `,
                variables: {
                    "queryModelInput" : {
                        startRow,
                        endRow
                    }
                }
            };

            client.query(query)
            .then(res => res.data.getGridData)
            .then(({ lastRow, rows }) => {
                params.successCallback(rows, lastRow)
            })
            .catch(err => {
                console.error(err);
                params.failCallback();
            })
        }
    }
}