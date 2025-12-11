import { useState, useEffect } from "react";
import { MapPin, Phone, Clock } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { supabase } from "@/integrations/supabase/client";

const Location = () => {
  const [settings, setSettings] = useState({
    phone: "+34 931 42 74 06",
    address: "Carrer dels Caputxins, 4, 08800 Vilanova i la Geltrú, Barcelona",
    schedule_weekdays: "09:30 – 23:00",
    schedule_sunday: "10:00 – 23:00",
  });

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: mapRef, isVisible: mapVisible } = useScrollAnimation({ threshold: 0.2 });

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from("site_settings").select("*");
      if (data) {
        const settingsMap: Record<string, string> = {};
        data.forEach((item) => {
          settingsMap[item.key] = item.value;
        });
        setSettings({
          phone: settingsMap.phone || settings.phone,
          address: settingsMap.address || settings.address,
          schedule_weekdays: settingsMap.schedule_weekdays || settings.schedule_weekdays,
          schedule_sunday: settingsMap.schedule_sunday || settings.schedule_sunday,
        });
      }
    };
    fetchSettings();
  }, []);

  const scheduleData = [
    { days: "Lunes a Sábado", hours: settings.schedule_weekdays },
    { days: "Domingo", hours: settings.schedule_sunday },
  ];

  const addressParts = settings.address.split(",");
  const street = addressParts[0]?.trim() || "";
  const cityZip = addressParts.slice(1, 3).join(",").trim() || "";
  const country = addressParts.slice(3).join(",").trim() || "España";

  return (
    <section id="ubicacion" className="section-padding overflow-hidden">
      <div className="container-custom px-4">
        <div 
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
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
          <div ref={cardsRef} className="space-y-6">
            {[
              {
                icon: MapPin,
                title: "Dirección",
                content: (
                  <p className="text-muted-foreground">
                    {street}<br />
                    {cityZip}<br />
                    {country}
                  </p>
                ),
              },
              {
                icon: Phone,
                title: "Teléfono",
                content: (
                  <a
                    href={`tel:${settings.phone.replace(/\s/g, "")}`}
                    className="text-primary hover:underline text-lg"
                  >
                    {settings.phone}
                  </a>
                ),
              },
              {
                icon: Clock,
                title: "Horarios",
                content: (
                  <div className="space-y-2">
                    {scheduleData.map((schedule, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{schedule.days}</span>
                        <span className="font-medium text-foreground">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                ),
              },
            ].map((item, index) => (
              <div 
                key={index}
                className={`card-elegant transition-all duration-700 hover:-translate-y-1 hover:shadow-lg ${
                  cardsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    {item.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map */}
          <div 
            ref={mapRef}
            className={`card-elegant p-0 overflow-hidden h-[400px] lg:h-auto transition-all duration-1000 ${
              mapVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}
          >
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
