import { createCanvas } from "canvas";

export const SQUARE_IMG_SIZE = 55;
export const SQUARE_IMG_WHITESPACE = 3;

export const createBackgroundGridImage = (hexColor) => {
    let image = createCanvas(SQUARE_IMG_SIZE, SQUARE_IMG_SIZE);
    let ctx = image.getContext('2d');
    ctx.lineWidth = 2;
    ctx.strokeStyle = hexColor;
    ctx.strokeRect(
        SQUARE_IMG_WHITESPACE+1, 
        SQUARE_IMG_WHITESPACE+1, 
        (SQUARE_IMG_SIZE - (2*SQUARE_IMG_WHITESPACE) - 2), 
        (SQUARE_IMG_SIZE - (2*SQUARE_IMG_WHITESPACE) - 2));
    return image.toDataURL();
}