import { MapPin, Phone, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import logoBocados from "@/assets/logo-bocados.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="container-custom px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <img 
              src={logoBocados} 
              alt="Bocados Restobar" 
              className="h-12 w-auto brightness-0 invert mb-2"
            />
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

        <div className="border-t border-primary-foreground/10 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {currentYear} Bocados Restobar – Todos los derechos reservados.
          </p>
          <Link 
            to="/auth" 
            className="text-xs text-primary-foreground/40 hover:text-primary-foreground/60 transition-colors flex items-center gap-1"
          >
            <Lock className="w-3 h-3" />
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
