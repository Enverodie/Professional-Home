import process from 'node:process';
import { MongoClient } from "mongodb";
import { USE_MONGODB, MONGO_CLUSTER, MONGO_USER, MONGO_PASS } from '$env/static/private';

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_CLUSTER}/?retryWrites=true&w=majority`;
const client = (USE_MONGODB.toString().toLowerCase() == 'true')? new MongoClient(uri) : null;

// export function mongodb_connect() {
//     console.log("Connecting to MongoDB...");
//     if (USE_MONGODB == 'true') return client.connect();
//     else throw new Error('.env variable USE_MONGODB disabled');
// }

function mongodb_disconnect() {
    console.log("Disconnecting from MongoDB...");
    return client.close();
}

function cleanup() {
    if (client !== null) mongodb_disconnect()
        .then(() => {console.log("Successfully closed MongoDB connection"); process.exit(0)})
        .catch((e) => {console.error("Failed to close MongoDB connection: " + e.message); process.exit(1)});
}

process.on('SIGINT', () => {console.log("Running MongoDB cleanup command"); cleanup();});
process.on('SIGTERM', () => {console.log("Running MongoDB cleanup command"); cleanup();});

export default client;