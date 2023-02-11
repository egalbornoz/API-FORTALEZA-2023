// **************************************************************
// * Modelo Usuario
// *************************************************************
const { DataTypes } = require('sequelize');
const { sequelize } = require("../database/config-mssql");
const   Estatu    = require('./estatu');
 const Departamento = require("./departamento");

 const Usuario = sequelize.define("Usuario", {
  idusuario: {
    type: DataTypes.TINYINT,
    primaryKey: true,
    autoIncrement: true,
  },
  idusuarioultimo: {
    type: DataTypes.TINYINT,
  },
   cedula: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
   nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
   apellido: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
   usuario: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
   clave: {
    type: DataTypes.STRING(44),
    allowNull: false,
  },
   claveweb: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  idestatus: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  nivel: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
  iddepartamento: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
});

// ForeignKey Uauarios - Estatus
Usuario.belongsTo(Estatu, { foreignKey: "idestatus" });
Estatu.hasMany(Usuario, { foreignKey: "idestatus" });

// ForeignKey Usuarios - Estatus
Usuario.belongsTo(Departamento, { foreignKey: "iddepartamento" });
Departamento.hasMany(Usuario, { foreignKey: "iddepartamento" });
module.exports = Usuario;
