// **************************************************************
// * Modelo Departamento
// *************************************************************
const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/config-mssql");

const Departamento = sequelize.define("Departamento", {
  iddepartamento: {
    type: DataTypes.TINYINT,
    primaryKey: true,
    autoIncrement: true,
  },
   nombre: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
   
  activo: {
    type: DataTypes.BOOLEAN,
  },
});

module.exports = Departamento;
