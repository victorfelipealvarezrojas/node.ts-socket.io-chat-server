import { Schema, model, Model } from 'mongoose';

interface OrderAttrs {
    uid: string;
    nombre: string;
    email: number;
    password: string;
    online: boolean;
}

//lista de propiedades que tiene un usuario
interface userDocument extends Document {
    nombre: string;
    email: number;
    password: string;
    online: boolean;
}

//la lista de propiedades que contiene el propio modelo
interface UserModel extends Model<userDocument> {
    buildOrder(attrs: OrderAttrs): userDocument;
}

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    online: {
        type: Boolean,
        default: false
    }
});


UsuarioSchema.method('toJSON', function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

export const Usuario = model<userDocument,UserModel>('Usuario', UsuarioSchema);

