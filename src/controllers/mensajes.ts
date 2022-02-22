import { Mensaje } from "../models/mensaje";

export const obtenerChat = async (reques: any, response: any) => {
    try {
        const { uid } = reques.uid;
        const msgDe = reques.params.de;

        const last30 = await Mensaje.find({
            $or: [
                { de: uid, para: msgDe },
                { de: msgDe, para: uid }
            ]
        })
            .sort({ createdAt: 'asc' })
            .limit(30);

        response.json({
            ok: true,
            uid,
            msj: last30
        });

    } catch (error) {
        response.status(500).json({
            ok: false,
            msg: "Error"
        });
    }
}