import heroImage from "@/assets/hero-restaurant.jpg";
import dishCrepe from "@/assets/dish-crepe.jpg";
import dishWaffle from "@/assets/dish-waffle.jpg";
import dishEntrecot from "@/assets/dish-entrecot.jpg";
import coffeeSpecialty from "@/assets/coffee-specialty.jpg";
import dishToast from "@/assets/dish-toast.jpg";

const galleryImages = [
  { src: heroImage, alt: "Interior del restaurante con pared de flores rosadas", span: "lg:col-span-2 lg:row-span-2" },
  { src: dishCrepe, alt: "Crepes con frutas frescas", span: "" },
  { src: coffeeSpecialty, alt: "Café latte art", span: "" },
  { src: dishEntrecot, alt: "Entrecot a la brasa", span: "lg:col-span-2" },
  { src: dishWaffle, alt: "Gofres con chocolate y fresas", span: "" },
  { src: dishToast, alt: "Tostada de desayuno", span: "" },
];

const Gallery = () => {
  return (
    <section id="galeria" className="section-padding bg-muted/30">
      <div className="container-custom px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-medium tracking-widest uppercase text-primary">
            Nuestro Espacio
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mt-3 mb-6 text-foreground">
            Galería
          </h2>
          <div className="divider-flower">
            <span className="text-2xl">✿</span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl group ${image.span}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover min-h-[200px] lg:min-h-[250px] group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-primary-foreground text-sm font-medium">
                  {image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
