import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getLocalFallback } from "@/components/OptimizedImage";
import { useScrollProgress } from "@/hooks/use-scroll-animation";

type GalleryImage = { id: string; image_url: string; alt_text: string | null };

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, progress } = useScrollProgress();

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase.from("gallery_images").select("*").eq("is_active", true).order("sort_order");
      if (!error && data) setImages(data);
      setLoading(false);
    };
    fetchImages();
  }, []);

  const displayImages = images.slice(0, 5).map((image) => ({
    src: getLocalFallback(image.image_url) || image.image_url,
    alt: image.alt_text || "Imagen de Bocados Restobar",
  }));

  if (loading || displayImages.length === 0) return null;
  const slideProgress = progress * Math.max(displayImages.length - 1, 1);

  return (
    <section id="galeria" className="bg-background">
      <div className="flex min-h-[70svh] items-center justify-center px-5 py-24 text-center">
        <div>
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">La experiencia</p>
          <h2 className="font-body text-6xl font-black uppercase leading-[0.9] text-foreground md:text-8xl">El local</h2>
        </div>
      </div>
      <div ref={ref} className="relative" style={{ height: `${displayImages.length * 100}svh` }}>
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-foreground">
          {displayImages.map((image, index) => {
            const localProgress = index === 0 ? 1 : Math.min(Math.max(slideProgress - (index - 1), 0), 1);
            return (
              <figure
                key={index}
                className="absolute inset-0 overflow-hidden will-change-[clip-path]"
                style={{ zIndex: index + 1, clipPath: `inset(0 0 0 ${100 - localProgress * 100}%)` }}
              >
                <img src={image.src} alt={image.alt} className="h-full w-full scale-105 object-cover blur-sm" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-foreground/20" />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="w-[72vw] max-w-md bg-card p-2 shadow-elevated md:p-3">
                    <img src={image.src} alt="" className="aspect-[4/5] w-full object-cover" loading="lazy" decoding="async" />
                    <figcaption className="px-3 py-4 text-center text-[10px] font-medium uppercase tracking-[0.12em] text-card-foreground">{image.alt}</figcaption>
                  </div>
                </div>
              </figure>
            );
          })}
          <div className="absolute bottom-6 right-6 z-20 bg-card px-3 py-2 text-[10px] font-semibold text-card-foreground">
            {Math.min(Math.floor(slideProgress) + 1, displayImages.length)} / {displayImages.length}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;