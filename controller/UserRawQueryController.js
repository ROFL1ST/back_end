const { sequelize } = require("../models");
const { QueryTypes } = require("sequelize");

const userList = async (req, res) => {
  try {
    const { name, jenisKelamin, id } = req.query;
    console.log(name);
    const users = await sequelize.query(
      "  SELECT a.id, a.idSpp, a.tahun, a.nominal, b.nama, b.alamat, b.nisn FROM spps AS a LEFT JOIN siswas AS b ON (a.idSpp = b.id)",
      {
        type: QueryTypes.SELECT,
        raw: true,
        replacements: {
          id: `%${id === undefined ? "" : id}%`,
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

const userListHistory = async (req, res) => {
  try {
    const { name, jenisKelamin, id } = req.query;
    console.log(name);
    const users = await sequelize.query(
      "  SELECT a.id, a.nisn, a.tahunDibayar, a.tglBayar, a.jumlahBayar, a.bulanDibayar, b.nama, b.alamat FROM pembayarans AS a LEFT JOIN siswas AS b ON (a.nisn = b.nisn)",
      {
        type: QueryTypes.SELECT,
        raw: true,
        replacements: {
          id: `%${id === undefined ? "" : id}%`,
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



const petugasList = async (req, res) => {
  try {
    const { name, jenisKelamin } = req.query;
    console.log(name);
    const users = await sequelize.query("  SELECT a.namaPetugas, a.level FROM petugas AS a", {
      type: QueryTypes.SELECT,
      raw: true,
      replacements: {
        name: `%${name === undefined ? "" : name}%`,
        jenisKelamin: `%${jenisKelamin === undefined ? "" : jenisKelamin}%`,
      },
    });
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
    return res.json({
      status: "fail",
      msg: "something's wrong",
    });
  }
};

module.exports = { userListHistory, petugasList, userList };
