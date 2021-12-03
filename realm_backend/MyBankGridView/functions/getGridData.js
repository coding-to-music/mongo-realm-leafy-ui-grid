exports = async ({ startRow, endRow, rowGroupCols=[], groupKeys=[], valueCols=[] }) => {
  
  const forEach = require("lodash/forEach");
  
  const cluster = context.services.get("mongodb-atlas");
  const collection = cluster.db("mybank").collection("customerSingleView");
  
  const agg = [];
  
  if(groupKeys.length > 0) {
    //generate match in grouping case and translate between string and int (because GraphQL schema in Realm only supports exactly one datatype as input)
    agg.push(context.functions.execute('getMatchStage', {rowGroupCols, groupKeys: groupKeys.map(key => isNaN(key) ? key : parseInt(key))}));
  }
  
  agg.push(
    {
      $sort: {_id: 1}
    }  
  )

  agg.push(
    { $unwind: {
        path: "$accounts",
        includeArrayIndex: 'accountIdx',
        preserveNullAndEmptyArrays: false
    }}
  );

  agg.push(
    { $set: {
         uniqueId: {$concat: ["$_id", "-", {$toString: "$accountIdx"}]}
    }}
  );
  
  //set grouping if required
  if (rowGroupCols.length > 0 && rowGroupCols.length > groupKeys.length) {
    forEach(context.functions.execute('getGroupStage', {rowGroupCols, groupKeys, valueCols}), (element) => agg.push(element));
  }
  
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
  });
  
  console.log(JSON.stringify(agg, null, ' '));
  
  return await collection.aggregate(agg).next();
}

/** 
 * TESTDATA
 * copy this to console section
 *

const rowGroupCols= [
    {
        "id": "address.country",
        "displayName": "Country",
        "field": "country"
    },
    {
        "id": "_id",
        "displayName": "Customer",
        "field": "customer"
    }
]

const groupKeys = [
    "583.720.911-53"
]

const valueCols = [
    {
        "id": "lastName",
        "aggFunc": "first",
        "displayName": "Last Name",
        "field": "lastName"
    },
    {
        "id": "firstName",
        "aggFunc": "first",
        "displayName": "First Name",
        "field": "firstName"
    },
    {
        "id": "accounts.balance",
        "aggFunc": "sum",
        "displayName": "Balance",
        "field": "balance"
    }
]


exports(
  {
    startRow: 0, 
    endRow: 5,
    rowGroupCols,
    groupKeys, 
    valueCols
  }  
)
*/
 