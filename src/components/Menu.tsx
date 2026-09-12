import { useEffect, useState } from "react";
import { ImageOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useScrollProgress } from "@/hooks/use-scroll-animation";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number | null;
  image_url: string | null;
  category: string;
};

const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, progress } = useScrollProgress();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("menu_items").select("*").eq("is_active", true).order("sort_order");
      if (data) setMenuItems(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section id="menu" ref={ref} className="overflow-hidden bg-secondary py-20 md:py-28">
      <div className="mb-16 text-center md:mb-20">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">Nuestra carta</p>
        <h2 className="font-body text-5xl font-black uppercase leading-none text-primary md:text-7xl">Cuatro favoritos</h2>
      </div>

      {loading ? (
        <div className="py-12 text-center text-muted-foreground">Cargando menú...</div>
      ) : (
        <div className="space-y-5 md:space-y-7">
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className="menu-marquee-track flex w-max items-center gap-6 will-change-transform md:gap-10"
              style={{ transform: `translate3d(${(index % 2 === 0 ? -1 : 1) * (progress * 24 - 12)}vw, 0, 0)` }}
            >
              {[0, 1, 2].map((copy) => (
                <div key={copy} className="flex items-center gap-6 md:gap-10" aria-hidden={copy > 0}>
                  <span className={`whitespace-nowrap font-body text-5xl font-black uppercase leading-none md:text-8xl ${copy % 2 ? "menu-outline-text" : "text-primary"}`}>
                    {item.name}
                  </span>
                  <div className="h-28 w-44 shrink-0 overflow-hidden rounded-lg bg-muted shadow-soft md:h-40 md:w-64">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
                        <ImageOff className="h-7 w-7" />
                        <span className="text-[10px] uppercase tracking-[0.18em]">Sin imagen</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {!loading && menuItems.length > 0 && (
        <div className="container-custom mt-20 grid gap-x-12 gap-y-8 px-5 md:grid-cols-2 md:px-10">
          {menuItems.map((item) => (
            <article key={item.id} className="border-t border-primary/25 pt-5">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl text-foreground">{item.name}</h3>
                {item.price !== null && <span className="font-semibold text-primary">{item.price.toFixed(2)}€</span>}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Menu;