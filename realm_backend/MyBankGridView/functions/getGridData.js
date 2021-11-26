exports = async ({ startRow, endRow }) => {
  const cluster = context.services.get("mongodb-atlas");
  const collection = cluster.db("mybank").collection("customerSingleviewFlat");
  
  //deploy test
  
  return await collection.aggregate([{"$skip": startRow}, {"$limit": endRow-startRow}]).toArray();
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
 