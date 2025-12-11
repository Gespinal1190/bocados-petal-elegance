import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().trim().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      setIsSubmitting(false);
      return;
    }

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message.includes("already registered")) {
            toast.error("Este email ya está registrado");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Cuenta creada. Revisa tu email para confirmar.");
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error("Credenciales incorrectas");
        } else {
          toast.success("Sesión iniciada");
          navigate("/admin");
        }
      }
    } catch (err) {
      toast.error("Error de conexión");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-semibold text-foreground mb-2">
              Bocados Restobar
            </h1>
            <p className="text-muted-foreground">
              {isSignUp ? "Crear cuenta" : "Panel de Administración"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                required
              />
            </div>

            <Button type="submit" className="w-full btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Cargando..." : isSignUp ? "Crear Cuenta" : "Iniciar Sesión"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-primary hover:underline"
            >
              {isSignUp ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
            </button>
          </div>

          <div className="mt-4 text-center">
            <a href="/" className="text-sm text-muted-foreground hover:text-primary">
              ← Volver al sitio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
