import { motion } from "framer-motion";
import { ChartLineUp, ShieldCheckered, Scales, Handshake } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@phosphor-icons/react";

const features = [
  {
    icon: ChartLineUp,
    title: "Optimización continua",
    description: "Nuestro equipo monitorea y optimiza cada oportunidad para maximizar tus retornos a lo largo del tiempo.",
  },
  {
    icon: ShieldCheckered,
    title: "Due diligence completo",
    description: "Cada proyecto pasa por un riguroso proceso de evaluación legal, financiera y de mercado antes de ser publicado.",
  },
  {
    icon: Scales,
    title: "Soporte legal incluido",
    description: "Accede a servicios legales profesionales integrados en cada inversión, desde contratos hasta cumplimiento regulatorio.",
  },
  {
    icon: Handshake,
    title: "Red de vendors verificados",
    description: "Conecta con una red curada de profesionales en legal, contabilidad, seguros y asesoría estratégica.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-[hsl(var(--surface-inverse))] py-16 lg:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-2xl"
        >
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-primary">
            Invertir
          </span>
          <h2 className="mb-4 font-heading text-3xl font-extrabold tracking-tight text-white lg:text-4xl">
            Invertir nunca fue tan fácil.
          </h2>
          <p className="text-white/60 leading-relaxed">
            Gestionamos tu inversión de principio a fin — con tecnología, curación experta y soporte profesional — para que tú te enfoques en lo que importa.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                <feature.icon size={22} className="text-primary" weight="duotone" />
              </div>
              <h3 className="mb-2 font-heading text-base font-bold text-white">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/50">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex gap-4"
        >
          <Button className="gap-2">
            Comenzar a invertir <ArrowRight size={16} />
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
            Conocer más
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
