const Pembayaran = require("../models").pembayaran;
const SppModel = require("../models").spp;
const PetugasModel = require("../models").petugas;
const Kelas = require("../models").kelas
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const petugas = require("../models/petugas");
const { user } = require("pg/lib/defaults");
const SiswaModel = require("../models").siswa;
const createSiswa = async (req, res) => {
  try {
    let body = req.body;
    body.password = await bcrypt.hashSync(body.password, 10);
    const users = await SiswaModel.create(body);
    console.log(users);

    res.status(200).json({
      status: "success",
      messege: "Register Berhasil",
    });
  } catch (error) {
    console.log(error);
  }
};

const detailPetugas = async (req, res) => {
  try {
    const { id } = req.params;
    const petugas = await PetugasModel.findByPk(id);
    if (petugas === null) {
      return res.json({
        status: "Fail",
        msg: "Petugas tidak terdaftar",
      });
    }
    console.log(petugas);
    return res.json({
      status: "succes",
      msg: "Petugas ditemukan",
      data: petugas,
    });
  } catch (error) {
    console.log(error);
  }
};
const index = async (req, res) => {
  try {
    let { keyword, page, pageSize, orderBy, sortBy, pageActive } = req.query;
    // const { limit, offset } = getPagination(page, pageSize);
    const dataUser = await SiswaModel.findAll({
      attributes: ["id", "nisn", "nama", "alamat", "noTelp"],
      include: [
        {
          model: Kelas,
          require: true,
          as: "kelas",
          attributes: ["namaKelas", "kompetensi_keahlian"],
        },
      ],
    });
    return res.json({
      status: "succes",
      msg: "find them",
      data: dataUser,
    });
  } catch (error) {
    console.log(error);
  }
};

const createPembayaran = async (req, res) => {
  try {
    let body = req.body;
    const pembayarans = await SppModel.create(body);
    res.status(200).json({
      status: "Success",
      messege: "Register pembayaran Berhasil",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      messege: "Register pembayaran Gagal",
    });
  }
};

const detail = async (req, res) => {
  try {
    const { id } = req.params;
    const siswa = await SiswaModel.findByPk(id);
    if (siswa === null) {
      return res.json({
        status: "Fail",
        msg: "Siswa tidak terdaftar",
      });
    }
    console.log(siswa);
    return res.json({
      status: "succes",
      msg: "Siswa ditemukan",
      data: siswa,
    });
  } catch (error) {
    console.log(error);
  }
};

const indexPetugas = async (req, res) => {
  try {
    let { keyword, page, pageSize, orderBy, sortBy, pageActive } = req.query;
    const list = await PetugasModel.findAll({
      attributes: ["id", "username", "namaPetugas", "level"],
      where: {
        ...(keyword !== undefined && {
          [Op.or]: [
            {
              namaPetugas: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              level: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        }),
      },
    
    });
    return res.json({
      status: "succes",
      msg: "find them",
      data: list,
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      status: "fail",
      msg: "something's wrong",
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, tglBayar, bulanDibayar, jumlahBayar } = req.body;
    const usersUpdate = await SppModel.findByPk(id);
    if (usersUpdate === null) {
      return res.json({
        status: "fail",
        msg: "there's no id like this, LMAO",
      });
    }
    await Pembayaran.update(
      {
        bulanDibayar,
        jumlahBayar,
        tglBayar,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json({
      status: "Berhasil",
      messege: "User Berhasil Diupdate",
    });
  } catch (error) {
    console.log(error);

    return res.status(403).json({
      status: "fail",
      msg: "there's a mistake",
      data: user,
    });
  }
};

const detailList = async (req, res) => {
  try {
    const { id } = req.params;
    const pembayaran = await SppModel.findByPk(id);
    if (pembayaran === null) {
      return res.json({
        status: "Fail",
        msg: "pembayaran tidak terdaftar",
      });
    }
    console.log(pembayaran);
    return res.json({
      status: "succes",
      msg: "pembayaran ditemukan",
      data: [pembayaran],
    });
  } catch (error) {
    console.log(error);
  }
};
const hapus = async (req, res) => {
  try {
    const id = req.params.id;
    const dataDetail = await SppModel.destroy({
      where: {
        id: id,
      },
    });
    if (dataDetail === 0) {
      return res.json({
        status: "Gagal",
        messege: "Data User Tidak Ditemukan",
      });
    }
    return res.json({
      status: "Berhasil",
      messege: "Data Berhasil Dihapus",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      messege: "Ada Kesalahan",
    });
  }
};

// History

const detailListHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const pembayaran = await Pembayaran.findByPk(id);
    if (pembayaran === null) {
      return res.json({
        status: "Fail",
        msg: "pembayaran tidak terdaftar",
      });
    }
    console.log(pembayaran);
    return res.json({
      status: "succes",
      msg: "pembayaran ditemukan",
      data: [pembayaran],
    });
  } catch (error) {
    console.log(error);
  }
};
const hapusHistory = async (req, res) => {
  try {
    const id = req.params.id;
    const dataDetail = await Pembayaran.destroy({
      where: {
        id: id,
      },
    });
    if (dataDetail === 0) {
      return res.json({
        status: "Gagal",
        messege: "Data User Tidak Ditemukan",
      });
    }
    return res.json({
      status: "Berhasil",
      messege: "Data Berhasil Dihapus",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      messege: "Ada Kesalahan",
    });
  }
};
module.exports = {
  index,
  createSiswa,
  createPembayaran,
  detail,
  detailPetugas,
  indexPetugas,
  update,
  detailList,
  hapus,
  detailListHistory,
  hapusHistory
};
