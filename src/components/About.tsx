import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import heroImage from "@/assets/hero-restaurant.jpg";

const About = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="nosotros" className="section-padding overflow-hidden bg-primary text-primary-foreground">
      <div className="container-custom">
        <div
          ref={sectionRef}
          className={`grid items-center gap-14 transition-all duration-1000 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Text */}
          <div className="order-2 space-y-7 lg:order-1">
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-secondary">
              Nuestra casa
            </p>
            <h2 className="font-display text-5xl leading-none md:text-7xl">
              Aquí, cada momento sabe <em>mejor.</em>
            </h2>
            <div className="h-px w-20 bg-secondary/60" />
            <p className="max-w-xl leading-relaxed text-primary-foreground/75">
              Disfruta de nuestras vistas, momentos en la mejor compañía y gran
               ambiente en <strong className="text-primary-foreground">Bocados Restobar</strong>.
              Somos un restaurante en Vilanova i la Geltrú donde la gastronomía
              se fusiona con un espacio acogedor y moderno.
            </p>
            <p className="max-w-xl leading-relaxed text-primary-foreground/75">
              Ofrecemos desayunos, comidas, meriendas y cenas. Cada plato está
              preparado con ingredientes de calidad y un toque único que nos
              distingue.
            </p>
            <a
              href="#menu"
              className="inline-flex border border-primary-foreground/50 px-8 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary"
            >
              VER CARTA
            </a>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="aspect-[4/3] overflow-hidden lg:aspect-[4/5]">
              <img
                src={heroImage}
                alt="Interior de Bocados Restobar"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;