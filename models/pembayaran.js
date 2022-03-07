"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pembayaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      pembayaran.belongsTo(models.siswa, { as: "siswa", foreignKey: "nisn" });

      pembayaran.belongsTo(models.petugas, {
        as: "petugas",
        foreignKey: "idPetugas",
      });
    }
  }
  pembayaran.init(
    {
      idPetugas: DataTypes.INTEGER,
      nisn: DataTypes.INTEGER,
      tglBayar: DataTypes.DATE,
      bulanDibayar: DataTypes.STRING,
      tahunDibayar: DataTypes.STRING,
      idSpp: DataTypes.INTEGER,
      jumlahBayar: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "pembayaran",
    }
  );
  return pembayaran;
};
