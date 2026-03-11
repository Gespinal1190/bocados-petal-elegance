import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { supabase } from "@/integrations/supabase/client";

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

type Category = {
  id: string;
  slug: string;
  label: string;
  sort_order: number;
};

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
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  useEffect(() => {
    const fetchData = async () => {
      const { data: catsData } = await supabase
        .from("menu_categories")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");

      const { data: itemsData } = await supabase
        .from("menu_items")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");

      if (catsData && itemsData) {
        const categoriesWithItems = catsData.filter(cat =>
          itemsData.some(item => item.category === cat.slug)
        );
        setCategories(categoriesWithItems);
        setMenuItems(itemsData);

        if (categoriesWithItems.length > 0 && !activeCategory) {
          setActiveCategory(categoriesWithItems[0].slug);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const getItemImage = (item: MenuItem): string | null => {
    if (item.image_url) return item.image_url;
    return fallbackImages[item.name] || null;
  };

  const filteredItems = menuItems.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="section-padding bg-secondary/30 overflow-hidden">
      <div className="container-custom px-4">
        <div
          ref={headerRef}
          className={`text-center mb-14 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4">
            Nuestra Carta
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground">
            Menú
          </h2>
          <div className="divider-line mt-6">
            <span className="text-primary text-lg">◆</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-14">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.slug)}
              className={`px-5 py-2.5 text-xs font-medium tracking-[0.15em] uppercase transition-all duration-300 border ${
                activeCategory === category.slug
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-foreground"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando menú...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-card overflow-hidden group hover:shadow-lg transition-all duration-500 border border-border/50 animate-scale-in"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {getItemImage(item) && (
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={getItemImage(item)!}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {item.name}
                    </h3>
                    {item.price && (
                      <span className="text-primary font-semibold whitespace-nowrap">
                        {item.price.toFixed(2)}€
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-14">
          <p className="text-muted-foreground text-sm">
            Pregunta por nuestras sugerencias del día y opciones para alérgenos
          </p>
        </div>
      </div>
    </section>
  );
};

export default Menu;