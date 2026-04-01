import { useState } from "react";
import { X } from "lucide-react";

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const scrollToReservas = () => {
    const el = document.getElementById("reservas");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-primary text-primary-foreground py-2.5 px-4 text-center relative z-50">
      <div className="container-custom flex items-center justify-center gap-2">
        <span className="text-sm md:text-base font-medium">
          🎉 ¡Reserva por la web y obtén un <strong>20% de descuento</strong>!
        </span>
        <button
          onClick={scrollToReservas}
          className="ml-2 underline underline-offset-2 text-sm font-semibold hover:opacity-80 transition-opacity"
        >
          Reservar ahora
        </button>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
          aria-label="Cerrar banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default PromoBanner;
