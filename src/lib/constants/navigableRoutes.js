export const NAVIGABLE_ROUTES = ['/', '/software', '/creative', '/contact'];

// Gets the name of a route string of the format provided in NAVIGABLE_ROUTES
export function getRouteName(route) {
    return (route[1] && (route[1].toUpperCase() + route.slice(2))) || "Home";
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