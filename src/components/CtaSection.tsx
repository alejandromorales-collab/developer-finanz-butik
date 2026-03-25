import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const CtaSection = () => {
  return (
    <section className="bg-[hsl(var(--surface-inverse-alt))] py-12 sm:py-16 lg:py-24">
      <div className="container px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mx-auto max-w-2xl font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Empieza a construir tu patrimonio hoy
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-white/60 leading-relaxed sm:mt-4 sm:text-base">
            Crea tu cuenta en minutos y accede a oportunidades de inversión curadas con soporte legal y rendimientos atractivos.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <Button size="lg" className="w-full gap-2 sm:w-auto" asChild>
              <Link to="/login">
                Crear cuenta <ArrowRight size={18} />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 hover:text-white sm:w-auto">
              Conocer más
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
