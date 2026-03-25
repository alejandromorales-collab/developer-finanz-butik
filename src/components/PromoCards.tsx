import { motion } from "framer-motion";
import { ArrowRight, TrendUp, ShieldCheck } from "@phosphor-icons/react";

const promos = [
  {
    icon: TrendUp,
    title: "Rendimientos desde 6.5% anual",
    description: "Accede a oportunidades curadas con retornos atractivos respaldados por activos reales.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: ShieldCheck,
    title: "Soporte legal y due diligence incluido",
    description: "Cada inversión viene con revisión legal completa por nuestro equipo de profesionales verificados.",
    color: "text-[hsl(var(--success))]",
    bg: "bg-[hsl(var(--success))]/10",
  },
];

const PromoCards = () => {
  return (
    <section className="border-b bg-card py-6">
      <div className="container grid gap-4 sm:grid-cols-2">
        {promos.map((promo, i) => (
          <motion.a
            key={i}
            href="#"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="group flex items-center gap-4 rounded-lg border bg-background p-5 transition-shadow hover:shadow-md"
          >
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${promo.bg}`}>
              <promo.icon size={24} className={promo.color} weight="duotone" />
            </div>
            <div className="flex-1">
              <p className="font-heading text-sm font-bold text-foreground">{promo.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{promo.description}</p>
            </div>
            <ArrowRight size={18} className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default PromoCards;
