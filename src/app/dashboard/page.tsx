"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [router, session]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-8">
      DASHBOARD
      {session ? (
        <>
          <p onClick={() => signOut()}>
            Signed in as{" "}
            <span className="font-bold	">{session?.user?.name}</span> <br />
          </p>
        </>
      ) : (
        <p>
          Not signed in <br />
        </p>
      )}
    </main>
  );
}
