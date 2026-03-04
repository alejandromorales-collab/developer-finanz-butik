import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@phosphor-icons/react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-foreground via-charcoal to-navy">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-primary blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-gold blur-[100px]" />
      </div>

      <div className="container relative z-10 flex min-h-[520px] flex-col items-start justify-center py-20 lg:py-28">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
          style={{ color: "hsl(174, 70%, 55%)" }}
        >
          Oportunidades de inversión curadas
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
        >
          Invierte en proyectos{" "}
          <span className="text-primary">inmobiliarios</span> con respaldo real
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 max-w-xl text-lg leading-relaxed text-white/70"
        >
          Accede a oportunidades exclusivas de inversión con rendimientos atractivos,
          soporte legal incluido y la curación experta del equipo Finanz Butik.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-4"
        >
          <Button size="lg" className="gap-2 rounded-full font-semibold">
            Explorar oportunidades <ArrowRight size={18} />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full border-white/20 font-semibold text-white hover:bg-white/10 hover:text-white">
            Cómo funciona
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
