import { redirect } from "@sveltejs/kit"
import mongoclient, { checkClientEnabled, MongoCreativeLookup } from '$db/mongo.js';
import { ObjectId } from "mongodb";

async function loadFromDB(url) {
    let id = url.searchParams.get('id');
    if (!id) throw redirect(307, '/creative');
    checkClientEnabled();
    let db = await mongoclient.db('creative_works');
    let dataResults = await db.collection('posts').aggregate([
        { $match: { _id: new ObjectId(id) } },
        {
            $project: {
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
            }
        }
    ]).toArray();
    let result = dataResults[0];
    let objectAtCurrentDepth = {subtypes: MongoCreativeLookup.postType_enum};
    result.typeName = result.type.map(index => {
        objectAtCurrentDepth = objectAtCurrentDepth.subtypes[index];
        return objectAtCurrentDepth.type;
    });
    return result; // it's safe to return index 0 since we're matching by PK
}

export const load = async ({ url }) => {
    return {
        postData: await loadFromDB(url),
    }
}