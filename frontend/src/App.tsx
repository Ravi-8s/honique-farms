import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import TrustBar from "./components/TrustBar/TrustBar";
import Products from "./components/Products/Products";
import About from "./components/About/About";
import WhyChooseUs from "./components/WhyChooseUs/WhyChooseUs";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustBar /> 
      <Products />
      <About />
      <WhyChooseUs />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
