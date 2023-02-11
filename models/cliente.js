// **************************************************************
// * Modelo Cliente
// *************************************************************
const { sequelize } = require('../database/config-mssql');
const { DataTypes } = require('sequelize');
const TipoIdentificacione =  require('./tipoidentificacione');

const Cliente = sequelize.define('Cliente',{
    idcliente:{
        type:DataTypes.SMALLINT,
        primaryKey:true,
        autoIncrement:true
    },
    idusuarioultimo:{
        type:DataTypes.INTEGER,
        allowNull: false,

    },
    idtipoidentificacion:{
        type:DataTypes.TINYINT,
        allowNull: false,
    },
    idpais:{
        type:DataTypes.SMALLINT,
        allowNull: false,
    },
    idestado:{
        type:DataTypes.SMALLINT,
        allowNull: false,
    },
    idciudad:{
        type:DataTypes.SMALLINT,
        allowNull: false,
    },
    numeroidentificacion:{
     type:DataTypes.STRING(12)
    },
    razonsocial:{
    type:DataTypes.STRING(100)
    },
    nombrecomercial:{
        type:DataTypes.STRING(100)
    },
    dircomercial:{
     type:DataTypes.STRING(200)
    },
    dirfisica:{
     type:DataTypes.STRING(200)
    },
   telefono1:{
    type:DataTypes.STRING(15)
    },
   telefono2:{
    type:DataTypes.STRING(15)
    },
   contacto:{
    type:DataTypes.STRING(50)
    },
   idtipocontribuyente:{
    type:DataTypes.TINYINT,
    allowNull: false,
    },
   idmunicipio:{
    type:DataTypes.SMALLINT,
    allowNull: false,
    },
   idestatus:{
    type:DataTypes.SMALLINT,
    allowNull: false,
    },
   idsector:{
    type:DataTypes.SMALLINT,
    allowNull: false,
    },
    codigo:{
        type:DataTypes.STRING(5)
    },
    sexo:{
        type:DataTypes.STRING(1)
    },
    fecnacimiento:{
        type:DataTypes.DATE
    },
    codigorut:{
        type:DataTypes.STRING(12)
    },
    correo:{
        type:DataTypes.STRING(100)
    },
    idcondcomercial:{
        type:DataTypes.TINYINT,
        allowNull: false,
    },
    idcondpais:{
        type:DataTypes.TINYINT,
        allowNull: false,
    },
    idtipopersona:{
        type:DataTypes.TINYINT,
        allowNull: false,
    },
    idzona:{
        type:DataTypes.SMALLINT,
        allowNull: false,
    },
    cantidadactivo:{
        type:DataTypes.INTEGER
    },
    idclascli:{
        type:DataTypes.TINYINT,
        allowNull: false,
    },
    idcondcredito:{
        type:DataTypes.TINYINT,
        allowNull: false,
    },
    saldo:{
        type:DataTypes.DECIMAL(19,4)
    } 
});

// ForeignKey Cliente - TipoIdentificaciones
Cliente.belongsTo(TipoIdentificacione, { foreignKey: "idtipoidentificacion" });
TipoIdentificacione.hasMany(Cliente, { foreignKey: "idtipoidentificacion" });
module.exports = Cliente;