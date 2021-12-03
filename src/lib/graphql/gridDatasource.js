import { gql } from "@apollo/client";

export const createServerSideDatasource = ({ client }) => {
    return {
        getRows: (params) => {
            console.log(params);
            //console.log(params.columnApi.getAllDisplayedColumns().map(col => col.getColId()).filter(colName => colName !== "ag-Grid-AutoColumn"));
            const { startRow, endRow, rowGroupCols, groupKeys, valueCols, sortModel } = params.request;
            sortModel.map(model => model.sort = model.sort.toUpperCase());

            const customerGroup = `
            accounts {
                number
                balance
            `;

            const allGroups = `
            customerId
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
            `;

            const query = { 
                query: gql`
                    query getGridData($queryModelInput:GridQueryModel) {
                        getGridData(input: $queryModelInput) {
                            lastRow
                            rows {
                                ${rowGroupCols.length > 0 && rowGroupCols.length === groupKeys.length ? customerGroup : allGroups}
                            }
                        }
                    }
                }
                `,
                variables: {
                    "queryModelInput" : {
                        startRow,
                        endRow,
                        rowGroupCols,
                        groupKeys,
                        valueCols,
                        sortModel
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