exports = function({groupKeys, rowGroupCols}) {
  let match = {};
  groupKeys.forEach((element, index) => {
    match = Object.assign(match, {[rowGroupCols[index].id]: element});
  });
  
  return {"$match": match};
};


/** 
 * TEST DATA
 * 
const rowGroupCols = [
    {
        "id": "country",
        "displayName": "Country",
        "field": "country"
    },
    {
        "id": "_id",
        "displayName": "Customer",
        "field": "customer"
    }
];

const groupKeys = [
    "Singapore", "Bla"
];

exports({rowGroupCols, groupKeys});
 
 
 
 
 */