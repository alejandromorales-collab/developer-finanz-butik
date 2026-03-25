import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@phosphor-icons/react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-foreground">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Desarrollo inmobiliario de lujo"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/40 md:from-foreground/90 md:via-foreground/70" />
      </div>

      <div className="container relative z-10 flex min-h-[400px] flex-col items-start justify-center px-5 py-14 sm:min-h-[460px] sm:py-16 md:px-6 lg:min-h-[520px] lg:py-28">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-3 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium sm:mb-4 sm:px-4 sm:py-1.5 sm:text-sm"
          style={{ color: "hsl(174, 70%, 55%)" }}
        >
          Oportunidades de inversión curadas
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl"
        >
          Invierte en proyectos{" "}
          <span className="text-primary">inmobiliarios</span> con respaldo real
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 max-w-xl text-base leading-relaxed text-white/70 sm:mb-8 sm:text-lg"
        >
          Accede a oportunidades exclusivas de inversión con rendimientos atractivos,
          soporte legal incluido y la curación experta del equipo Finanz Butik.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4"
        >
          <Button size="lg" className="w-full gap-2 sm:w-auto">
            Explorar oportunidades <ArrowRight size={18} />
          </Button>
          <Button size="lg" variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 hover:text-white sm:w-auto">
            Cómo funciona
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
