const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';

class dbhelper {
    constructor() {}

    submitVote(choice) {
        mongo.connect(url, (err, db) => {
            if (err) throw err;
            let reviewdb = db.db('re_view');
            let vote = {
                choice: choice,
                date: new Date() 
            };
            reviewdb.collection('reviews').insertOne(vote, (err, res) => {
                if (err) throw err;
                console.log('document inserted');
                db.close();
            })
        })
    }
}

module.exports = new dbhelper();