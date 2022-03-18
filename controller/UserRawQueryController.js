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
    const { name, id } = req.query;
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

const userListHistoryUser = async (req, res) => {
  try {
    const { name, id } = req.params;
    console.log(name);
    const users = await sequelize.query(
      "  SELECT a.id, a.nisn, a.tahunDibayar, a.tglBayar, a.jumlahBayar, a.bulanDibayar, b.nama, b.alamat FROM pembayarans AS a LEFT JOIN siswas AS b ON (a.nisn = b.nisn) WHERE a.id = :id",
      {
        type: QueryTypes.SELECT,
        raw: true,
        replacements: {
          id: `${id === undefined ? "" : id}`,
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
    const users = await sequelize.query(
      "  SELECT a.namaPetugas, a.level FROM petugas AS a",
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
    return res.json({
      status: "fail",
      msg: "something's wrong",
    });
  }
};

// kelas
const detailKelas = async (req, res) => {
  try {
    const { name, id } = req.params;
    console.log(name);
    const users = await sequelize.query(
      " SELECT a.id,  a.namaKelas, a.kompetensi_keahlian FROM kelas AS a WHERE a.id = :id",
      {
        type: QueryTypes.SELECT,
        raw: true,
        replacements: {
          id: `${id === undefined ? "" : id}`,
        },
      }
    );
    console.log(users);
    if (users.length == -0) {
      return res.json({
        status: "fail",
        msg: "no class registered",
      });
    }
    return res.json({
      status: "success",
      msg: "found them",
      data: { users },
    });
  } catch (error) {
    console.log(error);
  }
};

const userListUser = async (req, res) => {
  try {
    const { name, id } = req.params;
    console.log(name);
    const users = await sequelize.query(
      "  SELECT a.id,  a.tahun, a.nominal, b.nisn, b.nama, b.alamat FROM spps AS a LEFT JOIN siswas AS b ON (a.idSpp = b.id) WHERE a.idSpp = :id",
      {
        type: QueryTypes.SELECT,
        raw: true,
        replacements: {
          id: `${id === undefined ? "" : id}`,
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

const siswaList = async (req, res) => {
  try {
    const { name, jenisKelamin } = req.query;
    console.log(name);
    const users = await sequelize.query(
      "  SELECT a.id, a.nisn, a.nis, a.nama, a.alamat, a.noTelp, b.namaKelas, b.kompetensi_keahlian FROM siswas AS a LEFT JOIN kelas AS b ON (a.idKelas = b.id)",
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
    return res.json({
      status: "fail",
      msg: "something's wrong",
    });
  }
};

const userListHistoryUserDetail = async (req, res) => {
  try {
    const { name, id } = req.params;
    console.log(name);
    const users = await sequelize.query(
      "  SELECT a.id, a.nisn, a.tahunDibayar, a.tglBayar, a.jumlahBayar, a.bulanDibayar, b.nama, b.alamat FROM pembayarans AS a LEFT JOIN siswas AS b ON (a.nisn = b.nisn) WHERE a.idSpp = :id",
      {
        type: QueryTypes.SELECT,
        raw: true,
        replacements: {
          id: `${id === undefined ? "" : id}`,
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

const detailPembayaran = async (req, res) => {
  try {
    const { name, id } = req.params;
    console.log(name);
    const users = await sequelize.query(
      "  SELECT a.id, a.nisn, a.tahunDibayar, a.tglBayar, a.jumlahBayar, a.bulanDibayar, b.nama, b.alamat, c.namaKelas, d.namaPetugas FROM pembayarans AS a LEFT JOIN siswas AS b ON (a.nisn = b.nisn) LEFT JOIN kelas AS c ON (b.idKelas= c.id)  LEFT JOIN petugas AS d ON (a.idPetugas = d.id) WHERE a.id = :id",
      {
        type: QueryTypes.SELECT,
        raw: true,
        replacements: {
          id: `${id === undefined ? "" : id}`,
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

module.exports = {
  userListHistory,
  petugasList,
  userList,
  userListHistoryUser,
  detailKelas,
  userListUser,
  siswaList,
  userListHistoryUserDetail,
  detailPembayaran
};
