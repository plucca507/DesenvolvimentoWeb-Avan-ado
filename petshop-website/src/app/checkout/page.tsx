"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearCartItems, getCartItems } from "@/utils/functions";
import { Client, ProductItem } from "../../../types";
import { toast } from "react-hot-toast";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const cartItems = getCartItems();
  const [productItems, setProductItems] = useState<ProductItem[]>();
  const [client, setClient] = useState<Client>();
  const [loadedProducts, setLoadedProducts] = useState(false);
  const [loadedClient, setLoadedClient] = useState(false);

  const { push } = useRouter();

  useEffect(() => {
    if (!(typeof window !== "undefined" ? localStorage.getItem("token") : null))
      return push("/login");
    fetch("/api/checkout/getitems", {
      body: JSON.stringify({ items: cartItems }),
      method: "POST",
    }).then(async (res) => {
      if (!res.ok) return toast.error("Erro ao processar seu carrinho");
      const data: ProductItem[] = await res.json();
      setProductItems(data);
      setLoadedProducts(true);
    });

    fetch("/api/client/getdata", {
      body: JSON.stringify({
        token:
          typeof window !== "undefined" ? localStorage.getItem("token") : null,
      }),
      method: "POST",
    }).then(async (res) => {
      if (!res.ok) return toast.error("Erro ao processar seu carrinho");
      const data: Client = await res.json();
      setClient(data);
      setLoadedClient(true);
    });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productItems || productItems?.length < 1)
      return toast.error("Você não tem nenhum item no carrinho");
    const items = productItems?.map((c) => c.productItem._id);
    const price = productItems?.reduce((s, a) => s + a.productItem.price, 0);
    fetch("/api/request", {
      body: JSON.stringify({ products: items, price, client: client?._id }),
      method: "POST",
    }).then(async (res) => {
      if (!res.ok) return toast.error("Erro ao processar pedido");
      toast.success("Pedido enviado");
      setProductItems([]);
      clearCartItems();
      setTimeout(() => push("/"), 5000);
    });
  };

  return !(loadedProducts && loadedClient) ? (
    <LoadingScreen />
  ) : (
    <div className="flex justify-center items-center w-full h-full">
      <div>
        <h1 className="text-3xl font-bold text-center py-4">Checkout</h1>

        <form onSubmit={handleSubmit}>
          {/* @ts-expect-error */}
          <div className="flex justify-center" onSubmit={handleSubmit}>
            <div className="grid gap-6 grid-col grid-cols-2">
              <div className="max-w-full w-96">
                <div className="grid gap-6 mb-6 grid-col">
                  <h2 className="text-xl font-bold">Itens</h2>
                  {productItems && productItems.length ? (
                    <ul>
                      {productItems?.map((p) => (
                        <li key={p.timestamp}>
                          <label className="font-bold">{p.qnt}x</label>{" "}
                          {p.productItem.name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <h1>Nenhum item adicionado</h1>
                  )}
                </div>
              </div>
              <div className="max-w-full w-96">
                <div className="grid gap-6 mb-6 grid-col">
                  <h2 className="text-xl font-bold">Dados do Cartão</h2>
                  <h1>
                    {client?.creditcard} - {client?.cvc}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-12 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Finalizar pedido
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
