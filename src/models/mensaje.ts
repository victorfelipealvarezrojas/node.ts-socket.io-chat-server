import { Schema, model } from 'mongoose';

const MensajeSchema = new Schema({
    de: {
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    },
    para: {
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    },
    mensaje: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

MensajeSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

export const Mensaje = model('Mensaje', MensajeSchema);