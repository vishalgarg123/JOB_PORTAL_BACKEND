const express = require("express");
const {
  singleUser,
  allUsers,
  editUser,
  deleteUser,
  createUserJobsHistory,
} = require("../controllers/user");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");
const router = express.Router();

// /api/allusers
router.get("/allusers", isAuthenticated, isAdmin, allUsers);
// /api/user/id
router.get("/user/:id", isAuthenticated, singleUser);
// /api/user/edit/id
router.put("/user/edit/:id", isAuthenticated, editUser);
// /api/admin/user/delete/id
router.delete("/admin/user/delete/:id", isAuthenticated, isAdmin, deleteUser);

// /api/user/jobhistory
router.post("/user/jobhistory", isAuthenticated, createUserJobsHistory);


module.exports = router;
