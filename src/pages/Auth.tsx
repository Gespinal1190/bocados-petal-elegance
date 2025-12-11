import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const authSchema = z.object({
  email: z.string().trim().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAdmin, isLoading, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      if (isAdmin) {
        navigate("/admin");
      } else {
        toast.info("Tu cuenta no tiene permisos de administrador");
      }
    }
  }, [user, isAdmin, isLoading, navigate]);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const emailValidation = z.string().email("Email inválido").safeParse(email);
    if (!emailValidation.success) {
      toast.error("Por favor ingresa un email válido");
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Te hemos enviado un email con instrucciones para restablecer tu contraseña");
        setIsForgotPassword(false);
      }
    } catch (err) {
      toast.error("Error de conexión");
    }
    setIsSubmitting(false);
  };

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

  if (isForgotPassword) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-semibold text-foreground mb-2">
                Recuperar Contraseña
              </h1>
              <p className="text-muted-foreground">
                Te enviaremos un email para restablecer tu contraseña
              </p>
            </div>

            <form onSubmit={handleForgotPassword} className="space-y-4">
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

              <Button type="submit" className="w-full btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar Email de Recuperación"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsForgotPassword(false)}
                className="text-sm text-primary hover:underline"
              >
                ← Volver al inicio de sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isSignUp && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}

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
