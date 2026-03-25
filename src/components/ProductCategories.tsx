import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@phosphor-icons/react";
import cashImg from "@/assets/category-cash.jpg";
import lendImg from "@/assets/category-lend.jpg";
import buyImg from "@/assets/category-buy.jpg";
import { cn } from "@/lib/utils";

const categories = [
  {
    tag: "CASH",
    title: "Rendimientos líquidos",
    description: "Genera retornos atractivos con liquidez inmediata. Ideal para capital de corto plazo con acceso a fondos cuando los necesites.",
    cta: "Explorar Cash",
    image: cashImg,
  },
  {
    tag: "LEND",
    title: "Préstamos respaldados",
    description: "Presta capital a proyectos inmobiliarios verificados con tasas fijas y garantías reales sobre los activos subyacentes.",
    cta: "Explorar Lend",
    image: lendImg,
  },
  {
    tag: "BUY",
    title: "Adquisición directa",
    description: "Invierte directamente en propiedades de alto valor con potencial de apreciación y rentas recurrentes.",
    cta: "Explorar Buy",
    image: buyImg,
  },
];

const ProductCategories = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center sm:mb-10"
        >
          <h2 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Empieza con nuestras categorías más populares
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground sm:mt-3 sm:text-base">
            Únete a cientos de inversionistas construyendo patrimonio con confianza y facilidad.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-6 flex justify-center sm:mb-8">
          <div className="flex gap-1 rounded-full border bg-muted p-1">
            {categories.map((cat, i) => (
              <button
                key={cat.tag}
                onClick={() => setActive(i)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors sm:px-5 sm:py-2 sm:text-sm",
                  active === i
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {cat.tag}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid items-center gap-6 sm:gap-10 lg:grid-cols-2"
          >
            {/* Image first on mobile for visual impact */}
            <div className="order-1 overflow-hidden rounded-xl border shadow-lg lg:order-2">
              <img
                src={categories[active].image}
                alt={categories[active].title}
                className="aspect-[16/10] w-full object-cover md:aspect-[16/9] md:max-h-[280px] lg:max-h-none lg:aspect-auto"
                loading="lazy"
                width={800}
                height={600}
              />
            </div>
            <div className="order-2 lg:order-1">
              <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary sm:mb-3">
                {categories[active].tag}
              </span>
              <h3 className="mb-3 font-heading text-xl font-extrabold text-foreground sm:mb-4 sm:text-2xl lg:text-3xl">
                {categories[active].title}
              </h3>
              <p className="mb-5 text-sm text-muted-foreground leading-relaxed sm:mb-6 sm:text-base">
                {categories[active].description}
              </p>
              <Button className="w-full gap-2 sm:w-auto">
                {categories[active].cta} <ArrowRight size={16} />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProductCategories;
