const express = require("express");
const { register, login, authme } = require("../controller/AuthController");
const pageMiddleWare = require("../middleware/paginationMiddleware");
const {userListHistory, petugasList, userListDetail, userList} = require("../controller/UserRawQueryController")
const {
  index,
  createSiswa,
  createPembayaran,
  detail,
  detailPetugas,
  indexPetugas,
  detailList,
  update,
  hapus,
  detailListHistory,
  hapusHistory

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
router.get("/siswa", index)

// petugas
router.get("/profile/petugas/:id", detailPetugas)
router.get("/petugas", indexPetugas)

// index
router.use(pageMiddleWare);
router.get("/listOrder", userList);
router.put("/listOrder/perbarui/:id", update)
router.delete("/listOrder/delete/:id", hapus)
router.get("/listOrder/detail/:id", detailList)

// History
router.get("/listOrderHistory", userListHistory);
router.get("/listOrderHistory/detail/:id", detailListHistory)
router.delete("/listOrderHistory/delete/:id", hapusHistory)

module.exports = router;
