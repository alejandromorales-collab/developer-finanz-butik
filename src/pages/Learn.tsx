import Navbar from "@/components/Navbar";
import { BookOpen, Play, Certificate, ArrowRight } from "@phosphor-icons/react";

const articles = [
  { id: 1, title: "Introducción a las Inversiones Inmobiliarias", category: "Basics", readTime: "5 min", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80" },
  { id: 2, title: "¿Qué es el Crowdfunding Inmobiliario?", category: "Basics", readTime: "7 min", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80" },
  { id: 3, title: "Cómo Evaluar Retornos y Riesgos", category: "Strategy", readTime: "10 min", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80" },
  { id: 4, title: "Diversificación de Portafolio", category: "Strategy", readTime: "8 min", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" },
  { id: 5, title: "Aspectos Legales en Inversiones", category: "Legal", readTime: "12 min", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80" },
  { id: 6, title: "Fiscalidad para Inversores", category: "Legal", readTime: "9 min", image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400&q=80" },
];

const videos = [
  { id: 1, title: "Webinar: Tendencias Inmobiliarias 2026", duration: "45 min" },
  { id: 2, title: "Cómo Usar el Simulador de Retornos", duration: "12 min" },
  { id: 3, title: "Panel: Inversión en LatAm", duration: "60 min" },
];

const Learn = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container py-10 space-y-10">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Learn</h1>
        <p className="mt-1 text-muted-foreground">Recursos educativos para inversores inteligentes</p>
      </div>

      {/* Featured */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-accent p-8 text-primary-foreground">
        <Certificate size={64} className="absolute right-6 top-6 opacity-20" />
        <span className="rounded-full bg-primary-foreground/20 px-3 py-1 text-xs font-medium">Nuevo</span>
        <h2 className="mt-4 font-heading text-2xl font-bold">Certificación: Inversor Inmobiliario</h2>
        <p className="mt-2 max-w-md text-sm opacity-90">Completa nuestro programa de 6 módulos y obtén tu certificación oficial de Finanz Butik.</p>
        <button className="mt-4 flex items-center gap-2 rounded-full bg-primary-foreground px-5 py-2 text-sm font-semibold text-primary transition-transform hover:scale-105">
          Comenzar <ArrowRight size={16} />
        </button>
      </div>

      {/* Articles */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <BookOpen size={20} className="text-primary" />
          <h2 className="font-heading text-xl font-bold text-foreground">Artículos</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <div key={a.id} className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md">
              <div className="aspect-video overflow-hidden">
                <img src={a.image} alt={a.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-4">
                <span className="text-xs font-medium text-primary">{a.category}</span>
                <h3 className="mt-1 font-heading text-sm font-semibold text-foreground leading-snug">{a.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{a.readTime} read</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Videos */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Play size={20} className="text-primary" />
          <h2 className="font-heading text-xl font-bold text-foreground">Videos & Webinars</h2>
        </div>
        <div className="space-y-3">
          {videos.map((v) => (
            <div key={v.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/30 cursor-pointer">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Play size={18} weight="fill" className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-heading text-sm font-semibold text-foreground">{v.title}</p>
                <p className="text-xs text-muted-foreground">{v.duration}</p>
              </div>
              <ArrowRight size={18} className="text-muted-foreground" />
            </div>
          ))}
        </div>
      </section>
    </main>
  </div>
);

export default Learn;
