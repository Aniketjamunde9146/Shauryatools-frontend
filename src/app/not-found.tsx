import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #0f0f1a, #1a1a2e)",
      color: "#fff",
      textAlign: "center",
      padding: "40px",
      fontFamily: "Inter, sans-serif"
    }}>
      
      <h1 style={{
        fontSize: "120px",
        margin: 0,
        background: "#0a0a0a",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontWeight: 800
      }}>
        404
      </h1>

      <h2 style={{ margin: "10px 0 5px", fontWeight: 600 }}>
        Lost in Space 🚀
      </h2>

      <p style={{ color: "#9ca3af", maxWidth: 400 }}>
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        href="/"
        style={{
          marginTop: 30,
          padding: "12px 28px",
          borderRadius: 12,
          background: "#0a0a0a",
          color: "#fff",
          textDecoration: "none",
          fontWeight: 600,
          boxShadow: "0 10px 30px rgba(108,71,255,0.4)",
          transition: "0.3s ease"
        }}
      >
        ← Back to Home
      </Link>
    </div>
  );
}
