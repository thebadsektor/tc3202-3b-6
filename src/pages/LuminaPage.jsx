import React from "react";
import { useNavigate } from "react-router-dom";

function LuminaPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>AI Assistant (Lumina)</h2>
      <iframe
        src="http://localhost:5173"
        title="Lumina AI"
        width="100%"
        height="600px"
        style={{ border: "1px solid #ccc", borderRadius: "8px" }}
      ></iframe>
      <br />
      <button
        onClick={() => navigate("/home")}
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}
      >
        ⬅ Back to Home
      </button>
    </div>
  );
}

export default LuminaPage;
