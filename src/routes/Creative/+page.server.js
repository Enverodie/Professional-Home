import mongoclient, { checkClientEnabled, searchAggregateFunction } from '$db/mongo';

const getSearchQuery = async function(url) {

    const minInputLength = 2;

    console.log("getting search query results...");
    let searchString = url.searchParams.get('q');
    if (!searchString || searchString.length < minInputLength) return {};
    checkClientEnabled();
    let db = await mongoclient.db('creative_works');
    let data = await db.collection('posts').aggregate(searchAggregateFunction(searchString, 6)).toArray();
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