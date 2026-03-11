import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import logoBocados from "@/assets/logo-bocados.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container-custom px-4">
        <div className="text-center mb-10">
          <img
            src={logoBocados}
            alt="Bocados Restobar"
            className="h-14 w-auto brightness-0 invert mx-auto mb-6"
          />
          <div className="flex flex-wrap justify-center gap-8 text-xs tracking-[0.2em] uppercase">
            <a href="#inicio" className="hover:opacity-70 transition-opacity">Inicio</a>
            <a href="#nosotros" className="hover:opacity-70 transition-opacity">Nosotros</a>
            <a href="#menu" className="hover:opacity-70 transition-opacity">Menú</a>
            <a href="#galeria" className="hover:opacity-70 transition-opacity">Galería</a>
            <a href="#reservas" className="hover:opacity-70 transition-opacity">Reservas</a>
            <a href="#ubicacion" className="hover:opacity-70 transition-opacity">Ubicación</a>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
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