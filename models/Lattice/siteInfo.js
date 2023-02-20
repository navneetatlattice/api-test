const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('siteInfo', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    idLead: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'leads',
        key: 'id'
      }
    },
    isNewConstruction: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    utilityCompany: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    occupants: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    backup: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    terraceIsOn: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    floor: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    supplyPhase: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    appliances: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'siteInfo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "FK_LeadSiteInfo",
        using: "BTREE",
        fields: [
          { name: "idLead" },
        ]
      },
    ]
  });
};
