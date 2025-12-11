import { useState } from "react";
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

const categories = [
  { id: "desayunos", label: "Desayunos" },
  { id: "comidas", label: "Comidas & Cenas" },
  { id: "bebidas", label: "Bebidas" },
  { id: "postres", label: "Postres" },
];

type MenuItem = {
  name: string;
  description: string;
  image: string;
};

type MenuItems = {
  [key: string]: MenuItem[];
};

const menuItems: MenuItems = {
  desayunos: [
    { name: "Tostadas Variadas", description: "Con tomate, aguacate, jamón o mermelada artesanal", image: dishToast },
    { name: "Bollería del Día", description: "Croissants, napolitanas y más, recién horneados", image: dishPastry },
    { name: "Café de Especialidad", description: "Espresso, cappuccino, latte art", image: coffeeSpecialty },
    { name: "Zumos Naturales", description: "Naranja, manzana, zanahoria y combinados", image: dishJuice },
  ],
  comidas: [
    { name: "Ensaladas Frescas", description: "Mediterránea, César, quinoa y más", image: dishSalad },
    { name: "Pastas Artesanales", description: "Carbonara, boloñesa, pesto genovés", image: dishPasta },
    { name: "Burgers Gourmet", description: "Con ingredientes premium y pan artesanal", image: dishBurger },
    { name: "Entrecot a la Brasa", description: "Corte premium con guarnición a elegir", image: dishEntrecot },
    { name: "Pulpa Selecta", description: "Preparación especial de la casa", image: dishPulpo },
    { name: "Tapas Variadas", description: "Selección de tapas tradicionales y creativas", image: dishTapas },
  ],
  bebidas: [
    { name: "Cafés Especiales", description: "Espresso, americano, cortado, con leche", image: coffeeSpecialty },
    { name: "Smoothies", description: "Fresa, tropical, verde detox", image: drinkSmoothie },
    { name: "Refrescos", description: "Bebidas artesanales y clásicos", image: drinkBeverages },
    { name: "Vinos y Cervezas", description: "Selección de vinos locales y cervezas craft", image: drinkWine },
  ],
  postres: [
    { name: "Crepes Dulces", description: "Con nutella, frutas, nata o helado", image: dishCrepe },
    { name: "Gofres Belgas", description: "Crujientes con toppings variados", image: dishWaffle },
    { name: "Postres Artesanales", description: "Tartas, coulants y creaciones del día", image: dishDessert },
    { name: "Helados", description: "Sabores tradicionales y especiales", image: dishIcecream },
  ],
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("desayunos");

  return (
    <section id="menu" className="section-padding bg-cream">
      <div className="container-custom px-4">
        <div className="text-center mb-12">
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
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-card text-muted-foreground hover:bg-rose-light hover:text-foreground border border-border"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {menuItems[activeCategory].map((item, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-500 border border-border/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
