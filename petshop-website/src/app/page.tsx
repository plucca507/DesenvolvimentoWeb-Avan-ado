"use client";

import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Category, SortType } from "../../types";
import Image from "next/image";
import Link from "next/link";
import { addToCart } from "@/utils/functions";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState<SortType>(SortType.NAME);
  const [loading, setLoading] = useState(true);

  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch('/api/websitedata').then(res => res.json()).then((res: Category[]) => setCategoryList(res));
      setLoading(false);
    }

    // call the function
    fetchData()
      .catch(console.error);
  }, [])

  // const [categoryList, setCategoryList] = useState<Category[]>([
  //   {
  //     code: "001",
  //     description: "teste",
  //     name: "Peitoral",
  //     products: [
  //       {
  //         name: "Peitoral para cachorros HZee.Dog X MTV",
  //         animal: "Cachorros",
  //         category: "Peitoral",
  //         categoryId: "0001",
  //         codigo: "001",
  //         description:
  //           "O peitoral H para cachorros MTV Music Television é um produto exclusivo da colaboração com a Zee.Dog. Para celebrar a nostalgia dos anos dourados da MTV, desenvolvemos uma coleção inspirada na estética do canal nos anos 80 e 90. É feito de poliéster resistente, o mesmo usado em cintos de segurança. Possui grande capacidade de ajuste tanto no pescoço quanto na cintura, sendo de fácil adaptação e possui duas posições para prender a guia. Assim como os cintos de segurança, é recomendado evitar contato com superfícies ásperas ou cortantes como mordidas, por exemplo.",
  //         imageURL:
  //           "https://ik.imagekit.io/decocx/tr:w-840,h-840/https:/zeedog.vteximg.com.br/arquivos/mtv-h-harness-main-1.jpg",
  //         price: 139,
  //         reviews: [],
  //       },
  //       {
  //         name: "Coleira para cachorros HZee.Dog X MTV",
  //         animal: "Cachorros",
  //         category: "Peitoral",
  //         categoryId: "0001",
  //         codigo: "001",
  //         description:
  //           "O peitoral H para cachorros MTV Music Television é um produto exclusivo da colaboração com a Zee.Dog. Para celebrar a nostalgia dos anos dourados da MTV, desenvolvemos uma coleção inspirada na estética do canal nos anos 80 e 90. É feito de poliéster resistente, o mesmo usado em cintos de segurança. Possui grande capacidade de ajuste tanto no pescoço quanto na cintura, sendo de fácil adaptação e possui duas posições para prender a guia. Assim como os cintos de segurança, é recomendado evitar contato com superfícies ásperas ou cortantes como mordidas, por exemplo.",
  //         imageURL:
  //           "https://ik.imagekit.io/decocx/tr:w-840,h-840/https:/zeedog.vteximg.com.br/arquivos/mtv-h-harness-main-1.jpg",
  //         price: 150,
  //         reviews: [],
  //       },
  //     ],
  //   },
  // ]);

  return (
    (loading ? <LoadingScreen /> : <>
      <h1 className="text-3xl md:text-4xl font-bold text-center py-2 pb-5">
        🐶 E-commerce Petshop
      </h1 >

      <div className="flex justify-center">
        <div className="w-96 px-2">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Procurar
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Procure pelos produtos (Ex: Coleira)"
              required
            />
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="px-4 bg-gray-200 rounded-lg">
            Opções
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Filtrar</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSortType(SortType.P_ASC)}>
              Menor preço
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortType(SortType.P_DSC)}>
              Maior Preço
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortType(SortType.NAME)}>
              Nome
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {
        categoryList
          .filter(
            (c) =>
              c.products?.filter((p) => p.name.toLowerCase().includes(searchText))
                .length
          )
          .map((c) => {
            return (
              <div key={c.code} className="pt-5 grid justify-center">
                <div className="h-10 md:h-14 mx-12">
                  <h1 className="text-center my-auto pt-2 md:pt-3 text-xl md:text-3xl font-semibold">
                    {c.name}
                  </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 mx-4 md:mx-24 gap-x-12 gap-y-5 my-5">
                  {c.products?.filter((p) => p.name.toLowerCase().includes(searchText))
                    .sort(function (a, b) {
                      switch (sortType) {
                        case SortType.P_ASC:
                          return a.price < b.price
                            ? -1
                            : a.price > b.price
                              ? 1
                              : 0;
                        case SortType.P_DSC:
                          return a.price < b.price
                            ? 1
                            : a.price > b.price
                              ? -1
                              : 0;
                        case SortType.NAME:
                          return a.name.toLowerCase() < b.name.toLowerCase()
                            ? -1
                            : a.name.toLowerCase() > b.name.toLowerCase()
                              ? 1
                              : 0;
                      }
                    })
                    .map((p) => (
                      <div
                        className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                        key={p.code}
                      >
                        <Link href={`/produto/${p.code}`} tabIndex={-1}>
                          <Image
                            className="rounded-lg"
                            src={p.cover}
                            alt=""
                            width={1200}
                            height={1200}
                          />
                        </Link>
                        <div className="p-5">
                          <Link href={`/produto/${p.code}`} tabIndex={-1}>
                            <h5 className="mb-2 md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                              {p.name}
                              <br />
                              <label className="font-semibold cursor-pointer">R$ {p.price},00</label>
                            </h5>
                          </Link>
                          <div className="flex justify-center">
                            <button
                              onClick={() => addToCart(p.code)}
                              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-xl hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Adicionar ao carrinho
                              <svg
                                aria-hidden="true"
                                className="w-4 h-4 ml-2 -mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            );
          })
      }
    </>)
  );
}
