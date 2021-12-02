exports = function({rowGroupCols, groupKeys, valueCols}) {
  let groupsToUse = rowGroupCols.slice(groupKeys.length, groupKeys.length + 1);
  let groupId = {};
  let project = {};
  const id = [];
  groupId = Object.assign({}, groupId, {[groupsToUse[0].id]: `$${groupsToUse[0].id}`});
  project = Object.assign({}, project, {[groupsToUse[0].id]: `$_id.${groupsToUse[0].id}`});

  let groupBody = {};
  valueCols.forEach(element => {
    groupBody = Object.assign(
      {},
      groupBody,
      {
        [element.field]: {[`$${element.aggFunc}`]: `$${element.id}`}
      });
  });

  const pipeline = [
    {"$group": Object.assign({"_id": groupId}, groupBody)},
    {"$set": project},
    {"$unset": ["_id"]}
  ];
  
  return pipeline;
};


/*
Testdata
========

const rowGroupCols=[
  {
    "id": "_id",
    "displayName": "Customer",
    "field": "country"
  }
]

const groupKeys = [
]

const valueCols = [
    {
        "id": "accounts.balance",
        "aggFunc": "sum",
        "displayName": "Balance",
        "field": "balance"
    }
]

exports({rowGroupCols, groupKeys, valueCols})

*/