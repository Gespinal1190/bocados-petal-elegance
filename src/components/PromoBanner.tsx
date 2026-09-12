import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const BANNER_HEIGHT = "44px";

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
        className="fixed inset-x-0 top-0 bg-primary text-primary-foreground px-4 text-center"
        style={{ zIndex: 60, height: BANNER_HEIGHT }}
      >
        <div className="container-custom flex items-center justify-center gap-2 h-full relative">
          <span className="truncate text-[10px] font-medium uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.2em]">
            Reserva online · <strong>20% de descuento</strong>
          </span>
          <Button
            type="button"
            variant="link"
            onClick={scrollToReservas}
            className="h-auto shrink-0 p-0 text-[10px] font-semibold uppercase tracking-[0.08em] text-primary-foreground underline underline-offset-4 hover:text-primary-foreground/70 sm:text-xs"
          >
            Reservar ahora
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible(false)}
            className="absolute right-0 top-1/2 h-9 w-9 -translate-y-1/2 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:right-2"
            aria-label="Cerrar banner"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default PromoBanner;
