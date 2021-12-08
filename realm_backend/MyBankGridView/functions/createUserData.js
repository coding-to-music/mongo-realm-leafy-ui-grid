exports = async function(authEvent) {
  const mongodb = context.services.get("mongodb-atlas");
  const customers = mongodb.db("mybank").collection("users");
  const { user, time } = authEvent;
  const newUser = { ...user, eventLog: [ { "created": time } ] };
  await customers.insertOne(newUser);
}