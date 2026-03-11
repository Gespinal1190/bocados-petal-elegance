import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { supabase } from "@/integrations/supabase/client";

const Location = () => {
  const [settings, setSettings] = useState({
    phone: "+34 931 42 74 06",
    address: "Carrer dels Caputxins, 4, 08800 Vilanova i la Geltrú, Barcelona",
    schedule_weekdays: "09:30 – 23:00",
    schedule_sunday: "10:00 – 23:00",
  });

  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

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

  return (
    <section id="ubicacion" className="section-padding bg-secondary/30 overflow-hidden">
      <div className="container-custom px-4">
        <div
          ref={sectionRef}
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-14">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4">
              Encuéntranos
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
              Ubicación y Horarios
            </h2>
            <div className="divider-line mt-6">
              <span className="text-primary text-lg">◆</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3">Dirección</h3>
                <p className="text-muted-foreground leading-relaxed">{settings.address}</p>
              </div>
              <div>
                <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3">Teléfono</h3>
                <a
                  href={`tel:${settings.phone.replace(/\s/g, "")}`}
                  className="text-foreground hover:text-primary transition-colors text-lg"
                >
                  {settings.phone}
                </a>
              </div>
              <div>
                <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3">Horarios</h3>
                <div className="space-y-2">
                  {scheduleData.map((schedule, index) => (
                    <div key={index} className="flex justify-between text-sm max-w-xs">
                      <span className="text-muted-foreground">{schedule.days}</span>
                      <span className="font-medium text-foreground">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="btn-primary">
                  LLAMAR
                </a>
                <a
                  href="https://www.google.com/maps/place/Bocados+Restobar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  GOOGLE MAPS
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="overflow-hidden h-[400px] lg:h-auto border border-border">
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
      </div>
    </section>
  );
};

export default Location;