import express, { Express } from 'express';
import { Server, createServer } from 'http';
import { socketClass } from './socket';
import cors from 'cors';
import { dbConnection } from '../database/config';
import { router } from '../routes/auth';
import { router as mensajes } from '../routes/mensajes';
const socketio = require('socket.io');

export class serverClass {
    private app: Express;
    private port: string | undefined;
    private server: Server;
    private io: any;
    private socket: socketClass;

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        //connect DB
        dbConnection();
        this.app.use(cors());
        this.server = createServer(this.app);
        //configuracion de acceso al socket client
        this.io = socketio(this.server, {
            cors: {
                origin: 'http://localhost:3000',
                methods: ["GET", "POST"],
                allowedHeaders: ["my-custom-header"],
                credentials: true
            }
        });

        //socketClass toma el la conexion al socket client por medio del constructor 
        //y disponibiliza los distintos canales de eventos
        this.socket = new socketClass(this.io);
    }

    middlewares(): void {
        //this.app.use(express.static(path.resolve(__dirname, '../public')));
        //TODO Cors
        //parseo Body
        this.app.use(express.json());
        //API ENDPoints
        this.app.use('/api/login', router);
        this.app.use('/api/mensajes', mensajes);
    }

    execute(): void {
        this.middlewares();
        this.server.listen(this.port, () => {
            console.log('corriendo en el puero: ', this.port);
        });
    }

}