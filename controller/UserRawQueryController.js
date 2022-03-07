const { sequelize } = require("../models");
const { QueryTypes } = require("sequelize");

const userList = async (req, res) => {
  try {
    const { name, jenisKelamin } = req.query;
    console.log(name);
    const users = await sequelize.query(
      "  SELECT a.nisn, a.tahunDibayar, a.tglBayar, a.jumlahBayar, b.nama, b.alamat FROM pembayarans AS a LEFT JOIN siswas AS b ON (a.nisn = b.nisn)",
      {
        type: QueryTypes.SELECT,
        raw: true,
        replacements: {
          name: `%${name === undefined ? "" : name}%`,
          jenisKelamin: `%${jenisKelamin === undefined ? "" : jenisKelamin}%`,
        },
      }
    );
    console.log(users);
    if (users.length == -0) {
      return res.json({
        status: "fail",
        msg: "no users registered",
      });
    }
    return res.json({
      status: "success",
      msg: "found them",
      data: users,
    });
  } catch (error) {
    console.log(error);
  }
};

const pembayaranList = async (req, res) => {
  try {
    const { name, jenisKelamin } = req.query;
    console.log(name);
    const users = await sequelize.query(
      "  SELECT a.nisn, a.tahunDibayar, a.tglBayar, a.jumlahBayar, b.nama, b.alamat FROM pembayarans AS a LEFT JOIN siswas AS b ON (a.nisn = b.nisn)",
      {
        type: QueryTypes.SELECT,
        raw: true,
        replacements: {
          name: `%${name === undefined ? "" : name}%`,
          jenisKelamin: `%${jenisKelamin === undefined ? "" : jenisKelamin}%`,
        },
      }
    );
    console.log(users);
    if (users.length == -0) {
      return res.json({
        status: "fail",
        msg: "no users registered",
      });
    }
    return res.json({
      status: "success",
      msg: "found them",
      data: users,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { userList };
