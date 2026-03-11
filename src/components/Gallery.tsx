import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { supabase } from "@/integrations/supabase/client";
import { getLocalFallback } from "@/components/OptimizedImage";
import heroImage from "@/assets/hero-restaurant.jpg";
import dishCrepe from "@/assets/dish-crepe.jpg";
import dishWaffle from "@/assets/dish-waffle.jpg";
import dishEntrecot from "@/assets/dish-entrecot.jpg";
import coffeeSpecialty from "@/assets/coffee-specialty.jpg";
import dishToast from "@/assets/dish-toast.jpg";
import dishPulpo from "@/assets/dish-pulpo.jpg";
import dishBurger from "@/assets/dish-burger.jpg";

type GalleryImage = {
  id: string;
  image_url: string;
  alt_text: string | null;
};

const defaultImages = [
  { src: heroImage, alt: "Interior del restaurante", span: "col-span-2 row-span-2" },
  { src: dishCrepe, alt: "Crepes con frutas frescas", span: "" },
  { src: coffeeSpecialty, alt: "Café latte art", span: "" },
  { src: dishEntrecot, alt: "Entrecot a la brasa", span: "col-span-2" },
  { src: dishWaffle, alt: "Gofres con chocolate y fresas", span: "" },
  { src: dishToast, alt: "Tostada de desayuno", span: "" },
  { src: dishPulpo, alt: "Pulpo a la gallega", span: "" },
  { src: dishBurger, alt: "Burger gourmet", span: "" },
];

const spanClasses = ["col-span-2 row-span-2", "", "", "col-span-2", "", "", "", ""];

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [useDatabase, setUseDatabase] = useState(false);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");

      if (!error && data) {
        setImages(data);
        setUseDatabase(true);
      }
    };

    fetchImages();
  }, []);

  const displayImages = useDatabase
    ? images.map((img, i) => ({
        src: getLocalFallback(img.image_url) || img.image_url,
        alt: img.alt_text || "Imagen del restaurante",
        span: spanClasses[i % spanClasses.length],
      }))
    : defaultImages;

  if (useDatabase && images.length === 0) return null;

  return (
    <section id="galeria" className="section-padding overflow-hidden">
      <div className="container-custom px-4">
        <div
          ref={headerRef}
          className={`text-center mb-14 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-primary mb-4">
            Nuestro Espacio
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground">
            Galería
          </h2>
          <div className="divider-line mt-6">
            <span className="text-primary text-lg">◆</span>
          </div>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 max-w-6xl mx-auto auto-rows-[200px] md:auto-rows-[240px]"
        >
          {displayImages.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden group cursor-pointer ${image.span} transition-all duration-700 ${
                gridVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;