const mongoose = require('mongoose');

const dbConecction = async() => {
    try {
        await mongoose.connect(process.env.DB_CNX, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('Base de Datos Online:');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectarse a la DB');
    }
};

module.exports = {
    dbConecction,
};