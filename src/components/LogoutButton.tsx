"use client";

import { buttonStyle } from "@/util/buttonStyle";

export default function LogoutButton() {
  return (
    <a
      href="/auth/logout"
      style={{
       ...buttonStyle,
      }}
    >
      Log Out
    </a>
  );
}
