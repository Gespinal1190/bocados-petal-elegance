-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Policy: Users can view their own roles
CREATE POLICY "Users can view own roles" ON public.user_roles
FOR SELECT USING (auth.uid() = user_id);

-- Policy: Admins can view all roles
CREATE POLICY "Admins can view all roles" ON public.user_roles
FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Create menu_items table for editable menu
CREATE TABLE public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2),
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

-- Anyone can view active menu items
CREATE POLICY "Anyone can view active menu items" ON public.menu_items
FOR SELECT USING (is_active = true);

-- Admins can do everything
CREATE POLICY "Admins can manage menu items" ON public.menu_items
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Create gallery_images table
CREATE TABLE public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Anyone can view active gallery images
CREATE POLICY "Anyone can view active gallery images" ON public.gallery_images
FOR SELECT USING (is_active = true);

-- Admins can manage gallery images
CREATE POLICY "Admins can manage gallery images" ON public.gallery_images
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Create site_settings table for contact info, hours, etc.
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can view site settings
CREATE POLICY "Anyone can view site settings" ON public.site_settings
FOR SELECT USING (true);

-- Admins can update site settings
CREATE POLICY "Admins can manage site settings" ON public.site_settings
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Insert default site settings
INSERT INTO public.site_settings (key, value) VALUES
  ('phone', '+34 931 42 74 06'),
  ('email', 'info@bocadosrestobar.com'),
  ('address', 'Carrer dels Caputxins, 4, 08800 Vilanova i la Geltrú, Barcelona'),
  ('schedule_weekdays', '09:30 – 23:00'),
  ('schedule_sunday', '10:00 – 23:00');

-- Insert default menu items with prices
INSERT INTO public.menu_items (category, name, description, price, sort_order) VALUES
  ('desayunos', 'Tostadas Variadas', 'Con tomate, aguacate, jamón o mermelada artesanal', 4.50, 1),
  ('desayunos', 'Bollería del Día', 'Croissants, napolitanas y más, recién horneados', 3.50, 2),
  ('desayunos', 'Café de Especialidad', 'Espresso, cappuccino, latte art', 2.80, 3),
  ('desayunos', 'Zumos Naturales', 'Naranja, manzana, zanahoria y combinados', 4.00, 4),
  ('comidas', 'Ensaladas Frescas', 'Mediterránea, César, quinoa y más', 9.50, 1),
  ('comidas', 'Pastas Artesanales', 'Carbonara, boloñesa, pesto genovés', 11.00, 2),
  ('comidas', 'Burgers Gourmet', 'Con ingredientes premium y pan artesanal', 12.50, 3),
  ('comidas', 'Entrecot a la Brasa', 'Corte premium con guarnición a elegir', 18.00, 4),
  ('comidas', 'Pulpo Selecta', 'Preparación especial de la casa', 16.50, 5),
  ('comidas', 'Tapas Variadas', 'Selección de tapas tradicionales y creativas', 8.00, 6),
  ('bebidas', 'Cafés Especiales', 'Espresso, americano, cortado, con leche', 2.50, 1),
  ('bebidas', 'Smoothies', 'Fresa, tropical, verde detox', 5.50, 2),
  ('bebidas', 'Refrescos', 'Bebidas artesanales y clásicos', 3.00, 3),
  ('bebidas', 'Vinos y Cervezas', 'Selección de vinos locales y cervezas craft', 4.50, 4),
  ('postres', 'Crepes Dulces', 'Con nutella, frutas, nata o helado', 6.50, 1),
  ('postres', 'Gofres Belgas', 'Crujientes con toppings variados', 7.00, 2),
  ('postres', 'Postres Artesanales', 'Tartas, coulants y creaciones del día', 5.50, 3),
  ('postres', 'Helados', 'Sabores tradicionales y especiales', 4.00, 4);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_menu_items_updated_at
BEFORE UPDATE ON public.menu_items
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('restaurant-images', 'restaurant-images', true);

-- Storage policies for admin uploads
CREATE POLICY "Anyone can view restaurant images" ON storage.objects
FOR SELECT USING (bucket_id = 'restaurant-images');

CREATE POLICY "Admins can upload restaurant images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'restaurant-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update restaurant images" ON storage.objects
FOR UPDATE USING (bucket_id = 'restaurant-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete restaurant images" ON storage.objects
FOR DELETE USING (bucket_id = 'restaurant-images' AND public.has_role(auth.uid(), 'admin'));