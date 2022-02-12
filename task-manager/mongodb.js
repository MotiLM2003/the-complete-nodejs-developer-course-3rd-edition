// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectId;

const { MongoClient, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';

const id = new ObjectId();
console.log(id.id);
console.log(id.getTimestamp());

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log('unable to connect.');
    }
    console.log('connected');
    const db = client.db(dbName);
    // db.collection('users').insertOne(
    //   { name: 'moti', age: 43 },
    //   (error, result) => {
    //     if (error) {
    //       return console.log('Unable to insert user');
    //     }

    //     console.log(result.insertedId);
    //   }
    // );

    // db.collection('users').insertMany(
    //   [
    //     { name: 'Moti', age: 42 },
    //     { name: 'Rami', age: 43 },
    //   ],
    //   (error, result) => {
    //     console.log(result);
    //   }
    // );
  }
);
