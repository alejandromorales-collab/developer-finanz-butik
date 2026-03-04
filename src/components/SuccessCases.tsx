import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { mockProjects } from "@/data/mockProjects";
import type { Project } from "@/types/api";
import { cn } from "@/lib/utils";

const filters: { label: string; value: Project["category"] | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Cash", value: "cash" },
  { label: "Lend", value: "lend" },
  { label: "Buy", value: "buy" },
  { label: "Develop", value: "develop" },
];

const SuccessCases = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered = activeFilter === "all"
    ? mockProjects
    : mockProjects.filter((p) => p.category === activeFilter);

  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
              Success Cases
            </h2>
            <p className="mt-2 text-muted-foreground">
              Explora proyectos históricos y sus resultados de inversión.
            </p>
          </div>
          <div className="flex gap-1 rounded-full border bg-muted p-1">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  activeFilter === f.value
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-muted-foreground">
            No hay proyectos en esta categoría.
          </p>
        )}
      </div>
    </section>
  );
};

export default SuccessCases;
