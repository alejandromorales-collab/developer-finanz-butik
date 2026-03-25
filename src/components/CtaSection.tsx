import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const CtaSection = () => {
  return (
    <section className="bg-[hsl(var(--surface-inverse-alt))] py-16 lg:py-24">
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mx-auto max-w-2xl font-heading text-3xl font-extrabold tracking-tight text-white lg:text-4xl">
            Empieza a construir tu patrimonio hoy
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/60 leading-relaxed">
            Crea tu cuenta en minutos y accede a oportunidades de inversión curadas con soporte legal y rendimientos atractivos.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" className="gap-2" asChild>
              <Link to="/login">
                Crear cuenta <ArrowRight size={18} />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
              Conocer más
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
