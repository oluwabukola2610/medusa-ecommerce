const priceList = [29.99, 49.99, 79.99, 99.99, 129.99]; // Example prices

export const generateFixedPrice = (id: string): string => {
  if (!id || typeof id !== "string") {
    console.error("Invalid product ID:", id);
    return "0.00"; // Default fallback price
  }

  const index =
    Array.from(id).reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    priceList.length;

  return `${priceList[index].toFixed(2)}`;
};
