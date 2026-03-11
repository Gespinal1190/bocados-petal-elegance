import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import heroImage from "@/assets/hero-restaurant.jpg";

const About = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="nosotros" className="section-padding overflow-hidden">
      <div className="container-custom px-4">
        <div
          ref={sectionRef}
          className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Text */}
          <div className="space-y-6 order-2 lg:order-1">
            <p className="font-display italic text-2xl md:text-3xl text-primary">
              Bienvenido
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-wide uppercase">
              Bocados Restobar
            </h2>
            <div className="w-16 h-px bg-primary/40" />
            <p className="text-muted-foreground leading-relaxed">
              Disfruta de nuestras vistas, momentos en la mejor compañía y gran
              ambiente en <strong className="text-foreground">Bocados Restobar</strong>.
              Somos un restaurante en Vilanova i la Geltrú donde la gastronomía
              se fusiona con un espacio acogedor y moderno.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Ofrecemos desayunos, comidas, cenas, cafés especiales, crepes,
              gofres, entrecot y mucho más. Cada plato está preparado con
              ingredientes de calidad y un toque único que nos distingue.
            </p>
            <a
              href="#menu"
              className="btn-outline inline-block mt-4"
            >
              VER CARTA
            </a>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={heroImage}
                alt="Interior de Bocados Restobar"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;