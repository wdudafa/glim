"use client";

import { useUser } from "@auth0/nextjs-auth0";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <p>Loading...</p>; // TODO: please someone make a good login page!!!!!
  if (error) return (window.location.href = "/");
  if (!user) return (window.location.href = "/");

  return <>{children}</>;
}
