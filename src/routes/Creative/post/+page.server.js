import { URL } from "node:url";
import { redirect } from "@sveltejs/kit"
import mongoclient, { checkClientEnabled } from '$db/mongo.js';
import { ObjectId } from "mongodb";
import { txtFileTypes, getFileExtension } from "$lib/constants/fileExtension";
import { readFileSync } from 'node:fs';

// function getStringFromFile(fileName, url) {
//     console.log('file://' + url.host + '/creativePosts/' + fileName);
//     let fileURL = new URL('file://' + url.host + '/creativePosts/' + fileName);
//     if (txtFileTypes.includes(getFileExtension(fileName))) return readFileSync(fileURL); // convert text files to raw string
//     else return null;
// }

async function loadFromDB(url) {
    let id = url.searchParams.get('id');
    if (!id) throw redirect(307, '/creative');
    checkClientEnabled();
    let db = await mongoclient.db('creative_works');
    let results = await db.collection('posts').aggregate([
        { $match: { _id: new ObjectId(id) } }, 
        { $project: {
            _id: {
                $toString: "$_id",
            },
            postName: "$postName",
            dateCreated: "$dateCreated",
            type: "$type",
            likes: "$likes",
            dislikes: "$dislikes",
            description: "$longDescription",
            fileName: "$fileName",
            comments: "$comments",
        }}
    ]).toArray();
    let result = results[0];
    // if (typeof result.fileName === 'object') result.fileData = result.fileName.map(item => {getStringFromFile(item)});
    // else result.fileData = getStringFromFile(result.fileName, url);
    // console.log(result);
    return result; // it's safe to return index 0 since we're matching by PK
}

export const load = async ({ url }) => {
    console.log(url);
    return {
        postData: await loadFromDB(url),
    }
}