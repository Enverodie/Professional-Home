// allow these file types in img tags
export const imgFileTypes = ['.png', '.jpg', '.jpeg', '.svg'];
export const txtFileTypes = ['.txt'];

export function getFileExtension(fileName) {
    return fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase();
}