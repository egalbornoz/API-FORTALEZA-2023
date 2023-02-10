// **************************************************************
// * Modelo Estatus
// *************************************************************
const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/config-mssql");

const Estatu = sequelize.define("Estatu", {
  idestatus: {
    type: DataTypes.SMALLINT,
    primaryKey: true,
    autoIncrement: true,
  },
  
   nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  }
  });
module.exports = Estatu;
