import process from 'node:process';
import { MongoClient, ObjectId } from "mongodb";

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

// process.on('SIGINT', () => {console.log("Running MongoDB cleanup command"); cleanup();});
// process.on('SIGTERM', () => {console.log("Running MongoDB cleanup command"); cleanup();});
/* 
(node:2904) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 SIGTERM listeners added to [process]. Use emitter.setMaxListeners() to increase limit
(Use `node --trace-warnings ...` to show where the warning was created)
----it's my suspicion these lines are causing this warning.
*/

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

export const recommended = [new ObjectId('64b647a0ed17a4bdbcd1431a'), new ObjectId('64b6232fed17a4bdbcd14303'), new ObjectId('64c8acde00d8c6190f3058fa')];

// content restrictions
export const filter_removeInappropriate = { contentWarnings: { $nin: [0] } };

// type categories
export const filter_artworks = { 'type.0': 0, $or: [{ 'type.1': 0 }, { 'type.1': 1 }] };
export const filter_texts = { 'type.0': 1 };
export const filter_images = { 'type.0': 0, 'type.1': 2 }
export const filter_minecraft = { 'type.0': 0, 'type.1': 3 };

// type combinations
export const filter_artworkAndWriting = { $or: [filter_artworks, filter_texts] };
export const filter_personalPosts = { $or: [filter_images, filter_minecraft] };

export const projection_thumbnail = {
    _id: {
        $toString: "$_id",
    },
    postName: "$postName",
    dateCreated: "$dateCreated",
    dislikes: "$dislikes",
    likes: "$likes",
    description: "$shortDescription",
    fileName: "$fileName",
};
export const projection_post = {
    _id: {
        $toString: "$_id",
    },
    postName: "$postName",
    dateCreated: "$dateCreated",
    type: "$type",
    likes: "$likes",
    dislikes: "$dislikes",
    shortDescription: "$shortDescription",
    description: "$longDescription",
    fileName: "$fileName",
    comments: "$comments",
};

// get a mongodb aggregate function array corresponding to
// a combination of most recently posted and a few of the top liked
function topPostsAggregateFunction(maxItems, numTopLiked, matchFilter) {
    // code for creating a union: https://stackoverflow.com/a/55289023/15818885
    // how I learned to use $reduce: https://stackoverflow.com/a/60955249/15818885
    return [
        { $limit: 1 }, // Reduce the result set to a single document.
        { $project: { _id: 1 } }, // Strip all fields except the Id.
        { $project: { _id: 0 } }, // Strip the id. The document is now empty.

        // Lookup all collections to union together.
        {
            $lookup: {
                from: "posts",
                pipeline: [
                    { $match: {...matchFilter, ...filter_removeInappropriate} },
                    { $sort: { likes: -1, dislikes: 1, dateCreated: -1 } },
                    { $limit: numTopLiked },
                ],
                as: "Liked",
            },
        },
        {
            $lookup: {
                from: "posts",
                pipeline: [
                    { $match: { ...matchFilter, ...filter_removeInappropriate } },
                    { $sort: { dateCreated: -1 } },
                    { $limit: maxItems },
                ],
                as: "Recent",
            },
        },

        // Merge the collections together.
        {
            $project: {
                Union: {
                    $reduce: {
                        input: { $concatArrays: ["$Liked", "$Recent"] },
                        initialValue: [],
                        in: {
                            $cond: [
                                { $in: ["$$this._id", "$$value._id"] },
                                "$$value",
                                { $concatArrays: ["$$value", ["$$this"]] }
                            ]
                        }
                    }
                },
            },
        },

        { $unwind: "$Union" }, // Unwind the union collection into a result set.
        { $replaceRoot: { newRoot: "$Union" } }, // Replace the root to cleanup the resulting documents.
        { $limit: maxItems },
        { $sort: { dateCreated: -1 } },
        { $project: projection_thumbnail },
    ];
}

export const MIN_SEARCH_CHARS = 2;

export function searchAggregateFunction(string, limit, project=true) {

    let returnArray = [
        {
            $search:
            {
                index: "search_posts",
                compound: {
                    should: [
                        {
                            autocomplete: {
                                query: string,
                                path: "postName",
                                tokenOrder: "any",
                                fuzzy: {
                                    maxEdits: 1,
                                    prefixLength: 1,
                                    maxExpansions: 256,
                                },
                            },
                        },
                        {
                            phrase: {
                                query: string,
                                path: [
                                    "postName",
                                    "shortDescription",
                                ],
                                slop: 5,
                            },
                        },
                        {
                            text: {
                                query: string,
                                path: [
                                    "postName",
                                    "shortDescription",
                                ],
                                fuzzy: {
                                    prefixLength: 2,
                                },
                            },
                        },
                    ],
                },
            },
        }
    ];
    if (limit) returnArray.push({$limit: limit});
    if (project) returnArray.push({$project: projection_thumbnail});
    return returnArray;
}

// queries mongodb database for a combination of most recently posted and top liked
export const getTopPosts = async (maxItems, numTopLiked, matchFilter) => {
    console.log("getting top posts...");
    checkClientEnabled();
    let db = await client.db('creative_works');
    let data = await db.collection('posts').aggregate(topPostsAggregateFunction(maxItems, numTopLiked, matchFilter)).toArray();
    return data;
}

// queries mongodb database for all the specific ObjectIDs in array order
export const getPostsByID = async (idArray) => {
    checkClientEnabled();
    let db = await client.db('creative_works');
    let data = await db.collection('posts').aggregate([
        {$match: {"_id": {$in: idArray}}},
        {$addFields: {"__order": {$indexOfArray: [idArray, "$_id" ]}}},
        {$sort: {"__order": 1}},
        {$project: projection_thumbnail}
    ]).toArray();
    return data;
}

export const getAllPosts = async (filters, sorting, pageNumber, searchQuery) => {
    checkClientEnabled();
    let db = await client.db('creative_works');
    let aggregateArray = [];
    let useSearchQuery = searchQuery && searchQuery.length > MIN_SEARCH_CHARS;
    if (useSearchQuery) aggregateArray.push(...searchAggregateFunction(searchQuery, undefined, false));
    if (filters) aggregateArray.push({$match: filters});
    if (sorting && !useSearchQuery) aggregateArray.push({$sort: sorting});
    /*
    aggregateArray.push({$addFields: {'totalCount' : }})
    if (pageNumber) {
        aggregateArray.push({$addFields: {

        }})
        aggregateArray.push({$skip: {
    
        }})
    } 
    */
    aggregateArray.push({$project: projection_thumbnail});

    let data = await db.collection('posts').aggregate(aggregateArray).toArray();
    return data;
}