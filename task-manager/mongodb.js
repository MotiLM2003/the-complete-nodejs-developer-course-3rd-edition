// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectId;

const { MongoClient, ObjectId } = require('mongodb');

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

    db.collection('taskes')
      .deleteOne({ description: 'Clean the house' })
      .then((result) => {
        console.log('result', result);
      })
      .catch((error) => {
        console.log('error', error);
      });

    // db.collection('users')
    //   .deleteMany({ age: 43 })
    //   .then((result) => {
    //     console.log('result', result);
    //   })
    //   .catch((error) => {
    //     console.log('error', error);
    //   });

    // db.collection('taskes')
    //   .updateMany(
    //     {
    //       completed: false,
    //     },
    //     {
    //       $set: { completed: true },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   });

    // const updatePromise = db
    //   .collection('users')
    //   .updateOne(
    //     { _id: new ObjectId('6207c2f014f92008b4820787') },
    //     { $inc: { age: 1 } }
    //   );

    // updatePromise
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // db.collection('taskes')
    //   .insertMany([
    //     { description: 'Clean the house', completed: true },
    //     { description: 'Renew insepection', completed: false },
    //     { description: 'Pot plants', completed: false },
    //   ])
    //   .then((result) => {
    //     console.log(result);
    //   });

    // 6207c2f014f92008b4820787

    // // db.collection('users').insertOne(
    // //   { name: 'Moti', age: 43 },
    // //   (error, result) => {
    // //     if (error) {
    // //       return console.log('Unable to insert user');
    // //     }

    // //     console.log(result.insertedId);
    // //   }
    // // );

    // // db.collection('users').findOne(
    // //   { _id: new ObjectId('6207c2f014f92008b4820787') },
    // //   (error, result) => {
    // //     console.log(result);
    // //   }
    // // );

    // db.collection('users')
    //   .find({ age: 43 })
    //   .count((error, users) => {
    //     console.log(users);
    //   });
  }
);
