import { useEffect } from "react";
import { useNavigate } from "react-router";

import API from "../../api";

const LogoutRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    API.logout();
    navigate("/login", { replace: true });
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0e1c2d, #1b2b44)",
        color: "#fdfdfd",
        fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif",
        letterSpacing: "0.08em",
      }}
    >
      <p style={{ fontSize: "clamp(1.25rem, 4vw, 2rem)" }}>Logging out...</p>
    </div>
  );
};

export default LogoutRoute;
