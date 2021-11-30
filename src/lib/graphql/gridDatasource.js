import { gql } from "@apollo/client";

export const createServerSideDatasource = ({ client }) => {
    return {
        getRows: (params) => {
            console.log(params.request);
            const { startRow, endRow } = params.request;

            const query = { 
                query: gql`
                    query getGridData($queryModelInput:GridQueryModel) {
                        getGridData(input: $queryModelInput) {
                            lastRow
                            rows {
                                lastName
                                firstName
                                age
                                address {
                                    country
                                }
                                crmInformation {
                                    segmentation
                                }
                                portfolio {
                                    number
                                    accounts {
                                    number
                                    balance
                                }
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