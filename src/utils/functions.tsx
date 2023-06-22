import toast from "react-hot-toast";

export function addToCart(id: string) {
  if (typeof window == "undefined") return;

  let jsonItems = localStorage.getItem("cart");
  const localItems = JSON.parse(jsonItems ?? '{ "items": []} ');
  const existing = localItems.items.filter(
    (i: { productId: any }) => i.productId
  )[0];

  if (existing) {
    existing.qnt++;
    localStorage.setItem("cart", JSON.stringify(localItems));

    toast.success(
      `Adicionado! Agora você tem ${existing.qnt} unidades no seu carrinho`
    );
    return;
  }

  localItems.items.push({
    productId: id,
    timestamp: Date.now(),
    qnt: 1,
  });
  localStorage.setItem("cart", JSON.stringify(localItems));
  toast.success(`Produto adicionado ao carrinho`);
}

export function getCartItems() {
  if (typeof window == "undefined") return;
  return JSON.parse(localStorage.getItem("cart") ?? '{ "items": []} ').items;
}

export function clearCartItems() {
  if (typeof window == "undefined") return;
  localStorage.removeItem("cart");
}
