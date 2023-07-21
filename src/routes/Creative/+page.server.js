import mongoclient, { mongodb_connect, mongodb_disconnect } from '$db/mongo';

export const load = async function({ params }) {

    let dbResponse = {};

    try {
        await mongodb_connect();
        let db = await mongoclient.db('creative_works');
        // let postTypeCollection = await db.collection('postType_enum');
        let topPosts = await db.collection('posts').aggregate([
            { $sort: { dateCreated: -1} },
            { $limit: 5 }
        ]).toArray();
        console.log(topPosts);
        dbResponse.connected = true;
    }
    catch (e) {
        console.error(e);
        dbResponse.connected = false;
    }
    finally {
        mongodb_disconnect();
        return {
            props: { dbResponse }
        };
    }
}