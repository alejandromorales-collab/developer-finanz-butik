import { motion } from "framer-motion";

const stats = [
  { value: "$12M+", label: "Capital invertido en la plataforma" },
  { value: "95%", label: "De proyectos con retorno positivo" },
  { value: "200+", label: "Inversionistas activos" },
  { value: "4.8★", label: "Satisfacción promedio de usuarios" },
];

const SocialProof = () => {
  return (
    <section className="border-y bg-card py-12">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-heading text-3xl font-extrabold text-primary lg:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
