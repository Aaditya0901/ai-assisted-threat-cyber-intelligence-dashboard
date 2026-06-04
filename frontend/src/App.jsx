import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [ip, setIp] = useState("");
  const [result, setResult] = useState(null);
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchThreats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/threats"
      );

      setThreats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkThreat = async () => {
    if (!ip.trim()) {
      setErrorMessage("Please enter an IP address");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setResult(null);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/threat-check/${ip}`
      );

      setResult(response.data);
      fetchThreats();
    } catch (error) {
      setErrorMessage("Invalid IP Address");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteThreat = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/threats/${id}`
      );

      fetchThreats();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchThreats();
  }, []);

  const totalThreats = threats.length;

  const lowRisk = threats.filter(
    (threat) => threat.classification === "Low"
  ).length;

  const mediumRisk = threats.filter(
    (threat) => threat.classification === "Medium"
  ).length;

  const highRisk = threats.filter(
    (threat) => threat.classification === "High"
  ).length;

  const filteredThreats = threats.filter((threat) =>
    Object.values(threat).some((value) =>
      String(value)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "42px",
            marginBottom: "30px",
          }}
        >
          AI-Assisted Cyber Threat Intelligence Dashboard
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Enter IP Address"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            style={{
              padding: "12px",
              width: "350px",
              borderRadius: "8px",
              border: "none",
            }}
          />

          <button
            onClick={checkThreat}
            disabled={loading}
            style={{
              padding: "12px 25px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {loading ? "Checking..." : "Check Threat"}
          </button>
        </div>

        {errorMessage && (
          <p
            style={{
              textAlign: "center",
              color: "#ef4444",
              fontWeight: "bold",
            }}
          >
            {errorMessage}
          </p>
        )}

        {result && (
          <div
            style={{
              background: "#1e293b",
              padding: "30px",
              borderRadius: "15px",
              marginBottom: "35px",
              boxShadow: "0px 0px 15px rgba(0,0,0,0.4)",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Threat Analysis Result
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                gap: "15px",
                marginBottom: "25px",
              }}
            >
              <div>
                <strong>Checked At</strong>
                <br />
                {new Date().toLocaleString()}
              </div>

              <div>
                <strong>IP Address</strong>
                <br />
                {result.ip}
              </div>

              <div>
                <strong>Abuse Score</strong>
                <br />
                {result.abuseScore}
              </div>

              <div>
                <strong>Country</strong>
                <br />
                {result.country}
              </div>

              <div>
                <strong>ISP</strong>
                <br />
                {result.isp}
              </div>

              <div>
                <strong>Classification</strong>
                <br />
                <span
                  style={{
                    color:
                      result.classification === "High"
                        ? "#ef4444"
                        : result.classification === "Medium"
                        ? "#f59e0b"
                        : "#22c55e",
                    fontWeight: "bold",
                  }}
                >
                  {result.classification}
                </span>
              </div>
            </div>

            <div
              style={{
                background: "#0f172a",
                padding: "20px",
                borderRadius: "10px",
                borderLeft: "5px solid #3b82f6",
              }}
            >
              <h3
                style={{
                  marginBottom: "10px",
                }}
              >
                AI Risk Summary
              </h3>

              <p
                style={{
                  lineHeight: "1.8",
                  color: "#e2e8f0",
                }}
              >
                {result.aiSummary}
              </p>
            </div>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "35px",
          }}
        >
          <div
            style={{
              background: "#1e293b",
              padding: "25px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h3>Total Threats</h3>
            <h1>{totalThreats}</h1>
          </div>

          <div
            style={{
              background: "#166534",
              padding: "25px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h3>Low Risk</h3>
            <h1>{lowRisk}</h1>
          </div>

          <div
            style={{
              background: "#a16207",
              padding: "25px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h3>Medium Risk</h3>
            <h1>{mediumRisk}</h1>
          </div>

          <div
            style={{
              background: "#991b1b",
              padding: "25px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h3>High Risk</h3>
            <h1>{highRisk}</h1>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search Threats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            marginBottom: "20px",
          }}
        />

        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Threat History
        </h2>

        <div
          style={{
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "#1e293b",
            }}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>IP Address</th>
                <th>Abuse Score</th>
                <th>Country</th>
                <th>ISP</th>
                <th>Classification</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredThreats.map((threat, index) => (
                <tr key={threat.id}>
                  <td>{index + 1}</td>
                  <td>{threat.ip_address}</td>
                  <td>{threat.abuse_score}</td>
                  <td>{threat.country}</td>
                  <td>{threat.isp}</td>

                  <td>
                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        color: "white",
                        backgroundColor:
                          threat.classification === "High"
                            ? "#dc2626"
                            : threat.classification === "Medium"
                            ? "#f59e0b"
                            : "#16a34a",
                      }}
                    >
                      {threat.classification}
                    </span>
                  </td>

                  <td>
                    <button
                      onClick={() => deleteThreat(threat.id)}
                      style={{
                        backgroundColor: "#dc2626",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;