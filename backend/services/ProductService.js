const products = [
  {
    id: 1,
    name: "Golden Nectar",
    category: "Honey",
    weight: "1 KG",
    price: 699,
    stock: 25,
    isActive: true,
  },
  {
    id: 2,
    name: "Golden Nectar",
    category: "Honey",
    weight: "500 g",
    price: 399,
    stock: 40,
    isActive: true,
  },
];

const getAllProducts = () => {
  return products;
};

module.exports = {
  getAllProducts,
};
