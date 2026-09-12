import type { CSSProperties } from "react";
import logoBocados from "@/assets/logo-bocados.png";

const floatingMarks = Array.from({ length: 10 }, (_, index) => index);

const FloatingLogo = () => {
  const logoStyle = { "--floating-logo": `url(${logoBocados})` } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      className="floating-bocados-background pointer-events-none fixed inset-0 z-20 overflow-hidden"
      style={logoStyle}
    >
      {floatingMarks.map((mark) => (
        <span key={mark} className="floating-bocados-mark absolute bg-primary" />
      ))}
    </div>
  );
};

export default FloatingLogo;