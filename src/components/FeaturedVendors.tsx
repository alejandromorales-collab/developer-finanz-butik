import { motion } from "framer-motion";
import bakerImg from "@/assets/vendors/baker-mckenzie.png";
import kpmgImg from "@/assets/vendors/kpmg.png";
import deloitteImg from "@/assets/vendors/deloitte.png";
import pwcImg from "@/assets/vendors/pwc.png";
import hoganImg from "@/assets/vendors/hogan-lovells.png";
import cushmanImg from "@/assets/vendors/cushman-wakefield.png";

const vendors = [
  { name: "Baker McKenzie", logo: bakerImg },
  { name: "KPMG", logo: kpmgImg },
  { name: "Deloitte", logo: deloitteImg },
  { name: "PwC", logo: pwcImg },
  { name: "Hogan Lovells", logo: hoganImg },
  { name: "Cushman & Wakefield", logo: cushmanImg },
];

const FeaturedVendors = () => {
  return (
    <section className="border-t py-12 sm:py-16 lg:py-20">
      <div className="container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center sm:mb-10"
        >
          <h2 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Featured Vendors
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground sm:text-base">
            Profesionales verificados que respaldan cada inversión con servicios de primer nivel.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 items-center justify-items-center gap-6 sm:grid-cols-6 sm:gap-8">
          {vendors.map((vendor, i) => (
            <motion.div
              key={vendor.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center justify-center"
            >
              <img
                src={vendor.logo}
                alt={vendor.name}
                className="h-16 w-auto object-contain opacity-40 grayscale transition-all hover:opacity-80 hover:grayscale-0 sm:h-24 lg:h-32 xl:h-40"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVendors;
