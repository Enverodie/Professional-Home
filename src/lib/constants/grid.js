export const SQUARE_IMG_SIZE = 55;
export const SQUARE_IMG_WHITESPACE = 3;

export const createBackgroundGridImage = (hexColor) => {
    return `data:image/svg+xml;utf8,<svg width="55" height="56" viewBox="0 0 55 56" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4.30762" width="47" height="47" stroke="${hexColor}" stroke-width="2"/></svg>`;
}