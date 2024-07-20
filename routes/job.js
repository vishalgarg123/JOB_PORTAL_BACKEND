const { Router } = require("express");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");
const {
  createJob,
  singleJob,
  updateJob,
  showJobs,
} = require("../controllers/job");
const router = Router();

//job routes

// /api/job/create
router.post("/job/create", isAuthenticated, isAdmin, createJob);

// /api/job/id
router.get("/job/:id", singleJob);

// /api/job/update/job_id
router.put("/job/update/:jobid", isAuthenticated, isAdmin, updateJob);

// /api/jobs/show
router.get("/jobs/show", showJobs);

module.exports = router;
