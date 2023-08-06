import { getAllPosts } from "$db/mongo.js";
export const load = function ({url}) {

    // filters
    const categories = [
        { value: 'Blender projects', active: false },
        { value: 'Other art', active: false },
        { value: 'Short stories', active: false },
        { value: 'Poems', active: false },
        { value: 'Photos', active: false },
        { value: 'Gaming', active: false },
    ];
    const sortBy = [
        { value: 'recent', active: false },
        { value: 'liked', active: false }
    ];

    const sortLiked = { likes: -1, dislikes: 1 };
    const sortRecent = { dateCreated: -1 };

    let query = url.searchParams.get('q');
    let resetPagination = url.searchParams.get('rp');
    let pageNumber = parseInt(url.searchParams.get('p'));
    let categoryIndex = url.searchParams.get('c');
    let sortByIndex = parseInt(url.searchParams.get('s'));

    // sanitization & application
    
    // assert whether pagination needs to be reset
    if (resetPagination === 't') resetPagination = true;
    else resetPagination = false;

    // assert pagination
    if (!(Number.isSafeInteger(pageNumber) && pageNumber > 0) || resetPagination) pageNumber = 1;

    // assert categories
    if (typeof categoryIndex === 'string') {
        // make sure each category param is valid and set active if so
        categoryIndex.split(',').forEach(item => {
            item = parseInt(item);
            if (Number.isSafeInteger(item) && item >= 0 && item < categories.length) {
                categories[item].active = true;
            }
        })
    }
    else categories.forEach(category => {category.active = true});
    
    let accumulatedCategories = [];
    categories.forEach(category => {
        if (!category.active) return;
        switch(category.value) {
            case 'Blender projects':
                accumulatedCategories.push({'type.0': 0, 'type.1': 1});
                return;
            case 'Other art':
                accumulatedCategories.push({'type.0': 0, 'type.1': 0});
                return;
            case 'Short stories':
                accumulatedCategories.push({'type.0': 1, 'type.1': 0});
                return;
            case 'Poems':
                accumulatedCategories.push({'type.0': 1, 'type.1': 1});
                return;
            case 'Photos':
                accumulatedCategories.push({'type.0': 0, 'type.1': 2});
                return;
            case 'Gaming':
                accumulatedCategories.push({'type.0': 0, 'type.1': 3});
                return;
            default:
                return;
        }
    })
    if (accumulatedCategories.length > 0) accumulatedCategories = {$or: accumulatedCategories};
    else accumulatedCategories = {};

    // assert sorting method
    // 0 is the default, so if we didn't understand the input or didn't get any set to the default
    if (!(Number.isSafeInteger(sortByIndex) && sortByIndex >= 0 && sortByIndex < sortBy.length)) sortByIndex = 0;
    sortBy[sortByIndex].active = true;

    let accumulatedSort = { $sort: { likes: -1, dislikes: 1, dateCreated: -1 } };
    switch(sortBy[sortByIndex].value) {
        case 'recent':
            accumulatedSort = sortRecent
            break;
        case 'liked':
            accumulatedSort = {...sortLiked, ...sortRecent};
            break;
        default:
            accumulatedSort = sortRecent;
            break;
    }

    return {
        categories,
        sortBy,
        pageNumber,
        streamed: {
            allPosts: new Promise((resolve, reject) => {
                getAllPosts(accumulatedCategories, accumulatedSort, pageNumber, query)
                    .then(response => {resolve(response)})
                    .catch(error => {reject(error)});
            })
        }
    }
}