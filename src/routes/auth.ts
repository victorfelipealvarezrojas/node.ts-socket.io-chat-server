/**
 * @path : api/login/
*/
import { Router } from "express";
import { check } from "express-validator";
import { autenticarUsuario, crearUsuario, renovarToken } from "../controllers/auth";
import { ValidarCampos } from "../middlewares/validar-campos";
import { ValidarToken } from "../middlewares/validar-jwt";

export const router = Router()

router.post('/new',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        ValidarCampos
    ], crearUsuario);

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        ValidarCampos
    ], autenticarUsuario);

router.get('/renew',
    [
        ValidarToken
    ], renovarToken);