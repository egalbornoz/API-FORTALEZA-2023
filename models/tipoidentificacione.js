const { sequelize } = require('../database/config-mssql');
const { DataTypes } =  require('sequelize');


const TipoIdentificacone = sequelize.define('TipoIdentificacione',{
   idtipoidentificacion:{
      primaryKey:true,
    type:DataTypes.TINYINT
   },
   codigo:{
    type:DataTypes.STRING(1)
   },
   descripcion:{
    type:DataTypes.STRING(100)
   }
});

module.exports = TipoIdentificacone;