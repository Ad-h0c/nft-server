import express, { ErrorRequestHandler, Response } from 'express';
import cors from 'cors';
import svg from './svg';
import metadata from './metadata';

export const BASE_URL = 'https://nft.thetamillion.com/';
export const WIDTH = 20;

export interface SpotData {
    x: number;
    y: number;
    width: number;
    height: number;
    tokenId: number;
}

function spotFromPath(path: string) {
    const split = path.split('-');
    const splitNums = split.map(e => parseInt(e, 10));
    if (split[0] !== 'spot' || split.length !== 6) {
        throw new Error('Invalid data');
    }
    const tokenId = splitNums[1];
    if (isNaN(tokenId) || tokenId < 0 || tokenId > 2500) {
        throw new Error('Invalid data');
    }
    for (let i = 2; i < 6; i += 1) {
        const val = splitNums[i];
        if (isNaN(val) || val < 0 || val > 50) {
            throw new Error('Invalid data');
        }
    }
    const spot: SpotData = {
        tokenId,
        x: splitNums[2],
        y: splitNums[3],
        width: splitNums[4],
        height: splitNums[5],
    };
    return spot;
}

(async () => {

    const app = express();
    app.disable('x-powered-by'); // disables header "X-Powered-By: Express"
    app.set('trust proxy', 1); // trust nginx reverse proxy
    
    app.use(cors({}));
    
    // for auth
    app.get('/', (req, res) => {
        res.setHeader('content-type', 'text/plain');
        res.send('');
    });

    app.get("/:path", (req, res, next) => {
        // res.setHeader('Cache-Control', 'public, max-age=86400'); // tell cloudflare to cache everything for some time
        const path = req.params.path;
        if (path.slice(-5) === '.json') {
            const spot = spotFromPath(path.slice(0, -4));
            res.json(metadata(spot));
        } else if (path.slice(-4) === '.svg') {
            const spot = spotFromPath(path.slice(0, -4));
            const svgString = svg(spot);
            res.setHeader('Content-Type', 'image/svg+xml');
            res.end(svgString);
        } else {
            next();
        }
    });

    app.all('*', function (req, res, next) {
        res.status(404).end('');
    });
    
    app.use(function errorHandler(err: Error, req, res, next) {
        res.status(400).end('');
    } as ErrorRequestHandler);
    
    app.listen(4101, '127.0.0.1', () => console.log('Webserver started'));
})();