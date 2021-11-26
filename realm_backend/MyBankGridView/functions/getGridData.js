exports = async ({ startRow, endRow }) => {
  const cluster = context.services.get("mongodb-atlas");
  const collection = cluster.db("mybank").collection("customerSingleviewFlat");
  
  const agg = [];

  agg.push({"$skip": startRow});
  agg.push({"$limit": endRow-startRow});
  
  return await collection.aggregate(agg).toArray();
}

/** 
 * TESTDATA
 * copy this to console section
 
exports(
  {
    startRow: 0, 
    endRow: 5
  }  
)
*/
 