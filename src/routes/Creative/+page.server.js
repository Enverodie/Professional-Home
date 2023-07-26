import mongoclient from '$db/mongo';

const maxItems2DRenders = 6;
const numLiked2DRenders = 2;

const maxItemsTexts = 6;
const numLikedTexts = 2;

const maxItemsPersonal = 6;
const numLikedPersonal = 2;

const matchFilterArtworks = { 'type.0': 0, $or: [{ 'type.1': 0 }, { 'type.1': 1 }] };
const matchFilterTexts = { 'type.0': 1 };
const matchFilterPersonal = { 'type.0': 0, $or: [{ 'type.1': 2 }, { 'type.1': 3 }] };

function checkClientEnabled() {
    if (!mongoclient) throw new Error('Mongo connection does not exist.');
    return;
}

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
                    { $match: matchFilter },
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
                    { $match: matchFilter },
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
        { $project: 
            {
                _id: {
                    $toString: "$_id",
                },
                postName: "$postName",
                dateCreated: "$dateCreated",
                dislikes: "$dislikes",
                likes: "$likes",
                description: "$shortDescription",
                fileName: "$fileName",
            }
        },
    ];
}

const getTopPosts = async (maxItems, numTopLiked, matchFilter) => {
    console.log("getting top posts...");
    let topPosts = { successful: false };
    try {
        checkClientEnabled();
        let db = await mongoclient.db('creative_works');
        let data = await db.collection('posts').aggregate(topPostsAggregateFunction(maxItems, numTopLiked, matchFilter)).toArray();
        topPosts.data = data;
        topPosts.successful = true;
    }
    catch (e) {
        console.error(e);
        topPosts.errorMsg = e.message;
    }
    finally {
        return topPosts;
    }
}

const getSearchResults = async (query) => {
    let results = { successful: false };
    try {
        checkClientEnabled();
        let db = await mongoclient.db('creative_works');
        let data;// = await db.collection('posts').find(); // TODO: finish this query
        results.data = data;
        results.successful = true;
    }
    catch (e) {
        console.error(e);
        results.errorMsg = e.message;
    }
    finally {
        return results;
    }
}

export const load = async function({ url, depends, cookies }) {

    // console.log("url: ", url, 'searchparams q: ', url.searchParams.get('q'));

    // depends('app:postSearched');

    return {
        topPosts2DRenders: getTopPosts(maxItems2DRenders, numLiked2DRenders, matchFilterArtworks),
        topPostsTexts: getTopPosts(maxItemsTexts, numLikedTexts, matchFilterTexts),
        topPostsPersonal: getTopPosts(maxItemsPersonal, numLikedPersonal, matchFilterPersonal),
        searchResults: getSearchResults(url.searchParams.get('q')),
    }
}