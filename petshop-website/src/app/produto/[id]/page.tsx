import Image from "next/image";
import { Product } from "../../../../types";
import CartButton from "@/components/CartButton";
import { headers } from "next/headers";

async function getData(id: string) {
  const headersList = headers();
  const domain = headersList.get('host') || "";

  return await fetch(`http://${domain}/api/product/${id}`).then(res => res.json())
}

export default async function Home({ params: { id } }: { params: { id: string } }) {

  const product: Product = await getData(id);

  return (
    <div>
      <h1 className="text-xl md:text-3xl font-bold text-center md:py-4 md:smb-3">
        {product.name} - Detalhes
      </h1>

      <div className="pt-2 md:pt-5">
        <div className="md:px-36 grid grid-col md:grid-cols-2">
          <div className="w-screen h-80 md:w-full md:h-full relative">
            <Image
              src={product.cover ?? ""}
              alt="Imagem do produto"
              fill
              style={{ objectFit: "contain" }}
              className="rounded-lg object-contain"
            />
          </div>
          <div className="justify-center py-2 md:py-32">
            <div className="w-full">
              <h1 className="text-center font-bold text-2xl md:text-3xl">{product.name}</h1>
              <h1 className="text-center text-lg md:text-2xl">({product.category.name})</h1>
              <h1 className="text-base md:text-xl py-2 px-5">{product.description}</h1>
              <h1 className="text-center text-lg md:text-2xl font-semibold">R$ {product.price},00</h1>
              <h1 className="text-center text-lg md:text-2xl">Nota: <label className="font-bold">{product.rate ?? 5}</label></h1>
              {product.stock > 1 ? <h1 className="text-center text-xl md:text-2xl underline pt-2"><label className="font-bold">{product.stock}</label> restantes</h1> : <h1 className="text-center text-xl md:text-3xl font-bold text-red-500 pt-2">ESGOTADO</h1>}
            </div>
            <div className="flex justify-center pt-2 md:pt-14">
              <CartButton id={id} />
            </div>
          </div>
        </div>
        <div className="h-10 md:h-14 rounded-xl py-3 md:py-8 mx-2 md:mx-36">
          <h1 className="text-center my-auto py-1 md:py-2 text-xl md:text-3xl font-semibold">
            Comentários
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-y-2 py-4 px-2 md:px-36">
          <div className="py-4">
            {product.reviews.map((r) => {
              return (
                <article key={r.id} className="bg-gray-100 rounded-lg px-2">
                  <div className="flex items-center mb-1 space-x-4">
                    <div className="space-y-1 font-medium dark:text-white">
                      <p>{r.author}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-1">
                    {[...Array(r.rate)].map((_, i) => (
                      <svg
                        key={i}
                        aria-hidden="true"
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Estrela avaliada</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                    {[...Array(r.rate < 5 ? 5 - r.rate : 0)].map((_, i) => (
                      <svg
                        key={i}
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Estrela restante</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <p className="mb-2 pb-2 text-gray-500 dark:text-gray-400">
                    {r.content}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
