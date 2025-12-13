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

// Fallback images for items without custom images
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
  const { ref: tabsRef, isVisible: tabsVisible } = useScrollAnimation();

  useEffect(() => {
    const fetchData = async () => {
      // Fetch categories
      const { data: catsData } = await supabase
        .from("menu_categories")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");

      // Fetch menu items
      const { data: itemsData } = await supabase
        .from("menu_items")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");

      if (catsData && itemsData) {
        // Only show categories that have items
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

  const getItemImage = (item: MenuItem): string => {
    // Si hay URL de imagen, usarla directamente
    if (item.image_url) {
      return item.image_url;
    }
    // Usar imagen local por nombre del item o imagen por defecto
    return fallbackImages[item.name] || dishCrepe;
  };

  const filteredItems = menuItems.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="section-padding bg-cream overflow-hidden">
      <div className="container-custom px-4">
        <div 
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-sm font-medium tracking-widest uppercase text-primary">
            Nuestra Carta
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-3 mb-6 text-foreground">
            Menú
          </h2>
          <div className="divider-flower">
            <span className="text-2xl text-primary">✿</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div 
          ref={tabsRef}
          className={`flex flex-wrap justify-center gap-3 md:gap-4 mb-12 transition-all duration-700 delay-200 ${
            tabsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.slug)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category.slug
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-card text-muted-foreground hover:bg-rose-light hover:text-foreground border border-border hover:-translate-y-0.5"
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-card rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-500 border border-border/50 animate-scale-in hover:-translate-y-2"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={getItemImage(item)}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {item.price && (
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {item.price.toFixed(2)}€
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <div className="inline-block bg-muted/50 px-6 py-3 rounded-full">
            <p className="text-muted-foreground text-sm">
              🍽️ Pregunta por nuestras sugerencias del día y opciones para alérgenos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
