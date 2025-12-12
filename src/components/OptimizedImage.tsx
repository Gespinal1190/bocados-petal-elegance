import { useState } from "react";

// Local image fallbacks mapping
import heroImage from "@/assets/hero-restaurant.jpg";
import dishCrepe from "@/assets/dish-crepe.jpg";
import dishWaffle from "@/assets/dish-waffle.jpg";
import dishEntrecot from "@/assets/dish-entrecot.jpg";
import coffeeSpecialty from "@/assets/coffee-specialty.jpg";
import dishToast from "@/assets/dish-toast.jpg";
import dishPulpo from "@/assets/dish-pulpo.jpg";
import dishBurger from "@/assets/dish-burger.jpg";
import dishPasta from "@/assets/dish-pasta.jpg";
import dishTapas from "@/assets/dish-tapas.jpg";
import dishSalad from "@/assets/dish-salad.jpg";
import dishDessert from "@/assets/dish-dessert.jpg";
import dishIcecream from "@/assets/dish-icecream.jpg";
import dishJuice from "@/assets/dish-juice.jpg";
import dishPastry from "@/assets/dish-pastry.jpg";
import drinkBeverages from "@/assets/drink-beverages.jpg";
import drinkSmoothie from "@/assets/drink-smoothie.jpg";
import drinkWine from "@/assets/drink-wine.jpg";

const localImageMap: Record<string, string> = {
  "hero-restaurant.jpg": heroImage,
  "dish-crepe.jpg": dishCrepe,
  "dish-waffle.jpg": dishWaffle,
  "dish-entrecot.jpg": dishEntrecot,
  "coffee-specialty.jpg": coffeeSpecialty,
  "dish-toast.jpg": dishToast,
  "dish-pulpo.jpg": dishPulpo,
  "dish-burger.jpg": dishBurger,
  "dish-pasta.jpg": dishPasta,
  "dish-tapas.jpg": dishTapas,
  "dish-salad.jpg": dishSalad,
  "dish-dessert.jpg": dishDessert,
  "dish-icecream.jpg": dishIcecream,
  "dish-juice.jpg": dishJuice,
  "dish-pastry.jpg": dishPastry,
  "drink-beverages.jpg": drinkBeverages,
  "drink-smoothie.jpg": drinkSmoothie,
  "drink-wine.jpg": drinkWine,
};

// Extract filename from URL
const getFilenameFromUrl = (url: string): string | null => {
  try {
    const parts = url.split("/");
    return parts[parts.length - 1];
  } catch {
    return null;
  }
};

// Get local fallback for a URL
const getLocalFallback = (url: string): string | null => {
  const filename = getFilenameFromUrl(url);
  if (filename && localImageMap[filename]) {
    return localImageMap[filename];
  }
  return null;
};

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  priority?: boolean;
}

const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  loading = "lazy",
  priority = false 
}: OptimizedImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    if (!hasError) {
      const fallback = getLocalFallback(src);
      if (fallback) {
        setCurrentSrc(fallback);
        setHasError(true);
      }
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-inherit" />
      )}
      <img
        src={currentSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        loading={priority ? "eager" : loading}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
};

export default OptimizedImage;
export { getLocalFallback, localImageMap };
