import mongoclient, { checkClientEnabled } from '$db/mongo';

const getSearchQuery = async function(url) {
    console.log("getting search query results...");
    let searchString = url.searchParams.get('q');
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