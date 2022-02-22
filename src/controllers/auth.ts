import bcrypt from 'bcryptjs';
import { Usuario } from "../models/usuario";
import { generarJWT } from "../helpers/jwt";

export const crearUsuario = async (reques: any, response: any) => {
    try {
        const { email, password } = reques.body;

        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) return response.status(400).json({
            ok: false,
            msg: 'No puede registrar un usario existente'
        });

        const usuario = new Usuario(reques.body);
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generarJWT(usuario._id.toString());

        response.json({
            usuario,
            token
        });

    } catch (error) {
        response.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

export const autenticarUsuario = async (reques: any, response: any) => {
    try {
        const { email, password } = reques.body;

        const usr = await Usuario.findOne({ email });

        if (!usr) return response.status(404).json({
            ok: false,
            msg: 'Usuario no encontardo'
        });

        const validPass = bcrypt.compareSync(password, usr.password);
        if (!validPass) return response.status(404).json({
            ok: false,
            msg: 'Password no es correcto'
        });

        const token = await generarJWT(usr._id.toString());

        response.json({
            ok: true,
            usr,
            token
        });

    } catch (error) {
        response.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

export const renovarToken = async (reques: any, response: any) => {
    try {
        const { uid } = reques.uid;
        const token = await generarJWT(uid);

        const usr = await Usuario.findById(uid);

        response.json({
            ok: true,
            usr,
            token
        });

    } catch (error) {
        response.status(500).json({
            ok: false,
            msg: "Error"
        });
    }
}