"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-8">
      <h2 className="text-[2rem]	font-extrabold	">Welcome</h2>
      <form className="flex flex-col gap-0.5 min-w-[25rem]">
        <input
          onChange={(e) => setName(e.target.value)}
          className="pb-4 outline-0 border-b-2 "
          type="text"
          placeholder="Username"
        ></input>
        <p className="min-h-[2rem] text-red-500 font-medium flex items-center"></p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="pb-4 outline-0 border-b-2"
          type="password"
          placeholder="Password"
        ></input>
        <p className="min-h-[2rem] text-red-500 font-medium flex items-center">
          {" "}
        </p>
        <button className="shadow-e box-border mt-3 h-[52px] text-white	rounded-[50px] bg-green p-[.5rem]">
          LOGIN
        </button>
        <Link className="mt-10" href={"/sign-up"}>
          Don't have an account? <span className="text-green">Sign up</span>
        </Link>
      </form>
    </main>
  );
}
