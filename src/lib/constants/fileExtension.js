// allow these file types in img tags
export const allowedFileTypes = ['.png', '.jpg', '.jpeg', '.svg'];

export function getFileExtension(fileName) {
    return fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase();
}