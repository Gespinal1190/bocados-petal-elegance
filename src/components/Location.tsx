import { MapPin, Phone, Clock } from "lucide-react";

const scheduleData = [
  { days: "Lunes a Sábado", hours: "09:30 – 23:00" },
  { days: "Domingo", hours: "10:00 – 23:00" },
];

const Location = () => {
  return (
    <section id="ubicacion" className="section-padding">
      <div className="container-custom px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-medium tracking-widest uppercase text-primary">
            Encuéntranos
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mt-3 mb-6 text-foreground">
            Ubicación y Horarios
          </h2>
          <div className="divider-flower">
            <span className="text-2xl">✿</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Info Cards */}
          <div className="space-y-6">
            <div className="card-elegant">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    Dirección
                  </h3>
                  <p className="text-muted-foreground">
                    Carrer dels Caputxins, 4<br />
                    08800 Vilanova i la Geltrú<br />
                    Barcelona, España
                  </p>
                </div>
              </div>
            </div>

            <div className="card-elegant">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    Teléfono
                  </h3>
                  <a
                    href="tel:+34931427406"
                    className="text-primary hover:underline text-lg"
                  >
                    +34 931 42 74 06
                  </a>
                </div>
              </div>
            </div>

            <div className="card-elegant">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    Horarios
                  </h3>
                  <div className="space-y-2">
                    {scheduleData.map((schedule, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{schedule.days}</span>
                        <span className="font-medium text-foreground">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="card-elegant p-0 overflow-hidden h-[400px] lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.454885770531!2d1.721627!3d41.2239686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a381f1492a7533%3A0x6aa1bb7f7159cd79!2sBocados%20Restobar!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Bocados Restobar"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
