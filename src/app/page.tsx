import { auth0 } from "@/lib/auth0";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import Profile from "@/components/Profile";

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
              <Profile />
              <h1>5:53:29 till next image</h1>
              <a href="/camera" className="button button">
                Take a picture
              </a>
              <a href="/profile" className="button button">
                View Profile
              </a>
            </div>
          ) : (
            <>
              <p className="action-text">
                Welcome! Please log in to access your protected content.
              </p>
              <LoginButton />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
