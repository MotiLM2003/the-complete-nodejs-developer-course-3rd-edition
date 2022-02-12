const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const connectionURL = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log('unable to connect.');
    }
    console.log('connected');
    const db = client.db(dbName);
    db.collection('users').insertOne({ name: 'moti', age: 43 });
  }
);
