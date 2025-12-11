import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Save } from "lucide-react";

type Settings = {
  phone: string;
  email: string;
  address: string;
  schedule_weekdays: string;
  schedule_sunday: string;
};

const AdminSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    phone: "",
    email: "",
    address: "",
    schedule_weekdays: "",
    schedule_sunday: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    const { data, error } = await supabase.from("site_settings").select("*");

    if (error) {
      toast.error("Error al cargar ajustes");
      return;
    }

    const settingsMap: Record<string, string> = {};
    data?.forEach((item) => {
      settingsMap[item.key] = item.value;
    });

    setSettings({
      phone: settingsMap.phone || "",
      email: settingsMap.email || "",
      address: settingsMap.address || "",
      schedule_weekdays: settingsMap.schedule_weekdays || "",
      schedule_sunday: settingsMap.schedule_sunday || "",
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);

    const updates = Object.entries(settings).map(([key, value]) => ({
      key,
      value,
    }));

    for (const update of updates) {
      const { error } = await supabase
        .from("site_settings")
        .update({ value: update.value })
        .eq("key", update.key);

      if (error) {
        toast.error(`Error al guardar ${update.key}`);
        setSaving(false);
        return;
      }
    }

    toast.success("Ajustes guardados");
    setSaving(false);
  };

  if (loading) {
    return <div className="text-center py-8">Cargando ajustes...</div>;
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-semibold text-foreground">Ajustes del Sitio</h2>
        <Button className="btn-primary" onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Guardando..." : "Guardar"}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-foreground border-b border-border pb-2">
            Información de Contacto
          </h3>
          
          <div>
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              placeholder="+34 XXX XX XX XX"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              placeholder="info@ejemplo.com"
            />
          </div>

          <div>
            <Label htmlFor="address">Dirección</Label>
            <Input
              id="address"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              placeholder="Calle, número, ciudad"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-foreground border-b border-border pb-2">
            Horarios
          </h3>

          <div>
            <Label htmlFor="schedule_weekdays">Lunes a Sábado</Label>
            <Input
              id="schedule_weekdays"
              value={settings.schedule_weekdays}
              onChange={(e) => setSettings({ ...settings, schedule_weekdays: e.target.value })}
              placeholder="09:00 – 23:00"
            />
          </div>

          <div>
            <Label htmlFor="schedule_sunday">Domingo</Label>
            <Input
              id="schedule_sunday"
              value={settings.schedule_sunday}
              onChange={(e) => setSettings({ ...settings, schedule_sunday: e.target.value })}
              placeholder="10:00 – 23:00"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
