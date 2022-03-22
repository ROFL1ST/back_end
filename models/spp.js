"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class spp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      spp.belongsTo(models.siswa, { as: "siswa", foreignKey: "idSpp" });
    }
  }
  spp.init(
    {
      tahun: DataTypes.INTEGER,
      nominal: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "spp",
    }
  );
  return spp;
};
