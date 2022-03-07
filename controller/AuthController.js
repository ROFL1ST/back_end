const UserModel = require("../models").petugas;
const SiswaModel = require("../models").siswa;
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { user } = require("pg/lib/defaults");
dotenv.config();

const register = async (req, res) => {
  try {
    let body = req.body;
    body.password = await bcrypt.hashSync(body.password, 10);
    const users = await UserModel.create(body);
    console.log(users);

    res.status(200).json({
      status: "Success",
      messege: "Register Berhasil",
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // CEK username DULU ADAA ATAU NGGAK
    const dataUser = await UserModel.findOne({
      where: {
        username: username,
      },
    });
    // CEK username DAN PASSWORD HARUS SAMA DARI DATABASE
    // CEK usernameNYA
    if (dataUser === null) {
      return res.status(422).json({
        status: "Gagal",
        messege: "username Belum Terdaftar Di Data Kami",
      });
    }
    // CEK PASSWORDNYA
    const verify = bcrypt.compareSync(password, dataUser.password);
    if (!verify) {
      return res.status(422).json({
        status: "Gagal",
        messege: "Password Tidak Sama",
      });
    }

    const users = await UserModel.findOne({
      attributes: ["id", "username", "namaPetugas", "level"],
      where: {
        username: username,
      },
    });
    const token = jwt.sign(
      {
        id: dataUser.id,
        username: dataUser.username,
      },
      process.env.JWT_ACCESS_TOKEN,
      {
        expiresIn: "1d",
      }
    );
    return res.json({
      status: "Success",
      messsege: "Anda Berhasil Login",
      data: users,
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};

const authme = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN, async (err, decode) => {
    if (err) {
      return res.status(401).json({
        status: "fail",
        msg: "invalid",
        data: err,
      });
    } else {
      try {
        req.email = decode?.email;
        const tokenLu = jwt.sign(
          {
            email: req.email,
          },
          process.env.JWT_ACCESS_TOKEN,
          { expiresIn: "1d" }
        );
        return res.json({
          status: "Success",
          msg: "You got your new token",
          token: tokenLu,
        });
      } catch (error) {
        return res.status(401).json({
          status: "fail",
          msg: "invalid",
          data: error,
        });
      }
    }
  });
};

// Siswa

const loginSiswa = async (req, res) => {
  try {
    const { nisn, password } = req.body;
    // CEK username DULU ADAA ATAU NGGAK
    const dataUser = await SiswaModel.findOne({
      where: {
        nisn: nisn,
      },
    });
    // CEK username DAN PASSWORD HARUS SAMA DARI DATABASE
    // CEK usernameNYA
    if (dataUser === null) {
      return res.status(422).json({
        status: "Gagal",
        messege: "username Belum Terdaftar Di Data Kami",
      });
    }
    // CEK PASSWORDNYA
    const verify = bcrypt.compareSync(password, dataUser.password);
    if (!verify) {
      return res.status(422).json({
        status: "Gagal",
        messege: "Password Tidak Sama",
      });
    }

    const users = await UserModel.findOne({
      attributes: ["id", "nisn", "nama", "alamat"],
      where: {
        nisn: nisn,
      },
    });
    const token = jwt.sign(
      {
        id: dataUser.id,
        nisn: dataUser.nisn,
      },
      process.env.JWT_ACCESS_TOKEN,
      {
        expiresIn: "1d",
      }
    );
    return res.json({
      status: "Success",
      messsege: "Anda Berhasil Login",
      data: users,
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, login, authme, loginSiswa };
