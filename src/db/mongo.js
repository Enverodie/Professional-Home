import { MongoClient } from "mongodb";
import { MONGO_CLUSTER, MONGO_USER, MONGO_PASS } from '$env/static/private';

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_CLUSTER}/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

export function mongodb_connect() {
    console.log("Connecting to MongoDB...");
    return client.connect();
}

export function mongodb_disconnect() {
    console.log("Disconnecting from MongoDB...");
    return client.close();
}

export default client;