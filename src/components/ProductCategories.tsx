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
    image: buyPreview,
  },
];

const ProductCategories = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
            Empieza con nuestras categorías más populares
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Únete a cientos de inversionistas construyendo patrimonio con confianza y facilidad.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8 flex justify-center">
          <div className="flex gap-1 rounded-full border bg-muted p-1">
            {categories.map((cat, i) => (
              <button
                key={cat.tag}
                onClick={() => setActive(i)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
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
            className="grid items-center gap-10 lg:grid-cols-2"
          >
            <div>
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                {categories[active].tag}
              </span>
              <h3 className="mb-4 font-heading text-2xl font-extrabold text-foreground lg:text-3xl">
                {categories[active].title}
              </h3>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                {categories[active].description}
              </p>
              <Button className="gap-2">
                {categories[active].cta} <ArrowRight size={16} />
              </Button>
            </div>
            <div className="overflow-hidden rounded-xl border shadow-lg">
              <img
                src={categories[active].image}
                alt={categories[active].title}
                className="h-full w-full object-cover"
                loading="lazy"
                width={800}
                height={600}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProductCategories;
