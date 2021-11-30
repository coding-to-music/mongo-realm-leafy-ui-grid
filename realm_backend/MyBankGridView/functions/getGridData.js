exports = async ({ startRow, endRow, rowGroupCols=[], groupKeys=[] }) => {
  const cluster = context.services.get("mongodb-atlas");
  const collection = cluster.db("mybank").collection("customerSingleView");
  
  const agg = [];
  
  agg.push({
    $unwind: {
        path: "$accounts",
        includeArrayIndex: "accountIdx",
        preserveNullAndEmptyArrays: true
    }
  })

  agg.push({
    $facet: {
      rows: [{"$skip": startRow}, {"$limit": endRow-startRow}],
      rowCount: [{$count: 'lastRow'}]
    }
  });

  agg.push({
    $project: {
      rows: 1,
      lastRow: {$arrayElemAt: ["$rowCount.lastRow", 0]}
    }
  })
  
  return await collection.aggregate(agg).next();
}

/** 
 * TESTDATA
 * copy this to console section

const rowGroupCols=[
  {
    "id": "customer",
    "displayName": "Customer",
    "field": "customer"
  }
]

const groupKeys = [
  "798.458.368-44"
]
 
exports(
  {
    startRow: 0, 
    endRow: 5,
    rowGroupCols,
    groupKeys
  }  
)
*/
 