import { MapPin, UtensilsCrossed, CalendarDays } from "lucide-react";
import { useParallax } from "@/hooks/use-scroll-animation";
import heroImage from "@/assets/hero-restaurant.jpg";

const Hero = () => {
  const { ref: parallaxRef, offset } = useParallax(0.4);

  return (
    <section
      id="inicio"
      ref={parallaxRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 scale-110"
        style={{ transform: `translateY(${offset * 0.5}px) scale(1.1)` }}
      >
        <img
          src={heroImage}
          alt="Interior del restaurante Bocados Restobar con pared de flores rosadas"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom px-4 text-center pt-20">
        <div className="max-w-3xl mx-auto space-y-6">
          <span 
            className="inline-block text-sm font-medium tracking-widest uppercase text-rose-light px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30 animate-fade-in opacity-0"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            Bienvenidos
          </span>
          
          <h1 
            className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold text-primary-foreground leading-tight drop-shadow-lg animate-fade-in opacity-0"
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
          >
            Bocados Restobar
          </h1>
          
          <p 
            className="font-display text-xl md:text-2xl text-primary-foreground/90 italic drop-shadow-md animate-fade-in opacity-0"
            style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
          >
            Gastronomía completa en Vilanova i la Geltrú
          </p>
          
          <p 
            className="text-primary-foreground/80 max-w-xl mx-auto leading-relaxed text-base md:text-lg drop-shadow animate-fade-in opacity-0"
            style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
          >
            Te ofrecemos una experiencia culinaria única que combina sabor, 
            creatividad y un ambiente acogedor. Desde desayunos especiales 
            hasta cenas completas, queremos que cada visita sea deliciosa y memorable.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-fade-in opacity-0"
            style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
          >
            <a 
              href="#menu" 
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl text-base"
            >
              <UtensilsCrossed className="w-5 h-5 mr-2" />
              Ver Menú
            </a>
            <a 
              href="tel:+34931427406" 
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-foreground/10 backdrop-blur-sm border-2 border-primary-foreground/40 text-primary-foreground rounded-full font-semibold transition-all duration-300 hover:bg-primary-foreground/20 hover:border-primary-foreground/60 hover:-translate-y-1 text-base"
            >
              <CalendarDays className="w-5 h-5 mr-2" />
              Reservar Mesa
            </a>
            <a
              href="#ubicacion"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-all duration-300 font-medium hover:-translate-y-0.5"
            >
              <MapPin className="w-5 h-5" />
              Ubicación
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-7 h-12 border-2 border-primary-foreground/50 rounded-full flex items-start justify-center p-1.5">
          <div className="w-2 h-3 bg-primary-foreground rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
