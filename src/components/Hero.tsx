import { MapPin, UtensilsCrossed, CalendarDays } from "lucide-react";
import heroImage from "@/assets/hero-restaurant.jpg";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Interior del restaurante Bocados Restobar con pared de flores rosadas"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom px-4 text-center pt-20">
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-up">
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-primary">
            Bienvenidos
          </span>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold text-foreground leading-tight">
            Bocados Restobar
          </h1>
          
          <p className="font-display text-xl md:text-2xl text-foreground/80 italic">
            Gastronomía completa en Vilanova i la Geltrú
          </p>
          
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Te ofrecemos una experiencia culinaria única que combina sabor, 
            creatividad y un ambiente acogedor. Desde desayunos especiales 
            hasta cenas completas, queremos que cada visita sea deliciosa y memorable.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a href="#menu" className="btn-primary">
              <UtensilsCrossed className="w-4 h-4 mr-2" />
              Ver Menú
            </a>
            <a href="tel:+34931427406" className="btn-outline">
              <CalendarDays className="w-4 h-4 mr-2" />
              Reservar Mesa
            </a>
            <a
              href="#ubicacion"
              className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Ubicación
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
