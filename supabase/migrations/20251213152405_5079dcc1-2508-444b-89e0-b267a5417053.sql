-- Create menu_categories table
CREATE TABLE public.menu_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  label text NOT NULL,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view active categories"
ON public.menu_categories
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage categories"
ON public.menu_categories
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_menu_categories_updated_at
BEFORE UPDATE ON public.menu_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default categories
INSERT INTO public.menu_categories (slug, label, sort_order) VALUES
  ('desayunos', 'Desayunos', 1),
  ('brunch', 'Brunch', 2),
  ('entrantes', 'Entrantes', 3),
  ('comidas', 'Comidas & Cenas', 4),
  ('tapas', 'Tapas', 5),
  ('ensaladas', 'Ensaladas', 6),
  ('carnes', 'Carnes', 7),
  ('pescados', 'Pescados', 8),
  ('bebidas', 'Bebidas', 9),
  ('cocteles', 'Cócteles', 10),
  ('vinos', 'Vinos', 11),
  ('postres', 'Postres', 12),
  ('cafes', 'Cafés', 13);