import { useEffect, useRef } from "react";
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

// Duplicate for seamless loop
const allVendors = [...vendors, ...vendors];

const FeaturedVendors = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;
    let offset = 0;
    const speed = 0.5; // px per frame

    const animate = () => {
      offset += speed;
      // Reset when first set scrolls out
      const halfWidth = el.scrollWidth / 2;
      if (offset >= halfWidth) offset = 0;
      el.style.transform = `translateX(-${offset}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const pause = () => cancelAnimationFrame(animationId);
    const resume = () => { animationId = requestAnimationFrame(animate); };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animationId);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, []);

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
      </div>

      {/* Full-width carousel */}
      <div className="overflow-hidden">
        <div ref={scrollRef} className="flex items-center will-change-transform">
          {allVendors.map((vendor, i) => (
            <div
              key={`${vendor.name}-${i}`}
              className="flex shrink-0 items-center justify-center px-6 sm:px-10 lg:px-14"
            >
              <img
                src={vendor.logo}
                alt={vendor.name}
                className="h-24 w-auto object-contain opacity-40 grayscale transition-all hover:opacity-80 hover:grayscale-0 sm:h-32 lg:h-40"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVendors;
