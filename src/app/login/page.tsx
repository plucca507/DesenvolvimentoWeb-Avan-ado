"use client";

import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { push } = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("/api/client/login", {
      body: JSON.stringify({ email, password }),
      method: "POST",
    }).then(async (res) => {
      if (!res.ok) return toast.error("Usuário ou senha inválidos");
      const data = await res.json();
      if (typeof window !== "undefined")
        localStorage.setItem("token", data.token);
      toast.success("Usuário autenticado");
      push("/");
    });
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div>
        <h1 className="text-3xl font-bold text-center py-4">Login Cliente</h1>

        <form className="flex justify-center" onSubmit={handleSubmit}>
          <div className="max-w-full w-96">
            <div className="grid gap-6 mb-6 grid-col">
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="•••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center flex-col gap-y-3">
              <a
                href="/cadastro"
                type="submit"
                className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Ainda não se cadastrou?
              </a>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Logar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
