import { useParallax } from "@/hooks/use-scroll-animation";
import heroImage from "@/assets/hero-restaurant.jpg";

const Hero = () => {
  const { ref: parallaxRef, offset } = useParallax(0.3);

  return (
    <section
      id="inicio"
      ref={parallaxRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${offset * 0.3}px)` }}
      >
        <img
          src={heroImage}
          alt="Interior del restaurante Bocados Restobar"
          className="w-full h-full object-cover scale-110"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-foreground/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <p
          className="font-display italic text-2xl md:text-3xl lg:text-4xl text-primary-foreground/90 mb-4 animate-fade-in opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          Bienvenido
        </p>

        <h1
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground tracking-[0.05em] uppercase mb-10 animate-fade-in opacity-0"
          style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
        >
          Bocados Restobar
        </h1>

        <a
          href="#reservas"
          className="inline-block px-10 py-3.5 border border-primary-foreground/60 text-primary-foreground text-xs font-medium tracking-[0.3em] uppercase hover:bg-primary-foreground/10 transition-all duration-300 animate-fade-in opacity-0"
          style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}
        >
          RESERVAS
        </a>
      </div>
    </section>
  );
};

export default Hero;