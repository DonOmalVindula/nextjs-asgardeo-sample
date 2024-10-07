"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    async function main() {
      await signOut({ redirect: false });
      router.push("/");
    }
    const timeout = setTimeout(() => main(), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <span>Signing Out...</span>
    </div>
  );
}
