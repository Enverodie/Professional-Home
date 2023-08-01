import mongoclient, { checkClientEnabled } from '$db/mongo';

function aggregateSearch(string) {
    return [
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
        },
        { $match: { contentWarnings: { $nin: [0] } }},
        { $limit: 6 },
        {
            $project:
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

const getSearchQuery = async function(url) {

    const minInputLength = 2;

    console.log("getting search query results...");
    let searchString = url.searchParams.get('q');
    if (!searchString || searchString.length < minInputLength) return {};
    checkClientEnabled();
    let db = await mongoclient.db('creative_works');
    let data = await db.collection('posts').aggregate(aggregateSearch(searchString)).toArray();
    return data;
}

export const load = ({ url }) => {
    
    console.log("ran load in page.server.js");
    
    return {
        streamedPage: {
            searchResults: new Promise(
                (res, rej) => {getSearchQuery(url)
                    .then(response => {res(response)})
                    .catch(err => {rej(err)})
                }),
        }
    }
}