import { Coffee, Utensils, Heart } from "lucide-react";

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

const About = () => {
  return (
    <section id="nosotros" className="section-padding bg-muted/30">
      <div className="container-custom px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-sm font-medium tracking-widest uppercase text-primary">
            Conócenos
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mt-3 mb-6 text-foreground">
            Sobre Nosotros
          </h2>
          <div className="divider-flower">
            <span className="text-2xl">✿</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-foreground/80">
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
          </div>

          <div className="grid gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-elegant flex items-start gap-4 hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
