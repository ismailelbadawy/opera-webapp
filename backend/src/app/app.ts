import express = require('express');
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express-serve-static-core';
import * as path from 'path';

const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    'jpeg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
];

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: any[], port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);

        this.mongoSetup();
        this.serveAngular();
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }

    private initializeControllers(controllers: any[]) {
        controllers.forEach((controller) => {
            this.app.use('/api', controller.router);
        });
    }

    private mongoSetup(): void {
        
    }

    private serveAngular(): void {
        this.app.get('*', (req: Request, res: Response) => {
            if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
                res.sendFile(path.resolve(`dist/icteam/${req.url}`));
            } else {
                res.sendFile(path.resolve('dist/icteam/index.html'));
            }
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;