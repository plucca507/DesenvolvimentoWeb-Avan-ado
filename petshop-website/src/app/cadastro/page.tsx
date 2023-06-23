"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Client } from "../../../types";
import { toast } from "react-hot-toast";

export default function Home() {
  const [name, setName] = useState("");
  const [savedId, setSavedId] = useState<string | undefined>(undefined);
  const [phone, setPhone] = useState<number | undefined>(undefined);
  const [address, setAddress] = useState("");
  const [cpf, setCpf] = useState<number | undefined>(undefined);
  const [ppURL, setPpURL] = useState("https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000");

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState<number | undefined>(undefined);
  const [cardCVC, setCardCVC] = useState<number | undefined>(undefined);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (savedId) {
      fetch(`/api/client/${savedId}`, {
        body: JSON.stringify({ name, phone, address, cpf, creditcard: cardNumber, cvc: cardCVC, image: ppURL, email }),
        method: "PUT"
      }).then(async res => {
        if (!res.ok) return toast.error('Erro ao alterar usuário')
        toast.success('Usuário alterado')
      })
    } else {
      fetch(`/api/client/`, {
        body: JSON.stringify({ name, phone, address, cpf, creditcard: cardNumber, cvc: cardCVC, image: ppURL, email, password }),
        method: "POST"
      }).then(async res => {
        if (!res.ok) return toast.error('Erro ao criar usuário')
        toast.success('Usuário criado')
      })
    }
  }

  useEffect(() => {
    fetch('/api/client/getdata', {
      body: JSON.stringify({ token: localStorage.getItem('token') }),
      method: "POST",
    }).then(async res => {
      if (!res.ok) return;
      const { code, name, phone, address, cpf, creditcard, cvc, image, email }: Client = await res.json();
      setSavedId(code);
      setName(name)
      setPhone(phone)
      setAddress(address)
      setCpf(cpf)
      setCardName(name)
      setCardNumber(creditcard)
      setCardCVC(cvc)
      setPpURL(image)
      setEmail(email)
      setPassword("******")
    })
  }, [])

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files == null) return;

    const formData = new FormData();

    formData.append("media", event.target.files[0]);
    formData.append('key', process.env.NEXT_PUBLIC_THUMBSNAP_KEY!);

    fetch("https://thumbsnap.com/api/upload", {
      method: "POST", // HTTP Method
      body: formData, // Data to be sent
      headers: {
        Accept: "application/json",
      },
    }).then(res => res.json().then(res => {
      setPpURL(res.data.media)
    }))
  };

  return (<div className="flex justify-center items-center w-full h-full">
    <div>
      <h1 className="text-3xl font-bold text-center py-4 mb-3">
        {savedId ? "Alteração" : "Cadastro"} de Cliente
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <div className="grid gap-6 grid-col grid-cols-2">
            <div className="max-w-full w-96">
              <div className="grid gap-6 mb-6 grid-col">
                <h2 className="text-xl font-bold">Dados pessoais</h2>
                <div className="mb-1">
                  <label
                    htmlFor="name"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nome
                  </label>
                  <input
                    type="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Ex: João Luiz"
                    required
                  />
                </div>
                <div className="mb-1">
                  <label
                    htmlFor="phone"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Telefone
                  </label>
                  <input
                    type="number"
                    id="phone"
                    value={phone ?? ""}
                    onChange={(e) => setPhone(parseInt(e.target.value) ?? 0)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Ex: (11) 99999-9999"
                    required
                  />
                </div>
                <div className="mb-1">
                  <label
                    htmlFor="address "
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Endereço
                  </label>
                  <input
                    type="address"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Insira seu endereço"
                    required
                  />
                </div>
                <div className="mb-1">
                  <label
                    htmlFor="address "
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    CPF
                  </label>
                  <input
                    type="number"
                    id="cpf"
                    value={cpf ?? ""}
                    onChange={(e) => setCpf(parseInt(e.target.value) ?? 0)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Insira seu CPF (somente números)"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="file_input"
                  >
                    Escolher foto de perfil
                  </label>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                    onChange={onFileChange}
                  />
                </div>
                <div className="flex justify-center">
                  <Avatar>
                    <AvatarImage
                      src={ppURL}
                      alt="Seu avatar"
                    />
                    <AvatarFallback>Carregando</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
            <div className="max-w-full w-96">
              <div className="grid gap-6 mb-6 grid-col">
                <h2 className="text-xl font-bold">Dados do Cartão</h2>
                <div className="mb-1">
                  <label
                    htmlFor="cardName"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nome no cartão
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Insira o nome no seu cartão"
                    required
                  />
                </div>
                <div className="mb-1">
                  <label
                    htmlFor="cardNumber"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Número do cartão
                  </label>
                  <input
                    type="number"
                    min={0}
                    id="cardNumber"
                    pattern="\d*"
                    value={cardNumber ?? ""}
                    onChange={(e) => setCardNumber(parseInt(e.target.value.slice(0, 20)) ?? 0)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Insira o número do seu cartão"
                    required
                  />
                </div>
                <div className="mb-1">
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    CVC
                  </label>
                  <input
                    type="password"
                    id="cardCVC"
                    value={cardCVC ?? ""}
                    onChange={(e) => setCardCVC(parseInt(e.target.value) ?? 0)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Código de verificação"
                    maxLength={3}
                    required
                  />
                </div>
                <div className="mb-1">
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
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
                <div className="mb-1">
                  <label
                    htmlFor="password"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
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
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-12 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {savedId ? "Alterar" : "Cadastrar"}
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}
