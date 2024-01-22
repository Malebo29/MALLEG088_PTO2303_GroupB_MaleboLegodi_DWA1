const products = [
  { product: "banana", price: "2" },
  { product: "mango", price: 6 },
  { product: "potato", price: " " },
  { product: "avocado", price: "8" },
  { product: "coffee", price: 10 },
  { product: "tea", price: "" },
];

console.log(
  products.forEach((product) => console.log(product.product)),

  products.filter((product) => product.product.length <= 5),

  products
    .filter((product) => product.price !== "" && product.price !== " ")
    .map((product) => ({ ...product, price: Number(product.price) }))
    .reduce((total, product) => total + product.price, 0),

  products.reduce((names, product, index) => {
    if (index === products.length - 1) {
      return `${names} and ${product.product}`;
    } else if (index === 0) {
      return product.product;
    } else {
      return `${names}, ${product.product}`;
    }
  }, ""),

  products.reduce(
    (result, product) => {
      const price = Number(product.price);
      if (price) {
        if (!result.highest || price > result.highest.price) {
          result.highest = product;
        }
        if (!result.lowest || price < result.lowest.price) {
          result.lowest = product;
        }
      }
      return result;
    },
    { highest: null, lowest: null }
  ),

  products.map((product) =>
    Object.entries(product).reduce((newProduct, [key, value]) => {
      if (key === "product") {
        newProduct["name"] = value;
      } else if (key === "price") {
        newProduct["cost"] = value;
      }
      return newProduct;
    }, {})
  )
);
