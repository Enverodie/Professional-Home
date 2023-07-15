export const NAVIGABLE_ROUTES = ['/', '/Software', '/Creative', '/Contact'];

// Gets the name of a route string of the format provided in NAVIGABLE_ROUTES
export function getRouteName(route) {
    return route.slice(1) || "Home";
}

// A helper function to decide whether or not the provided cssClass should be applied
export function printClass(index, target, cssClass) {
    if (index === target) {
        return cssClass;
    }
    else return "";
}

// Solution provided by Teneff on StackOverflow:
// https://stackoverflow.com/a/7888303/15818885
export function splitPascalCase(string) {
    return string.split(/(?=[A-Z])/).join(' ');
}