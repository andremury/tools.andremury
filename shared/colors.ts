function hueToRgb(p: number, q: number, t: number) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}

function hslToRgb(h: number, s: number, l: number) {
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hueToRgb(p, q, h + 1 / 3);
        g = hueToRgb(p, q, h);
        b = hueToRgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHex(rgb: [number, number, number]) {
    const r = Math.round(rgb[0]);
    const g = Math.round(rgb[1]);
    const b = Math.round(rgb[2]);

    return '#' + ((r << 8) | (g << 4) | b).toString(16).padStart(6, 'f');
}

function hexToRgb(hex: string = '#FFFFFF') {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) throw new Error('Invalid color');
    return {
        r: parseInt(result[1], 16) || 255,
        g: parseInt(result[2], 16) || 255,
        b: parseInt(result[3], 16) || 255
    }
}

function randomColor(as: 'rgb' | 'hsl' | 'hex') {
    const hue = Math.floor(Math.random() * 180);
    const sat = Math.floor(Math.random() * 100);
    const lig = 100 - Math.floor(Math.random() * 70);

    if (as === 'hsl') return `hsl(${hue}, ${sat}%, ${lig}%)`;
    const [r, g, b] = hslToRgb(hue / 180, sat / 100, lig / 100);

    if (as === 'rgb') return `rgb(${r}, ${g}, ${b})`;
    return rgbToHex([r, g, b]);
}

// def isLightOrDark(rgbColor=[0,128,255]):
//     [r,g,b]=rgbColor
//     hsp = math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))
//     if (hsp>127.5):
//         return 'light'
//     else:
//         return 'dark'

function isDarkColor(rgb: { r: number, g: number, b: number }) {
    const { r, g, b } = rgb;
    const hsp = Math.sqrt((0.299 * Math.pow(r, 2)) + 0.587 * Math.pow(g, 2) + 0.114 * (Math.pow(b, 2)));

    return hsp < 127.5
}

export const Colors = {
    randomColor, rgbToHex, hslToRgb, isDarkColor,
    hexToRgb
};

