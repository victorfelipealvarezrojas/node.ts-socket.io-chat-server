import jwt from "jsonwebtoken";

export const ValidarToken = (request: any, response: any, next: any) => {
    try {
        const token = request.header('x-token');

        if (!token) return response.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });

        request.uid = jwt.verify(token, process.env.JWT_KEY!);

        next();

    } catch (e) {
        return response.status(401).json({
            ok: false,
            msg: 'Token no es correcto'
        });
    }
}