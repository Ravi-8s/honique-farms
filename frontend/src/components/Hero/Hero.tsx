import "./Hero.css";
import bottle from "../../assets/images/honey-bottle.png";

function Hero() {
  function scrollToSection(id: string) {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  }

  return (
    <section id="home" className="hero">

      <div className="hero-left">

        <p className="tagline">Hive to Home</p>

        <h1>
          Pure Honey.
          <br />
          Crafted by Nature.
          <br />
          Delivered with Care.
        </h1>

        <p className="description">
          Experience the richness of pure multiflora honey,
          carefully harvested, laboratory tested and packed
          with purity for your family.
        </p>

        <div className="hero-buttons">

          <button
            onClick={() => scrollToSection("products")}
          >
            Shop Honey
          </button>

          <button
            className="outline"
            onClick={() => scrollToSection("contact")}
          >
            Contact Us
          </button>

        </div>

      </div>

      <div className="hero-right">
        <img
          src={bottle}
          alt="Honique Farms Honey Bottle"
        />
      </div>

    </section>
  );
}

export default Hero;
