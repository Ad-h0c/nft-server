import { SpotData, WIDTH } from '.';

export default function svg(spot: SpotData) {
    return `<svg width="1000" height="1140" viewBox="0 0 1000 1140" xmlns="http://www.w3.org/2000/svg" style="background:#005f73;">
<style>text {font:bold 45px sans-serif;fill:#fff;} .small {font: bold 30px sans-serif;fill:#fff;}</style>
<text x="20" y="60">ThetaMillion.com</text>
<text x="980" y="60" text-anchor="end">#${spot.tokenId}</text>
<svg x="10" y="90" width="980" height="980" viewBox="0 0 1001 1001">
<defs>
<pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
<path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94d2bd" stroke-width="2"/>
</pattern>
</defs>
<rect width="1001" height="1001" fill="#005f73" />
<rect width="1001" height="1001" fill="url(#grid)" />
<rect x="${spot.x * WIDTH}" y="${spot.y * WIDTH}" width="${spot.width * WIDTH}" height="${spot.height * WIDTH}" fill="#ee9b00" />
</svg>
<text x="20" y="1115" class="small">Size ${spot.width * WIDTH}x${spot.height * WIDTH}</text>
<text x="980" y="1115" class="small" text-anchor="end">Position (${spot.x * WIDTH},${spot.y * WIDTH})</text>
</svg>`;
}