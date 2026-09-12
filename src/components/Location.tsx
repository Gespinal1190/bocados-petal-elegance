import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { supabase } from "@/integrations/supabase/client";

const Location = () => {
  const [settings, setSettings] = useState({
    phone: "+34 931 42 74 06",
    address: "Carrer dels Caputxins, 4, 08800 Vilanova i la Geltrú, Barcelona",
    schedule_weekdays: "09:30 – 23:00",
    schedule_sunday: "Cerrado",
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
    { days: "Martes a Sábado", hours: settings.schedule_weekdays },
    { days: "Domingo y Lunes", hours: "Cerrado" },
  ];

  return (
    <section id="ubicacion" className="section-padding overflow-hidden bg-secondary">
      <div className="container-custom">
        <div
          ref={sectionRef}
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-16 text-center md:mb-24">
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-primary">
              Encuéntranos
            </p>
            <h2 className="font-display text-5xl leading-none text-foreground md:text-7xl">
              Ven a <em>visitarnos</em>
            </h2>
          </div>

          <div className="grid gap-0 border border-primary/20 lg:grid-cols-[0.8fr_1.2fr]">
            {/* Info */}
            <div className="space-y-10 bg-primary p-7 text-primary-foreground md:p-12">
              <div>
                <h3 className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-secondary">Dirección</h3>
                <p className="font-display text-2xl leading-snug">{settings.address}</p>
              </div>
              <div>
                <h3 className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-secondary">Teléfono</h3>
                <a
                  href={`tel:${settings.phone.replace(/\s/g, "")}`}
                  className="text-xl transition-colors hover:text-secondary"
                >
                  {settings.phone}
                </a>
              </div>
              <div>
                <h3 className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-secondary">Horarios</h3>
                <div className="space-y-2">
                  {scheduleData.map((schedule, index) => (
                    <div key={index} className="flex justify-between text-sm max-w-xs">
                      <span className="text-primary-foreground/65">{schedule.days}</span>
                      <span className="font-medium">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-3 pt-4">
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="border border-primary-foreground/50 px-6 py-3 text-xs uppercase tracking-[0.14em] transition-colors hover:bg-primary-foreground hover:text-primary">
                  LLAMAR
                </a>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Carrer+dels+Caputxins%2C+4%2C+08800+Vilanova+i+la+Geltr%C3%BA%2C+Barcelona"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-foreground px-6 py-3 text-xs uppercase tracking-[0.14em] text-primary transition-opacity hover:opacity-80"
                >
                  GOOGLE MAPS
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="h-[420px] overflow-hidden lg:h-auto">
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