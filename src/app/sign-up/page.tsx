"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let newErrors: string[] = [];
    /* if (name === "") {
      newErrors.push("name required");
    }
    if (email === "") {
      newErrors.push("email required");
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.push("email invalid");
    }
    if (password === "") {
      newErrors.push("pass required");
    }*/

    setErrors((arr) => [...newErrors]);
    if (newErrors.length > 0) {
      return;
    }

    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        const { message } = await res.json();
        if (message === "User registered") {
          setName("");
          setEmail("");
          setPassword("");
          router.push("/");
        } else {
          setErrors([message]);
        }
      } else {
        const { message } = await res.json();
        console.log(message);
        console.log("failed registration");
      }
    } catch (error) {
      console.log("error during registration: ", error);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-8">
      <h2 className="text-[2rem]	font-extrabold	">Register</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-0.5 min-w-[25rem]"
      >
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value.replace(" ", ""));
            setErrors([]);
          }}
          className={`pb-3 outline-0 border-b-2  ${
            errors.includes("name required") ||
            errors.includes("Username already in use")
              ? "border-red-500"
              : ""
          }`}
          type="text"
          placeholder="Username"
        ></input>
        <p className="min-h-[2.5rem] text-red-500 font-medium text-end">
          {errors.includes("name required")
            ? "Field required"
            : errors.includes("Username already in use")
            ? "Username already in use"
            : null}
        </p>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value.replace(" ", ""));
            setErrors([]);
          }}
          className={`pb-3 outline-0  border-b-2  ${
            errors.includes("email required") ||
            errors.includes("email invalid") ||
            errors.includes("Email already in use")
              ? "border-red-500"
              : ""
          }`}
          type="text"
          placeholder="Email"
        ></input>
        <p className="min-h-[2.5rem] text-red-500 font-medium text-end">
          {errors.includes("email required")
            ? "Field required"
            : errors.includes("email invalid")
            ? "Email invalid"
            : errors.includes("Email already in use")
            ? "Email already in use"
            : null}
        </p>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value.replace(" ", ""));
            setErrors([]);
          }}
          className={`pb-3 outline-0  border-b-2  ${
            errors.includes("pass required") ? "border-red-500" : ""
          }`}
          type="password"
          placeholder="Password"
        ></input>
        <p className="min-h-[2.5rem] text-red-500 font-medium text-end">
          {errors.includes("pass required") ? "Field required" : null}
        </p>
        <button className="shadow-e box-border mt-3 h-[52px] text-white	rounded-[50px] bg-green p-[.5rem]">
          REGISTER
        </button>
        <Link className="mt-10" href={"/"}>
          Already have an account? <span className="text-green">Login</span>
        </Link>
      </form>
    </main>
  );
}
