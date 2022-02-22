import jwt from 'jsonwebtoken';

export const generarJWT = (uid: string) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.JWT_KEY!, {
            expiresIn: '1d'
        }, (err, token) => {
            if (err) reject(err);

            resolve(token);
        });
    });
}

export const validaJWT = (token = '') => {
    try {
        const { uid }: any = jwt.verify(token, process.env.JWT_KEY!)

        return [true, uid]
    } catch (error) {
        return [false, null]
    }
}