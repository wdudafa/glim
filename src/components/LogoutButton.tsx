"use client";

export default function LogoutButton() {
  return (
    <a
      href="/auth/logout"
      style={{
        padding: "10px 18px",
        borderRadius: "999px",
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        color: "#ffffff",
        fontSize: "14px",
        fontWeight: 500,
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      Log Out
    </a>
  );
}
