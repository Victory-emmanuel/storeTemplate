export const formatPrice = (priceInKobo) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(priceInKobo / 100); // Convert kobo to Naira
};
