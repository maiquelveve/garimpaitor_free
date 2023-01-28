require('dotenv').config({ path: '.env' });
module.exports = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_DATABASE,
    define: {
        timestamps: false,
        underscored: true,
        underscoredAll: true,
    },
    logging: false //FALSE NÃO MOSTRA AS QUERYS EXECUTADAS
}
