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
          <div className="mt-6 flex justify-center sm:mt-8">
            <Button size="lg" className="w-full gap-2 sm:w-auto" asChild>
              <Link to="/login">
                Crear cuenta <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
