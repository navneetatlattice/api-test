var DataTypes = require("sequelize").DataTypes;
var _leads = require("./leads");
var _siteInfo = require("./siteInfo");

function initModels(sequelize) {
  var leads = _leads(sequelize, DataTypes);
  var siteInfo = _siteInfo(sequelize, DataTypes);

  siteInfo.belongsTo(leads, { as: "idLead_lead", foreignKey: "idLead" });
  leads.hasMany(siteInfo, { as: "siteInfos", foreignKey: "idLead" });

  return {
    leads,
    siteInfo,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
