const Pembayaran = require("../models").pembayaran;
const SppModel = require("../models").spp;
const PetugasModel = require("../models").petugas;
const Kelas = require("../models").kelas;
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
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

const detailUpdate = async (req, res) => {
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
      data: [siswa],
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
    const { nominal, tahun } = req.body;
    const usersUpdate = await SppModel.findByPk(id);
    if (usersUpdate === null) {
      return res.json({
        status: "fail",
        msg: "there's no id like this, LMAO",
      });
    }
    await SppModel.update(
      {
        nominal,
        tahun,
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
    const  idSpp  = req.params.idSpp;
    const pembayaran = await Pembayaran.findByPk(idSpp)
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

const createPembayaranCheck = async (req, res) => {
  try {
    let body = req.body;
    const pembayarans = await Pembayaran.create(body);
    res.status(200).json({
      status: "Success",
      messege: "Pembayaran Berhasil",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      messege: "Pembayaran Gagal",
    });
  }
};

const createKelas = async (req, res) => {
  try {
    let body = req.body;
    const kelas = await Kelas.create(body);
    res.status(200).json({
      status: "Success",
      messege: "Create kelas Berhasil",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      messege: "Create kela Gagal",
    });
  }
};

const indexKelas = async (req, res) => {
  try {
    // const { limit, offset } = getPagination(page, pageSize);
    const dataUser = await Kelas.findAll({
      attributes: ["id" , "namaKelas", "kompetensi_keahlian"],
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

// update siswa
const updateSiswa = async (req, res) => {
  try {
    const { id } = req.params;
    const { nisn, nis, nama, alamat, noTelp } = req.body;
    const usersUpdate = await SiswaModel.findByPk(id);
    if (usersUpdate === null) {
      return res.json({
        status: "fail",
        msg: "there's no siswa like this, LMAO",
      });
    }
    await SiswaModel.update(
      {
        nisn,
        nis,
        nama,
        alamat,
        noTelp,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json({
      status: "Berhasil",
      messege: "Siswa Berhasil Diupdate",
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

const hapusSiswa = async (req, res) => {
  try {
    const { id } = req.params;
    const dataDetail = await SiswaModel.destroy({
      where: {
        id: id,
      },
    });
    const sppDetail = await SppModel.destroy({
      where: {
        id: idSpp,
      },
    });
    if (dataDetail === 0 || sppDetail === 0) {
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

const CreatePetugas = async (req, res) => {
  try {
    let body = req.body;
    body.password = await bcrypt.hashSync(body.password, 10);
    const Petugas = await PetugasModel.create(body);
    res.status(200).json({
      status: "Success",
      messege: "Register petugas Berhasil",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      messege: "Register pembayaran Gagal",
    });
  }
};

const updatePetugas = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, namaPetugas, level } = req.body;
    const usersUpdate = await PetugasModel.findByPk(id);
    if (usersUpdate === null) {
      return res.json({
        status: "fail",
        msg: "there's no officer like this, LMAO",
      });
    }
    await PetugasModel.update(
      {
        username,
        namaPetugas,
        level,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json({
      status: "Berhasil",
      messege: "Petugas Berhasil Diupdate",
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

const detailPetugasUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const siswa = await PetugasModel.findByPk(id);
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
      data: [siswa],
    });
  } catch (error) {
    console.log(error);
  }
};

const hapusPetugas = async (req, res) => {
  try {
    const { id } = req.params;
    const dataDetail = await PetugasModel.destroy({
      where: {
        id: id,
      },
    });
    if (dataDetail === 0 || sppDetail === 0) {
      return res.json({
        status: "Gagal",
        messege: "Data Petugas Tidak Ditemukan",
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

const detailKelas = async (req, res) => {
  try {
    const { id } = req.params;
    const petugas = await Kelas.findByPk(id);
    if (petugas === null) {
      return res.json({
        status: "Fail",
        msg: "Kelas tidak terdaftar",
      });
    }
    console.log(Kelas);
    return res.json({
      status: "succes",
      msg: "Kelas ditemukan",
      data: petugas,
    });
  } catch (error) {
    console.log(error);
  }
};

const detailKelasUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const siswa = await Kelas.findByPk(id);
    if (siswa === null) {
      return res.json({
        status: "Fail",
        msg: "Kelas tidak terdaftar",
      });
    }
    console.log(Kelas);
    return res.json({
      status: "succes",
      msg: "Kelas ditemukan",
      data: [siswa],
    });
  } catch (error) {
    console.log(error);
  }
};

const updateKelas = async (req, res) => {
  try {
    const { id } = req.params;
    const { namaKelas, kompetensi_keahlian } = req.body;
    const usersUpdate = await Kelas.findByPk(id);
    if (usersUpdate === null) {
      return res.json({
        status: "fail",
        msg: "there's no class like this, LMAO",
      });
    }
    await Kelas.update(
      {

        namaKelas,
        kompetensi_keahlian,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json({
      status: "Berhasil",
      messege: "Petugas Berhasil Diupdate",
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


const hapusKelas = async (req, res) => {
  try {
    const { id } = req.params;
    const dataDetail = await Kelas.destroy({
      where: {
        id: id,
      },
    });
    if (dataDetail === 0 || sppDetail === 0) {
      return res.json({
        status: "Gagal",
        messege: "Data Kelas Tidak Ditemukan",
      });
    }
    return res.json({
      status: "Berhasil",
      messege: "Data Kelas Berhasil Dihapus",
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
  hapusHistory,
  createPembayaranCheck,
  createKelas,
  updateSiswa,
  indexKelas,
  detailUpdate,
  hapusSiswa,
  CreatePetugas,
  updatePetugas,
  detailPetugasUpdate,
  hapusPetugas,
  detailKelas,
  detailKelasUpdate,
  updateKelas,
  hapusKelas
};
