const getSearchQuery = async (url) => {
    console.log("called getSearchQuery...");
    console.log(url);
}

export const load = ({ url }) => {
    
    console.log("ran load in page.server.js");
    
    return {
        streamedPage: {
            getSearchQuery: new Promise(
                (res, rej) => {getSearchQuery(url.searchParams)
                    .then(response => {res(response)})
                    .catch(err => {rej(err)})
                }),
        }
    }
}