const express = require("express");
const {
  register,
  login,
  authme,
  loginSiswa,
} = require("../controller/AuthController");
const pageMiddleWare = require("../middleware/paginationMiddleware");
const {
  userListHistory,
  siswaList,
  userList,
  userListHistoryUser,
  userListUser,
  userListHistoryUserDetail,
  detailPembayaran,
  userListUserList
} = require("../controller/UserRawQueryController");
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
router.post("/loginSiswa", loginSiswa);

// siswa
router.use(validationMiddleware);
router.post("/createSiswa", createSiswa);

router.get("/profile/siswa/:id", detail);
router.get("/siswa", siswaList);
router.put("/siswa/update/:id", updateSiswa);
router.get("/profile/siswa/update/:id", detailUpdate);
router.delete("/siswa/delete/:id", hapusSiswa);

// petugas
router.get("/profile/petugas/:id", detailPetugas);
router.get("/petugas", indexPetugas);
router.post("/createPetugas", CreatePetugas);
router.put("/profile/petugas/update/:id", updatePetugas);
router.get("/profile/petugas/update/:id", detailPetugasUpdate);
router.delete("/petugas/delete/:id", hapusPetugas);

// index
router.use(pageMiddleWare);
router.get("/listOrder", userList);
router.get("/list", userListUserList);
router.get("/listOrder/:id", userListUser);
router.put("/listOrder/perbarui/:id", update);
router.delete("/listOrder/delete/:id", hapus);
router.get("/listOrder/detail/:id", detailList);
router.post("/createPembayaran", createPembayaran);

// History
router.get("/listOrderHistory/:nisn", userListHistoryUser);
router.get("/listOrderHistory", userListHistory);
router.get("/listOrderHistory/detail/:id", userListHistoryUserDetail);
router.delete("/listOrderHistory/delete/:id", hapusHistory);
router.post("/pembayaran", createPembayaranCheck);

// kelas
router.post("/createKelas", createKelas);
router.get("/kelas", indexKelas);
router.get("/kelas/:id", detailKelas);
router.get("/kelasDetail/update/:id", detailKelasUpdate);
router.put("/kelas/update/:id", updateKelas);
router.delete("/kelas/delete/:id", hapusKelas);


// pembayaran
router.get("/pembayaran/:id", detailPembayaran);

module.exports = router;
