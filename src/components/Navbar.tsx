import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#menu", label: "Menú" },
  { href: "#galeria", label: "Galería" },
  { href: "#reservas", label: "Reservas" },
  { href: "#ubicacion", label: "Ubicación" },
  { href: "#contacto", label: "Contacto" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/98 backdrop-blur-lg shadow-md py-2"
          : "bg-foreground/30 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 px-4">
          <a 
            href="#inicio" 
            className={`font-display text-2xl font-semibold transition-colors ${
              scrolled ? "text-foreground" : "text-primary-foreground"
            }`}
          >
            Bocados
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  scrolled 
                    ? "text-foreground/80 hover:text-primary" 
                    : "text-primary-foreground/90 hover:text-primary-foreground"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+34931427406"
              className="flex items-center gap-2 bg-primary text-primary-foreground text-sm py-2.5 px-5 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg"
            >
              <Phone className="w-4 h-4" />
              Reservar
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 transition-colors ${
              scrolled ? "text-foreground" : "text-primary-foreground"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-background border-t border-border animate-fade-in">
            <div className="flex flex-col py-4 px-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="py-2 text-foreground/80 hover:text-primary transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:+34931427406"
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-full py-3 font-semibold mt-2"
              >
                <Phone className="w-4 h-4" />
                Reservar Mesa
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
