/**
 * @path : api/mensajes
*/
import { Router } from "express";
import { obtenerChat } from "../controllers/mensajes";
import { ValidarToken } from "../middlewares/validar-jwt";

export const router = Router();

router.get('/:de',
    [
        ValidarToken
    ], obtenerChat);