import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Upload, FolderPlus } from "lucide-react";

type MenuItem = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
};

type Category = {
  id: string;
  slug: string;
  label: string;
  sort_order: number;
};

const AdminMenu = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    description: "",
    price: "",
    image_url: "",
  });
  const [categoryFormData, setCategoryFormData] = useState({
    slug: "",
    label: "",
  });
  const [uploading, setUploading] = useState(false);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("menu_categories")
      .select("*")
      .order("sort_order");

    if (error) {
      toast.error("Error al cargar categorías");
      return;
    }
    setCategories(data || []);
    return data || [];
  };

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("category")
      .order("sort_order");

    if (error) {
      toast.error("Error al cargar el menú");
      return;
    }
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    const loadData = async () => {
      const cats = await fetchCategories();
      await fetchItems();
      if (cats && cats.length > 0) {
        setFormData(prev => ({ ...prev, category: cats[0].slug }));
      }
    };
    loadData();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `menu-${Date.now()}.${fileExt}`;

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

    const itemData = {
      category: formData.category,
      name: formData.name,
      description: formData.description,
      price: formData.price ? parseFloat(formData.price) : null,
      image_url: formData.image_url || null,
    };

    if (editingItem) {
      const { error } = await supabase
        .from("menu_items")
        .update(itemData)
        .eq("id", editingItem.id);

      if (error) {
        toast.error("Error al actualizar");
        return;
      }
      toast.success("Plato actualizado");
    } else {
      const { error } = await supabase.from("menu_items").insert(itemData);
      if (error) {
        toast.error("Error al crear");
        return;
      }
      toast.success("Plato creado");
    }

    setIsDialogOpen(false);
    resetForm();
    fetchItems();
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      category: item.category,
      name: item.name,
      description: item.description,
      price: item.price?.toString() || "",
      image_url: item.image_url || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este plato?")) return;

    const { error } = await supabase.from("menu_items").delete().eq("id", id);
    if (error) {
      toast.error("Error al eliminar");
      return;
    }
    toast.success("Plato eliminado");
    fetchItems();
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({ 
      category: categories.length > 0 ? categories[0].slug : "", 
      name: "", 
      description: "", 
      price: "", 
      image_url: "" 
    });
  };

  const resetCategoryForm = () => {
    setEditingCategory(null);
    setCategoryFormData({ slug: "", label: "" });
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingCategory) {
      const { error } = await supabase
        .from("menu_categories")
        .update({ label: categoryFormData.label })
        .eq("id", editingCategory.id);

      if (error) {
        toast.error("Error al actualizar categoría");
        return;
      }
      toast.success("Categoría actualizada");
    } else {
      const slug = categoryFormData.slug.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      const { error } = await supabase
        .from("menu_categories")
        .insert({ 
          slug, 
          label: categoryFormData.label,
          sort_order: categories.length + 1 
        });

      if (error) {
        toast.error("Error al crear categoría");
        return;
      }
      toast.success("Categoría creada");
    }

    setIsCategoryDialogOpen(false);
    resetCategoryForm();
    fetchCategories();
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryFormData({ slug: category.slug, label: category.label });
    setIsCategoryDialogOpen(true);
  };

  if (loading) {
    return <div className="text-center py-8">Cargando menú...</div>;
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="font-display text-2xl font-semibold text-foreground">Gestión del Menú</h2>
        <div className="flex gap-2">
          <Dialog open={isCategoryDialogOpen} onOpenChange={(open) => { setIsCategoryDialogOpen(open); if (!open) resetCategoryForm(); }}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FolderPlus className="w-4 h-4 mr-2" /> Nueva Categoría
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingCategory ? "Editar Categoría" : "Nueva Categoría"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCategorySubmit} className="space-y-4">
                {!editingCategory && (
                  <div>
                    <Label>ID (slug)</Label>
                    <Input 
                      value={categoryFormData.slug} 
                      onChange={(e) => setCategoryFormData({ ...categoryFormData, slug: e.target.value })} 
                      placeholder="ej: entrantes"
                      required 
                    />
                    <p className="text-xs text-muted-foreground mt-1">Identificador único (sin espacios ni caracteres especiales)</p>
                  </div>
                )}
                <div>
                  <Label>Nombre</Label>
                  <Input 
                    value={categoryFormData.label} 
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, label: e.target.value })} 
                    placeholder="ej: Entrantes"
                    required 
                  />
                </div>
                <Button type="submit" className="w-full btn-primary">
                  {editingCategory ? "Guardar Cambios" : "Crear Categoría"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="btn-primary">
                <Plus className="w-4 h-4 mr-2" /> Añadir Plato
              </Button>
            </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Editar Plato" : "Nuevo Plato"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Categoría</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.slug}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Nombre</Label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div>
                <Label>Descripción</Label>
                <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
              </div>
              <div>
                <Label>Precio (€)</Label>
                <Input type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
              </div>
              <div>
                <Label>Imagen</Label>
                <div className="flex gap-2">
                  <Input value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} placeholder="URL o subir" />
                  <label className="btn-outline cursor-pointer flex items-center px-3">
                    <Upload className="w-4 h-4" />
                    <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                  </label>
                </div>
                {uploading && <p className="text-sm text-muted-foreground">Subiendo...</p>}
                {formData.image_url && (
                  <img src={formData.image_url} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded" />
                )}
              </div>
              <Button type="submit" className="w-full btn-primary">
                {editingItem ? "Guardar Cambios" : "Crear Plato"}
              </Button>
            </form>
          </DialogContent>
          </Dialog>
        </div>
      </div>

      {categories.map((category) => {
        const categoryItems = items.filter((i) => i.category === category.slug);
        if (categoryItems.length === 0) return null;

        const handleDeleteCategory = async () => {
          if (!confirm(`¿Eliminar toda la categoría "${category.label}" y sus ${categoryItems.length} platos?`)) return;
          
          // Delete all items in category
          const { error: itemsError } = await supabase
            .from("menu_items")
            .delete()
            .eq("category", category.slug);
          
          if (itemsError) {
            toast.error("Error al eliminar platos de la categoría");
            return;
          }

          // Delete the category itself
          const { error: catError } = await supabase
            .from("menu_categories")
            .delete()
            .eq("id", category.id);
          
          if (catError) {
            toast.error("Error al eliminar categoría");
            return;
          }

          toast.success(`Categoría "${category.label}" eliminada`);
          fetchCategories();
          fetchItems();
        };

        return (
          <div key={category.id} className="mb-8">
            <div className="flex items-center justify-between border-b border-border pb-2 mb-4">
              <h3 className="font-display text-lg font-semibold text-foreground">
                {category.label} ({categoryItems.length})
              </h3>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleEditCategory(category)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Pencil className="w-4 h-4 mr-1" /> Editar nombre
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleDeleteCategory}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Eliminar categoría
                </Button>
              </div>
            </div>
            <div className="grid gap-3">
              {categoryItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                  {item.image_url && (
                    <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                  </div>
                  <div className="text-right">
                    {item.price && <p className="font-semibold text-primary">{item.price.toFixed(2)}€</p>}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminMenu;
