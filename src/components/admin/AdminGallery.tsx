import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Trash2, Upload } from "lucide-react";

type GalleryImage = {
  id: string;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
  is_active: boolean;
};

const AdminGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ image_url: "", alt_text: "" });
  const [uploading, setUploading] = useState(false);

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("sort_order");

    if (error) {
      toast.error("Error al cargar galería");
      return;
    }
    setImages(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `gallery-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("restaurant-images")
      .upload(fileName, file);

    if (uploadError) {
      toast.error("Error al subir imagen");
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("restaurant-images")
      .getPublicUrl(fileName);

    setFormData({ ...formData, image_url: publicUrl });
    setUploading(false);
    toast.success("Imagen subida");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image_url) {
      toast.error("Debes subir una imagen");
      return;
    }

    const { error } = await supabase.from("gallery_images").insert({
      image_url: formData.image_url,
      alt_text: formData.alt_text || null,
      sort_order: images.length,
    });

    if (error) {
      toast.error("Error al añadir imagen");
      return;
    }

    toast.success("Imagen añadida");
    setIsDialogOpen(false);
    setFormData({ image_url: "", alt_text: "" });
    fetchImages();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar esta imagen?")) return;

    const { error } = await supabase.from("gallery_images").delete().eq("id", id);
    if (error) {
      toast.error("Error al eliminar");
      return;
    }
    toast.success("Imagen eliminada");
    fetchImages();
  };

  if (loading) {
    return <div className="text-center py-8">Cargando galería...</div>;
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-semibold text-foreground">Gestión de Galería</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" /> Añadir Imagen
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Nueva Imagen</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Imagen</Label>
                <div className="flex gap-2">
                  <Input
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="URL o subir"
                  />
                  <label className="btn-outline cursor-pointer flex items-center px-3">
                    <Upload className="w-4 h-4" />
                    <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                  </label>
                </div>
                {uploading && <p className="text-sm text-muted-foreground">Subiendo...</p>}
                {formData.image_url && (
                  <img src={formData.image_url} alt="Preview" className="mt-2 h-32 w-full object-cover rounded" />
                )}
              </div>
              <div>
                <Label>Texto alternativo</Label>
                <Input
                  value={formData.alt_text}
                  onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                  placeholder="Descripción de la imagen"
                />
              </div>
              <Button type="submit" className="w-full btn-primary">
                Añadir Imagen
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {images.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">No hay imágenes en la galería</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.image_url}
                alt={image.alt_text || "Imagen de galería"}
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <Button variant="destructive" size="icon" onClick={() => handleDelete(image.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              {image.alt_text && (
                <p className="text-xs text-muted-foreground mt-1 truncate">{image.alt_text}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
