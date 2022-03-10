"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class siswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      siswa.hasOne(models.spp, { as: "spp", foreignKey: "idSpp" });
      siswa.belongsTo(models.kelas, {as: "kelas", foreignKey: "idKelas"})
      siswa.hasOne(models.pembayaran, { as: "pembayaran", foreignKey: "nisn" });
    }
  }
  siswa.init(
    {
      nisn: DataTypes.INTEGER,
      nis: DataTypes.STRING,
      password: DataTypes.STRING,
      nama: DataTypes.STRING,
      idKelas: DataTypes.INTEGER,
      alamat: DataTypes.STRING,
      noTelp: DataTypes.STRING,
      idSpp: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "siswa",
    }
  );
  return siswa;
};
