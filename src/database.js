const MongoClient = require("mongodb").MongoClient;
require('dotenv').config()

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri);

module.exports = async function run() {
    try {
        await client.connect();
        const database = client.db('markers')
        const markers = database.collection('marker')
        return markers;
    } catch {
        (console.dir)
    }

}