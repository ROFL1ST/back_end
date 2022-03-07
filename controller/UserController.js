const SiswaModel = require("../models").siswa;
const Pembayaran = require("../models").pembayaran;
const PetugasModel = require("../models").petugas;
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
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
    let { keyword, page, pageSize, orderBy, sortBy } = req.query;
    const list = await SiswaModel.findAll({
      attributes: ["nis", "nama", "alamat", "noTelp"],
      where: {
        ...(keyword !== undefined && {
          [Op.or]: [
            {
              nisn: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              tglBayar: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              bulanDibayar: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              tahunDibayar: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        }),
      },
      include: [
        {
          model: Pembayaran,
          require: true,
          as: "pembayaran",
          attributes: ["nisn"],
        },
      ],

      order: [[sortBy, orderBy]], // mengurutkan
      offset: page, // mulai dari tambah satu
      limit: pageSize,
    });

    return res.json({
      status: "succes",
      msg: "find them",
      data: list,
    });
  } catch (error) {
    console.log(error);
  }
};

const createPembayaran = async (req, res) => {
  try {
    let body = req.body;
    const pembayarans = await Pembayaran.create(body);
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

module.exports = {
  index,
  createSiswa,
  createPembayaran,
  detail,
  detailPetugas,
};
