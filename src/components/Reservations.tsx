import { useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Calendar, Clock, Users, Phone, Mail, User } from "lucide-react";
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
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"
];

const Reservations = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    notes: "",
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
      const { error } = await supabase.from("reservations").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        date: formData.date,
        time: formData.time,
        guests: parseInt(formData.guests),
        notes: formData.notes.trim() || null,
      });

      if (error) {
        toast.error("Error al enviar la reserva. Inténtalo de nuevo.");
        console.error("Reservation error:", error);
      } else {
        toast.success("¡Reserva enviada! Te confirmaremos pronto.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          guests: "2",
          notes: "",
        });
      }
    } catch (err) {
      toast.error("Error de conexión");
    }

    setIsSubmitting(false);
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="reservas" className="section-padding bg-rose-light/30 overflow-hidden">
      <div className="container-custom px-4">
        <div
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-sm font-medium tracking-widest uppercase text-primary">
            Reserva tu Mesa
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-3 mb-6 text-foreground">
            Reservaciones
          </h2>
          <div className="divider-flower">
            <span className="text-2xl text-primary">✿</span>
          </div>
          <p className="text-muted-foreground mt-6 max-w-xl mx-auto">
            Reserva tu mesa y disfruta de una experiencia gastronómica única en Bocados Restobar
          </p>
        </div>

        <div
          ref={formRef}
          className={`max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-primary" />
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4 text-primary" />
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Tu teléfono"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-primary" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="date" className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Fecha
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={today}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Hora
                  </Label>
                  <Select
                    value={formData.time}
                    onValueChange={(v) => setFormData({ ...formData, time: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="guests" className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-primary" />
                    Personas
                  </Label>
                  <Select
                    value={formData.guests}
                    onValueChange={(v) => setFormData({ ...formData, guests: v })}
                  >
                    <SelectTrigger>
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
                <Label htmlFor="notes" className="mb-2 block">
                  Notas adicionales (opcional)
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Alergias, celebraciones especiales, preferencias..."
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Reservar Mesa"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservations;
