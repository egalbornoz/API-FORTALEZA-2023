/********************************************************************************
 *  Importaciones  Configuración de la Base de Datos
 ********************************************************************************/
const { Sequelize } = require("sequelize");

/********************************************************************************
 *  Método para conectarse a la db
 ********************************************************************************/
//Configuración parametros de conexión

const sequelize = new Sequelize(
  process.env.SQL_DB,
  process.env.USER_SQL_DB,
  process.env.PASS_SQL_DB,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      idle: 10000,
    },
    logging: false,
  }
);

//Función de conexión y consulta
const dbConnection = async () => {
  try {
    await sequelize.sync();
    console.log("Base de datos SQL ONLINE");
  } catch (error) {
    console.log('NO SE PUDO CONECTAR CON LA BASE DE DATOS')
  }
};
/********************************************************************************
 *  Exportacion método dbConnection
 ********************************************************************************/
module.exports = {
  dbConnection,
  sequelize,
};
