import { redirect } from "@sveltejs/kit"
import { ObjectId } from "mongodb";
import mongoclient, { checkClientEnabled, MongoCreativeLookup, projection_post } from '$db/mongo.js';

async function loadFromDB(url) {
    let id = url.searchParams.get('id');
    if (!id) throw redirect(307, '/creative');
    checkClientEnabled();
    let db = await mongoclient.db('creative_works');
    let dataResults = await db.collection('posts').aggregate([
        { $match: { _id: new ObjectId(id) } },
        { $project: projection_post }
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