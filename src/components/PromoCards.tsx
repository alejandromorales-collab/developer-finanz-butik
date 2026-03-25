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
    <section className="border-b bg-card py-4 sm:py-6">
      <div className="container grid gap-3 px-4 sm:grid-cols-2 sm:gap-4 sm:px-6">
        {promos.map((promo, i) => (
          <motion.a
            key={i}
            href="#"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="group flex items-center gap-3 rounded-lg border bg-background p-4 transition-shadow hover:shadow-md sm:gap-4 sm:p-5"
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg sm:h-12 sm:w-12 ${promo.bg}`}>
              <promo.icon size={20} className={`${promo.color} sm:!h-6 sm:!w-6`} weight="duotone" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-heading text-xs font-bold text-foreground sm:text-sm">{promo.title}</p>
              <p className="mt-0.5 hidden text-xs text-muted-foreground sm:block">{promo.description}</p>
            </div>
            <ArrowRight size={16} className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 sm:h-[18px] sm:w-[18px]" />
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default PromoCards;
