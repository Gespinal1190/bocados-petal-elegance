import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

const Contact = () => {
  return (
    <section id="contacto" className="section-padding bg-muted/30">
      <div className="container-custom px-4">
        <div className="text-center mb-12">
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
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            ¿Quieres reservar una mesa o tienes alguna consulta? 
            Estamos aquí para ayudarte. Llámanos, escríbenos o visítanos.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            <div className="card-elegant text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                Teléfono
              </h3>
              <a
                href="tel:+34931427406"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                +34 931 42 74 06
              </a>
            </div>

            <div className="card-elegant text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                Email
              </h3>
              <span className="text-muted-foreground">
                info@bocadosrestobar.com
              </span>
            </div>

            <div className="card-elegant text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                Dirección
              </h3>
              <span className="text-muted-foreground text-sm">
                Carrer dels Caputxins, 4<br />Vilanova i la Geltrú
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:+34931427406" className="btn-primary w-full sm:w-auto">
              <Phone className="w-4 h-4 mr-2" />
              Llamar Ahora
            </a>
            <a
              href="https://www.google.com/maps/place/Bocados+Restobar/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full sm:w-auto"
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
