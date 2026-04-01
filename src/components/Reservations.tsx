import { useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { z } from "zod";

const reservationSchema = z.object({
  name: z.string().min(2, "Nombre muy corto").max(100),
  email: z.string().email("Email inválido"),
  phone: z.string().min(9, "Teléfono inválido"),
  date: z.string().min(1, "Selecciona una fecha"),
  time: z.string().min(1, "Selecciona una hora"),
  guests: z.number().min(1).max(20),
});

const timeSlots = [
  "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"
];

const Reservations = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", date: "", time: "", guests: "2", notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = reservationSchema.safeParse({
      ...formData,
      guests: parseInt(formData.guests),
    });

    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      setIsSubmitting(false);
      return;
    }

    try {
      const isPromo = sessionStorage.getItem("promo_web_20") === "true";
      const finalNotes = isPromo
        ? `🎉 PROMO WEB 20% DTO. ${formData.notes.trim() || ""}`
        : formData.notes.trim() || null;

      const { error } = await supabase.from("reservations").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        date: formData.date,
        time: formData.time,
        guests: parseInt(formData.guests),
        notes: finalNotes,
      });

      if (error) {
        toast.error("Error al enviar la reserva. Inténtalo de nuevo.");
      } else {
        toast.success("¡Reserva enviada! Te confirmaremos pronto.");
        sessionStorage.removeItem("promo_web_20");
        setFormData({ name: "", email: "", phone: "", date: "", time: "", guests: "2", notes: "" });

        // Notify via Telegram (fire and forget)
        supabase.functions.invoke("notify-reservation", {
          body: {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            date: formData.date,
            time: formData.time,
            guests: parseInt(formData.guests),
            notes: formData.notes.trim() || null,
          },
        }).catch(console.error);
      }
    } catch {
      toast.error("Error de conexión");
    }

    setIsSubmitting(false);
  };

  const today = new Date().toISOString().split("T")[0];

  const isClosedDay = (dateStr: string) => {
    if (!dateStr) return false;
    const date = new Date(dateStr + "T00:00:00");
    const day = date.getDay(); // 0 = Sunday, 1 = Monday
    return day === 0 || day === 1;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (isClosedDay(val)) {
      toast.error("Domingos y lunes estamos cerrados. Elige otro día.");
      setFormData({ ...formData, date: "" });
    } else {
      setFormData({ ...formData, date: val });
    }
  };

  return (
    <section id="reservas" className="section-padding bg-primary/5 overflow-hidden">
      <div className="container-custom px-4">
        <div
          ref={headerRef}
          className={`text-center mb-14 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4">
            Reserva tu Mesa
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground">
            Reservas
          </h2>
          <div className="divider-line mt-6">
            <span className="text-primary text-lg">◆</span>
          </div>
          <p className="text-muted-foreground mt-6 max-w-lg mx-auto">
            Reserva tu mesa y disfruta de una experiencia gastronómica única
          </p>
        </div>

        <div
          ref={formRef}
          className={`max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-card p-8 md:p-10 border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-xs tracking-wider uppercase text-muted-foreground mb-2 block">
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Tu nombre"
                    required
                    className="border-border"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-xs tracking-wider uppercase text-muted-foreground mb-2 block">
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Tu teléfono"
                    required
                    className="border-border"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-xs tracking-wider uppercase text-muted-foreground mb-2 block">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="tu@email.com"
                  required
                  className="border-border"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="date" className="text-xs tracking-wider uppercase text-muted-foreground mb-2 block">
                    Fecha
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={handleDateChange}
                    min={today}
                    required
                    className="border-border"
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="text-xs tracking-wider uppercase text-muted-foreground mb-2 block">
                    Hora
                  </Label>
                  <Select value={formData.time} onValueChange={(v) => setFormData({ ...formData, time: v })}>
                    <SelectTrigger className="border-border">
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="guests" className="text-xs tracking-wider uppercase text-muted-foreground mb-2 block">
                    Personas
                  </Label>
                  <Select value={formData.guests} onValueChange={(v) => setFormData({ ...formData, guests: v })}>
                    <SelectTrigger className="border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((n) => (
                        <SelectItem key={n} value={n.toString()}>
                          {n} {n === 1 ? "persona" : "personas"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="notes" className="text-xs tracking-wider uppercase text-muted-foreground mb-2 block">
                  Notas (opcional)
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Alergias, celebraciones especiales..."
                  rows={3}
                  className="border-border"
                />
              </div>

              <Button type="submit" className="w-full btn-primary py-4" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "RESERVAR MESA"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservations;