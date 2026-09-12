import { useEffect, useState } from "react";
import logoBocados from "@/assets/logo-bocados.png";

const FloatingLogo = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setOffset(window.scrollY);
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const drift = Math.sin(offset / 380) * 24;
  const lift = Math.cos(offset / 520) * 18;
  const rotation = Math.sin(offset / 700) * 7;

  return (
    <div
      aria-hidden="true"
      className="floating-bocados-logo pointer-events-none fixed right-[-2.5rem] top-[58%] z-20 flex h-28 w-44 items-center justify-center rounded-full border border-primary-foreground/20 bg-primary/95 px-7 shadow-elevated md:right-[-1.5rem] md:h-36 md:w-60 md:px-10"
      style={{
        transform: `translate3d(${drift}px, ${lift}px, 0) rotate(${rotation}deg)`,
      }}
    >
      <img
        src={logoBocados}
        alt=""
        className="h-auto w-full select-none"
        draggable={false}
      />
    </div>
  );
};

export default FloatingLogo;