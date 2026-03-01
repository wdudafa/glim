"use client";

import { useUser } from "@auth0/nextjs-auth0";
import { Button } from "@mui/material";
import { CiLogout } from "react-icons/ci";
import LogoutButton from "./LogoutButton";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <p>Loading...</p>; // TODO: please someone make a good loading page!!!!!
  if (error) return (window.location.href = "/");
  if (!user) return (window.location.href = "/");

  return (
    <div
      className="auth-wrapper"
      style={{
        background:
          "linear-gradient(135deg, rgb(23, 61, 119) 0%, rgb(78, 165, 157) 100%)",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={"/glim-logo.png"}
        style={{
          borderRadius: 30,
          backgroundColor: "white",
          position: "absolute",
          top: 20,
          width: 190,
        }}
      />
      <div>
        <div
          style={{
            position: "absolute",
            padding: 5,
            fontSize: 24,
            top: 20,
            left: 20,
            width: 190,
          }}
        >
        </div>
      </div>
      {children}
    </div>
  );
}
