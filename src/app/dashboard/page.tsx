"use client";
import { NextAuthProvider } from "../Providers";
import { useSession } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-8">
      DASHBOARD
      {session ? (
        <>
          <p>
            Signed in as{" "}
            <span className="font-bold	">{session?.user?.name}</span> <br />
          </p>
        </>
      ) : (
        <>
          Not signed in <br />
        </>
      )}
    </main>
  );
}
