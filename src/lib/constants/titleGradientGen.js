export function titleGradientGenerator(workedTitle) {
    while (workedTitle.length < 3) workedTitle += ' ';
    const hexOptions = 256;
    const strlen = 5;
    let numString0 = workedTitle.split('').filter((item, i) => {return i % 3 === 0}).reduce((accumulator, currentItem) => accumulator += currentItem.charCodeAt(0), '');
    let numString0Reversed = numString0.split('').reverse().join('');
    
    let numString1 = workedTitle.split('').filter((item, i) => {return i % 3 === 1}).reduce((accumulator, currentItem) => accumulator += currentItem.charCodeAt(0), '');
    let numString1Reversed = numString1.split('').reverse().join('');
    
    let numString2 = workedTitle.split('').filter((item, i) => {return i % 3 === 2}).reduce((accumulator, currentItem) => accumulator += currentItem.charCodeAt(0), '');
    let numString2Reversed = numString2.split('').reverse().join('');

    let rgbFrom = `rgb(${numString0Reversed.substring(0, strlen) % hexOptions}, ${numString1Reversed.substring(0, strlen) % hexOptions}, ${numString2Reversed.substring(0, strlen) % hexOptions})`;
    let rgbTo = `rgb(${numString0.substring(0, strlen) % hexOptions}, ${numString1.substring(0, strlen) % hexOptions}, ${numString2.substring(0, strlen) % hexOptions})`;

    return { rgbFrom, rgbTo };
}