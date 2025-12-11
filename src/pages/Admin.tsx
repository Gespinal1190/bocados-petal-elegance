import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Home, UtensilsCrossed, Image, Settings } from "lucide-react";
import AdminMenu from "@/components/admin/AdminMenu";
import AdminGallery from "@/components/admin/AdminGallery";
import AdminSettings from "@/components/admin/AdminSettings";

const Admin = () => {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (!isLoading && user && !isAdmin) {
      navigate("/");
    }
  }, [isAdmin, isLoading, user, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-pulse text-primary text-lg">Cargando...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container-custom px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-display text-xl font-semibold text-foreground">
              Panel Admin
            </h1>
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              <Home className="w-5 h-5" />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">{user.email}</span>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="container-custom px-4 py-8">
        <Tabs defaultValue="menu" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 mx-auto">
            <TabsTrigger value="menu" className="flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4" />
              <span className="hidden sm:inline">Menú</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              <span className="hidden sm:inline">Galería</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Ajustes</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="menu">
            <AdminMenu />
          </TabsContent>

          <TabsContent value="gallery">
            <AdminGallery />
          </TabsContent>

          <TabsContent value="settings">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
