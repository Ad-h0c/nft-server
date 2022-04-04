import { BASE_URL, SpotData, WIDTH } from '.';

export default function metadata(spot: SpotData) {
    const h = spot.height * WIDTH;
    const w = spot.width * WIDTH;
    const x = spot.x * WIDTH;
    const y = spot.y * WIDTH;
    return {
        image: `${BASE_URL}spot-${spot.tokenId}-${spot.x}-${spot.y}-${spot.width}-${spot.height}.svg`,
        external_url: BASE_URL,
        description: `Get your spot on ThetaMillion.com! The owner of this NFT controls the ${w}x${h} wide spot at (${x},${y}) on ThetaMillion.com. If you own this NFT you can change the title, image and URL for that spot.`,
        name: `ThetaMillion.com #${spot.tokenId}: ${w}x${h} at (${x},${y})`,
        attributes: [
            { "trait_type": "x", "value": x },
            { "trait_type": "y", "value": y },
            { "trait_type": "width", "value": w },
            { "trait_type": "height", "value": h },
            { "trait_type": "size", "value": (w * h) },
            { "trait_type": "edition", "value": spot.tokenId }
        ]
    }

}