const pool = require("../config/db");
const { checkIPThreat } = require("../services/threatService");
const { generateRiskSummary } = require("../services/aiService");

const getThreatIntel = async (req, res) => {
  try {
    const ip = req.params.ip;

    const threatData = await checkIPThreat(ip);

    const abuseScore = threatData.abuseConfidenceScore;

    let classification = "Low";

    if (abuseScore > 80) {
      classification = "High";
    } else if (abuseScore > 40) {
      classification = "Medium";
    }

    let aiSummary = "AI summary currently unavailable.";

    try {
      aiSummary = await generateRiskSummary(
        abuseScore,
        classification,
        threatData.countryCode,
        threatData.isp
      );
    } catch (aiError) {
      console.log("Gemini Error:", aiError.message);
    }

    await pool.query(
      `INSERT INTO threats
      (ip_address, abuse_score, country, isp, classification)
      VALUES ($1, $2, $3, $4, $5)`,
      [
        ip,
        abuseScore,
        threatData.countryCode,
        threatData.isp,
        classification,
      ]
    );

    res.json({
      ip,
      abuseScore,
      country: threatData.countryCode,
      isp: threatData.isp,
      classification,
      aiSummary,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Threat lookup failed",
    });
  }
};

const getAllThreats = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM threats ORDER BY checked_at DESC"
    );

    res.json(result.rows);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to fetch threats",
    });
  }
};

const deleteThreat = async (req, res) => {
  try {
    const id = req.params.id;

    await pool.query(
      "DELETE FROM threats WHERE id = $1",
      [id]
    );

    res.json({
      message: "Threat deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to delete threat",
    });
  }
};

module.exports = {
  getThreatIntel,
  getAllThreats,
  deleteThreat,
};