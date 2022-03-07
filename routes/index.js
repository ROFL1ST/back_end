const express = require("express");
const { register, login, authme } = require("../controller/AuthController");
const pageMiddleWare = require("../middleware/paginationMiddleware");
const {userList} = require("../controller/UserRawQueryController")
const {
  index,
  createSiswa,
  createPembayaran,
  detail,
  detailPetugas
} = require("../controller/UserController");
const validationMiddleware = require("../middleware/ValidationMiddleware");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "Ok",
    messege: "Anda Berhasil Mengakses Kami",
  });
});

router.post("/register", register);
router.post("/login", login);
router.get("/authme", authme);

// siswa
router.use(validationMiddleware)
router.post("/createSiswa", createSiswa)
router.post("/createPembayaran", createPembayaran)
router.get("/profile/siswa/:id", detail)

// petugas
router.get("/profile/petugas/:id", detailPetugas)

// index
router.use(pageMiddleWare);
router.get("/listOrder", userList);

module.exports = router;
