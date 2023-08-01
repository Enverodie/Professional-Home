import process from 'node:process';
import { MongoClient } from "mongodb";
import { USE_MONGODB, MONGO_CLUSTER, MONGO_USER, MONGO_PASS } from '$env/static/private';

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_CLUSTER}/?retryWrites=true&w=majority`;
const client = (USE_MONGODB.toString().toLowerCase() == 'true')? new MongoClient(uri) : null;

export function checkClientEnabled() {
    if (!client) throw new Error('Mongo connection does not exist.');
    return;
}

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

export const MongoCreativeLookup = new function() {
    
    // connect all _enum properties with respective index values in DB
    // DB format: [ <index#> <sub-index#> <sub-sub-index#> ... ]

    this.postType_enum = [
        {
            type: "image",
            subtypes: [
                {
                    type: "2d art",
                    subtypes: [

                    ]
                },
                {
                    type: "blender render",
                    subtypes: [

                    ]
                },
                {
                    type: "photo",
                    subtypes: [

                    ]
                },
                {
                    type: "minecraft build",
                    subtypes: [

                    ]
                },
            ]
        },
        {
            type: "text",
            subtypes: [
                {
                    type: "short story",
                    subtypes: [

                    ]
                },
                {
                    type: "poem",
                    subtypes: [

                    ]
                },
            ]
        }
    ];

    this.contentWarnings_enum = [
        "High language",
        "Mild violence",
        "Major violence",
    ];
}