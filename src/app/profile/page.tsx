import AuthWrapper from "@/components/AuthWrapper";
import LogoutButton from "@/components/LogoutButton";
import Profile from "@/components/Profile";

export default function ProfilePage() {
  return (
    <AuthWrapper>
      <div>
        <Profile></Profile>
        <LogoutButton></LogoutButton>
      </div>
    </AuthWrapper>
  );
}
