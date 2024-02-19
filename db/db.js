const {MongoClient }=require("mongodb");
uri="mongodb+srv://ilyesnabi9:qQnTeBAvuprKW8d9@cluster0.nyufwoa.mongodb.net/?retryWrites=true&w=majority";
let dbConnection;

module.exports= {
  connectToDb: (cb)=> {
  MongoClient.connect(uri)
 .then((client)=> {
  dbConnection=client.db("Learning-DB");
  return cb();
 })
 .catch((err)=> {
  console.log(err);
  return cb(err);
 });
 },
  getDb: ()=>dbConnection,
};