import { auth0 } from "@/lib/auth0";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import Profile from "@/components/Profile";
import Timer from "@/components/timer";

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    <div className="app-container">
      <div className="main-card-wrapper">
        <h1 className="main-title">Glim</h1>

        <div className="action-card">
          {user ? (
            <div className="logged-in-section">
              <Timer />
              <a href="/camera" className="button button text-purple-700">
                Take a picture
              </a>
              <a href="/profile" className="button button">
                View Profile
              </a>
              <a href="/leaderboard" className="button button">
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