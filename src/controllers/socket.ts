import { Mensaje } from "../models/mensaje";
import { Usuario } from "../models/usuario"

export const usuarioConectado = async (uid: string) => {
    const usuario = await Usuario.findById(uid);
    usuario!.online = true;
    await usuario!.save();

    return usuario;

}

export const descoenctaUsuario = async (uid: string) => {
    const usuario = await Usuario.findById(uid);
    usuario!.online = false;
    await usuario!.save();

    return usuario;

}


export const getUsuarios = async () => {
    const usuarios = await Usuario
        .find()
        .sort('-online')

    return usuarios;
}

export const setMensaje = async (payload:any) => {
   try {
       console.log(payload)
       const msg = new Mensaje(payload);
       await msg.save(msg);
       return msg;
       
   } catch (error) {
       console.log(error)
       return false;
   }
}
