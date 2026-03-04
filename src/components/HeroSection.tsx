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
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>

      <div className="container relative z-10 flex min-h-[520px] flex-col items-start justify-center py-20 lg:py-28">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium"
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
          <Button size="lg" className="gap-2">
            Explorar oportunidades <ArrowRight size={18} />
          </Button>
          <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
            Cómo funciona
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
