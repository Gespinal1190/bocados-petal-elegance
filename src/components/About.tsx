import { Coffee, Utensils, Heart, Clock, Star, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import heroImage from "@/assets/hero-restaurant.jpg";

const features = [
  {
    icon: Coffee,
    title: "Cafés Especiales",
    description: "Desayunos con café de especialidad y zumos naturales",
  },
  {
    icon: Utensils,
    title: "Cocina Creativa",
    description: "Platos elaborados con ingredientes de calidad",
  },
  {
    icon: Heart,
    title: "Ambiente Único",
    description: "Decoración cálida con nuestra icónica pared de flores",
  },
];

const stats = [
  { icon: Clock, value: "13+", label: "Horas abiertos" },
  { icon: Star, value: "4.8", label: "Valoración" },
  { icon: Users, value: "50+", label: "Plazas" },
];

const About = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="nosotros" className="section-padding bg-muted/30 overflow-hidden">
      <div className="container-custom px-4">
        <div 
          ref={headerRef}
          className={`max-w-3xl mx-auto text-center mb-12 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-sm font-medium tracking-widest uppercase text-primary">
            Conócenos
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-3 mb-6 text-foreground">
            Sobre Nosotros
          </h2>
          <div className="divider-flower">
            <span className="text-2xl text-primary">✿</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div 
            ref={imageRef}
            className={`relative transition-all duration-1000 ${
              imageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Interior de Bocados Restobar" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gold/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          {/* Content */}
          <div 
            ref={contentRef}
            className={`space-y-6 transition-all duration-1000 delay-200 ${
              contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}
          >
            <p className="text-xl leading-relaxed text-foreground">
              Bienvenido a <strong className="text-primary">Bocados Restobar</strong>, 
              un espacio diseñado para quienes disfrutan de la buena gastronomía 
              en un ambiente moderno y elegante.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Nuestro local destaca por su pared de flores rosadas y una 
              decoración cálida que invita a relajarse. Ofrecemos desayunos, 
              comidas, cenas, cafés especiales, crepes, gofres, pulpa, entrecot 
              y mucho más.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Cada plato está preparado con ingredientes de calidad y un toque 
              único que nos distingue.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center p-4 bg-card rounded-2xl border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div 
          ref={featuresRef}
          className="grid md:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={`card-elegant text-center group hover:scale-[1.03] transition-all duration-500 ${
                featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-rose-medium/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
