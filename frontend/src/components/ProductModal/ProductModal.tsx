import "./ProductModal.css";

type Product = {
  title: string;
  type: string;
  size: string;
  description: string;
};

type Props = {
  product: Product | null;
  onClose: () => void;
};

function ProductModal({ product, onClose }: Props) {

  if (!product) return null;

  const phoneNumber = "918500001065";

  const message = `Hi Honique Farms! I'm interested in the ${product.title} - ${product.size}.`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (

    <div className="modal-overlay">

      <div className="modal">

        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>{product.title}</h2>

        <h3>{product.type}</h3>

        <p className="modal-size">{product.size}</p>

        <p>{product.description}</p>

        <div className="features-list">

          <p>✅ 100% Pure Multiflora Honey</p>

          <p>✅ Lab Tested</p>

          <p>✅ No Added Sugar</p>

          <p>✅ No Artificial Preservatives</p>

          <p>✅ Packed with Care</p>

        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="order-btn"
        >
          Order on WhatsApp
        </a>

      </div>

    </div>

  );
}

export default ProductModal;
