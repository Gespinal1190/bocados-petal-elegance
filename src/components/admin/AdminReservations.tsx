import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Calendar, Clock, Users, Phone, Mail, User, Check, X, Trash2 } from "lucide-react";

type Reservation = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes: string | null;
  status: string;
  created_at: string;
};

const statusOptions = [
  { value: "pending", label: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
  { value: "confirmed", label: "Confirmada", color: "bg-green-100 text-green-800" },
  { value: "cancelled", label: "Cancelada", color: "bg-red-100 text-red-800" },
  { value: "completed", label: "Completada", color: "bg-blue-100 text-blue-800" },
];

const AdminReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const fetchReservations = async () => {
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("date", { ascending: true })
      .order("time", { ascending: true });

    if (error) {
      toast.error("Error al cargar reservas");
      return;
    }
    setReservations(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("reservations")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      toast.error("Error al actualizar estado");
      return;
    }
    toast.success("Estado actualizado");
    fetchReservations();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar esta reserva?")) return;

    const { error } = await supabase.from("reservations").delete().eq("id", id);
    if (error) {
      toast.error("Error al eliminar");
      return;
    }
    toast.success("Reserva eliminada");
    fetchReservations();
  };

  const getStatusStyle = (status: string) => {
    return statusOptions.find((s) => s.value === status)?.color || "bg-gray-100 text-gray-800";
  };

  const getStatusLabel = (status: string) => {
    return statusOptions.find((s) => s.value === status)?.label || status;
  };

  const filteredReservations = filter === "all" 
    ? reservations 
    : reservations.filter((r) => r.status === filter);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-ES", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  if (loading) {
    return <div className="text-center py-8">Cargando reservas...</div>;
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h2 className="font-display text-2xl font-semibold text-foreground">Gestión de Reservas</h2>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {statusOptions.map((s) => (
              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredReservations.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">No hay reservas</p>
      ) : (
        <div className="space-y-4">
          {filteredReservations.map((reservation) => (
            <div
              key={reservation.id}
              className="bg-muted/30 rounded-lg p-4 border border-border/50"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(reservation.status)}`}>
                      {getStatusLabel(reservation.status)}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {formatDate(reservation.date)}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {reservation.time}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {reservation.guests} pers.
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="flex items-center gap-1 font-medium text-foreground">
                      <User className="w-4 h-4 text-primary" />
                      {reservation.name}
                    </span>
                    <a href={`tel:${reservation.phone}`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                      <Phone className="w-4 h-4" />
                      {reservation.phone}
                    </a>
                    <a href={`mailto:${reservation.email}`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                      <Mail className="w-4 h-4" />
                      {reservation.email}
                    </a>
                  </div>

                  {reservation.notes && (
                    <p className="text-sm text-muted-foreground italic">
                      "{reservation.notes}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {reservation.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 hover:bg-green-50"
                        onClick={() => handleStatusChange(reservation.id, "confirmed")}
                      >
                        <Check className="w-4 h-4 mr-1" /> Confirmar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => handleStatusChange(reservation.id, "cancelled")}
                      >
                        <X className="w-4 h-4 mr-1" /> Cancelar
                      </Button>
                    </>
                  )}
                  {reservation.status === "confirmed" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusChange(reservation.id, "completed")}
                    >
                      <Check className="w-4 h-4 mr-1" /> Completar
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(reservation.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReservations;
