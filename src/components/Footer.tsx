import { MapPin, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="container-custom px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="font-display text-2xl font-semibold mb-2">
              Bocados Restobar
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Carrer dels Caputxins, 4 – Vilanova i la Geltrú
              </span>
              <span className="hidden sm:inline">•</span>
              <a href="tel:+34931427406" className="flex items-center gap-1 hover:text-primary-foreground transition-colors">
                <Phone className="w-4 h-4" />
                +34 931 42 74 06
              </a>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#inicio" className="hover:text-primary transition-colors">Inicio</a>
            <a href="#nosotros" className="hover:text-primary transition-colors">Nosotros</a>
            <a href="#menu" className="hover:text-primary transition-colors">Menú</a>
            <a href="#galeria" className="hover:text-primary transition-colors">Galería</a>
            <a href="#ubicacion" className="hover:text-primary transition-colors">Ubicación</a>
          </nav>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/60">
            © {currentYear} Bocados Restobar – Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
