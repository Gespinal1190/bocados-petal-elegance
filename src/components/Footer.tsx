import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import logoBocados from "@/assets/logo-bocados.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground px-5 py-20 text-primary-foreground md:px-10 md:py-28">
      <div className="container-custom">
        <div className="mb-16 text-center">
          <img
            src={logoBocados}
            alt="Bocados Restobar"
            className="mx-auto mb-10 h-16 w-auto brightness-0 invert"
          />
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] uppercase tracking-[0.16em]">
            <a href="#inicio" className="hover:opacity-70 transition-opacity">Inicio</a>
            <a href="#nosotros" className="hover:opacity-70 transition-opacity">Nosotros</a>
            <a href="#menu" className="hover:opacity-70 transition-opacity">Menú</a>
            <a href="#galeria" className="hover:opacity-70 transition-opacity">Galería</a>
            <a href="#reservas" className="hover:opacity-70 transition-opacity">Reservas</a>
            <a href="#ubicacion" className="hover:opacity-70 transition-opacity">Ubicación</a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-5 border-t border-primary-foreground/10 pt-8 sm:flex-row">
          <p className="text-xs text-primary-foreground/50">
            © {currentYear} Bocados Restobar — Todos los derechos reservados.
          </p>
          <Link
            to="/auth"
            className="text-xs text-primary-foreground/30 hover:text-primary-foreground/50 transition-colors flex items-center gap-1"
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