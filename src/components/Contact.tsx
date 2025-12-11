import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Contact = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: buttonsRef, isVisible: buttonsVisible } = useScrollAnimation();

  const contactItems = [
    {
      icon: Phone,
      title: "Teléfono",
      content: (
        <a
          href="tel:+34931427406"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          +34 931 42 74 06
        </a>
      ),
    },
    {
      icon: Mail,
      title: "Email",
      content: <span className="text-muted-foreground">info@bocadosrestobar.com</span>,
    },
    {
      icon: MapPin,
      title: "Dirección",
      content: (
        <span className="text-muted-foreground text-sm">
          Carrer dels Caputxins, 4<br />Vilanova i la Geltrú
        </span>
      ),
    },
  ];

  return (
    <section id="contacto" className="section-padding bg-muted/30 overflow-hidden">
      <div className="container-custom px-4">
        <div 
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-sm font-medium tracking-widest uppercase text-primary">
            Contáctanos
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mt-3 mb-6 text-foreground">
            Contacto
          </h2>
          <div className="divider-flower">
            <span className="text-2xl">✿</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <p 
            className={`text-lg text-muted-foreground mb-10 leading-relaxed transition-all duration-700 delay-200 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            ¿Quieres reservar una mesa o tienes alguna consulta? 
            Estamos aquí para ayudarte. Llámanos, escríbenos o visítanos.
          </p>

          <div ref={cardsRef} className="grid sm:grid-cols-3 gap-6 mb-10">
            {contactItems.map((item, index) => (
              <div 
                key={index}
                className={`card-elegant text-center hover:-translate-y-2 transition-all duration-500 ${
                  cardsVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                {item.content}
              </div>
            ))}
          </div>

          <div 
            ref={buttonsRef}
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ${
              buttonsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <a href="tel:+34931427406" className="btn-primary w-full sm:w-auto hover:-translate-y-1 transition-transform">
              <Phone className="w-4 h-4 mr-2" />
              Llamar Ahora
            </a>
            <a
              href="https://www.google.com/maps/place/Bocados+Restobar/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full sm:w-auto hover:-translate-y-1 transition-transform"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Abrir en Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
