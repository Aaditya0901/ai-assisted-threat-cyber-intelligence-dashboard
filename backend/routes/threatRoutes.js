const express = require("express");

const router = express.Router();

const {
  getThreatIntel,
  getAllThreats,
  deleteThreat,
} = require("../controllers/threatController");

router.get("/threat-check/:ip", getThreatIntel);

router.get("/threats", getAllThreats);

router.delete("/threats/:id", deleteThreat);

module.exports = router;