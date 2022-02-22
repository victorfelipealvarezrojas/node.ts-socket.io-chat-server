import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN_STRING!,{});
        console.log("DB ONLINE");
    } catch (error) {
        console.log(error)
        throw new Error(`Eror en base de datos ${error}`);
    }
}