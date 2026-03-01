import AuthWrapper from "@/components/AuthWrapper";
import LogoutButton from "@/components/LogoutButton";
import Profile from "@/components/Profile";

export default function ProfilePage() {
  return (
    <AuthWrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Profile />
        <LogoutButton />
      </div>
    </AuthWrapper>
  );
}
