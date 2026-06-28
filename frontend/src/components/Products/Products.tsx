import "./Products.css";

import bottle1kg from "../../assets/products/1kg.png";
import jar500g from "../../assets/products/500g.png";

function Products() {
  const products = [
    {
      image: bottle1kg,
      brand: "Honique Farms",
      title: "Golden Nectar",
      type: "Multiflora Honey",
      size: "1 KG (750 ml Bottle)",
      description:
        "Pure multiflora honey naturally collected from the nectar of diverse seasonal flowers, offering a rich aroma, smooth texture, and authentic taste. Ideal for families and regular daily use.",
    },
    {
      image: jar500g,
      brand: "Honique Farms",
      title: "Golden Nectar",
      type: "Multiflora Honey",
      size: "500 g (370 ml Jar)",
      description:
        "Pure multiflora honey sourced from a variety of flowering plants, carefully packed to preserve its natural flavor and goodness. Perfect for gifting and everyday enjoyment.",
    },
  ];

  return (
    <section id="products" className="products">
      <h2>Our Products</h2>

      <p className="subtitle">
        Pure. Natural. Farm Fresh.
      </p>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.size}>
            <img src={product.image} alt={product.size} />

            <h5>{product.brand}</h5>

            <h3>{product.title}</h3>

            <h4>{product.type}</h4>

            <p className="size">{product.size}</p>

            <p>{product.description}</p>

            <button>View Details</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;
