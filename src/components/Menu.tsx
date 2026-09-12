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

  const getImagePosition = (name: string) =>
    name.toLocaleLowerCase("es").includes("pulpo") ? "object-[center_72%]" : "object-center";

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("menu_items").select("*").eq("is_active", true).order("sort_order");
      if (data) setMenuItems(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section id="menu" ref={ref} className="overflow-hidden bg-secondary py-20 md:py-32">
      <div className="container-custom mb-14 px-5 text-center md:mb-24 md:px-10">
        <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">Nuestra carta</p>
        <h2 className="font-display text-5xl font-normal leading-[0.95] text-primary md:text-8xl">Cuatro favoritos</h2>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-primary/70 md:text-base">
          Sabores que hablan de nuestra cocina, preparados para disfrutar sin prisas.
        </p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-muted-foreground">Cargando menú...</div>
      ) : (
        <div className="space-y-8 md:space-y-12">
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className="menu-marquee-track flex w-max items-center gap-7 will-change-transform md:gap-14"
              style={{ transform: `translate3d(${(index % 2 === 0 ? -1 : 1) * (progress * 24 - 12)}vw, 0, 0)` }}
            >
              {[0, 1, 2].map((copy) => (
                <div key={copy} className="flex items-center gap-7 md:gap-14" aria-hidden={copy > 0}>
                  <span className={`whitespace-nowrap font-display text-5xl font-normal leading-none md:text-[6.5rem] ${copy % 2 ? "menu-outline-text" : "text-primary"}`}>
                    {item.name}
                  </span>
                  <div className="h-40 w-60 shrink-0 overflow-hidden rounded-md bg-muted shadow-card md:h-64 md:w-96">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className={`h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03] ${getImagePosition(item.name)}`}
                        loading="lazy"
                        decoding="async"
                        width={384}
                        height={256}
                      />
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
        <div className="container-custom mt-20 grid gap-x-16 gap-y-10 px-5 md:mt-28 md:grid-cols-2 md:px-10">
          {menuItems.map((item, index) => (
            <article key={item.id} className="grid grid-cols-[auto_1fr] gap-x-5 border-t border-primary/30 pt-6 md:gap-x-7 md:pt-8">
              <span className="pt-1 font-display text-2xl italic text-primary/45 md:text-3xl" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="flex items-baseline justify-between gap-5">
                  <h3 className="font-display text-2xl leading-tight text-foreground md:text-3xl">{item.name}</h3>
                  {item.price !== null && (
                    <span className="shrink-0 font-display text-xl italic text-primary md:text-2xl">
                      {item.price.toFixed(2)}€
                    </span>
                  )}
                </div>
                <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground md:text-[15px]">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Menu;