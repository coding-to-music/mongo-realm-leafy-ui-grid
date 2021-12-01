exports = function(changeEvent) {
  const { fullDocument, documentKey } = changeEvent;
  const totalBalance = fullDocument.accounts.map(account => account.balance).reduce((balance, a) => balance + a, 0);
  
  const collection = context.services.get("mongodb-atlas").db("mybank").collection("customerSingleView");
  return collection.updateOne({ _id: documentKey._id }, {"$set": {totalBalance}});
};
