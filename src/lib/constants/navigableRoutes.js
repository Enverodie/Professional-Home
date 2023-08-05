export const NAVIGABLE_ROUTES = ['/', '/software', '/creative', '/contact'];

// Gets the name of a route string of the format provided in NAVIGABLE_ROUTES
export function getRouteName(route) {
    route = route.split('/');
    route = route.reduce((previousValue, currentValue) => {
        if (previousValue) previousValue += ' - ';
        if (currentValue) return previousValue + (currentValue[0].toUpperCase() + currentValue.slice(1));
        else return previousValue;
    }, '');
    if (!route) return "Home";
    else return route;
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