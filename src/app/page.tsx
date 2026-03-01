"use server";
import { auth0 } from "@/lib/auth0";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import Profile from "@/components/Profile";
import Timer from "@/components/timer";
import getCurrentObject from "@/hooks/itemAPI";

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    <div className="app-container">
      <div className="main-card-wrapper">
        <h1
          style={{
            fontSize: "64px",
            fontWeight: "900",
            margin: "0",
            color: "#ffffff",
            letterSpacing: "-4px",
            background: "linear-gradient(to bottom, #fff, #666)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Glim
        </h1>
        <p
          style={{
            color: "#666",
            textTransform: "uppercase",
            fontSize: "12px",
            letterSpacing: "2px",
            fontWeight: "600",
          }}
        >
          Moments in focus
        </p>

        <div className="action-card">
          {user ? (
            <div className="logged-in-section">
              <Timer
                timeLeft={(await getCurrentObject()).rotationMinutes * 60}
                camera={false}
              />
              <h2>Item to find: {(await getCurrentObject()).item}!</h2>
              <a
                href="/camera"
                style={{
                  color: "#ffffff",
                  fontWeight: "900",
                  fontSize: "24px",
                  letterSpacing: "-1px",
                  background: "none",
                  border: "2px solid #85189b",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  textTransform: "uppercase",
                }}
              >
                Take a picture
              </a>
              <a
                href="/profile"
                style={{
                  color: "#ffffff",
                  fontWeight: "900",
                  fontSize: "24px",
                  letterSpacing: "-1px",
                  background: "none",
                  border: "2px solid #85189b",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  textTransform: "uppercase",
                }}
              >
                View Profile
              </a>
              <a
                href="/leaderboard"
                style={{
                  color: "#ffffff",
                  fontWeight: "900",
                  fontSize: "24px",
                  letterSpacing: "-1px",
                  background: "none",
                  border: "2px solid #85189b",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  textTransform: "uppercase",
                }}
              >
                View Leaderboard
              </a>
            </div>
          ) : (
            <>
              <p className="action-text">
                Welcome to Glim, please login to continue.
              </p>
              <LoginButton />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
