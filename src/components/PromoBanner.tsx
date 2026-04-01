import { useState } from "react";
import { X } from "lucide-react";

const BANNER_HEIGHT = "40px";

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const scrollToReservas = () => {
    sessionStorage.setItem("promo_web_20", "true");
    const el = document.getElementById("reservas");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Spacer to push content below the fixed banner */}
      <div style={{ height: BANNER_HEIGHT }} />
      <div
        className="fixed top-0 left-0 right-0 bg-primary text-primary-foreground py-2 px-4 text-center"
        style={{ zIndex: 60, height: BANNER_HEIGHT }}
      >
        <div className="container-custom flex items-center justify-center gap-2 h-full relative">
          <span className="text-sm md:text-base font-medium">
            🎉 ¡Reserva por la web y obtén un <strong>20% de descuento</strong>!
          </span>
          <button
            onClick={scrollToReservas}
            className="ml-2 underline underline-offset-2 text-sm font-semibold hover:opacity-80 transition-opacity cursor-pointer"
          >
            Reservar ahora
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity cursor-pointer"
            aria-label="Cerrar banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default PromoBanner;
