const {MongoClient }=require("mongodb");
// const uri ="mongodb+srv://ilyesnabi9:y0jr9NPwNLSr109z@cluster0.nyufwoa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
let dbConnection;

module.exports= {
  connectToDb: (cb)=> {
  MongoClient.connect(uri)
 .then((client)=> {
  dbConnection=client.db("code213");
  return cb();
 })
 .catch((err)=> {
  console.log(err);
  return cb(err);
 });
 },
  getDb: ()=>dbConnection,
};