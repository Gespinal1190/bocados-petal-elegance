import { useState } from "react";
import dishCrepe from "@/assets/dish-crepe.jpg";
import dishWaffle from "@/assets/dish-waffle.jpg";
import dishEntrecot from "@/assets/dish-entrecot.jpg";
import coffeeSpecialty from "@/assets/coffee-specialty.jpg";
import dishToast from "@/assets/dish-toast.jpg";

const categories = [
  { id: "desayunos", label: "Desayunos" },
  { id: "comidas", label: "Comidas & Cenas" },
  { id: "bebidas", label: "Bebidas" },
  { id: "postres", label: "Postres" },
];

type MenuItem = {
  name: string;
  description: string;
  image?: string;
};

type MenuItems = {
  [key: string]: MenuItem[];
};

const menuItems: MenuItems = {
  desayunos: [
    { name: "Tostadas Variadas", description: "Con tomate, aguacate, jamón o mermelada artesanal", image: dishToast },
    { name: "Bollería del Día", description: "Croissants, napolitanas y más, recién horneados" },
    { name: "Café de Especialidad", description: "Espresso, cappuccino, latte art", image: coffeeSpecialty },
    { name: "Zumos Naturales", description: "Naranja, manzana, zanahoria y combinados" },
  ],
  comidas: [
    { name: "Ensaladas Frescas", description: "Mediterránea, César, quinoa y más" },
    { name: "Pastas Artesanales", description: "Carbonara, boloñesa, pesto genovés" },
    { name: "Burgers Gourmet", description: "Con ingredientes premium y pan artesanal" },
    { name: "Entrecot a la Brasa", description: "Corte premium con guarnición a elegir", image: dishEntrecot },
    { name: "Pulpa Selecta", description: "Preparación especial de la casa" },
    { name: "Tapas Variadas", description: "Selección de tapas tradicionales y creativas" },
  ],
  bebidas: [
    { name: "Cafés Especiales", description: "Espresso, americano, cortado, con leche" },
    { name: "Smoothies", description: "Fresa, tropical, verde detox" },
    { name: "Refrescos", description: "Bebidas artesanales y clásicos" },
    { name: "Vinos y Cervezas", description: "Selección de vinos locales y cervezas craft" },
  ],
  postres: [
    { name: "Crepes Dulces", description: "Con nutella, frutas, nata o helado", image: dishCrepe },
    { name: "Gofres Belgas", description: "Crujientes con toppings variados", image: dishWaffle },
    { name: "Postres Artesanales", description: "Tartas, coulants y creaciones del día" },
    { name: "Helados", description: "Sabores tradicionales y especiales" },
  ],
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("desayunos");

  return (
    <section id="menu" className="section-padding">
      <div className="container-custom px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-medium tracking-widest uppercase text-primary">
            Nuestra Carta
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mt-3 mb-6 text-foreground">
            Menú
          </h2>
          <div className="divider-flower">
            <span className="text-2xl">✿</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {menuItems[activeCategory].map((item, index) => (
            <div
              key={index}
              className="card-elegant group hover:scale-[1.02] transition-all duration-300"
            >
              {item.image && (
                <div className="relative h-48 -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-4 md:mb-6 overflow-hidden rounded-t-2xl">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {item.name}
              </h3>
              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm">
            Pregunta por nuestras sugerencias del día y opciones para alérgenos
          </p>
        </div>
      </div>
    </section>
  );
};

export default Menu;
