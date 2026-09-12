import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ImageOff } from "lucide-react";

import dishCrepe from "@/assets/dish-crepe.jpg";
import dishWaffle from "@/assets/dish-waffle.jpg";
import dishEntrecot from "@/assets/dish-entrecot.jpg";
import coffeeSpecialty from "@/assets/coffee-specialty.jpg";
import dishToast from "@/assets/dish-toast.jpg";
import dishPastry from "@/assets/dish-pastry.jpg";
import dishJuice from "@/assets/dish-juice.jpg";
import dishSalad from "@/assets/dish-salad.jpg";
import dishPasta from "@/assets/dish-pasta.jpg";
import dishBurger from "@/assets/dish-burger.jpg";
import dishPulpo from "@/assets/dish-pulpo.jpg";
import dishTapas from "@/assets/dish-tapas.jpg";
import drinkSmoothie from "@/assets/drink-smoothie.jpg";
import drinkBeverages from "@/assets/drink-beverages.jpg";
import drinkWine from "@/assets/drink-wine.jpg";
import dishDessert from "@/assets/dish-dessert.jpg";
import dishIcecream from "@/assets/dish-icecream.jpg";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number | null;
  image_url: string | null;
  category: string;
};

const fallbackImages: Record<string, string> = {
  "Tostadas Variadas": dishToast,
  "Bollería del Día": dishPastry,
  "Café de Especialidad": coffeeSpecialty,
  "Zumos Naturales": dishJuice,
  "Ensaladas Frescas": dishSalad,
  "Pastas Artesanales": dishPasta,
  "Burgers Gourmet": dishBurger,
  "Entrecot a la Brasa": dishEntrecot,
  "Pulpo Selecta": dishPulpo,
  "Tapas Variadas": dishTapas,
  "Cafés Especiales": coffeeSpecialty,
  "Smoothies": drinkSmoothie,
  "Refrescos": drinkBeverages,
  "Vinos y Cervezas": drinkWine,
  "Crepes Dulces": dishCrepe,
  "Gofres Belgas": dishWaffle,
  "Postres Artesanales": dishDessert,
  "Helados": dishIcecream,
};

const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const { data: itemsData } = await supabase
        .from("menu_items")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");

      if (itemsData) {
        setMenuItems(itemsData);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const getItemImage = (item: MenuItem): string | null => {
    if (item.image_url) return item.image_url;
    return fallbackImages[item.name] || null;
  };

  return (
    <section id="menu" className="section-padding overflow-hidden">
      <div className="container-custom">
        <div className="mb-16 flex flex-col gap-6 border-b border-foreground/15 pb-8 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.28em] text-primary">Nuestra carta</p>
            <h2 className="font-display text-5xl leading-none text-foreground md:text-7xl">Cuatro favoritos</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-right">
            Una selección breve para saborear Bocados de principio a fin.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando menú...</p>
          </div>
        ) : (
          <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {menuItems.map((item, index) => (
              <div
                key={item.id}
                className={`group animate-scale-in ${index % 2 === 1 ? "lg:mt-16" : ""}`}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="relative mb-7 aspect-[3/4] overflow-hidden bg-muted">
                  {getItemImage(item) ? (
                    <img
                      src={getItemImage(item) ?? undefined}
                      alt={item.name}
                      className="h-full w-full object-cover grayscale-[25%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
                      <ImageOff className="h-7 w-7" />
                      <span className="text-[10px] uppercase tracking-[0.18em]">Sin imagen</span>
                    </div>
                  )}
                </div>
                <div>
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="font-display text-2xl text-foreground">
                      {item.name}
                    </h3>
                    {item.price && (
                      <span className="whitespace-nowrap text-sm font-medium text-primary">
                        {item.price.toFixed(2)}€
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-20 border-t border-foreground/15 pt-6 text-center">
          <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Pregunta por nuestras sugerencias del día y opciones para alérgenos
          </p>
        </div>
      </div>
    </section>
  );
};

export default Menu;