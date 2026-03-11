import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Menu from "@/components/Menu";
import Gallery from "@/components/Gallery";
import Reservations from "@/components/Reservations";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Reservations />
      <Location />
      <Footer />
    </main>
  );
};

export default Index;