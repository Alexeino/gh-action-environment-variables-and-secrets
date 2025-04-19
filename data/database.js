import { MongoClient } from 'mongodb';

const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

const uri = `mongodb+srv://${dbUser}:${encodeURIComponent(dbPassword)}@${clusterAddress}/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri);

let database;

async function initMongo() {
  console.log('Trying to connect to db');

  try {
    await client.connect();
    await client.db(dbName).command({ ping: 1 });
    console.log('Connected successfully to server');
    database = client.db(dbName);
  } catch (error) {
    console.error('Connection failed.', error);
    await client.close();
    console.log('Connection closed.');
    process.exit(1); // stop app if DB is unavailable
  }
}

await initMongo(); // only top-level await in ES modules

export default database;
