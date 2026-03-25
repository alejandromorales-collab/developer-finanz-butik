import { motion } from "framer-motion";

const vendors = [
  { name: "Baker McKenzie", initials: "BM" },
  { name: "KPMG", initials: "KP" },
  { name: "Deloitte Legal", initials: "DL" },
  { name: "PwC Advisory", initials: "PC" },
  { name: "Hogan Lovells", initials: "HL" },
  { name: "Cushman & Wakefield", initials: "CW" },
];

const FeaturedVendors = () => {
  return (
    <section className="py-16 lg:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
            Featured Vendors
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
            Profesionales verificados que respaldan cada inversión con servicios de primer nivel.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-6 sm:grid-cols-6">
          {vendors.map((vendor, i) => (
            <motion.div
              key={vendor.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="group flex flex-col items-center gap-3"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-xl border bg-card transition-shadow group-hover:shadow-md">
                <span className="font-heading text-xl font-extrabold text-muted-foreground/60 grayscale">
                  {vendor.initials}
                </span>
              </div>
              <span className="text-center text-xs font-medium text-muted-foreground">
                {vendor.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVendors;
