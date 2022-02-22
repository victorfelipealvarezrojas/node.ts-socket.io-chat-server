import { descoenctaUsuario, getUsuarios, setMensaje, usuarioConectado } from "../controllers/socket";
import { validaJWT } from "../helpers/jwt";

export class socketClass {
    private io: any;

    constructor(io: any) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', async (socketClient: any) => {

            const [valid, uid] = validaJWT(socketClient.handshake.query['x-socket-token']);

            if (!valid) {
                return socketClient.disconnect();
            }
            //actualizo el estado del uaurio a conectado
            await usuarioConectado(uid);

            //unir user a sala de chat(socket.io)
            socketClient.join(uid);//creo una sala por el uid del usuario

            socketClient.on('mensaje-personal', async (payload: any) => {
                const mensaje = await setMensaje(payload);
                this.io.to(payload.para).emit('mensaje-personal',mensaje);
                this.io.to(payload.de).emit('mensaje-personal',mensaje);
            });

            //usuarios conectados
            this.io.emit('list-users', await getUsuarios());

            //TODO disconnect
            socketClient.on('disconnect', async () => {
                //actualizo el estado del uaurio a desconectado
                await descoenctaUsuario(uid);
                //usuarios conectados actualuzados
                this.io.emit('list-users', await getUsuarios());
            });

        });
    }
}  