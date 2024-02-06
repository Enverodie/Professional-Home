import { getTopPosts, getPostsByID, filter_artworkAndWriting, filter_personalPosts, recommended } from '$db/mongo';

export const load = function({url}) {

    console.log("ran load in layout.server.js");

    let streamed = {};

    // ONLY if our pathname is the root of /creative do we load the data for that page
    if (url.pathname === '/creative') streamed = {
        topPostsPrimary: new Promise(
            (resolve, reject) => {
                getTopPosts(21, 4, filter_artworkAndWriting)
                    .then(response => { resolve(response) })
                    .catch(e => reject(e));
            }),
        recommendedPosts: new Promise(
            (resolve, reject) => {
                getPostsByID(recommended)
                    .then(response => { resolve(response) })
                    .catch(e => reject(e));
            }),
        topPostsPersonal: new Promise(
            (resolve, reject) => {
                getTopPosts(6, 2, filter_personalPosts)
                    .then(response => { resolve(response) })
                    .catch(e => reject(e));
            }),
    }

    return {
        streamed,
    }
}